"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { SplitScreenLayout } from "~/components/layout/split-screen-layout"
import { IllustrationContainer } from "~/components/layout/illustration-container"
import { useOnboarding } from "../onboarding-context"

export interface QuestionConfig {
  id: string
  title: string
  description: string
  type: "text" | "textarea" | "url" | "email" | "number" | "select" | "multiple-choice"
  placeholder: string
  required?: boolean
  minLength?: number
  maxLength?: number
  validation?: (value: string) => string | null // Returns error message or null
  helperText?: string
  options?: Array<{ 
    value: string
    label: string
    nextScreen?: string // For single-choice: navigate to this screen when this option is selected
  }>
  allowMultiple?: boolean // For multiple-choice type
  useSplitScreen?: boolean // Use split-screen layout
  nextScreen?: string // Next screen ID when continuing (if value provided)
  nextScreenOnSkip?: string // Next screen ID when skipping (if different from nextScreen)
}

interface QuestionStepProps {
  question: QuestionConfig
}

export function QuestionStep({ question }: QuestionStepProps) {
  const { responses, updateResponse, skipToQuestion, pushToHistory, goToNextStep } = useOnboarding()

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
      pushToHistory(question.id)
      
      // Navigate based on nextScreen if specified, otherwise go to next step (completion)
      if (question.nextScreen) {
        skipToQuestion(question.nextScreen)
      } else {
        goToNextStep()
      }
    }
  }

  const handleSkip = () => {
    updateResponse(question.id, "")
    pushToHistory(question.id)
    
    // Navigate based on nextScreenOnSkip or nextScreen
    const targetScreen = question.nextScreenOnSkip || question.nextScreen
    if (targetScreen) {
      skipToQuestion(targetScreen)
    } else {
      goToNextStep()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && question.type !== "textarea") {
      handleContinue()
    }
  }

  // Render input field
  const renderInput = () => {
    if (question.type === "select") {
      return (
        <Select
          value={value}
          onValueChange={(newValue) => {
            setValue(newValue)
            if (error) {
              setError("")
            }
          }}
        >
          <SelectTrigger label="" error={error}>
            <SelectValue placeholder={question.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (question.type === "textarea") {
      return (
        <Textarea
          label=""
          placeholder={question.placeholder}
          value={value}
          onChange={handleChange}
          error={error}
          required={question.required}
          rows={6}
        />
      )
    }

    return (
      <div className="flex gap-3 items-start">
        <Input
          label=""
          placeholder={question.placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          error={error}
          required={question.required}
          type={question.type}
          className="flex-1"
        />
        <Button
          variant="secondary"
          size="md"
          onClick={handleContinue}
          className="min-w-[44px] px-3 bg-[var(--color-teal-100)] border-[var(--color-teal-300)] hover:bg-[var(--color-teal-200)] mt-0"
          aria-label="Continue"
        >
          <ArrowRight className="w-5 h-5 text-[var(--color-teal-700)]" />
        </Button>
      </div>
    )
  }

  // Split-screen layout for websiteUrl and other specified questions
  if (question.useSplitScreen) {
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
              {question.description && (
                <p className="body-large text-[var(--color-text-muted)]">
                  {question.description}
                </p>
              )}
            </div>

            {/* Input */}
            <div className="mb-[var(--spacing-8)]">
              {renderInput()}
              {!error && question.helperText && (
                <p className="body-small text-[var(--color-text-muted)] mt-[var(--spacing-2)]">
                  {question.helperText}
                </p>
              )}
            </div>

            {/* Optional: Skip button for non-required questions */}
            {!question.required && (
              <div className="flex justify-start">
                <Button
                  variant="text"
                  size="md"
                  onClick={handleSkip}
                  className="text-[var(--color-text-muted)]"
                >
                  Skip for now
                </Button>
              </div>
            )}
          </div>
        }
        leftRatio={45}
        rightRatio={55}
        mobileStackOrder="right-first"
      />
    )
  }

  // Centered layout for other questions
  return (
    <div className="h-[calc(100vh-105px)] flex flex-col items-center justify-center px-4 bg-[var(--color-background)] overflow-hidden">
      <div className="w-full max-w-2xl mx-auto">
        {/* Placeholder Image/Map */}
        {question.id === "industry" && (
          <div className="mb-6 flex justify-center">
            <div className="w-40 h-24 bg-[var(--color-neutral-300)] rounded-[var(--radius-md)]" />
          </div>
        )}

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="heading-2 mb-3 text-[var(--color-text)]">
            {question.title}
          </h1>
          {question.description && (
            <p className="body-text text-[var(--color-text-muted)] max-w-xl mx-auto">
              {question.description}
            </p>
          )}
        </div>

        {/* Input */}
        <div className="max-w-md mx-auto">
          {renderInput()}
          {!error && question.helperText && (
            <p className="body-small text-[var(--color-text-muted)] mt-2 text-center">
              {question.helperText}
            </p>
          )}
        </div>
      </div>

      {/* Floating Complete/Continue Button */}
      {(!question.nextScreen || question.type === "select" || question.type === "textarea") && (
        <div className="fixed bottom-8 right-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="rounded-full px-8 py-4 uppercase tracking-wide shadow-lg"
          >
            {question.nextScreen ? "Continue" : "Complete"}
          </Button>
        </div>
      )}
    </div>
  )
}
