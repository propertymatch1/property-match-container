import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { env } from "~/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Type exports for better TypeScript support
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

// Extended signup interface to include additional fields
export interface SignUpData {
  email: string;
  password: string;
  name: string;
  userType: "TENANT" | "LANDLORD";
}

// Utility functions for role-based access control
export const isAuthenticated = (session: Session | null): boolean => {
  return !!session?.user;
};

export const hasRole = (
  user: User | null,
  role: "TENANT" | "LANDLORD",
): boolean => {
  return user?.userType === role;
};

export const canAccessTenantRoutes = (session: Session | null) => {
  return isAuthenticated(session) && hasRole(session?.user ?? null, "TENANT");
};

export const canAccessLandlordRoutes = (session: Session | null) => {
  return isAuthenticated(session) && hasRole(session?.user ?? null, "LANDLORD");
};

export const getRedirectPath = (
  user: User | null,
  isSignup = false,
): string => {
  if (!user) return "/signin";

  const userType = user.userType;

  // If userType is undefined, we can't determine the correct path
  if (!userType) {
    console.warn("getRedirectPath - userType is undefined, cannot determine redirect path");
    return "/signin"; // Fallback to signin if we can't determine user type
  }

  if (isSignup) {
    // Redirect to onboarding after signup
    return userType === "TENANT"
      ? "/onboarding/tenent"
      : "/onboarding/landlord";
  } else {
    // Redirect to dashboard after signin
    return userType === "TENANT" ? "/dashboard/tenent" : "/dashboard/landlord";
  }
};

// Authentication error types
export interface AuthError {
  type: "VALIDATION" | "AUTHENTICATION" | "AUTHORIZATION" | "NETWORK";
  message: string;
  field?: string;
}

// Helper function to handle authentication errors
export const handleAuthError = (error: unknown): AuthError => {
  const errorMessage =
    error && typeof error === "object" && "message" in error
      ? String(error.message)
      : "An unexpected error occurred. Please try again.";

  if (errorMessage.includes("Invalid credentials")) {
    return {
      type: "AUTHENTICATION",
      message: "Invalid email or password. Please try again.",
    };
  }

  if (errorMessage.includes("User already exists")) {
    return {
      type: "VALIDATION",
      message: "An account with this email already exists.",
      field: "email",
    };
  }

  if (errorMessage.includes("Network")) {
    return {
      type: "NETWORK",
      message: "Network error. Please check your connection and try again.",
    };
  }

  return {
    type: "AUTHENTICATION",
    message: errorMessage,
  };
};
