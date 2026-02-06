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
        <h2 className="text-lg font-semibold text-warm-800">
          Quick Overview
        </h2>
        <p className="text-sm text-warm-600 mt-1">
          Key metrics at a glance
        </p>
      </div>

      {/* Stats Container */}
      <div
        className={cn(
          // Mobile: horizontal scroll with snap points
          "flex gap-4 overflow-x-auto scrollbar-hide",
          "snap-x snap-mandatory",
          "pb-2", // Space for scroll indicator
          // Desktop: grid layout
          "md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none",
          "lg:grid-cols-4 lg:gap-4",
          // Smooth scrolling
          "scroll-smooth"
        )}
        style={{
          // Custom scrollbar styling for webkit browsers
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={cn(
              // Mobile: snap point and min width
              "snap-start flex-shrink-0",
              "min-w-[280px]", // Ensures cards are wide enough on mobile
              // Desktop: full width within grid
              "md:min-w-0 md:w-full"
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
      <div className="flex justify-center mt-3 md:hidden">
        <div className="flex gap-1">
          {stats.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-warm-300"
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