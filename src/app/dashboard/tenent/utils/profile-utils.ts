import { Building2, MapPin, DollarSign, Calendar, type LucideIcon } from "lucide-react";
import type { TenantProfile } from "../hooks/use-tenant-profile";

/**
 * Interface for quick stat display components
 */
export interface QuickStat {
  id: string;
  label: string;
  value: string | number | null;
  icon: LucideIcon;
  color: 'sage' | 'gold' | 'purple' | 'blue';
}

/**
 * Extracts 4 key metrics from TenantProfile for quick stats display
 * 
 * Returns an array of QuickStat objects containing:
 * - Business stage (tennentExperience)
 * - Target cities count (cityNext.length)
 * - Monthly rent budget (rentRangeDesire)
 * - Next opening timeline (whenNextOpen)
 * 
 * Requirements: 3.2
 * 
 * @param profile - The tenant profile data
 * @returns Array of exactly 4 QuickStat objects
 */
export function extractQuickStats(profile: TenantProfile): QuickStat[] {
  return [
    {
      id: 'stage',
      label: 'Business Stage',
      value: profile.tennentExperience || null,
      icon: Building2,
      color: 'sage',
    },
    {
      id: 'cities',
      label: 'Target Cities',
      value: profile.cityNext?.length || null,
      icon: MapPin,
      color: 'purple',
    },
    {
      id: 'budget',
      label: 'Monthly Budget',
      value: profile.rentRangeDesire 
        ? `$${profile.rentRangeDesire.toLocaleString()}`
        : null,
      icon: DollarSign,
      color: 'gold',
    },
    {
      id: 'timeline',
      label: 'Next Opening',
      value: profile.whenNextOpen || null,
      icon: Calendar,
      color: 'blue',
    },
  ];
}

/**
 * Interface for profile field configuration with completion logic
 */
export interface ProfileField {
  key: keyof TenantProfile;
  label: string;
  weight: number; // 1-3, higher = more important
  isComplete: (value: unknown) => boolean;
}

/**
 * Configuration for profile fields with weights and completion logic
 * 
 * Weight system:
 * - 3: Critical fields (brand name, industry, rent budget, target cities)
 * - 2: Important fields (logo, target customers, opening timeline)
 * - 1: Nice-to-have fields (keywords, brand story, customer spend)
 */
export const PROFILE_FIELDS: ProfileField[] = [
  { key: 'brandName', label: 'Brand Name', weight: 3, isComplete: (v) => !!v },
  { key: 'logoUrl', label: 'Logo', weight: 2, isComplete: (v) => !!v },
  { key: 'industry', label: 'Industry', weight: 3, isComplete: (v) => !!v },
  { key: 'brandKeywords', label: 'Brand Keywords', weight: 1, isComplete: (v) => Array.isArray(v) && v.length > 0 },
  { key: 'typcialCustomer', label: 'Target Customers', weight: 2, isComplete: (v) => Array.isArray(v) && v.length > 0 },
  { key: 'typcialCustomerSpend', label: 'Customer Spend', weight: 1, isComplete: (v) => !!v },
  { key: 'rentRangeDesire', label: 'Rent Budget', weight: 3, isComplete: (v) => typeof v === 'number' && v > 0 },
  { key: 'cityNext', label: 'Target Cities', weight: 3, isComplete: (v) => Array.isArray(v) && v.length > 0 },
  { key: 'whenNextOpen', label: 'Opening Timeline', weight: 2, isComplete: (v) => !!v },
  { key: 'notes', label: 'Brand Story', weight: 1, isComplete: (v) => !!v },
];

/**
 * Interface for profile completeness calculation result
 */
export interface ProfileCompleteness {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields: string[];
}

/**
 * Calculates profile completeness using weighted field completion
 * 
 * Uses a weighted scoring system where critical fields (weight 3) contribute
 * more to the overall percentage than nice-to-have fields (weight 1).
 * 
 * Formula: (sum of weights for complete fields / sum of all field weights) × 100
 * 
 * Requirements: 7.2, 7.3
 * 
 * @param profile - The tenant profile data
 * @returns ProfileCompleteness object with percentage, counts, and missing field labels
 */
export function calculateCompleteness(profile: TenantProfile): ProfileCompleteness {
  let totalWeight = 0;
  let completedWeight = 0;
  const missingFields: string[] = [];

  for (const field of PROFILE_FIELDS) {
    totalWeight += field.weight;
    if (field.isComplete(profile[field.key])) {
      completedWeight += field.weight;
    } else {
      missingFields.push(field.label);
    }
  }

  return {
    percentage: Math.round((completedWeight / totalWeight) * 100),
    completedFields: PROFILE_FIELDS.filter(f => f.isComplete(profile[f.key])).length,
    totalFields: PROFILE_FIELDS.length,
    missingFields,
  };
}