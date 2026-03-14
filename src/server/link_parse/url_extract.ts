import { absoluteUrl, fetchHTML, fetchImageBuffer } from "./url_utils";
import * as cheerio from "cheerio";
import { Vibrant } from "@vibrant/core";

export type URLExtractedData = {
  name?: string;
  logo_url?: string;
  primary_colors?: string[];
  category?: string;
};

export async function extractURL(url: string): Promise<URLExtractedData> {
  const { html, finalUrl } = await fetchHTML(url);
  const $ = cheerio.load(html);

  // parse JSON-LD structured data
  let structuredData: any = null;
  const jsonLd: any[] = [];
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      const txt = $(el).html() || "";
      const parsed = JSON.parse(txt);
      jsonLd.push(parsed);
    } catch (err) {
      // skip invalid JSON-LD
    }
  });
  if (jsonLd.length === 1) structuredData = jsonLd[0];
  else if (jsonLd.length > 1) structuredData = jsonLd;

  // brand name
  const brandName = extractBrandName($);
  // logo candidates
  const logoCandidates = extractLogoCandidates($, finalUrl);

  // primary colors
  const { primaryColors, chosenLogoUrl } = await getPalette($, logoCandidates);

  // category heuristics
  let category = extractCategoryFromStructuredData(structuredData);
  if (!category) {
    const visibleText = $("body").text().slice(0, 40_000); // sample
    category = guessCategoryFromText(visibleText) || null;
  }

  return {
    name: brandName,
    logo_url:
      chosenLogoUrl ||
      (logoCandidates.length > 0 ? logoCandidates[0] : undefined),
    primary_colors: primaryColors.length > 0 ? primaryColors : undefined,
    category: category || undefined,
  };
}

function extractBrandName($: cheerio.CheerioAPI): string | undefined {
  const title = $("title").first().text().trim() || null;

  // collect meta tags
  const meta: Record<string, string> = {};
  $("meta").each((i, el) => {
    const name = $(el).attr("name") || $(el).attr("property") || "";
    const content = $(el).attr("content") || "";
    if (name && content) meta[name] = content;
  });

  // Heuristic brand name: og:site_name > meta[name="application-name"] > title
  return (
    meta["og:site_name"] ||
    meta["application-name"] ||
    meta["og:title"] ||
    title ||
    undefined
  );
}

function extractLogoCandidates(
  $: cheerio.CheerioAPI,
  baseUrl: string,
): string[] {
  const candidates = new Set<string>();

  // Common meta tags
  const ogImage = $('meta[property="og:image"]').attr("content");
  if (ogImage) candidates.add(absoluteUrl(baseUrl, ogImage));

  const twitterImage = $('meta[name="twitter:image"]').attr("content");
  if (twitterImage) candidates.add(absoluteUrl(baseUrl, twitterImage));

  // Schema.org / JSON-LD
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      const json = JSON.parse($(el).html() || "{}");
      const maybeLogo = (json?.logo ?? json?.image) as
        | string
        | { url?: string }
        | undefined;
      if (typeof maybeLogo === "string")
        candidates.add(absoluteUrl(baseUrl, maybeLogo));
      if (maybeLogo && typeof maybeLogo === "object" && maybeLogo.url)
        candidates.add(absoluteUrl(baseUrl, maybeLogo.url));
    } catch {
      // ignore parse errors
    }
  });

  // Link rel=icon / apple-touch-icon
  $(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]',
  ).each((i, el) => {
    const href = $(el).attr("href");
    if (href) candidates.add(absoluteUrl(baseUrl, href));
  });

  // Images with "logo" in alt/src/id/class
  $("img").each((i, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || "";
    const alt = ($(el).attr("alt") || "").toLowerCase();
    const id = ($(el).attr("id") || "").toLowerCase();
    const cls = ($(el).attr("class") || "").toLowerCase();
    const srcLower = src.toLowerCase();
    if (/logo|brand|mark/.test(alt + id + cls + srcLower)) {
      if (src) candidates.add(absoluteUrl(baseUrl, src));
    }
  });

  // Try common filenames (logo.svg, logo.png, /assets/logo.*)
  const potentialPaths = [
    "/logo.svg",
    "/logo.png",
    "/assets/logo.svg",
    "/assets/logo.png",
    "/images/logo.png",
    "/images/logo.svg",
  ];
  for (const p of potentialPaths) {
    candidates.add(absoluteUrl(baseUrl, p));
  }

  // If no candidates, try to find a large hero image
  if (candidates.size === 0) {
    const imgs: { src: string; w?: number; h?: number }[] = [];
    $("img").each((i, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src") || "";
      if (!src) return;
      const w = parseInt($(el).attr("width") || "") || undefined;
      const h = parseInt($(el).attr("height") || "") || undefined;
      imgs.push({ src: absoluteUrl(baseUrl, src), w, h });
    });
    // choose largest by width*height or fallback to first few
    imgs.sort((a, b) => (b.w || 0) * (b.h || 0) - (a.w || 0) * (a.h || 0));
    for (let i = 0; i < Math.min(3, imgs.length); i++) {
      const src = imgs[i]?.src;
      if (src) candidates.add(src);
    }
  }

  return Array.from(candidates);
}

