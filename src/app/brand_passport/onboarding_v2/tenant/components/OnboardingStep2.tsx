"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingSelectionInput from "./OnboardingSelectionInput";
import OnboardingMultiSelectionPillInput from "./OnboardingMultiSelectionPillInput";
import OnboardingNavBar from "./OnboardingNavBar";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import usePrevious from "~/lib/usePrevious";
import type { Step1Answer } from "./OnboardingStep1";
import { settings } from "../settings/onboarding_settings";

interface Props {
  step1Answer: Step1Answer;
  onComplete: (answer: Step2Answer) => void;
}

interface Step2Answer {
  cities: string[];
  space: number;
  budget: number;
  timeline: number;
}

export default function OnboardingStep2(props: Props) {
  const [progress, setProgress] = useState(1);
  const [maxProgress, setMaxProgress] = useState(1);
  const prevProgress = usePrevious(progress);
  const [answer, setAnswer] = useState<Step2Answer>({
    cities: [],
    space: 0,
    budget: 0,
    timeline: 0,
  });

  const incProgress = () => {
    let newProgress = progress + 1;
    setProgress(newProgress);
    setMaxProgress(Math.max(maxProgress, progress + 1));
  };

  const decProgress = () => {
    let newProgress = progress - 1;
    setProgress(newProgress);
  };

  const variants = {
    enter: (direction: number) => {
      return direction > 0 ? { y: 60, opacity: 0 } : { y: -60, opacity: 0 };
    },
    exit: (direction: number) => {
      return direction > 0 ? { y: -60, opacity: 0 } : { y: 60, opacity: 0 };
    },
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100">
      <OnboardingNavBar progress={(100 * (progress - 1)) / 4} />
      <div className="flex h-full w-full flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait" custom={progress - (prevProgress ?? 0)}>
          <motion.div
            key={progress}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            custom={progress - (prevProgress ?? 0)}
            initial="enter"
            exit="exit"
            variants={variants}
            className="flex w-full flex-col items-center"
          >
            {progress == 1 ? (
              <OnboardingMultiSelectionPillInput
                prompt="1. Where do you prefer to expand?"
                options={["New York", "Atlanta", "Dallas"]}
                onSubmit={(options) => {
                  setAnswer((prev) => {
                    prev.cities = options.value;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 2 ? (
              <OnboardingSelectionInput
                prompt="2. What's your ideal space size? (sqft)"
                options={[
                  "<800",
                  "800-1200",
                  "1200-1800",
                  "1800-2500",
                  "2500-4000",
                  "4000+",
                ]}
                onSubmit={(option) => {
                  setAnswer((prev) => {
                    prev.space = option;
                    return prev;
                  });
                  incProgress();
                }}
                aiGenerate={async () => {
                  const response = await fetch(
                    "/api/brand_passport/onboarding_v2/tenant/ai_generate",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        context: getSpaceAIPrompt(props.step1Answer, answer),
                        message: "",
                      }),
                    },
                  );
                  const { answer: result } = await response.json();
                  return result;
                }}
              />
            ) : progress == 3 ? (
              <OnboardingSelectionInput
                prompt="3. What's your budget range? ($/month)"
                options={[
                  "<$3000",
                  "$3000-$5000",
                  "$5000-$8000",
                  "$8000-$12000",
                  "$12000-$18000",
                  "$18000+",
                  "Not sure / depends",
                ]}
                onSubmit={(option) => {
                  setAnswer((prev) => {
                    prev.budget = option;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 4 ? (
              <OnboardingSelectionInput
                prompt="4. When are you looking to open?"
                options={[
                  "ASAP",
                  "1-3 months",
                  "4-6 months",
                  "7-12 months",
                  "Not sure / still exploring",
                ]}
                onSubmit={(option) => {
                  setAnswer((prev) => {
                    prev.timeline = option;
                    props.onComplete(prev);
                    return prev;
                  });
                }}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex w-full flex-row items-center justify-end gap-2 p-4">
        <button
          onClick={() => {
            decProgress();
          }}
          className={`cursor-pointer rounded-md bg-indigo-600 px-2 py-1 hover:bg-indigo-800`}
        >
          <ChevronUpIcon color="white" />
        </button>
        <button
          onClick={() => {
            if (progress < maxProgress) {
              incProgress();
            }
          }}
          className={`cursor-pointer rounded-md px-2 py-1 ${
            progress < maxProgress
              ? "cursor-pointer bg-indigo-600 hover:bg-indigo-800"
              : "bg-indigo-300"
          } `}
        >
          <ChevronDownIcon color="white" />
        </button>
      </div>
    </div>
  );
}

function getSpaceAIPrompt(answer1: Step1Answer, answer2: Step2Answer): string {
  const brandNamePrompt =
    answer1.brandName.value == ""
      ? `The tenant is starting a new brand. `
      : `The tenant owns a brand called "${answer1.brandName.value}". `;
  const locationPrompt = `They are planning to open in ${answer2.cities.join(", ")}.`;
  const audiencePrompt = `Their primary audiences are ${answer1.audience.join(", ")}.`;
  const pricePrompt = `A typical customer spends ${settings.step1.price_range.options[answer1.priceRange]}.`;

  return (
    brandNamePrompt +
    locationPrompt +
    audiencePrompt +
    pricePrompt +
    `You need help them estimate the space needed in square footage. Please choose amongst: "<800", "800-1200", "1200-1800", "1800-2500", "2500-4000", "4000+". Then give your rationale with 1 or 2 sentences.`
  );
}
