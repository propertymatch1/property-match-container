import * as React from "react";
import { cn } from "~/lib/utils";

const variantStyles = {
  default: "max-w-7xl", // 1280px - content pages
  narrow: "max-w-sm",   // 384px - auth forms
  wide: "max-w-full",   // full-width sections
} as const;

interface PageContainerProps {
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
  className?: string;
}

/**
 * PageContainer provides consistent page-level layout with responsive padding and max-width.
 * 
 * Variants:
 * - default: max-w-7xl (1280px) - for content pages
 * - narrow: max-w-sm (384px) - for auth forms
 * - wide: max-w-full - for full-width sections
 */
function PageContainer({
  children,
  variant = "default",
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export { PageContainer };
export type { PageContainerProps };
