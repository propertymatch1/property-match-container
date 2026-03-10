"use client"

import * as React from "react"

interface OnboardingState {
  currentStep: number
  totalSteps: number
  responses: Record<string, string> // Generic key-value store for all responses
  completed: boolean
}

interface OnboardingContextValue extends OnboardingState {
  updateResponse: (key: string, value: string) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: number) => void
  markCompleted: () => void
}

const OnboardingContext = React.createContext<OnboardingContextValue | undefined>(
  undefined
)

interface OnboardingProviderProps {
  children: React.ReactNode
  totalSteps: number
}

export function OnboardingProvider({ children, totalSteps }: OnboardingProviderProps) {
  const [state, setState] = React.useState<OnboardingState>({
    currentStep: 1,
    totalSteps,
    responses: {},
    completed: false,
  })

  const updateResponse = React.useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      responses: { ...prev.responses, [key]: value },
    }))
  }, [])

  const goToNextStep = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }))
  }, [])

  const goToPreviousStep = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }))
  }, [])

  const goToStep = React.useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, prev.totalSteps)),
    }))
  }, [])

  const markCompleted = React.useCallback(() => {
    setState((prev) => ({ ...prev, completed: true }))
  }, [])

  const value: OnboardingContextValue = {
    ...state,
    updateResponse,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    markCompleted,
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = React.useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}
