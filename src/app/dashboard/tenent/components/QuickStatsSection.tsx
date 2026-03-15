"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import StatCard from "./StatCard";
import type { QuickStat } from "../utils/profile-utils";

interface QuickStatsSectionProps {
  stats: QuickStat[];
}

/**
 * QuickStatsSection component displays key metrics in a horizontal layout.
 *
 * Features:
 * - Renders StatCard array in horizontal layout
 * - Horizontal scroll with snap points on mobile
 * - Grid layout on desktop (4 columns)
 * - Responsive design with proper spacing
 * - Handles empty stats gracefully
 *
 * Requirements: 3.1, 3.4
 */
export default function QuickStatsSection({ stats }: QuickStatsSectionProps) {
  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <section className="w-full" aria-label="Quick Statistics">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-warm-800 text-lg font-semibold">Quick Overview</h2>
        <p className="text-warm-600 mt-1 text-sm">Key metrics at a glance</p>
      </div>

      {/* Stats Container */}
      <div
        className={cn(
          // Mobile: horizontal scroll with snap points
          "scrollbar-hide flex gap-4 overflow-x-auto",
          "snap-x snap-mandatory",
          "pb-2", // Space for scroll indicator
          // Desktop: grid layout
          "md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible",
          "lg:grid-cols-4 lg:gap-4",
          // Smooth scrolling
          "scroll-smooth",
        )}
        style={{
          // Custom scrollbar styling for webkit browsers
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={cn(
              // Mobile: snap point and min width
              "flex-shrink-0 snap-start",
              "min-w-[280px]", // Ensures cards are wide enough on mobile
              // Desktop: full width within grid
              "md:w-full md:min-w-0",
            )}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicator for Mobile */}
      <div className="mt-3 flex justify-center md:hidden">
        <div className="flex gap-1">
          {stats.map((_, index) => (
            <div
              key={index}
              className="bg-warm-300 h-2 w-2 rounded-full"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Export as named export as well for flexibility
export { QuickStatsSection };
