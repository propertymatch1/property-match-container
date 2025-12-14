import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function GET(request: Request) {
  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = session.user;

    // Check if user has TENANT role
    if (user.userType !== "TENANT") {
      return NextResponse.json(
        { success: false, error: "Forbidden - Only tenant users can access this resource" },
        { status: 403 }
      );
    }

    // Query TenantProfile from database using Prisma
    const profile = await db.tenantProfile.findUnique({
      where: { userId: user.id },
    });

    // Return profile data (can be null if user hasn't completed onboarding)
    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching tenant profile:", error);

    // Handle specific database errors
    if (error instanceof Error) {
      // Handle database connection errors
      if (
        error.message.includes("Can't reach database server") ||
        error.message.includes("Connection refused") ||
        error.message.includes("ECONNREFUSED")
      ) {
        return NextResponse.json(
          { success: false, error: "Database connection failed. Please try again later." },
          { status: 503 }
        );
      }

      // Handle timeout errors
      if (error.message.includes("timeout") || error.message.includes("ETIMEDOUT")) {
        return NextResponse.json(
          { success: false, error: "Request timeout. Please try again." },
          { status: 408 }
        );
      }
    }

    // Generic server error
    return NextResponse.json(
      { success: false, error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
