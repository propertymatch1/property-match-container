import { nullthrows } from "~/lib/utils";
import { getClient, GPT_4O_MINI } from "../external_api/openai";
import type { LinkParserOutput } from "./parser";
import type { URLExtractedData } from "./url_extract";

export async function parseExtractedURLWithLLM(
  url: string,
  extractedData: URLExtractedData,
): Promise<LinkParserOutput> {
  const openAI = getClient();

  const prompt = `
You are given the brand's website URL and some meta data extracted from the website. Please synthesize the information and return a JSON object only (no extra text) with the following keys:
    - name: the brand name
    - category: one-word category like "fashion", "food", "retail", "technology", "hospitality", or "finance" or null
    - summary: 2-4 sentence summary describing primary business, differentiation, and what defines it
    - vibe: 6-12 word evocative phrase describing the brand's visual and emotional vibe (what customers feel on first look)
    - ethos: 1-2 short sentences about the brand's values or mission
    - target_customers: array of short labels (e.g., "Gen Z", "Millennials", "foodies", "luxury shoppers")
    - hero_product: short description of a single signature or hero product (or null)

Input data:
URL: ${url}
Extracted Name: ${extractedData.name || "N/A"}
Extracted Logo URL: ${extractedData.logo_url || "N/A"}
Extracted Potential Category: ${extractedData.category || "N/A"}`;

  const result = await openAI.chat.completions.create({
    model: GPT_4O_MINI,
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are a professional brand strategist. Your task is to create a concise and accurate brand profile based on the brand website. Be sure to capture the essence of the brand that would be useful for showing to investors / landlords.`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  const llmContent = nullthrows(result.choices[0]?.message?.content);

  let parsed: any = null;
  const jsonMatch = llmContent && llmContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
  else parsed = JSON.parse(llmContent);

  return {
    url,
    name: parsed?.name || extractedData.name || undefined,
    logo_url: extractedData.logo_url,
    primary_colors: extractedData.primary_colors,
    category: parsed?.category || extractedData.category || undefined,
    summary: parsed?.summary || parsed?.description || undefined,
    vibe: parsed?.vibe || undefined,
    ethos: parsed?.ethos || undefined,
    target_customers: Array.isArray(parsed?.target_customers)
      ? parsed.target_customers
      : parsed?.target_customers
        ? [parsed.target_customers]
        : undefined,
    hero_product: parsed?.hero_product || undefined,
  };
}
