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
      <div className="bg-background/95 border-border fixed right-0 bottom-0 left-0 z-50 border-t shadow-lg backdrop-blur-sm lg:hidden">
        <div className="space-y-3 p-4">
          {/* Mobile Progress Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-muted-foreground text-xs">
                {questionsCompleted}/{ONBOARDING_CONFIG.TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="mx-3 flex-1">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-300"
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
              className="flex-1"
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
              className="flex-1"
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
      <div className="border-border bg-muted/30 hidden h-full overflow-y-auto border-l lg:flex lg:min-w-[320px] lg:flex-1">
        <div className="w-full space-y-4 p-6">
          <h2 className="text-lg font-medium">Your Progress</h2>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Questions completed</span>
              <span className="font-medium">
                {questionsCompleted}/{ONBOARDING_CONFIG.TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="border-border space-y-3 border-t pt-4">
            {/* Skip button - always enabled */}
            <Button
              onClick={onSkip}
              variant="outline"
              className="w-full"
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
              className="w-full"
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
            <p className="text-muted-foreground text-center text-xs">
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
