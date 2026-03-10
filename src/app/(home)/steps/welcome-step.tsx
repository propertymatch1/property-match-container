"use client"

import { DollarSign, Box, PenTool, Activity } from "lucide-react"
import { Button } from "~/components/ui/button"
import { SplitScreenLayout } from "~/components/layout/split-screen-layout"
import { IllustrationContainer } from "~/components/layout/illustration-container"
import { FeatureCard } from "~/components/ui/card"
import { useOnboarding } from "../onboarding-context"

export function WelcomeStep() {
  const { goToNextStep } = useOnboarding()

  return (
    <SplitScreenLayout
      leftContent={
        <div className="flex items-center justify-center h-full">
          <IllustrationContainer
            src="/illustrations/welcome.svg"
            alt="Welcome to brand passport builder"
            maxWidth="500px"
            aspectRatio="1/1"
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full max-w-2xl mx-auto">
          <div className="mb-[var(--spacing-8)]">
            <h1 className="heading-1 mb-[var(--spacing-4)] text-[var(--color-text)]">
              Build Your Brand Passport
            </h1>
            <p className="body-large text-[var(--color-text-muted)]">
              Create a comprehensive brand profile in minutes. We'll guide you through
              defining your brand identity, values, and visual language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-4)] mb-[var(--spacing-8)]">
            <FeatureCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Brand Consistency"
              description="Maintain consistent branding across all your properties and touchpoints"
            />
            <FeatureCard
              icon={<Box className="w-6 h-6" />}
              title="AI-Powered Insights"
              description="Get intelligent recommendations based on your industry and target audience"
            />
            <FeatureCard
              icon={<PenTool className="w-6 h-6" />}
              title="Easy Customization"
              description="Tailor every aspect of your brand identity with our intuitive interface"
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6" />}
              title="Real-Time Preview"
              description="See your brand come to life with instant visual feedback and previews"
            />
          </div>

          <div className="flex justify-start">
            <Button
              variant="primary"
              size="lg"
              onClick={goToNextStep}
              className="min-w-[200px]"
            >
              Get Started
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
