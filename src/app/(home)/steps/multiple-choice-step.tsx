"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useOnboarding } from "../onboarding-context";
import { cn } from "~/lib/utils";
import type { QuestionConfig } from "./question-step";

interface MultipleChoiceStepProps {
  question: QuestionConfig;
}

export function MultipleChoiceStep({ question }: MultipleChoiceStepProps) {
  const {
    responses,
    updateResponse,
    skipToQuestion,
    pushToHistory,
    goToNextStep,
  } = useOnboarding();

  // Initialize selected values from saved responses, filtering out invalid options
  const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
    const saved = responses[question.id];
    console.log("=== MultipleChoiceStep Init ===");
    console.log("Question ID:", question.id);
    console.log("Saved Response:", saved);
    console.log("All Responses:", responses);

    if (!saved) return [];

    // Parse the saved value(s)
    const savedArray = question.allowMultiple ? saved.split(",") : [saved];
    console.log("Saved Array:", savedArray);

    // Only keep values that are valid options for this specific question
    // This prevents cross-contamination between questions
    const validOptionValues = new Set(
      question.options?.map((opt) => opt.value) || [],
    );
    console.log("Valid Option Values:", Array.from(validOptionValues));

    const filtered = savedArray.filter((val) => validOptionValues.has(val));
    console.log("Filtered Values:", filtered);

    return filtered;
  });
  const [error, setError] = React.useState("");

  const handleToggle = (value: string) => {
    console.log("=== handleToggle ===");
    console.log("Toggling value:", value);
    console.log("Current selectedValues:", selectedValues);

    if (question.allowMultiple) {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    } else {
      setSelectedValues([value]);
    }
    if (error) {
      setError("");
    }
  };

  const handleContinue = () => {
    if (question.required && selectedValues.length === 0) {
      setError("Please select at least one option");
      return;
    }

    const valueToSave = question.allowMultiple
      ? selectedValues.join(",")
      : selectedValues[0] || "";

    console.log("=== MultipleChoiceStep handleContinue ===");
    console.log("Question ID:", question.id);
    console.log("Selected Values:", selectedValues);
    console.log("Value to Save:", valueToSave);
    console.log("Allow Multiple:", question.allowMultiple);

    updateResponse(question.id, valueToSave);
    pushToHistory(question.id);

    // For single-choice with per-option navigation
    if (!question.allowMultiple && selectedValues.length === 1) {
      const selectedOption = question.options?.find(
        (opt) => opt.value === selectedValues[0],
      );
      if (selectedOption?.nextScreen) {
        skipToQuestion(selectedOption.nextScreen);
        return;
      }
    }

    // Fallback to question-level nextScreen or completion
    if (question.nextScreen) {
      skipToQuestion(question.nextScreen);
    } else {
      goToNextStep();
    }
  };

  // Guard against missing options
  if (!question.options || question.options.length === 0) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-105px)] flex-col overflow-hidden bg-[var(--color-background)]">
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        {/* Title */}
        <h1 className="heading-2 mb-8 max-w-2xl text-center text-[var(--color-text)]">
          {question.title}
        </h1>

        {/* Options */}
        <div className="flex w-full max-w-md flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            const isOther = option.value === "other";

            return (
              <button
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={cn(
                  "rounded-full px-8 py-4 text-base font-medium tracking-wide uppercase",
                  "transition-all duration-[var(--duration-normal)]",
                  "min-h-[56px] w-full",
                  "border-2",
                  isSelected &&
                    !isOther && [
                      "bg-[var(--color-teal-500)] text-white",
                      "border-[var(--color-teal-500)]",
                    ],
                  !isSelected &&
                    !isOther && [
                      "bg-[var(--color-teal-100)] text-[var(--color-teal-700)]",
                      "border-[var(--color-teal-100)]",
                      "hover:border-[var(--color-teal-200)] hover:bg-[var(--color-teal-200)]",
                    ],
                  isOther && [
                    "bg-white text-[var(--color-teal-600)]",
                    "border-[var(--color-teal-300)]",
                    isSelected && "border-[var(--color-teal-500)]",
                  ],
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <p className="caption-text mt-4 text-[var(--color-error)]">{error}</p>
        )}
      </div>

      {/* Floating Arrow Button */}
      <div className="fixed right-8 bottom-8">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleContinue}
          className="h-14 w-14 rounded-full border-[var(--color-teal-300)] bg-[var(--color-teal-100)] p-0 hover:bg-[var(--color-teal-200)]"
          aria-label="Continue to next question"
        >
          <ArrowRight className="h-6 w-6 text-[var(--color-teal-700)]" />
        </Button>
      </div>
    </div>
  );
}
