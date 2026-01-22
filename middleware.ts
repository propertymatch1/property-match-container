import { NextRequest, NextResponse } from "next/server";

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

  // Check if route requires authentication
  const requiresAuth = AUTH_REQUIRED_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  // Check if route has specific role requirements
  const requiredRole = PROTECTED_ROUTES[pathname as keyof typeof PROTECTED_ROUTES];

  // Simple auth check using Better Auth session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");
  const isAuthenticated = !!sessionCookie;

  // Redirect unauthenticated users to signin
  if ((requiresAuth || requiredRole) && !isAuthenticated) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  // For role-based access, we'll handle it in the page components
  // since we can't easily verify roles without the full auth library
  // This keeps the middleware lightweight

  // Allow access if authenticated
  return NextResponse.next();
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