"use client";

import React, { createContext, useContext, useState } from "react";
import Link from "next/link";
import { useSession } from "./auth-client";
import type { User, Session } from "./auth-client";
import { isValidSession } from "./auth-utils";
import { Button } from "~/components/ui/button";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  // Role checking methods
  isTenant: boolean;
  isLandlord: boolean;
  // Utility methods
  hasRole: (role: "TENANT" | "LANDLORD") => boolean;
  canAccessTenantRoutes: boolean;
  canAccessLandlordRoutes: boolean;
  // Refresh session
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, isPending, error } = useSession();
  const [, setRefreshKey] = useState(0);

  const user = session?.user as User | null;
  const isAuthenticated = isValidSession(session as Session | null);
  const isTenant = user?.userType === "TENANT";
  const isLandlord = user?.userType === "LANDLORD";

  const hasRole = (role: "TENANT" | "LANDLORD") => user?.userType === role;
  const canAccessTenantRoutes = isAuthenticated && isTenant;
  const canAccessLandlordRoutes = isAuthenticated && isLandlord;

  const refreshSession = () => {
    setRefreshKey(prev => prev + 1);
  };

  const contextValue: AuthContextType = {
    user,
    session: session as Session | null,
    isLoading: isPending,
    isAuthenticated,
    error: error as Error | null,
    isTenant,
    isLandlord,
    hasRole,
    canAccessTenantRoutes,
    canAccessLandlordRoutes,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: "TENANT" | "LANDLORD"
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, hasRole } = useAuthContext();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--warm-50)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-[var(--warm-900)]">Authentication Required</h2>
            <p className="text-[var(--warm-600)] mb-6">Please sign in to access this page.</p>
            <Button variant="outline" asChild className="min-h-[44px]">
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      );
    }

    if (requiredRole && !hasRole(requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--warm-50)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-[var(--warm-900)]">Access Denied</h2>
            <p className="text-[var(--warm-600)] mb-6">
              You don&apos;t have permission to access this page.
            </p>
            <Button variant="outline" asChild className="min-h-[44px]">
              <Link href="/signin">Sign In with Different Account</Link>
            </Button>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}