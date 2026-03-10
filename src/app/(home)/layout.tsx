"use client"

import { OnboardingProvider } from "./onboarding-context"
import { TOTAL_STEPS } from "./questions-config"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider totalSteps={TOTAL_STEPS}>
      {children}
    </OnboardingProvider>
  )
}
