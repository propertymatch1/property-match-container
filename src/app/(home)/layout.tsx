"use client";

import { OnboardingProvider } from "./onboarding-context";
import { TOTAL_STEPS, ONBOARDING_QUESTIONS } from "./questions-config";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider
      totalSteps={TOTAL_STEPS}
      questions={ONBOARDING_QUESTIONS}
    >
      {children}
    </OnboardingProvider>
  );
}
