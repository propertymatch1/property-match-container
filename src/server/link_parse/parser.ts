import { parseExtractedURLWithLLM } from "./llm_extract";
import { extractURL } from "./url_extract";
import { fetchHTML } from "./url_utils";
import * as cheerio from "cheerio";

export type LinkParserOutput = {
  url: string;
  name?: string;
  logo_url?: string;
  primary_colors?: string[];
  category?: string;
  summary?: string;
  vibe?: string;
  ethos?: string;
  target_customers?: string[];
  hero_product?: string | null;
};

export async function parseURL(url: string): Promise<LinkParserOutput> {
  const { html, finalUrl } = await fetchHTML(url);
  const $ = cheerio.load(html);
  const extractedURL = await extractURL($, finalUrl);
  return await parseExtractedURLWithLLM($, extractedURL);
}
