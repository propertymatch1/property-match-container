import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";

/**
 * Lightweight custom error classes so callers can throw meaningful errors
 * and the handler can map them to appropriate HTTP responses.
 */
export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

export async function requireTenantUser(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    throw new UnauthorizedError("Unauthorized");
  }

  const user = session.user;
  if (user.userType !== "TENANT") {
    throw new ForbiddenError(
      "Forbidden - Only tenant users can access this resource",
    );
  }

  return user;
}

export function handleAPIError(error: unknown) {
  // Log has already happened in caller; here return a sanitized response.
  if (error instanceof UnauthorizedError) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  if (error instanceof ForbiddenError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 403 },
    );
  }

  const message = error instanceof Error ? error.message : String(error);

  // Database connection errors
  if (
    message.includes("Can't reach database server") ||
    message.includes("Connection refused") ||
    message.includes("ECONNREFUSED")
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed. Please try again later.",
      },
      { status: 503 },
    );
  }

  // Timeout errors
  if (message.includes("timeout") || message.includes("ETIMEDOUT")) {
    return NextResponse.json(
      { success: false, error: "Request timeout. Please try again." },
      { status: 408 },
    );
  }

  // Fallback generic server error
  return NextResponse.json(
    { success: false, error: "Internal server error" },
    { status: 500 },
  );
}
