"use client"

import { Mic, Users, Gauge } from "lucide-react"
import { Button } from "~/components/ui/button"
import { IllustrationContainer } from "~/components/layout/illustration-container"
import { useOnboarding } from "../onboarding-context"

export function LandingStep() {
  const { goToNextStep } = useOnboarding()

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
      {/* Header */}
      <header className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-[28px] font-normal tracking-tight text-[#171717] font-[family-name:var(--font-sans)]">
            identia
          </h1>
        </div>
      </header>

      {/* Divider */}
      <div className="w-full border-t border-[#d4d4d4]" />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl w-full">
          {/* Illustration */}
          <div className="flex justify-center mb-12">
            <IllustrationContainer
              src="/illustrations/welcome.svg"
              alt="Welcome illustration"
              maxWidth="120px"
              aspectRatio="1/1"
            />
          </div>

          {/* Heading */}
          <h2 className="text-[32px] sm:text-[36px] font-normal text-center text-[#171717] mb-8 leading-tight font-[family-name:var(--font-sans)] px-4">
            Welcome. Let's capture your brand as it truly is.
          </h2>

          {/* Description */}
          <p className="text-[17px] sm:text-[18px] text-center text-[#404040] max-w-3xl mx-auto mb-10 leading-relaxed font-[family-name:var(--font-sans)] px-4">
            This short interview helps turn your vision, customer, and physical
            requirements into a clear, shareable Brand Passport: a living professional
            asset you can use whenever opportunities come knocking.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-20">
            <Button
              variant="primary"
              size="lg"
              onClick={goToNextStep}
              className="bg-[#00897b] hover:bg-[#00796b] text-white px-10 py-4 rounded-md text-[15px] font-semibold uppercase tracking-wide shadow-md hover:shadow-lg transition-all"
            >
              START GUIDED INTERVIEW
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f5f5] mb-6">
                <Mic className="w-5 h-5 text-[#404040]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#171717] mb-3 font-[family-name:var(--font-sans)]">
                Speak or Type
              </h3>
              <p className="text-[15px] text-[#525252] leading-relaxed font-[family-name:var(--font-sans)]">
                Use the 🎤 icon to answer via voice. Our AI structures your narrative in real-time
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f5f5] mb-6">
                <Users className="w-5 h-5 text-[#404040]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#171717] mb-3 font-[family-name:var(--font-sans)]">
                Collaborative Polishing
              </h3>
              <p className="text-[15px] text-[#525252] leading-relaxed font-[family-name:var(--font-sans)]">
                Don't worry about the 'perfect' wording. Our AI helps refine your narratives so they resonate with the right audiences.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f5f5] mb-6">
                <Gauge className="w-5 h-5 text-[#404040]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#171717] mb-3 font-[family-name:var(--font-sans)]">
                Your Pace
              </h3>
              <p className="text-[15px] text-[#525252] leading-relaxed font-[family-name:var(--font-sans)]">
                Progress is auto-saved. Feel free to skip technical sections and come back whenever you're ready.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
