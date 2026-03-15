"use client";

import { Mic, Users, Gauge } from "lucide-react";
import { Button } from "~/components/ui/button";
import { IllustrationContainer } from "~/components/layout/illustration-container";
import { useOnboarding } from "../onboarding-context";

export function LandingStep() {
  const { goToNextStep, pushToHistory } = useOnboarding();

  const handleStart = () => {
    pushToHistory("landing");
    goToNextStep();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f0f0]">
      {/* Header */}
      <header className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[family-name:var(--font-sans)] text-[28px] font-normal tracking-tight text-[#171717]">
            identia
          </h1>
        </div>
      </header>

      {/* Divider */}
      <div className="w-full border-t border-[#d4d4d4]" />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          {/* Illustration */}
          <div className="mb-12 flex justify-center">
            <IllustrationContainer
              src="/illustrations/welcome.svg"
              alt="Welcome illustration"
              maxWidth="120px"
              aspectRatio="1/1"
            />
          </div>

          {/* Heading */}
          <h2 className="mb-8 px-4 text-center font-[family-name:var(--font-sans)] text-[32px] leading-tight font-normal text-[#171717] sm:text-[36px]">
            Welcome. Let's capture your brand as it truly is.
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-3xl px-4 text-center font-[family-name:var(--font-sans)] text-[17px] leading-relaxed text-[#404040] sm:text-[18px]">
            This short interview helps turn your vision, customer, and physical
            requirements into a clear, shareable Brand Passport: a living
            professional asset you can use whenever opportunities come knocking.
          </p>

          {/* CTA Button */}
          <div className="mb-20 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              className="rounded-md bg-[#00897b] px-10 py-4 text-[15px] font-semibold tracking-wide text-white uppercase shadow-md transition-all hover:bg-[#00796b] hover:shadow-lg"
            >
              START GUIDED INTERVIEW
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
                <Mic className="h-5 w-5 text-[#404040]" />
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-sans)] text-[18px] font-semibold text-[#171717]">
                Speak or Type
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-[#525252]">
                Use the 🎤 icon to answer via voice. Our AI structures your
                narrative in real-time
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
                <Users className="h-5 w-5 text-[#404040]" />
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-sans)] text-[18px] font-semibold text-[#171717]">
                Collaborative Polishing
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-[#525252]">
                Don't worry about the 'perfect' wording. Our AI helps refine
                your narratives so they resonate with the right audiences.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
                <Gauge className="h-5 w-5 text-[#404040]" />
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-sans)] text-[18px] font-semibold text-[#171717]">
                Your Pace
              </h3>
              <p className="font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-[#525252]">
                Progress is auto-saved. Feel free to skip technical sections and
                come back whenever you're ready.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
