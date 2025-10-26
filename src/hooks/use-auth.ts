import { useSession } from "~/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User, Session } from "~/lib/auth-client";
import { 
  isAuthenticated, 
  hasRole, 
  canAccessTenantRoutes, 
  canAccessLandlordRoutes,
  getRedirectPath 
} from "~/lib/auth-client";

export function useAuth() {
  const { data: session, isPending, error } = useSession();

  return {
    user: session?.user as User | null,
    session: session as Session | null,
    isLoading: isPending,
    isAuthenticated: isAuthenticated(session as Session | null),
    error,
    // Utility methods
    hasRole: (role: "TENANT" | "LANDLORD") => hasRole(session?.user as User | null, role),
    canAccessTenantRoutes: () => canAccessTenantRoutes(session as Session | null),
    canAccessLandlordRoutes: () => canAccessLandlordRoutes(session as Session | null),
    getRedirectPath: (isSignup?: boolean) => getRedirectPath(session?.user as User | null, isSignup),
  };
}

export function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push("/signin");
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);
  
  if (!auth.isAuthenticated && !auth.isLoading) {
    return null;
  }
  
  return auth;
}

export function useRoleGuard(requiredRole: "TENANT" | "LANDLORD") {
  const auth = useAuth();
  const router = useRouter();
  
  const userHasRole = auth.hasRole(requiredRole);
  const canAccess = auth.isAuthenticated && userHasRole;
  
  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        router.push("/signin");
      } else if (!userHasRole) {
        // Redirect to appropriate dashboard if user has wrong role
        const redirectPath = auth.getRedirectPath();
        router.push(redirectPath);
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, userHasRole, router, auth]);
  
  return {
    ...auth,
    hasRole: userHasRole,
    canAccess,
    requiredRole,
  };
}

// Hook for protecting tenant-only routes
export function useTenantGuard() {
  return useRoleGuard("TENANT");
}

// Hook for protecting landlord-only routes
export function useLandlordGuard() {
  return useRoleGuard("LANDLORD");
}

// Hook for handling authentication redirects after login/signup
export function useAuthRedirect() {
  const auth = useAuth();
  const router = useRouter();
  
  const redirectAfterAuth = (isSignup = false) => {
    if (auth.isAuthenticated && auth.user) {
      const redirectPath = auth.getRedirectPath(isSignup);
      router.push(redirectPath);
    }
  };
  
  return {
    redirectAfterAuth,
    isReady: !auth.isLoading,
  };
}