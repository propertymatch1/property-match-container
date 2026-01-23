import * as React from "react";
import { cn } from "~/lib/utils";

const backgroundStyles = {
  white: "bg-white",
  muted: "bg-[var(--warm-100)]",
  sage: "bg-[var(--sage-50)]",
  gradient: "bg-gradient-to-br from-[var(--warm-50)] via-[var(--sage-50)] to-[var(--warm-100)]",
} as const;

const spacingStyles = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 md:py-20",
  lg: "py-16 sm:py-20 md:py-24 lg:py-32",
} as const;

interface SectionContainerProps {
  children: React.ReactNode;
  background?: keyof typeof backgroundStyles;
  spacing?: keyof typeof spacingStyles;
  className?: string;
  as?: "section" | "div";
}

/**
 * SectionContainer provides consistent section spacing and optional background styling.
 * 
 * Background variants:
 * - white: Pure white background
 * - muted: Warm neutral background (warm-100)
 * - sage: Sage green tinted background (sage-50)
 * - gradient: Gradient from warm-50 through sage-50 to warm-100
 * 
 * Spacing variants:
 * - sm: Compact spacing for smaller sections
 * - md: Standard spacing for most sections
 * - lg: Generous spacing for hero/CTA sections
 */
function SectionContainer({
  children,
  background = "white",
  spacing = "md",
  className,
  as: Component = "section",
}: SectionContainerProps) {
  return (
    <Component
      className={cn(
        backgroundStyles[background],
        spacingStyles[spacing],
        className
      )}
    >
      {children}
    </Component>
  );
}

export { SectionContainer };
export type { SectionContainerProps };
