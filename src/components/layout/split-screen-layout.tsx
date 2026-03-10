import * as React from "react"
import { cn } from "~/lib/utils"

interface SplitScreenLayoutProps {
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  leftRatio?: number
  rightRatio?: number
  mobileStackOrder?: "left-first" | "right-first"
  className?: string
}

/**
 * SplitScreenLayout provides a two-column layout pattern with responsive stacking.
 * 
 * Features:
 * - Configurable width ratios for left and right sections
 * - Responsive stacking on mobile (below tablet breakpoint)
 * - Configurable mobile stack order
 * - Consistent padding using design tokens
 * 
 * @example
 * <SplitScreenLayout
 *   leftContent={<IllustrationContainer src="/onboarding-1.svg" />}
 *   rightContent={<OnboardingForm />}
 *   leftRatio={45}
 *   rightRatio={55}
 * />
 */
function SplitScreenLayout({
  leftContent,
  rightContent,
  leftRatio = 50,
  rightRatio = 50,
  mobileStackOrder = "left-first",
  className,
}: SplitScreenLayoutProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        // Mobile: stack vertically
        "flex-col",
        // Tablet and up: horizontal layout
        "md:flex-row",
        className
      )}
    >
      {/* Left Section */}
      <section
        aria-label="Visual content"
        className={cn(
          // Padding using design tokens
          "p-[var(--spacing-6)] md:p-[var(--spacing-8)] lg:p-[var(--spacing-12)]",
          // Mobile stack order
          mobileStackOrder === "left-first" ? "order-1" : "order-2",
          // Desktop: use flex-basis for width ratio
          "md:order-1"
        )}
        style={{
          flexBasis: `${leftRatio}%`,
        }}
      >
        {leftContent}
      </section>

      {/* Right Section */}
      <section
        aria-label="Main content"
        className={cn(
          // Padding using design tokens
          "p-[var(--spacing-6)] md:p-[var(--spacing-8)] lg:p-[var(--spacing-12)]",
          // Mobile stack order
          mobileStackOrder === "left-first" ? "order-2" : "order-1",
          // Desktop: use flex-basis for width ratio
          "md:order-2"
        )}
        style={{
          flexBasis: `${rightRatio}%`,
        }}
      >
        {rightContent}
      </section>
    </div>
  )
}

export { SplitScreenLayout }
export type { SplitScreenLayoutProps }
