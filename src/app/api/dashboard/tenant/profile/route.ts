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
