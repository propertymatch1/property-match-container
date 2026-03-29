import { nullthrows } from "~/lib/utils";
import * as cheerio from "cheerio";
import { getClient, GPT_4O_MINI } from "../external_api/openai";
import type { LinkParserOutput } from "./parser";
import type { URLExtractedData } from "./url_extract";
import { SYSTEM_PROMPT, URL_PARSE_PROMPT } from "./prompt";

export async function parseExtractedURLWithLLM(
  $: cheerio.CheerioAPI,
  extractedData: URLExtractedData,
): Promise<LinkParserOutput> {
  const openAI = getClient();

  $("script, style, noscript").remove();
  const text = $("body").text();
  const content = text.replace(/\s+/g, " ").trim();

  const inputPrompt = `
Input data:
Pre-Extracted Name: ${extractedData.name || "N/A"}
Pre-Extracted Logo URL candidates: ${extractedData.logo_candidates?.join(", ") || "N/A"}
Pre-Extracted High-level Category: ${extractedData.category || "N/A"}
Website Content:\n ${content}`;

  console.log(inputPrompt);

  const result = await openAI.chat.completions.create({
    model: GPT_4O_MINI,
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: URL_PARSE_PROMPT + "\n\n" + inputPrompt,
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

  console.log(parsed);

  return {
    url: "",
    name: parsed?.name || extractedData.name || undefined,
    // logo_url: extractedData.logo_url,
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
