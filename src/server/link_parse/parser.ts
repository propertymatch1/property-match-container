import { parseExtractedURLWithLLM } from "./llm_extract";
import { extractURL } from "./url_extract";
import { fetchHTML } from "./url_utils";
import * as cheerio from "cheerio";

export type LinkParserOutputWithConfidence<T> = {
  value: T;
  confidence: number; // 1 to 10
} | null;

export type LinkParserOutput = {
  url: string;
  name: LinkParserOutputWithConfidence<string>;
  positioning: LinkParserOutputWithConfidence<string>;
  logo_url: LinkParserOutputWithConfidence<string>;
  category: LinkParserOutputWithConfidence<string[]>;
  target_customers: LinkParserOutputWithConfidence<string[]>;
  strengths: LinkParserOutputWithConfidence<string[]>;
};

export async function parseURL(url: string): Promise<LinkParserOutput> {
  const { html, finalUrl } = await fetchHTML(url);
  const $ = cheerio.load(html);
  const extractedURL = await extractURL($, finalUrl);
  return await parseExtractedURLWithLLM($, extractedURL, finalUrl);
}
