import { NextResponse } from "next/server";
import { parseURL } from "~/server/link_parse/parser";

export async function GET(request: Request) {
  try {
    const reqUrl = new URL(request.url);
    const urlParam = reqUrl.searchParams.get("url");

    if (!urlParam) {
      return NextResponse.json(
        { success: false, error: "Missing 'url' query parameter" },
        { status: 400 },
      );
    }

    // Basic validation of the provided URL
    try {
      // This throws if not a valid URL
      new URL(urlParam);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid URL provided" },
        { status: 400 },
      );
    }

    const parsed = await parseURL(urlParam);

    return NextResponse.json({ success: true, parsed });
  } catch (error) {
    console.error("Error parsing URL:", error);
    return NextResponse.json(
      { success: false, error: "Error parsing URL" },
      { status: 500 },
    );
  }
}
