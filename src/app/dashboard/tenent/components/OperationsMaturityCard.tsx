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
      <div className="space-y-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Business Stage */}
          <div className="bg-[#FAF9F7] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={16} className="text-[#2D2D2D]/40" />
              <span className="text-sm text-[#2D2D2D]/60">Business Stage</span>
            </div>
            <Badge
              className={`${stageInfo.color} text-sm px-3 py-1.5 rounded-full`}
            >
              {businessStage}
            </Badge>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-[#2D2D2D]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6B7B6B] rounded-full transition-all duration-500"
                style={{ width: `${stageInfo.progress}%` }}
              />
            </div>
          </div>

          {/* Team Type */}
          <div className="bg-[#FAF9F7] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-[#2D2D2D]/40" />
              <span className="text-sm text-[#2D2D2D]/60">Team Structure</span>
            </div>
            <p className="text-lg font-semibold text-[#2D2D2D]">{teamType}</p>
          </div>
        </div>

        {/* Leasing Experience */}
        <div className="bg-gradient-to-r from-[#6B7B6B]/5 to-[#6B7B6B]/10 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6B7B6B]/20 flex items-center justify-center flex-shrink-0">
              <Award size={18} className="text-[#6B7B6B]" />
            </div>
            <div>
              <p className="text-sm text-[#2D2D2D]/60 mb-1">
                Commercial Leasing Experience
              </p>
              <p className="text-base font-medium text-[#2D2D2D]">
                {getLeasingExperience()}
              </p>
            </div>
          </div>
        </div>

        {/* Operational Strengths */}
        <div>
          <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide mb-3">
            Operational Strengths
          </h4>
          <div className="flex flex-wrap gap-2">
            {operationalStrengths.map((strength, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white border-[#6B7B6B]/20 text-[#2D2D2D] px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5"
              >
                <CheckCircle size={12} className="text-[#6B7B6B]" />
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        {/* Space Types (if available) */}
        {spaceLooking.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide mb-3">
              Space Types
            </h4>
            <div className="flex flex-wrap gap-2">
              {spaceLooking.map((spaceType, index) => (
                <Badge
                  key={index}
                  className="bg-[#4A90A4]/10 text-[#4A90A4] hover:bg-[#4A90A4]/20 px-3 py-1.5 text-sm rounded-full"
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
