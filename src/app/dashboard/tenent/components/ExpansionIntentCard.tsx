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

// Icon sizes standardized to design system: 16px (small), 20px (standard), 24px (large)
const ICON_SIZE = {
  small: 16,
  standard: 20,
  large: 24,
} as const;

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
      <div className="space-y-[var(--space-6,1.5rem)]">
        {/* Target Cities */}
        {cityNext.length > 0 && (
          <div className="space-y-[var(--space-3,0.75rem)]">
            <div className="flex items-center gap-[var(--space-2,0.5rem)]">
              <MapPin size={ICON_SIZE.standard} className="text-purple-500" />
              <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                Target Cities
              </h4>
            </div>
            <div className="flex flex-wrap gap-[var(--space-2,0.5rem)]">
              {cityNext.map((city, index) => (
                <Badge
                  key={index}
                  className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-4 py-2 text-sm rounded-full flex items-center gap-1 transition-colors"
                  style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
                >
                  <MapPin size={ICON_SIZE.small} />
                  {city}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-[var(--warm-500,#78716c)]">
              Geographic markets targeted for next location(s)
            </p>
          </div>
        )}

        {/* Timeline */}
        {whenNextOpen && (
          <div className="space-y-[var(--space-3,0.75rem)]">
            <div className="flex items-center gap-[var(--space-2,0.5rem)]">
              <Calendar size={ICON_SIZE.standard} className="text-purple-500" />
              <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                Opening Timeline
              </h4>
            </div>
            <div 
              className="bg-gradient-to-br from-purple-50 to-purple-50/50 p-[var(--space-4,1rem)]"
              style={{ borderRadius: "var(--radius-xl, 1rem)" }}
            >
              <p className="text-2xl font-bold text-[var(--warm-800,#292524)]">
                {whenNextOpen}
              </p>
              <p className="text-sm text-[var(--warm-500,#78716c)] mt-1">
                Expected timeframe for next location
              </p>
            </div>
          </div>
        )}

        {/* Space Size */}
        {spaceNeed && (
          <div className="space-y-[var(--space-3,0.75rem)]">
            <div className="flex items-center gap-[var(--space-2,0.5rem)]">
              <Maximize2 size={ICON_SIZE.standard} className="text-purple-500" />
              <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                Desired Space Size
              </h4>
            </div>
            <div 
              className="bg-gradient-to-br from-purple-50 to-purple-50/50 p-[var(--space-4,1rem)] space-y-[var(--space-3,0.75rem)]"
              style={{ borderRadius: "var(--radius-xl, 1rem)" }}
            >
              <div className="flex items-baseline gap-[var(--space-2,0.5rem)]">
                <span className="text-3xl font-bold text-[var(--warm-800,#292524)]">
                  {spaceNeed.toLocaleString()}
                </span>
                <span className="text-sm text-[var(--warm-500,#78716c)]">square feet</span>
              </div>
              <Progress
                value={getSpaceProgress(spaceNeed)}
                className="h-2 bg-purple-100"
              />
              <p className="text-xs text-[var(--warm-500,#78716c)]">
                Required square footage for next location
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {cityNext.length === 0 && !whenNextOpen && !spaceNeed && (
          <p className="text-[var(--warm-500,#78716c)] text-center py-[var(--space-4,1rem)]">
            No expansion plans specified yet.
          </p>
        )}
      </div>
    </CollapsibleSection>
  );
}
