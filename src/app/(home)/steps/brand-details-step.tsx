"use client"

import * as React from "react"
import { Upload, ArrowRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { SplitScreenLayout } from "~/components/layout/split-screen-layout"
import { IllustrationContainer } from "~/components/layout/illustration-container"
import { useOnboarding } from "../onboarding-context"

export function BrandDetailsStep() {
  const { responses, updateResponse, pushToHistory, goToStep, totalSteps } = useOnboarding()
  const [brandName, setBrandName] = React.useState(responses.brandName || "")
  const [brandColor, setBrandColor] = React.useState(responses.brandColor || "")
  const [brandDescription, setBrandDescription] = React.useState(responses.brandDescription || "")
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!brandName.trim()) {
      newErrors.brandName = "Brand name is required"
    }

    if (!brandColor.trim()) {
      newErrors.brandColor = "Brand color is required"
    }

    if (!brandDescription.trim()) {
      newErrors.brandDescription = "Please tell us about what you're building"
    } else if (brandDescription.trim().length < 10) {
      newErrors.brandDescription = "Please provide at least two sentences"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      updateResponse("brandName", brandName)
      updateResponse("brandColor", brandColor)
      updateResponse("brandDescription", brandDescription)
      pushToHistory("brandDetails")
      
      // Go to completion (brandDetails has no nextScreen in config)
      goToStep(totalSteps)
    }
  }

  return (
    <SplitScreenLayout
      leftContent={
        <div className="flex items-center justify-center h-full">
          <IllustrationContainer
            src="/illustrations/welcome.svg"
            alt="Brand details"
            maxWidth="500px"
            aspectRatio="1/1"
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full max-w-2xl mx-auto">
          {/* Brand Name & Logo */}
          <div className="mb-[var(--spacing-8)]">
            <h2 className="heading-4 mb-[var(--spacing-4)] text-[var(--color-text)]">
              Brand name & logo
            </h2>
            <div className="flex gap-[var(--spacing-3)]">
              <Input
                placeholder="brand name"
                value={brandName}
                onChange={(e) => {
                  setBrandName(e.target.value)
                  if (errors.brandName) {
                    setErrors({ ...errors, brandName: "" })
                  }
                }}
                error={errors.brandName}
                className="flex-1"
              />
              <Button
                variant="secondary"
                size="md"
                aria-label="Upload logo"
                className="min-w-[44px] px-3"
              >
                <Upload className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Brand Color */}
          <div className="mb-[var(--spacing-8)]">
            <h2 className="heading-4 mb-[var(--spacing-4)] text-[var(--color-text)]">
              Brand color
            </h2>
            <div className="flex gap-[var(--spacing-3)]">
              <Input
                placeholder="enter a style"
                value={brandColor}
                onChange={(e) => {
                  setBrandColor(e.target.value)
                  if (errors.brandColor) {
                    setErrors({ ...errors, brandColor: "" })
                  }
                }}
                error={errors.brandColor}
                className="flex-1"
              />
              <Button
                variant="secondary"
                size="md"
                aria-label="Submit color"
                className="min-w-[44px] px-3"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="secondary"
                size="md"
                aria-label="Color picker"
                className="min-w-[44px] px-3"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
              </Button>
              <Button
                variant="secondary"
                size="md"
                aria-label="Eyedropper tool"
                className="min-w-[44px] px-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Brand Description */}
          <div className="mb-[var(--spacing-8)]">
            <h2 className="heading-4 mb-[var(--spacing-4)] text-[var(--color-text)]">
              Tell us in two sentences about what you're building.
            </h2>
            <Textarea
              placeholder=""
              value={brandDescription}
              onChange={(e) => {
                setBrandDescription(e.target.value)
                if (errors.brandDescription) {
                  setErrors({ ...errors, brandDescription: "" })
                }
              }}
              error={errors.brandDescription}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleContinue}
              className="min-w-[280px] uppercase tracking-wide"
            >
              PREVIEW MY BRAND PASSPORT
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
