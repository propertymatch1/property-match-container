import { parseExtractedURLWithLLM } from "./llm_extract";
import { extractURL } from "./url_extract";

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
  const extractedURL = await extractURL(url);
  return await parseExtractedURLWithLLM(url, extractedURL);
}
