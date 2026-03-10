"use client"

import * as React from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SplitScreenLayout } from "~/components/layout/split-screen-layout"
import { IllustrationContainer } from "~/components/layout/illustration-container"
import { useOnboarding } from "../onboarding-context"

export interface QuestionConfig {
  id: string
  title: string
  description: string
  type: "text" | "textarea" | "url" | "email" | "number"
  placeholder: string
  required?: boolean
  minLength?: number
  maxLength?: number
  validation?: (value: string) => string | null // Returns error message or null
  helperText?: string
}

interface QuestionStepProps {
  question: QuestionConfig
}

export function QuestionStep({ question }: QuestionStepProps) {
  const { responses, updateResponse, goToNextStep, goToPreviousStep } = useOnboarding()

  const [value, setValue] = React.useState(responses[question.id] || "")
  const [error, setError] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (error) {
      setError("")
    }
  }

  const validate = (): boolean => {
    // Required field check
    if (question.required && !value.trim()) {
      setError(`${question.title} is required`)
      return false
    }

    // Min length check
    if (question.minLength && value.trim().length < question.minLength) {
      setError(`${question.title} must be at least ${question.minLength} characters`)
      return false
    }

    // Max length check
    if (question.maxLength && value.trim().length > question.maxLength) {
      setError(`${question.title} must be no more than ${question.maxLength} characters`)
      return false
    }

    // Custom validation
    if (question.validation) {
      const validationError = question.validation(value)
      if (validationError) {
        setError(validationError)
        return false
      }
    }

    return true
  }

  const handleContinue = () => {
    if (validate()) {
      updateResponse(question.id, value)
      goToNextStep()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && question.type !== "textarea") {
      handleContinue()
    }
  }

  return (
    <SplitScreenLayout
      leftContent={
        <div className="flex items-center justify-center h-full">
          <IllustrationContainer
            src="/illustrations/welcome.svg"
            alt={question.title}
            maxWidth="500px"
            aspectRatio="1/1"
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full max-w-2xl mx-auto">
          {/* Heading */}
          <div className="mb-[var(--spacing-8)]">
            <h1 className="heading-1 mb-[var(--spacing-4)] text-[var(--color-text)]">
              {question.title}
            </h1>
            <p className="body-large text-[var(--color-text-muted)]">
              {question.description}
            </p>
          </div>

          {/* Input */}
          <div className="mb-[var(--spacing-8)]">
            {question.type === "textarea" ? (
              <Textarea
                label={question.title}
                placeholder={question.placeholder}
                value={value}
                onChange={handleChange}
                error={error}
                required={question.required}
                rows={6}
              />
            ) : (
              <Input
                label={question.title}
                placeholder={question.placeholder}
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={error}
                required={question.required}
                type={question.type}
              />
            )}
            {!error && question.helperText && (
              <p className="body-small text-[var(--color-text-muted)] mt-[var(--spacing-2)]">
                {question.helperText}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[var(--spacing-4)]">
            <Button
              variant="secondary"
              size="lg"
              onClick={goToPreviousStep}
              className="min-w-[120px]"
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleContinue}
              className="min-w-[200px]"
            >
              Continue
            </Button>
          </div>
        </div>
      }
      leftRatio={45}
      rightRatio={55}
      mobileStackOrder="right-first"
    />
  )
}
