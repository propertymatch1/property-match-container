import * as React from "react";
import { cn } from "~/lib/utils";

const sizeStyles = {
  sm: {
    container: "gap-2",
    text: "text-xl sm:text-2xl",
    icon: "h-6 w-6 sm:h-7 sm:w-7",
  },
  md: {
    container: "gap-2 sm:gap-3",
    text: "text-xl sm:text-2xl",
    icon: "h-7 w-7 sm:h-8 sm:w-8",
  },
  lg: {
    container: "gap-3 sm:gap-4",
    text: "text-2xl sm:text-3xl md:text-4xl",
    icon: "h-8 w-8 sm:h-10 sm:w-10",
  },
} as const;

interface BrandHeaderProps {
  size?: keyof typeof sizeStyles;
  showIcon?: boolean;
  className?: string;
}

/**
 * BrandHeader displays the Identia brand logo/name with consistent Playfair Display typography.
 * 
 * Size variants:
 * - sm: Compact size for navigation bars
 * - md: Standard size for page headers
 * - lg: Large size for hero sections
 * 
 * The optional icon displays a decorative sage-colored circle accent.
 */
function BrandHeader({
  size = "md",
  showIcon = false,
  className,
}: BrandHeaderProps) {
  const styles = sizeStyles[size];

  return (
    <div className={cn("flex items-center", styles.container, className)}>
      {showIcon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--sage-500)] to-[var(--sage-600)] shadow-md",
            styles.icon
          )}
          aria-hidden="true"
        >
          <span className="font-[var(--font-playfair)] text-xs font-semibold text-white sm:text-sm">
            I
          </span>
        </div>
      )}
      <h1
        className={cn(
          "font-[var(--font-playfair)] font-semibold tracking-tight text-[var(--warm-900)]",
          styles.text
        )}
      >
        Identia
      </h1>
    </div>
  );
}

export { BrandHeader };
export type { BrandHeaderProps };
