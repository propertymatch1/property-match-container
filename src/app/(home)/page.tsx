"use client"

import { ProgressIndicator } from "~/components/design-system/progress-indicator"
import { useOnboarding } from "./onboarding-context"
import { ONBOARDING_QUESTIONS } from "./questions-config"
import { LandingStep } from "./steps/landing-step"
import { WelcomeStep } from "./steps/welcome-step"
import { QuestionStep } from "./steps/question-step"
import { CompletionStep } from "./steps/completion-step"

export default function HomePage() {
  const { currentStep, totalSteps } = useOnboarding()

  // Calculate which component to render
  const renderStep = () => {
    // Step 1: Landing page
    if (currentStep === 1) {
      return <LandingStep />
    }

    // Step 2: Welcome screen
    if (currentStep === 2) {
      return <WelcomeStep />
    }

    // Steps 3 to (3 + questions.length - 1): Question steps
    const questionIndex = currentStep - 3
    if (questionIndex >= 0 && questionIndex < ONBOARDING_QUESTIONS.length) {
      const question = ONBOARDING_QUESTIONS[questionIndex]
      if (question) {
        return <QuestionStep question={question} />
      }
    }

    // Last step: Completion
    if (currentStep === totalSteps) {
      return <CompletionStep />
    }

    // Fallback (shouldn't happen)
    return <LandingStep />
  }

  // Calculate progress for the progress bar
  // We show progress starting from step 2 (welcome screen)
  const progressStep = Math.max(1, currentStep - 1)
  const progressTotal = totalSteps - 1

  return (
    <div className="min-h-screen">
      {/* Progress Indicator - only show after step 1 (landing) */}
      {currentStep > 1 && (
        <nav aria-label="Onboarding progress" role="navigation">
          <ProgressIndicator
            currentStep={progressStep}
            totalSteps={progressTotal}
            variant="bar"
            showLabel
            className="fixed top-0 left-0 right-0 z-50"
          />
        </nav>
      )}

      {/* Main Content with top padding when progress bar is visible */}
      <main className={currentStep > 1 ? "pt-12" : ""}>
        {renderStep()}
      </main>
    </div>
  )
}
