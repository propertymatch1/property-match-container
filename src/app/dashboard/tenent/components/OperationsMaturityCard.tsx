"use client";

import * as React from "react";
import { Building2, Users, Award, CheckCircle } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Badge } from "~/components/ui/badge";

type TenantMode = "FOUNDER" | "BRAND";

interface OperationsMaturityCardProps {
  tennentExperience: string | null;
  spaceLooking: string[];
  mode: TenantMode;
}

// Icon sizes standardized to design system: 16px (small), 20px (standard), 24px (large)
const ICON_SIZE = {
  small: 16,
  standard: 20,
  large: 24,
} as const;

const stageConfig: Record<
  string,
  { color: string; progress: number }
> = {
  "Pre-launch": { color: "bg-amber-100 text-amber-800", progress: 20 },
  "First Location": { color: "bg-blue-100 text-blue-800", progress: 40 },
  "2-3 Locations": { color: "bg-purple-100 text-purple-800", progress: 60 },
  "4-10 Locations": { color: "bg-emerald-100 text-emerald-800", progress: 80 },
  "10+ Locations": { color: "bg-rose-100 text-rose-800", progress: 100 },
};

// Infer operational strengths from available data
const inferOperationalStrengths = (
  experience: string | null,
  spaceTypes: string[],
  mode: TenantMode
): string[] => {
  const strengths: string[] = [];

  if (experience && experience.includes("10+")) {
    strengths.push("Proven track record", "Multi-location expertise");
  } else if (experience && experience.includes("4-10")) {
    strengths.push("Growth experience", "Operational systems");
  } else if (experience && experience.includes("2-3")) {
    strengths.push("Expansion ready", "Scaling operations");
  }

  if (mode === "BRAND") {
    strengths.push("Professional team");
  } else {
    strengths.push("Founder-led");
  }

  if (spaceTypes.length > 1) {
    strengths.push("Flexible space needs");
  }

  // Default strengths if none inferred
  if (strengths.length === 0) {
    strengths.push("Growing business", "Committed team");
  }

  return strengths;
};

export function OperationsMaturityCard({
  tennentExperience,
  spaceLooking,
  mode,
}: OperationsMaturityCardProps) {
  // Generate preview text
  const getPreview = () => {
    const parts: string[] = [];
    if (tennentExperience) {
      parts.push(tennentExperience);
    }
    const teamType = mode === "FOUNDER" ? "Founder-led" : "Professional team";
    parts.push(teamType);
    return parts.join(" • ");
  };

  const businessStage = tennentExperience || "First Location";
  const stageInfo =
    stageConfig[businessStage] || stageConfig["First Location"]!;
  const teamType =
    mode === "FOUNDER"
      ? "Founder-led operations"
      : "Professional operations team";

  // Generate leasing experience description
  const getLeasingExperience = () => {
    if (tennentExperience?.includes("10+")) {
      return "Extensive commercial leasing experience with multiple successful negotiations";
    } else if (tennentExperience?.includes("4-10")) {
      return "Experienced in commercial leasing with proven track record";
    } else if (tennentExperience?.includes("2-3")) {
      return "Growing leasing experience with multiple locations";
    } else {
      return "Building commercial leasing experience";
    }
  };

  const operationalStrengths = inferOperationalStrengths(
    tennentExperience,
    spaceLooking,
    mode
  );

  return (
    <CollapsibleSection
      title="Operations & Maturity"
      icon={Building2}
      preview={getPreview()}
      defaultOpen={false}
      accentColor="#4A90A4"
    >
      <div className="space-y-[var(--space-6,1.5rem)]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4,1rem)]">
          {/* Business Stage */}
          <div 
            className="bg-[var(--warm-50,#fafaf9)] p-[var(--space-4,1rem)]"
            style={{ borderRadius: "var(--radius-xl, 1rem)" }}
          >
            <div className="flex items-center gap-[var(--space-2,0.5rem)] mb-[var(--space-3,0.75rem)]">
              <Building2 size={ICON_SIZE.small} className="text-[var(--warm-400,#a8a29e)]" />
              <span className="text-sm text-[var(--warm-500,#78716c)]">Business Stage</span>
            </div>
            <Badge
              className={`${stageInfo.color} text-sm px-3 py-1.5 rounded-full`}
            >
              {businessStage}
            </Badge>
            {/* Progress bar */}
            <div 
              className="mt-[var(--space-3,0.75rem)] h-1.5 bg-[var(--warm-200,#e7e5e4)] overflow-hidden"
              style={{ borderRadius: "var(--radius-full, 9999px)" }}
            >
              <div
                className="h-full bg-[var(--sage-500,#6b7c6e)]"
                style={{ 
                  width: `${stageInfo.progress}%`,
                  borderRadius: "var(--radius-full, 9999px)",
                  transition: "width var(--transition-slow, 500ms ease)"
                }}
              />
            </div>
          </div>

          {/* Team Type */}
          <div 
            className="bg-[var(--warm-50,#fafaf9)] p-[var(--space-4,1rem)]"
            style={{ borderRadius: "var(--radius-xl, 1rem)" }}
          >
            <div className="flex items-center gap-[var(--space-2,0.5rem)] mb-[var(--space-3,0.75rem)]">
              <Users size={ICON_SIZE.small} className="text-[var(--warm-400,#a8a29e)]" />
              <span className="text-sm text-[var(--warm-500,#78716c)]">Team Structure</span>
            </div>
            <p className="text-lg font-semibold text-[var(--warm-800,#292524)]">{teamType}</p>
          </div>
        </div>

        {/* Leasing Experience */}
        <div 
          className="bg-gradient-to-r from-[var(--sage-100,#e3e7e4)]/50 to-[var(--sage-100,#e3e7e4)]/30 p-[var(--space-4,1rem)] sm:p-[var(--space-5,1.25rem)]"
          style={{ borderRadius: "var(--radius-xl, 1rem)" }}
        >
          <div className="flex items-start gap-[var(--space-3,0.75rem)]">
            <div 
              className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[var(--sage-200,#c7d0c9)]"
              style={{ borderRadius: "var(--radius-full, 9999px)" }}
            >
              <Award size={ICON_SIZE.standard} className="text-[var(--sage-600,#556259)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--warm-500,#78716c)] mb-1">
                Commercial Leasing Experience
              </p>
              <p className="text-base font-medium text-[var(--warm-800,#292524)]">
                {getLeasingExperience()}
              </p>
            </div>
          </div>
        </div>

        {/* Operational Strengths */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide mb-[var(--space-3,0.75rem)]">
            Operational Strengths
          </h4>
          <div className="flex flex-wrap gap-[var(--space-2,0.5rem)]">
            {operationalStrengths.map((strength, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white border-[var(--sage-200,#c7d0c9)] text-[var(--warm-800,#292524)] px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 transition-colors"
                style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
              >
                <CheckCircle size={12} className="text-[var(--sage-500,#6b7c6e)]" />
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        {/* Space Types (if available) */}
        {spaceLooking.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide mb-[var(--space-3,0.75rem)]">
              Space Types
            </h4>
            <div className="flex flex-wrap gap-[var(--space-2,0.5rem)]">
              {spaceLooking.map((spaceType, index) => (
                <Badge
                  key={index}
                  className="bg-sky-50 text-sky-700 hover:bg-sky-100 px-3 py-1.5 text-sm rounded-full transition-colors"
                  style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
                >
                  {spaceType}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
