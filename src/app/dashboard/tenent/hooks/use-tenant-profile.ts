"use client";

import { useState, useEffect, useCallback } from "react";

// Type definitions based on Prisma schema
export type TenantMode = "FOUNDER" | "BRAND";

export interface TenantProfile {
  id: string;
  mode: TenantMode;
  brandName: string | null;
  logoUrl: string | null;
  industry: string | null;
  brandKeywords: string[];
  cityNext: string[];
  notes: string | null;
  personalityTags: string[];
  rentRangeDesire: number | null;
  spaceLooking: string[];
  tennentExperience: string | null;
  toneTags: string[];
  typcialCustomer: string[];
  typcialCustomerSpend: string | null;
  whenNextOpen: string | null;
  spaceNeed: number | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface GetProfileResponse {
  success: boolean;
  profile: TenantProfile | null;
  error?: string;
}

interface UseTenantProfileReturn {
  profile: TenantProfile | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

/**
 * Custom hook for fetching tenant profile data
 * 
 * Handles:
 * - Data fetching with loading states
 * - Authentication errors (401, 403)
 * - Network and server errors
 * - Retry functionality
 * 
 * Requirements: 1.2, 1.3, 1.4
 */
export function useTenantProfile(): UseTenantProfileReturn {
  const [profile, setProfile] = useState<TenantProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboard/tenant/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
      });

      // Handle authentication errors
      if (response.status === 401) {
        setError("Authentication required. Please sign in again.");
        setProfile(null);
        setIsLoading(false);
        return;
      }

      if (response.status === 403) {
        setError("Access denied. Only tenant users can view this profile.");
        setProfile(null);
        setIsLoading(false);
        return;
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errorMessage = data.error || `Failed to fetch profile (${response.status})`;
        setError(errorMessage);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      // Parse successful response
      const data: GetProfileResponse = await response.json();

      if (data.success) {
        setProfile(data.profile);
        setError(null);
      } else {
        setError(data.error || "Failed to fetch profile");
        setProfile(null);
      }
    } catch (err) {
      // Handle network errors
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError("Network connection failed. Please check your internet connection.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Retry function that can be called manually
  const retry = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    retry,
  };
}
