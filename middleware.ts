import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  // Tenant-only routes
  "/dashboard/tenent": "TENANT",
  "/onboarding/tenent": "TENANT",
  // Landlord-only routes
  "/dashboard/landlord": "LANDLORD", 
  "/onboarding/landlord": "LANDLORD",
} as const;

// Routes that require authentication but no specific role
const AUTH_REQUIRED_ROUTES = [
  "/dashboard",
  "/onboarding",
];

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/signin",
  "/signup",
  "/api/auth",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes, static files, and API routes (except auth)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") && !pathname.startsWith("/api/auth") ||
    PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/"))
  ) {
    return NextResponse.next();
  }

  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const user = session?.user;
    const isAuthenticated = !!user;

    // Check if route requires authentication
    const requiresAuth = AUTH_REQUIRED_ROUTES.some(route => 
      pathname.startsWith(route)
    );

    // Check if route has specific role requirements
    const requiredRole = PROTECTED_ROUTES[pathname as keyof typeof PROTECTED_ROUTES];

    // Redirect unauthenticated users to signin
    if ((requiresAuth || requiredRole) && !isAuthenticated) {
      const signinUrl = new URL("/signin", request.url);
      signinUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Handle role-based access control
    if (requiredRole && isAuthenticated) {
      const userRole = user?.userType;

      // If user doesn't have the required role, redirect based on their actual role
      if (userRole !== requiredRole) {
        let redirectPath: string;

        if (userRole === "TENANT") {
          // Tenant trying to access landlord routes - redirect to tenant equivalent
          if (pathname.startsWith("/dashboard/landlord")) {
            redirectPath = "/dashboard/tenent";
          } else if (pathname.startsWith("/onboarding/landlord")) {
            redirectPath = "/onboarding/tenent";
          } else {
            redirectPath = "/dashboard/tenent";
          }
        } else if (userRole === "LANDLORD") {
          // Landlord trying to access tenant routes - redirect to landlord equivalent
          if (pathname.startsWith("/dashboard/tenent")) {
            redirectPath = "/dashboard/landlord";
          } else if (pathname.startsWith("/onboarding/tenent")) {
            redirectPath = "/onboarding/landlord";
          } else {
            redirectPath = "/dashboard/landlord";
          }
        } else {
          // Unknown role - redirect to signin
          redirectPath = "/signin";
        }

        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }

    // Allow access if all checks pass
    return NextResponse.next();

  } catch (error) {
    // If there's an error getting the session, redirect to signin
    console.error("Middleware auth error:", error);
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};