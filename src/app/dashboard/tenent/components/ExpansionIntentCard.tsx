"use client";

import * as React from "react";
import { Rocket, MapPin, Calendar, Maximize2 } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

interface ExpansionIntentCardProps {
  cityNext: string[];
  whenNextOpen: string | null;
  spaceNeed: number | null;
}

export function ExpansionIntentCard({
  cityNext,
  whenNextOpen,
  spaceNeed,
}: ExpansionIntentCardProps) {
  // Generate preview text
  const getPreview = () => {
    const parts: string[] = [];
    if (cityNext.length > 0) {
      parts.push(`${cityNext.join(", ")}`);
    }
    if (whenNextOpen) {
      parts.push(whenNextOpen);
    }
    if (spaceNeed) {
      parts.push(`${spaceNeed.toLocaleString()} sq ft`);
    }
    return parts.join(" • ");
  };

  // Calculate progress percentage for space size visualization (assuming max of 10,000 sq ft)
  const getSpaceProgress = (sqft: number) => {
    const maxSpace = 10000;
    return Math.min((sqft / maxSpace) * 100, 100);
  };

  return (
    <CollapsibleSection
      title="Expansion Intent"
      icon={Rocket}
      preview={getPreview()}
      defaultOpen={false}
      accentColor="#8B5CF6"
    >
      <div className="space-y-6">
        {/* Target Cities */}
        {cityNext.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#8B5CF6]" />
              <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                Target Cities
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {cityNext.map((city, index) => (
                <Badge
                  key={index}
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-4 py-2 text-sm rounded-full flex items-center gap-1"
                >
                  <MapPin size={14} />
                  {city}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-[#2D2D2D]/60">
              Geographic markets targeted for next location(s)
            </p>
          </div>
        )}

        {/* Timeline */}
        {whenNextOpen && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#8B5CF6]" />
              <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                Opening Timeline
              </h4>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-[#2D2D2D]">
                {whenNextOpen}
              </p>
              <p className="text-sm text-[#2D2D2D]/60 mt-1">
                Expected timeframe for next location
              </p>
            </div>
          </div>
        )}

        {/* Space Size */}
        {spaceNeed && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Maximize2 size={18} className="text-[#8B5CF6]" />
              <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                Desired Space Size
              </h4>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-4 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#2D2D2D]">
                  {spaceNeed.toLocaleString()}
                </span>
                <span className="text-sm text-[#2D2D2D]/60">square feet</span>
              </div>
              <Progress
                value={getSpaceProgress(spaceNeed)}
                className="h-2 bg-purple-100"
              />
              <p className="text-xs text-[#2D2D2D]/60">
                Required square footage for next location
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {cityNext.length === 0 && !whenNextOpen && !spaceNeed && (
          <p className="text-[#2D2D2D]/60 text-center py-4">
            No expansion plans specified yet.
          </p>
        )}
      </div>
    </CollapsibleSection>
  );
}
