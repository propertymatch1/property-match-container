import type { User, Session } from "./auth-client";

// Route protection utilities
export const PROTECTED_ROUTES = {
  TENANT: ["/dashboard/tenent", "/onboarding/tenent"],
  LANDLORD: ["/dashboard/landlord", "/onboarding/landlord"],
  AUTHENTICATED: ["/dashboard", "/onboarding"],
} as const;

export const PUBLIC_ROUTES = ["/", "/signin", "/signup"] as const;

// Check if a route requires authentication
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.AUTHENTICATED.some(route => pathname.startsWith(route));
}

// Check if a route requires specific role
export function requiresRole(pathname: string): "TENANT" | "LANDLORD" | null {
  if (PROTECTED_ROUTES.TENANT.some(route => pathname.startsWith(route))) {
    return "TENANT";
  }
  if (PROTECTED_ROUTES.LANDLORD.some(route => pathname.startsWith(route))) {
    return "LANDLORD";
  }
  return null;
}

// Check if user can access a specific route
export function canAccessRoute(pathname: string, session: Session | null): boolean {
  // Public routes are always accessible
  if (PUBLIC_ROUTES.some(route => pathname === route)) {
    return true;
  }
  
  // Protected routes require authentication
  if (isProtectedRoute(pathname)) {
    if (!session?.user) {
      return false;
    }
    
    // Check role-specific access
    const requiredRole = requiresRole(pathname);
    if (requiredRole && session.user.userType !== requiredRole) {
      return false;
    }
  }
  
  return true;
}

// Get appropriate redirect path based on authentication state and target route
export function getAuthRedirect(
  pathname: string, 
  session: Session | null
): string | null {
  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute(pathname) && !session?.user) {
    return "/signin";
  }
  
  // If user is authenticated but accessing wrong role-specific route
  if (session?.user) {
    const requiredRole = requiresRole(pathname);
    if (requiredRole && session.user.userType !== requiredRole) {
      // Redirect to appropriate dashboard
      return session.user.userType === "TENANT" 
        ? "/dashboard/tenent" 
        : "/dashboard/landlord";
    }
  }
  
  return null;
}

// User type guards
export function isTenant(user: User | null): user is User & { userType: "TENANT" } {
  return user?.userType === "TENANT";
}

export function isLandlord(user: User | null): user is User & { userType: "LANDLORD" } {
  return user?.userType === "LANDLORD";
}

// Session validation utilities
export function isValidSession(session: Session | null): session is Session {
  return !!(session?.user?.id);
}

export function isSessionExpired(session: Session | null): boolean {
  if (!session) return true;
  
  // Better Auth handles session expiration internally
  // This is a placeholder for additional custom expiration logic if needed
  return false;
}

// Form validation helpers for authentication
export const AUTH_VALIDATION = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long",
    },
  },
  userType: {
    required: "Please select whether you are a tenant or landlord",
  },
} as const;

// Authentication error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
  USER_EXISTS: "An account with this email already exists.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNAUTHORIZED: "You are not authorized to access this page.",
  SESSION_EXPIRED: "Your session has expired. Please sign in again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const;

// Success messages
export const AUTH_SUCCESS = {
  SIGNUP_SUCCESS: "Account created successfully! Redirecting to onboarding...",
  SIGNIN_SUCCESS: "Welcome back! Redirecting to your dashboard...",
  SIGNOUT_SUCCESS: "You have been signed out successfully.",
} as const;