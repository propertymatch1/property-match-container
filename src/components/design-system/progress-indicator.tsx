"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import { Progress } from "~/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  variant?: "bar" | "dots" | "steps";
  showLabel?: boolean;
  className?: string;
}

function ProgressIndicator({
  currentStep,
  totalSteps,
  variant = "bar",
  showLabel = false,
  className,
}: ProgressIndicatorProps) {
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  if (variant === "bar") {
    return (
      <Progress
        value={progressPercentage}
        currentStep={currentStep}
        totalSteps={totalSteps}
        showLabel={showLabel}
        className={className}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn("flex flex-col items-center gap-2", className)}
        role="navigation"
        aria-label="Progress indicator"
      >
        <div className="flex items-center gap-2" role="list">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div
                key={stepNumber}
                role="listitem"
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-[var(--duration-normal)]",
                  isCompleted && "bg-teal-500",
                  isCurrent && "scale-125 bg-teal-500",
                  !isCompleted && !isCurrent && "bg-neutral-300",
                )}
                aria-label={`Step ${stepNumber} of ${totalSteps}${isCompleted ? " completed" : isCurrent ? " current" : ""}`}
                aria-current={isCurrent ? "step" : undefined}
              />
            );
          })}
        </div>
        {showLabel && (
          <span className="text-text-muted text-sm" aria-live="polite">
            Step {currentStep} of {totalSteps}
          </span>
        )}
      </div>
    );
  }

  if (variant === "steps") {
    return (
      <div
        className={cn("flex flex-col gap-2", className)}
        role="navigation"
        aria-label="Step progress"
      >
        <div className="flex items-center justify-between" role="list">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <React.Fragment key={stepNumber}>
                <div
                  className="flex flex-col items-center gap-1"
                  role="listitem"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      "text-sm font-medium transition-colors duration-[var(--duration-normal)]",
                      isCompleted && "bg-teal-500 text-white",
                      isCurrent && "bg-teal-500 text-white",
                      !isCompleted &&
                        !isCurrent &&
                        "bg-neutral-200 text-neutral-600",
                    )}
                    aria-label={`Step ${stepNumber} of ${totalSteps}${isCompleted ? " completed" : isCurrent ? " current" : ""}`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {stepNumber}
                  </div>
                </div>
                {stepNumber < totalSteps && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-[var(--duration-normal)]",
                      stepNumber < currentStep
                        ? "bg-teal-500"
                        : "bg-neutral-200",
                    )}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {showLabel && (
          <span
            className="text-text-muted text-center text-sm"
            aria-live="polite"
          >
            Step {currentStep} of {totalSteps}
          </span>
        )}
      </div>
    );
  }

  return null;
}

export { ProgressIndicator };
export type { ProgressIndicatorProps };
