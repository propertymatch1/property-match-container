"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number | null;
  icon: LucideIcon;
  color: 'sage' | 'gold' | 'purple' | 'blue';
}

/**
 * StatCard component displays a compact metric with icon, label, and value.
 * 
 * Features:
 * - Renders icon, label, and value with color variants
 * - Displays "Not set" placeholder for null values
 * - Supports sage, gold, purple, and blue color themes
 * - Responsive design with consistent spacing
 * 
 * Requirements: 3.3, 3.5
 */
export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  // Color variant configurations
  const colorVariants = {
    sage: {
      background: "var(--sage-100, #e3e7e4)",
      iconBackground: "var(--sage-500, #6b7c6e)",
      iconColor: "white",
      textColor: "var(--sage-700, #454f47)",
      valueColor: "var(--sage-800, #3a413c)",
    },
    gold: {
      background: "var(--gold-300, #e4c5a4)",
      iconBackground: "var(--gold-600, #b4855a)",
      iconColor: "white",
      textColor: "var(--gold-600, #b4855a)",
      valueColor: "var(--warm-800, #2D2D2D)",
    },
    purple: {
      background: "rgb(250 245 255)", // purple-50
      iconBackground: "rgb(147 51 234)", // purple-600
      iconColor: "white",
      textColor: "rgb(126 34 206)", // purple-700
      valueColor: "rgb(88 28 135)", // purple-800
    },
    blue: {
      background: "rgb(239 246 255)", // blue-50
      iconBackground: "rgb(37 99 235)", // blue-600
      iconColor: "white",
      textColor: "rgb(29 78 216)", // blue-700
      valueColor: "rgb(30 64 175)", // blue-800
    },
  };

  const variant = colorVariants[color];
  const displayValue = value === null || value === undefined ? "Not set" : value;
  const isPlaceholder = value === null || value === undefined;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl",
        "transition-all duration-200",
        "hover:shadow-sm hover:scale-[1.02]",
        "min-w-0 flex-shrink-0" // For horizontal scroll support
      )}
      style={{
        backgroundColor: variant.background,
        borderRadius: "var(--radius-xl, 1rem)",
      }}
    >
      {/* Icon */}
      <div
        className="p-2 rounded-lg flex-shrink-0"
        style={{
          backgroundColor: variant.iconBackground,
          color: variant.iconColor,
          borderRadius: "var(--radius-lg, 0.75rem)",
        }}
      >
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: variant.textColor }}
        >
          {label}
        </p>
        <p
          className={cn(
            "text-lg font-semibold truncate",
            isPlaceholder && "text-opacity-60 italic"
          )}
          style={{ 
            color: isPlaceholder ? variant.textColor : variant.valueColor,
            fontSize: "var(--text-lg, 1.125rem)",
            lineHeight: "var(--leading-tight, 1.25)",
          }}
        >
          {displayValue}
        </p>
      </div>
    </div>
  );
}

// Export as named export as well for flexibility
export { StatCard };