async function getPalette(
  $: cheerio.CheerioAPI,
  logoCandidates: string[],
): Promise<{
  primaryColors: string[];
  chosenLogoUrl: string | undefined;
}> {
  // fetch palette by trying candidates in order
  let primaryColors: string[] = [];
  let chosenLogoUrl: string | undefined;
  for (const c of logoCandidates) {
    const buf = await fetchImageBuffer(c);
    if (!buf) continue;
    const colors = await extractPaletteFromImageBuffer(buf, 6);
    if (colors.length > 0) {
      primaryColors = colors;
      chosenLogoUrl = c;
      break;
    }
  }

  // fallback: try to sample CSS variables / inline style colors
  if (primaryColors.length === 0) {
    // very rough heuristic: look for CSS color hex codes in style tags or inline CSS
    const cssText =
      $("style")
        .map((i, el) => $(el).html())
        .get()
        .join("\n") +
      "\n" +
      $("[style]")
        .map((i, el) => $(el).attr("style"))
        .get()
        .join("\n");
    const hexes = Array.from(
      new Set(
        (cssText.match(/#([0-9a-f]{3,6})\b/gi) || []).map((s) => {
          const h = s.startsWith("#") ? s : `#${s}`;
          // normalize 3-digit hex to 6-digit
          if (h.length === 4)
            return "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
          return h;
        }),
      ),
    );
    if (hexes.length) primaryColors = hexes.slice(0, 6);
  }

  return { primaryColors, chosenLogoUrl };
}

async function extractPaletteFromImageBuffer(
  buf: Buffer,
  maxColors = 6,
): Promise<string[]> {
  try {
    const vi = Vibrant.from(buf);
    const palette = await vi.getPalette();
    const colors: string[] = [];
    // palette.swatches() returns swatches; map them to hex
    for (const swatch of Object.values(palette)) {
      if (swatch && swatch.hex) colors.push(swatch.hex);
    }
    // unique & filter
    return Array.from(new Set(colors)).slice(0, maxColors);
  } catch (e) {
    // fallback: return empty
    return [];
  }
}

function extractCategoryFromStructuredData(structuredData: any): string | null {
  // Look for schema.org/Organization or LocalBusiness and use @type or sameAs keywords
  if (!structuredData) return null;
  // Accept both object and array
  const arr = Array.isArray(structuredData) ? structuredData : [structuredData];
  for (const item of arr) {
    if (!item || typeof item !== "object") continue;
    const t = item["@type"] || item["type"] || "";
    if (typeof t === "string") {
      // common business types: Restaurant, LocalBusiness, ClothingStore, FoodEstablishment
      if (/restaurant|food|cafe|bakery/i.test(t)) return "food";
      if (/clothing|fashion|apparel|clothingstore/i.test(t)) return "fashion";
      if (/hotel|lodging/i.test(t)) return "hospitality";
      if (/store|storefront|localbusiness|retail/i.test(t)) return "retail";
      if (/organization|company|brand/i.test(t)) return "company";
      // else fallback to lowercase of type
      return t.toLowerCase();
    }
  }
  return null;
}

function guessCategoryFromText(text: string): string | null {
  const t = text.toLowerCase();
  if (/restaurant|burger|cafe|coffee|bakery|menu|dine|chef|food/i.test(t))
    return "food";
  if (
    /fashion|collection|runway|atelier|apparel|clothing|style|lookbook/i.test(t)
  )
    return "fashion";
  if (/tech|software|app|platform|SaaS|developer|product/i.test(t))
    return "technology";
  if (/hotel|resort|stay|bed and breakfast|bnb/i.test(t)) return "hospitality";
  if (/store|shop|retail|boutique|ecommerce|e-commerce/i.test(t))
    return "retail";
  if (/financial|bank|invest|wealth|asset/i.test(t)) return "finance";
  return null;
}
