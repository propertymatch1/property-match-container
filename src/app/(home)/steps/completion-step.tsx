"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SplitScreenLayout } from "~/components/layout/split-screen-layout";
import { IllustrationContainer } from "~/components/layout/illustration-container";
import { useOnboarding } from "../onboarding-context";

export function CompletionStep() {
  const { responses, markCompleted, goToStep } = useOnboarding();

  React.useEffect(() => {
    markCompleted();
  }, [markCompleted]);

  const handleStartOver = () => {
    goToStep(1);
  };

  return (
    <SplitScreenLayout
      leftContent={
        <div className="flex h-full items-center justify-center">
          <IllustrationContainer
            src="/illustrations/welcome.svg"
            alt="Onboarding complete"
            maxWidth="500px"
            aspectRatio="1/1"
          />
        </div>
      }
      rightContent={
        <div className="mx-auto flex h-full max-w-2xl flex-col justify-center">
          {/* Completion Message */}
          <div className="mb-[var(--spacing-8)]">
            <div className="mb-[var(--spacing-6)]">
              <div
                className="mb-[var(--spacing-4)] flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-teal-50)]"
                aria-hidden="true"
              >
                <Check className="h-8 w-8 text-[var(--color-primary)]" />
              </div>

              <h1 className="heading-1 mb-[var(--spacing-4)] text-[var(--color-text)]">
                You're All Set!
              </h1>
              <p className="body-large text-[var(--color-text-muted)]">
                Your brand passport has been created successfully. We're now
                analyzing your information to provide personalized insights and
                recommendations.
              </p>
            </div>
          </div>

          {/* Summary Section */}
          <section
            className="mb-[var(--spacing-8)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-6)]"
            aria-labelledby="brand-profile-heading"
          >
            <h2
              id="brand-profile-heading"
              className="heading-3 mb-[var(--spacing-4)] text-[var(--color-text)]"
            >
              Your Brand Profile
            </h2>

            <dl className="space-y-[var(--spacing-4)]">
              {Object.entries(responses).map(([key, value]) => {
                if (!value) return null;

                // Format the key to be more readable
                const label = key
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <div key={key}>
                    <dt className="label-text mb-[var(--spacing-1)] text-[var(--color-text-muted)]">
                      {label}
                    </dt>
                    <dd className="body-text text-[var(--color-text)]">
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>

          {/* Action Button */}
          <div className="flex justify-start">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartOver}
              className="min-w-[200px]"
            >
              Start Over
            </Button>
          </div>
        </div>
      }
      leftRatio={45}
      rightRatio={55}
      mobileStackOrder="right-first"
    />
  );
}
