"use client";

import * as React from "react";
import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { cn } from "~/lib/utils";
import { calculateCompleteness, type ProfileCompleteness } from "../utils/profile-utils";
import type { TenantProfile } from "../hooks/use-tenant-profile";

interface ProfileCompletenessBarProps {
  profile: TenantProfile;
  className?: string;
}

/**
 * ProfileCompletenessBar component displays profile completion progress.
 * 
 * Features:
 * - Renders progress bar with percentage
 * - Displays missing field suggestions when incomplete
 * - Shows "Complete" badge when 100%
 * - Uses calculateCompleteness function for weighted scoring
 * - Responsive design with consistent styling
 * 
 * Requirements: 7.1, 7.4, 7.5
 */
export default function ProfileCompletenessBar({ 
  profile, 
  className 
}: ProfileCompletenessBarProps) {
  const completeness = React.useMemo(() => 
    calculateCompleteness(profile), 
    [profile]
  );

  const isComplete = completeness.percentage === 100;
  const progressColor = isComplete 
    ? "var(--sage-500, #6b7c6e)" 
    : completeness.percentage >= 75 
      ? "var(--gold-500, #d4a574)" 
      : "var(--warm-400, #a8a29e)";

  return (
    <div
      className={cn(
        "card-elevated p-6",
        className
      )}
      style={{ borderRadius: "var(--radius-2xl, 1.5rem)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{
              backgroundColor: isComplete 
                ? "color-mix(in srgb, var(--sage-500) 15%, transparent)"
                : "color-mix(in srgb, var(--gold-500) 15%, transparent)",
              color: isComplete ? "var(--sage-500)" : "var(--gold-500)",
              borderRadius: "var(--radius-lg, 0.75rem)",
            }}
          >
            {isComplete ? (
              <CheckCircle size={20} />
            ) : (
              <TrendingUp size={20} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--warm-800,#2D2D2D)]">
              Profile Completeness
            </h3>
            <p className="text-sm text-[var(--warm-500,#78716c)]">
              {completeness.completedFields} of {completeness.totalFields} fields completed
            </p>
          </div>
        </div>

        {/* Percentage Badge */}
        {isComplete ? (
          <div
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "var(--sage-100, #e3e7e4)",
              color: "var(--sage-700, #454f47)",
              borderRadius: "var(--radius-full, 9999px)",
            }}
          >
            Complete
          </div>
        ) : (
          <div
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "var(--gold-100, #f5f1eb)",
              color: "var(--gold-700, #9c6d3a)",
              borderRadius: "var(--radius-full, 9999px)",
            }}
          >
            {completeness.percentage}%
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{
            backgroundColor: "var(--warm-100, #f5f4f0)",
            borderRadius: "var(--radius-full, 9999px)",
          }}
        >
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${completeness.percentage}%`,
              backgroundColor: progressColor,
              borderRadius: "var(--radius-full, 9999px)",
            }}
          />
        </div>
      </div>

      {/* Missing Fields Suggestions */}
      {!isComplete && completeness.missingFields.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle 
              size={16} 
              className="text-[var(--gold-500,#d4a574)] flex-shrink-0" 
            />
            <p className="text-sm font-medium text-[var(--warm-700,#44403c)]">
              Complete these fields to improve your profile:
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {completeness.missingFields.slice(0, 6).map((field) => (
              <span
                key={field}
                className="px-2 py-1 text-xs font-medium rounded-md"
                style={{
                  backgroundColor: "var(--warm-100, #f5f4f0)",
                  color: "var(--warm-600, #57534e)",
                  borderRadius: "var(--radius-md, 0.5rem)",
                }}
              >
                {field}
              </span>
            ))}
            {completeness.missingFields.length > 6 && (
              <span
                className="px-2 py-1 text-xs font-medium rounded-md"
                style={{
                  backgroundColor: "var(--warm-200, #e7e5e4)",
                  color: "var(--warm-600, #57534e)",
                  borderRadius: "var(--radius-md, 0.5rem)",
                }}
              >
                +{completeness.missingFields.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Complete State Message */}
      {isComplete && (
        <div className="flex items-center gap-2 pt-2">
          <CheckCircle 
            size={16} 
            className="text-[var(--sage-500,#6b7c6e)] flex-shrink-0" 
          />
          <p className="text-sm text-[var(--sage-700,#454f47)]">
            Your profile is complete! This helps landlords understand your business better.
          </p>
        </div>
      )}
    </div>
  );
}

// Export as named export as well for flexibility
export { ProfileCompletenessBar };