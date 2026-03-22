import { NextResponse, NextRequest } from "next/server";
import { db } from "~/server/db";
import { handleAPIError } from "~/lib/api/api_common_utils";
import { auth } from "~/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    const user = session?.user;

    // profile from user
    if (user) {
      const profile = await db.tenantProfile.findUnique({
        where: { userId: user.id },
      });
      return NextResponse.json({
        success: true,
        profile: profile ?? null,
      });
    }

    // parse cookies to support session_key lookup when no authenticated user
    const sessionKey = request.cookies.get("session_key")?.value;
    if (sessionKey) {
      const profile = await db.tenantProfile.findFirst({
        where: { sessionKey },
      });
      if (profile) {
        return NextResponse.json({
          success: true,
          profile,
        });
      }
    }

    // No user and no session_key -> explicit null profile
    return NextResponse.json({
      success: true,
      profile: null,
    });
  } catch (error) {
    console.error("Error fetching tenant profile:", error);
    return handleAPIError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    const user = session?.user;

    // parse cookies to support session_key lookup
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader
        .split(";")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => {
          const idx = c.indexOf("=");
          const k = idx >= 0 ? c.slice(0, idx) : c;
          const v = idx >= 0 ? c.slice(idx + 1) : "";
          return [k, decodeURIComponent(v)];
        }),
    ) as Record<string, string>;

    const sessionKey = cookies["session_key"] ?? cookies["sessionKey"] ?? null;

    // parse and validate body
    const body = await request.json().catch(() => ({}));
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const websiteUrl =
      body.websiteUrl === undefined || body.websiteUrl === null
        ? null
        : String(body.websiteUrl).trim();
    const brandStory =
      body.brandStory === undefined || body.brandStory === null
        ? null
        : String(body.brandStory).trim();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Invalid request: 'name' is required" },
        { status: 400 },
      );
    }

    let profile;

    if (user) {
      // upsert by unique userId
      profile = await db.tenantProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          brandName: name,
          websiteUrl: websiteUrl ?? null,
          brandStory: brandStory ?? null,
          session_key: sessionKey ?? null,
        },
        update: {
          brandName: name,
          websiteUrl: websiteUrl ?? null,
          brandStory: brandStory ?? null,
          // if cookie sessionKey provided, persist it
          ...(sessionKey ? { session_key: sessionKey } : {}),
        },
      });
    } else if (sessionKey) {
      // try to find by session_key; update if found otherwise create
      const existing = await db.tenantProfile.findFirst({
        where: { session_key: sessionKey },
      });
      if (existing) {
        profile = await db.tenantProfile.update({
          where: { id: existing.id },
          data: {
            brandName: name,
            websiteUrl: websiteUrl ?? null,
            brandStory: brandStory ?? null,
          },
        });
      } else {
        profile = await db.tenantProfile.create({
          data: {
            brandName: name,
            websiteUrl: websiteUrl ?? null,
            brandStory: brandStory ?? null,
            session_key: sessionKey,
          },
        });
      }
    } else {
      // no user and no session_key: create a standalone profile
      profile = await db.tenantProfile.create({
        data: {
          brandName: name,
          websiteUrl: websiteUrl ?? null,
          brandStory: brandStory ?? null,
        },
      });
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Error creating/updating tenant profile:", error);
    return handleAPIError(error);
  }
}

