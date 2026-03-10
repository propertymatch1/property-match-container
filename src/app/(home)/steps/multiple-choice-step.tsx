"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useOnboarding } from "../onboarding-context"
import { cn } from "~/lib/utils"
import type { QuestionConfig } from "./question-step"

interface MultipleChoiceStepProps {
  question: QuestionConfig
}

export function MultipleChoiceStep({ question }: MultipleChoiceStepProps) {
  const { responses, updateResponse, skipToQuestion, pushToHistory, goToNextStep } = useOnboarding()

  const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
    const saved = responses[question.id]
    if (!saved) return []
    return question.allowMultiple ? saved.split(",") : [saved]
  })
  const [error, setError] = React.useState("")

  const handleToggle = (value: string) => {
    if (question.allowMultiple) {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      )
    } else {
      setSelectedValues([value])
    }
    if (error) {
      setError("")
    }
  }

  const handleContinue = () => {
    if (question.required && selectedValues.length === 0) {
      setError("Please select at least one option")
      return
    }

    const valueToSave = question.allowMultiple
      ? selectedValues.join(",")
      : selectedValues[0] || ""
    
    updateResponse(question.id, valueToSave)
    pushToHistory(question.id)
    
    // Navigate to nextScreen or completion
    if (question.nextScreen) {
      skipToQuestion(question.nextScreen)
    } else {
      goToNextStep()
    }
  }

  // Guard against missing options
  if (!question.options || question.options.length === 0) {
    return null
  }

  return (
    <div className="h-[calc(100vh-105px)] flex flex-col bg-[var(--color-background)] overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Title */}
        <h1 className="heading-2 text-center mb-8 max-w-2xl text-[var(--color-text)]">
          {question.title}
        </h1>

        {/* Options */}
        <div className="flex flex-col gap-3 w-full max-w-md">
          {question.options.map((option) => {
            const isSelected = selectedValues.includes(option.value)
            const isOther = option.value === "other"

            return (
              <button
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={cn(
                  "px-8 py-4 rounded-full text-base font-medium uppercase tracking-wide",
                  "transition-all duration-[var(--duration-normal)]",
                  "min-h-[56px] w-full",
                  "border-2",
                  isSelected && !isOther && [
                    "bg-[var(--color-teal-500)] text-white",
                    "border-[var(--color-teal-500)]",
                  ],
                  !isSelected && !isOther && [
                    "bg-[var(--color-teal-100)] text-[var(--color-teal-700)]",
                    "border-[var(--color-teal-100)]",
                    "hover:bg-[var(--color-teal-200)] hover:border-[var(--color-teal-200)]",
                  ],
                  isOther && [
                    "bg-white text-[var(--color-teal-600)]",
                    "border-[var(--color-teal-300)]",
                    isSelected && "border-[var(--color-teal-500)]",
                  ]
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        {/* Error Message */}
        {error && (
          <p className="caption-text text-[var(--color-error)] mt-4">
            {error}
          </p>
        )}
      </div>

      {/* Floating Arrow Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleContinue}
          className="rounded-full w-14 h-14 p-0 bg-[var(--color-teal-100)] border-[var(--color-teal-300)] hover:bg-[var(--color-teal-200)]"
          aria-label="Continue to next question"
        >
          <ArrowRight className="w-6 h-6 text-[var(--color-teal-700)]" />
        </Button>
      </div>
    </div>
  )
}
