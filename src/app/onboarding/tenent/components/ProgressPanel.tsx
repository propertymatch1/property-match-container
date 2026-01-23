import React from "react";
import { Button } from "~/components/ui/button";
import type { ConversationContext } from "../types";
import { ONBOARDING_CONFIG, PLACEHOLDER_TEXTS } from "../constants";

interface ProgressPanelProps {
  conversationContext: ConversationContext;
  isProcessingSkip: boolean;
  isSubmitting: boolean;
  modalClosedWithoutCompletion: boolean;
  onSkip: () => void;
  onSubmitProfile: () => void;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  conversationContext,
  isProcessingSkip,
  isSubmitting,
  modalClosedWithoutCompletion,
  onSkip,
  onSubmitProfile,
}) => {
  const progressPercentage = Math.min(
    (conversationContext.questionCount / ONBOARDING_CONFIG.TOTAL_QUESTIONS) *
      100,
    100,
  );

  const questionsCompleted = Math.min(
    conversationContext.questionCount,
    ONBOARDING_CONFIG.TOTAL_QUESTIONS,
  );

  const questionsRemaining =
    ONBOARDING_CONFIG.TOTAL_QUESTIONS - conversationContext.questionCount;
  const isComplete =
    conversationContext.questionCount >= ONBOARDING_CONFIG.TOTAL_QUESTIONS || modalClosedWithoutCompletion;

  return (
    <>
      {/* Mobile Progress Panel - Fixed Bottom */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--warm-200)] bg-white/95 shadow-lg backdrop-blur-sm lg:hidden">
        <div className="space-y-3 p-4">
          {/* Mobile Progress Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-[var(--warm-900)]">Progress</span>
              <span className="text-xs text-[var(--warm-600)]">
                {questionsCompleted}/{ONBOARDING_CONFIG.TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="mx-3 flex-1">
              <div className="h-2 w-full rounded-full bg-[var(--warm-200)]">
                <div
                  className="h-2 rounded-full bg-[var(--sage-500)] transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={onSkip}
              variant="outline"
              className="min-h-[44px] flex-1 border-[var(--warm-300)] text-[var(--warm-700)] hover:border-[var(--sage-500)] hover:bg-[var(--sage-50)] hover:text-[var(--sage-700)]"
              disabled={isProcessingSkip || isSubmitting}
              size="sm"
            >
              {isProcessingSkip ? (
                <>
                  <div className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                "Skip & Finish"
              )}
            </Button>

            <Button
              onClick={onSubmitProfile}
              className="min-h-[44px] flex-1 bg-[var(--sage-500)] text-white hover:bg-[var(--sage-600)]"
              disabled={!isComplete || isProcessingSkip || isSubmitting}
              size="sm"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                "Submit Profile"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden h-full overflow-y-auto border-l border-[var(--warm-200)] bg-[var(--warm-50)] lg:flex lg:min-w-[320px] lg:flex-1">
        <div className="w-full space-y-4 p-6">
          <h2 className="font-[var(--font-playfair)] text-lg font-medium tracking-tight text-[var(--warm-900)]">
            Your Progress
          </h2>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--warm-700)]">Questions completed</span>
              <span className="font-medium text-[var(--warm-900)]">
                {questionsCompleted}/{ONBOARDING_CONFIG.TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--warm-200)]">
              <div
                className="h-2 rounded-full bg-[var(--sage-500)] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 border-t border-[var(--warm-200)] pt-4">
            {/* Skip button - always enabled */}
            <Button
              onClick={onSkip}
              variant="outline"
              className="min-h-[44px] w-full border-[var(--warm-300)] text-[var(--warm-700)] hover:border-[var(--sage-500)] hover:bg-[var(--sage-50)] hover:text-[var(--sage-700)]"
              disabled={isProcessingSkip || isSubmitting}
            >
              {isProcessingSkip ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {PLACEHOLDER_TEXTS.PROCESSING}
                </>
              ) : (
                "Skip & Finish"
              )}
            </Button>

            {/* Submit button - enabled only after Q10 */}
            <Button
              onClick={onSubmitProfile}
              className="min-h-[44px] w-full bg-[var(--sage-500)] text-white hover:bg-[var(--sage-600)]"
              disabled={!isComplete || isProcessingSkip || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {PLACEHOLDER_TEXTS.SUBMITTING}
                </>
              ) : (
                "Submit Profile"
              )}
            </Button>

            {/* Helper text */}
            <p className="text-center text-xs text-[var(--warm-600)]">
              {modalClosedWithoutCompletion
                ? "Profile ready! Click Submit Profile to complete your onboarding."
                : isComplete
                ? "All questions completed! You can now submit your profile."
                : `Complete ${questionsRemaining} more questions to submit, or skip to finish early.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
