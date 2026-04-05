import { nullthrows } from "~/lib/utils";
import * as cheerio from "cheerio";
import { getClient, GPT_4O_MINI } from "../external_api/openai";
import type {
  LinkParserOutput,
  LinkParserOutputWithConfidence,
} from "./parser";
import type { URLExtractedData } from "./url_extract";
import { SYSTEM_PROMPT, URL_PARSE_PROMPT } from "./prompt";
import url from "url";
import type { ChatCompletionContentPartImage } from "openai/resources/index.mjs";

export async function parseExtractedURLWithLLM(
  $: cheerio.CheerioAPI,
  extractedData: URLExtractedData,
  finalUrl: string,
): Promise<LinkParserOutput> {
  const openAI = getClient();

  $("script, style, noscript").remove();
  const text = $("body").text();
  const content = text.replace(/\s+/g, " ").trim();

  const logoUrls = getFilteredLogoUrls(extractedData);

  const inputPrompt = `
*Input data*:
- Pre-Extracted Name: ${extractedData.name || "N/A"}
- Pre-Extracted High-level Category: ${extractedData.category || "N/A"}
- Website Content:\n ${content}`;

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
          ...logoUrls.map((url) => {
            return {
              type: "image_url",
              image_url: { url },
            } as ChatCompletionContentPartImage;
          }),
        ],
      },
    ],
  });

  const llmContent = nullthrows(result.choices[0]?.message?.content);
  return parseLLMOutput(llmContent, logoUrls, finalUrl);
}

function parseLLMOutput(
  llmContent: string,
  logoUrls: string[],
  finalUrl: string,
): LinkParserOutput {
  let parsed: any = null;
  const jsonMatch = llmContent && llmContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
  else parsed = JSON.parse(llmContent);

  console.log(parsed);

  const logoIndex = parseLLMOutputNumberWithTypeGuard(parsed?.logo_index);
  let logoUrl = null;
  if (logoIndex) {
    const logoValue = logoUrls[logoIndex.value];
    if (logoValue) {
      logoUrl = {
        value: logoValue,
        confidence: logoIndex.confidence,
      };
    }
  }

  return {
    url: finalUrl,
    name: parseLLMOutputStringWithTypeGuard(parsed?.name),
    category: parseLLMOutputStringArrayWithTypeGuard(parsed?.category),
    positioning: parseLLMOutputStringWithTypeGuard(parsed?.positioning),
    target_customers: parseLLMOutputStringArrayWithTypeGuard(
      parsed?.target_customers,
    ),
    strengths: parseLLMOutputStringArrayWithTypeGuard(parsed?.strengths),
    logo_url: logoUrl,
  };
}

function parseLLMOutputNumberWithTypeGuard(
  parsed: any,
): LinkParserOutputWithConfidence<number> {
  function isValue(obj: any): obj is LinkParserOutputWithConfidence<number> {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.value === "number" &&
      typeof obj.confidence === "number"
    );
  }
  return isValue(parsed) ? parsed : null;
}

function parseLLMOutputStringWithTypeGuard(
  parsed: any,
): LinkParserOutputWithConfidence<string> {
  function isValue(obj: any): obj is LinkParserOutputWithConfidence<string> {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.value === "string" &&
      typeof obj.confidence === "number"
    );
  }
  return isValue(parsed) ? parsed : null;
}

function parseLLMOutputStringArrayWithTypeGuard(
  parsed: any,
): LinkParserOutputWithConfidence<string[]> {
  function isValue(obj: any): obj is LinkParserOutputWithConfidence<string[]> {
    return (
      typeof obj === "object" &&
      obj !== null &&
      Array.isArray(obj.value) &&
      obj.value.every((v: any) => typeof v === "string") &&
      typeof obj.confidence === "number"
    );
  }
  return isValue(parsed) ? parsed : null;
}

function getFilteredLogoUrls(extractedData: URLExtractedData): string[] {
  const logoUrls = extractedData.logo_candidates || [];
  return logoUrls.filter((logoUrl) => {
    const pathname = url.parse(logoUrl).pathname ?? "";
    console.log(pathname);
    return (
      pathname.endsWith(".png") ||
      pathname.endsWith(".jpg") ||
      pathname.endsWith(".jpeg") ||
      pathname.endsWith(".gif") ||
      pathname.endsWith(".webp")
    );
  });
}
