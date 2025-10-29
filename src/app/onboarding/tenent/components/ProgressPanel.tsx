import React from "react";
import { Button } from "~/components/ui/button";
import type { ConversationContext } from "../types";
import { ONBOARDING_CONFIG, PLACEHOLDER_TEXTS } from "../constants";

interface ProgressPanelProps {
  conversationContext: ConversationContext;
  isProcessingSkip: boolean;
  isSubmitting: boolean;
  onSkip: () => void;
  onSubmitProfile: () => void;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  conversationContext,
  isProcessingSkip,
  isSubmitting,
  onSkip,
  onSubmitProfile,
}) => {
  const progressPercentage = Math.min(
    (conversationContext.questionCount / ONBOARDING_CONFIG.TOTAL_QUESTIONS) * 100,
    100
  );

  const questionsCompleted = Math.min(
    conversationContext.questionCount,
    ONBOARDING_CONFIG.TOTAL_QUESTIONS
  );

  const questionsRemaining = ONBOARDING_CONFIG.TOTAL_QUESTIONS - conversationContext.questionCount;
  const isComplete = conversationContext.questionCount >= ONBOARDING_CONFIG.TOTAL_QUESTIONS;

  return (
    <div className="border-border bg-muted/30 w-80 shrink-0 overflow-y-auto border-l">
      <div className="space-y-4 p-6">
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
            {isComplete
              ? "All questions completed! You can now submit your profile."
              : `Complete ${questionsRemaining} more questions to submit, or skip to finish early.`}
          </p>
        </div>
      </div>
    </div>
  );
};