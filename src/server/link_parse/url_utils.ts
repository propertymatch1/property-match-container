export async function fetchHTML(
  url: string,
): Promise<{ html: string; finalUrl: string }> {
  const resp = await fetch(url);
  const html = await resp.text();
  return { html, finalUrl: resp.url || url };
}

export function absoluteUrl(base: string, relative: string) {
  try {
    return new URL(relative, base).toString();
  } catch {
    return relative;
  }
}

export async function fetchImageBuffer(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (e) {
    return null;
  }
}
