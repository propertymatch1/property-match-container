"use client"

import * as React from "react"

interface OnboardingState {
  currentStep: number
  totalSteps: number
  responses: Record<string, string> // Generic key-value store for all responses
  completed: boolean
  navigationHistory: string[] // Stack of screen IDs visited
}

interface OnboardingContextValue extends OnboardingState {
  updateResponse: (key: string, value: string) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: number) => void
  skipToQuestion: (questionId: string) => void
  markCompleted: () => void
  pushToHistory: (screenId: string) => void
}

const OnboardingContext = React.createContext<OnboardingContextValue | undefined>(
  undefined
)

interface OnboardingProviderProps {
  children: React.ReactNode
  totalSteps: number
  questions?: Array<{ id: string }> // Add questions array for skipToQuestion functionality
}

export function OnboardingProvider({ children, totalSteps, questions = [] }: OnboardingProviderProps) {
  const [state, setState] = React.useState<OnboardingState>({
    currentStep: 1,
    totalSteps,
    responses: {},
    completed: false,
    navigationHistory: [],
  })

  const updateResponse = React.useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      responses: { ...prev.responses, [key]: value },
    }))
  }, [])

  const pushToHistory = React.useCallback((screenId: string) => {
    setState((prev) => ({
      ...prev,
      navigationHistory: [...prev.navigationHistory, screenId],
    }))
  }, [])

  const goToNextStep = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }))
  }, [])

  const goToPreviousStep = React.useCallback(() => {
    setState((prev) => {
      // Pop the last screen from history
      const newHistory = [...prev.navigationHistory]
      const previousScreenId = newHistory.pop()
      
      if (previousScreenId) {
        // Handle special screens
        if (previousScreenId === "landing") {
          return {
            ...prev,
            currentStep: 1,
            navigationHistory: newHistory,
          }
        }
        
        if (previousScreenId === "welcome") {
          return {
            ...prev,
            currentStep: 2,
            navigationHistory: newHistory,
          }
        }
        
        // Find the step number for this screen ID (question screens)
        const questionIndex = questions.findIndex(q => q.id === previousScreenId)
        if (questionIndex !== -1) {
          // Step number = 3 (landing + welcome) + questionIndex
          const targetStep = 3 + questionIndex
          return {
            ...prev,
            currentStep: targetStep,
            navigationHistory: newHistory,
          }
        }
      }
      
      // Fallback to simple previous step
      return {
        ...prev,
        currentStep: Math.max(prev.currentStep - 1, 1),
        navigationHistory: newHistory,
      }
    })
  }, [questions])

  const goToStep = React.useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, prev.totalSteps)),
    }))
  }, [])

  const skipToQuestion = React.useCallback((questionId: string) => {
    // Find the index of the target question
    const questionIndex = questions.findIndex(q => q.id === questionId)
    if (questionIndex !== -1) {
      // Step number = 3 (landing + welcome) + questionIndex
      const targetStep = 3 + questionIndex
      setState((prev) => ({
        ...prev,
        currentStep: Math.max(1, Math.min(targetStep, prev.totalSteps)),
      }))
    } else {
      // Fallback to next step if question not found
      goToNextStep()
    }
  }, [questions, goToNextStep])

  const markCompleted = React.useCallback(() => {
    setState((prev) => ({ ...prev, completed: true }))
  }, [])

  const value: OnboardingContextValue = {
    ...state,
    updateResponse,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    skipToQuestion,
    markCompleted,
    pushToHistory,
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
