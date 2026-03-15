"use client";

import * as React from "react";
import { ArrowLeft, Bug } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ProgressIndicator } from "~/components/design-system/progress-indicator";
import { useOnboarding } from "./onboarding-context";
import { ONBOARDING_QUESTIONS } from "./questions-config";
import { LandingStep } from "./steps/landing-step";
import { WelcomeStep } from "./steps/welcome-step";
import { QuestionStep } from "./steps/question-step";
import { BrandDetailsStep } from "./steps/brand-details-step";
import { MultipleChoiceStep } from "./steps/multiple-choice-step";
import { CompletionStep } from "./steps/completion-step";

export default function HomePage() {
  const { currentStep, totalSteps, goToPreviousStep, responses } =
    useOnboarding();
  const [showDebugDialog, setShowDebugDialog] = React.useState(false);

  // Calculate which component to render
  const renderStep = () => {
    // Step 1: Landing page
    if (currentStep === 1) {
      return <LandingStep />;
    }

    // Step 2: Welcome screen
    if (currentStep === 2) {
      return <WelcomeStep />;
    }

    // Steps 3 to (3 + questions.length - 1): Question steps
    const questionIndex = currentStep - 3;
    if (questionIndex >= 0 && questionIndex < ONBOARDING_QUESTIONS.length) {
      const question = ONBOARDING_QUESTIONS[questionIndex];
      if (question) {
        // Use custom component for brand details question
        if (question.id === "brandDetails") {
          return <BrandDetailsStep />;
        }
        // Use custom component for multiple choice questions
        if (question.type === "multiple-choice") {
          return <MultipleChoiceStep key={question.id} question={question} />;
        }
        return <QuestionStep key={question.id} question={question} />;
      }
    }

    // Last step: Completion
    if (currentStep === totalSteps) {
      return <CompletionStep />;
    }

    // Fallback (shouldn't happen)
    return <LandingStep />;
  };

  // Calculate progress for the progress bar
  // We show progress starting from step 2 (welcome screen)
  const progressStep = Math.max(1, currentStep - 1);
  const progressTotal = totalSteps - 1;

  // Show header for all steps except landing page
  const showHeader = currentStep > 1;

  const handleShowDebug = () => {
    setShowDebugDialog(true);
  };

  const handleCloseDebug = () => {
    setShowDebugDialog(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Header - show after landing page */}
      {showHeader && (
        <header className="fixed top-0 right-0 left-0 z-50 bg-[var(--color-background)]">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Back Button */}
            <button
              onClick={goToPreviousStep}
              className="-ml-2 p-2 text-[var(--color-teal-600)] transition-colors hover:text-[var(--color-teal-700)]"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            {/* Logo */}
            <h1 className="font-[family-name:var(--font-sans)] text-[28px] font-normal tracking-tight text-[#171717]">
              identia
            </h1>

            {/* Debug Button (Bug Icon) */}
            <button
              onClick={handleShowDebug}
              className="-mr-2 p-2 text-[var(--color-teal-600)] transition-colors hover:text-[var(--color-teal-700)]"
              aria-label="Show debug info"
            >
              <Bug className="h-6 w-6" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-[#d4d4d4]" />
        </header>
      )}

      {/* Progress Indicator - only show after step 1 (landing) */}
      {currentStep > 1 && (
        <nav aria-label="Onboarding progress" role="navigation">
          <ProgressIndicator
            currentStep={progressStep}
            totalSteps={progressTotal}
            variant="bar"
            showLabel
            className={
              showHeader
                ? "fixed top-[73px] right-0 left-0 z-50"
                : "fixed top-0 right-0 left-0 z-50"
            }
          />
        </nav>
      )}

      {/* Main Content with top padding when header/progress bar is visible */}
      <main
        className={
          currentStep > 1
            ? "h-screen overflow-hidden pt-[105px]"
            : "h-screen overflow-hidden"
        }
      >
        {renderStep()}
      </main>

      {/* Debug Dialog */}
      {showDebugDialog && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={handleCloseDebug}
        >
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-[var(--radius-lg)] bg-white p-8 shadow-[var(--shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="heading-3 text-[var(--color-text)]">
                Debug: Collected Responses
              </h2>
              <button
                onClick={handleCloseDebug}
                className="p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                aria-label="Close dialog"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {Object.keys(responses).length === 0 ? (
                <p className="body-text py-8 text-center text-[var(--color-text-muted)]">
                  No responses collected yet
                </p>
              ) : (
                Object.entries(responses).map(([key, value]) => (
                  <div
                    key={key}
                    className="border-b border-[var(--color-border)] pb-4 last:border-b-0"
                  >
                    <p className="label-text mb-1 text-[var(--color-text-muted)] uppercase">
                      {key}
                    </p>
                    <p className="body-text break-words text-[var(--color-text)]">
                      {value || (
                        <span className="text-[var(--color-text-muted)] italic">
                          (empty)
                        </span>
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(responses, null, 2),
                  );
                  alert("Copied to clipboard!");
                }}
              >
                Copy JSON
              </Button>
              <Button variant="primary" onClick={handleCloseDebug}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
