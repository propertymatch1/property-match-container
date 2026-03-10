"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "~/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  currentStep?: number
  totalSteps?: number
  showLabel?: boolean
  variant?: "determinate" | "indeterminate"
  position?: "top" | "inline"
}

function Progress({
  className,
  value,
  currentStep,
  totalSteps,
  showLabel = false,
  variant = "determinate",
  position = "inline",
  ...props
}: ProgressProps) {
  const isIndeterminate = variant === "indeterminate"
  const progressValue = isIndeterminate ? undefined : value

  // Generate accessible label
  const ariaLabel = currentStep && totalSteps 
    ? `Step ${currentStep} of ${totalSteps}, ${Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% complete`
    : `${progressValue}% complete`

  return (
    <div
      className={cn(
        "w-full",
        position === "top" && "fixed top-0 left-0 right-0 z-50"
      )}
    >
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-2 w-full overflow-hidden bg-[var(--color-neutral-200)]",
          position === "top" ? "rounded-none" : "rounded-full",
          className
        )}
        value={progressValue}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressValue ?? undefined}
        role="progressbar"
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full w-full flex-1 bg-[var(--color-primary)]",
            "transition-transform duration-[var(--duration-normal)] ease-[var(--easing-default)]",
            isIndeterminate && "animate-indeterminate"
          )}
          style={
            isIndeterminate
              ? undefined
              : { transform: `translateX(-${100 - (progressValue || 0)}%)` }
          }
        />
      </ProgressPrimitive.Root>
      
      {showLabel && currentStep !== undefined && totalSteps !== undefined && (
        <div className="mt-2 flex justify-between items-center" aria-hidden="true">
          <span className="label-text text-[var(--color-text-muted)]">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="label-text text-[var(--color-text-muted)]">
            {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%
          </span>
        </div>
      )}
    </div>
  )
}

export { Progress }
