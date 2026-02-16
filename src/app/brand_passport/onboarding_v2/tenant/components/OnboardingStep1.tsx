"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingTextInput from "./OnboardingTextInput";
import OnboardingSelectionInput from "./OnboardingSelectionInput";
import OnboardingMultiSelectionPillInput from "./OnboardingMultiSelectionPillInput";
import OnboardingTextAreaInput from "./OnboardingTextAreaInput";
import OnboardingNavBar from "./OnboardingNavBar";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type { OptionalWrapper } from "~/lib/utils";
import usePrevious from "~/lib/usePrevious";
import { settings } from "../settings/onboarding_settings";

interface Props {
  onComplete: (answer: Step1Answer) => void;
}

export interface Step1Answer {
  brandName: string;
  brandSummary: string;
  brandStory: string;
  brandStage: number;
  isNewConcept: boolean;
  priceRange: number;
  currentLocations: OptionalWrapper<string[]>;
  categories: string[];
  audience: string[];
  signatureProducts: string[];
}

export function getDefaultAnswer1(): Step1Answer {
  return {
    brandName: "",
    brandSummary: "",
    brandStory: "",
    brandStage: 0,
    isNewConcept: true,
    priceRange: 0,
    currentLocations: { value: [], exists: false },
    categories: [],
    audience: [],
    signatureProducts: [],
  };
}

export default function OnboardingStep1(props: Props) {
  const [progress, setProgress] = useState(1);
  const [maxProgress, setMaxProgress] = useState(1);
  const prevProgress = usePrevious(progress);
  const [answer, setAnswer] = useState<Step1Answer>(getDefaultAnswer1());

  const shouldSkip = (newProgress: number) => {
    if (newProgress === 5 && answer.brandStage >= 3) {
      return true;
    }
    return false;
  };

  const incProgress = () => {
    let newProgress = progress + 1;
    while (shouldSkip(newProgress)) {
      newProgress++;
    }
    setProgress(newProgress);
    setMaxProgress(Math.max(maxProgress, progress + 1));
  };

  const decProgress = () => {
    let newProgress = progress - 1;
    while (shouldSkip(newProgress)) {
      newProgress--;
    }
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
      <OnboardingNavBar progress={(100 * (progress - 1)) / 8} />
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
            {getInputComponent(
              progress,
              answer,
              setAnswer,
              incProgress,
              props.onComplete,
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex w-full flex-row items-center justify-end gap-2 p-4">
        <button
          onClick={() => {
            if (progress > 1) {
              decProgress();
            }
          }}
          className={`cursor-pointer rounded-md px-2 py-1 ${
            progress > 1
              ? "cursor-pointer bg-indigo-600 hover:bg-indigo-800"
              : "bg-indigo-300"
          } `}
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

function getInputComponent(
  progress: number,
  answer: Step1Answer,
  setAnswer: React.Dispatch<React.SetStateAction<Step1Answer>>,
  incProgress: () => void,
  onComplete: (a: Step1Answer) => void,
): React.ReactNode {
  const componts = [
    <OnboardingTextInput
      prompt="1. What's the name of your brand?"
      text={answer.brandName}
      onSubmit={(text) => {
        setAnswer((prev) => ({
          ...prev,
          brandName: text.value,
        }));
        incProgress();
      }}
    />,
    <OnboardingTextAreaInput
      prompt="2. Let's start simple. How would you describe what you do in one sentence?"
      text={answer.brandSummary}
      onSubmit={(text) => {
        setAnswer((prev) => ({
          ...prev,
          brandSummary: text.value,
        }));
        incProgress();
      }}
      aiRefinementConfig={{
        starter:
          "Hi there! Just type some thoughts above and I can help you refine your description!",
        prompt:
          "You need to write a concise and compelling description of the brand in 1 sentence. Here are some thoughts or draft provided by the brand owner:",
        solutionToPrompt: (solution) => solution,
        responseToSolution: (responseText) => responseText,
      }}
    />,
    <OnboardingMultiSelectionPillInput
      prompt="3. Which categories best describes your brand?"
      subprompt="Choose from dropdown or create your own tag"
      selected={answer.categories}
      options={[
        "Food & Beverage",
        "Retail",
        "Beauty / Wellness",
        "Fitness",
        "Services",
        "Fashion",
        "Entertainment",
        "Hybrid Concept",
      ]}
      onSubmit={(options) => {
        setAnswer((prev) => ({ ...prev, categories: options.value }));
        incProgress();
      }}
    />,
    <OnboardingSelectionInput
      prompt="4. Which of the following best describes where your brand is today?"
      options={settings.step1.brandStage.options}
      onSubmit={(option) => {
        setAnswer((prev) => ({ ...prev, brandStage: option }));
        incProgress();
      }}
    />,
    <OnboardingMultiSelectionPillInput
      prompt={
        answer.brandStage == 0
          ? "4. Where do you primarily operate today?"
          : "4. Where are you currently operating?"
      }
      selected={answer.currentLocations.value}
      options={["New York", "Atlanta", "Dallas"]}
      allowOptional
      onSubmit={(options) => {
        setAnswer((prev) => ({ ...prev, currentLocations: options }));
        incProgress();
      }}
    />,
  ];

  return componts[progress - 1];

  if (progress === 1) {
    return (
      <OnboardingTextInput
        prompt="1. What's the name of your brand?"
        text={answer.brandName}
        onSubmit={(text) => {
          setAnswer((prev) => ({
            ...prev,
            brandName: text.value,
          }));
          incProgress();
        }}
      />
    );
  } else if (progress === 2) {
    return (
      <OnboardingTextInput
        prompt="2. What's the name of your brand?"
        text={(answer as any).brandName?.value ?? (answer.brandName as any)}
        allowOptional
        onSubmit={(text) => {
          setAnswer((prev) => ({ ...prev, brandName: text as string }));
          incProgress();
        }}
      />
    );
  } else if (progress === 3) {
    return (
      <OnboardingMultiSelectionPillInput
        prompt="3. Which categories best describes your concept?"
        subprompt="Choose from dropdown or create your own tag"
        options={[
          "Food & Beverage",
          "Retail",
          "Beauty / Wellness",
          "Fitness",
          "Services",
          "Entertainment",
          "Hybrid Concept",
        ]}
        onSubmit={(options) => {
          setAnswer((prev) => ({ ...prev, categories: options.value }));
          incProgress();
        }}
      />
    );
  } else if (progress === 4) {
    return (
      <OnboardingMultiSelectionPillInput
        prompt="4. Where are you currently operating?"
        options={["New York", "Atlanta", "Dallas"]}
        allowOptional
        onSubmit={(options) => {
          setAnswer((prev) => ({ ...prev, currentLocations: options }));
          incProgress();
        }}
      />
    );
  } else if (progress === 5) {
    return (
      <OnboardingMultiSelectionPillInput
        prompt="5. Who are your target customers?"
        options={[
          "Students",
          "Families",
          "Professionals",
          "Tourists",
          "High-income",
          "Local neighborhood",
          "Foodies",
          "Social Media Driven",
          "Health conscious",
          "Parents / Kids",
          "Pet-friendly",
        ]}
        onSubmit={(options) => {
          setAnswer((prev) => ({ ...prev, audience: options.value }));
          incProgress();
        }}
      />
    );
  } else if (progress === 6) {
    return (
      <OnboardingMultiSelectionPillInput
        prompt="6. What best describe your brand's vibe or personality?"
        options={[
          "Cozy",
          "Minimal",
          "Modern",
          "Classic",
          "Trendy",
          "Artsy",
          "Bold",
          "Playful",
          "Premium",
          "Neighborhood-friendly",
          "Fast casual",
          "Experiential",
          "Instagrammable",
          "Luxury",
          "Affordable",
        ]}
        onSubmit={(options) => {
          setAnswer((prev) => ({ ...prev, audience: options.value }));
          incProgress();
        }}
      />
    );
  } else if (progress === 7) {
    return (
      <OnboardingTextAreaInput
        prompt="7. Tell us your brand story in a few sentences."
        subprompt="What defines your brand? Feel free to just jot down some thoughts and have our AI polish for you!"
        placeholder="We're a community-focused Thai comfort food brand known for family recipes and warm hospitality."
        text={answer.brandStory}
        onSubmit={(text) => {
          setAnswer((prev) => ({ ...prev, brandStory: text }));
          incProgress();
        }}
        aiGenerate={async (text) => {
          const response = await fetch(
            "/api/brand_passport/onboarding_v2/tenant/ai_generate",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                context: getBrandStoryAIPrompt(answer),
                message: text,
              }),
            },
          );
          const { answer: result } = await response.json();
          return result;
        }}
      />
    );
  } else if (progress === 8) {
    return (
      <OnboardingTextAreaInput
        prompt="8. What are your signature products or best-selling items?"
        subprompt="If you're still shaping your menu or catalog, just share what your 'hero items' might be."
        placeholder="Pad Thai, Thai milk tea, crispy chicken basil rice"
        text={answer.signatureProducts.join(", ")}
        onSubmit={(text) => {
          setAnswer((prev) => ({
            ...prev,
            signatureProducts: text.split(",").map((p) => p.trim()),
          }));
          incProgress();
        }}
      />
    );
  } else if (progress === 9) {
    return (
      <OnboardingSelectionInput
        prompt="9. What's the typical customer spend?"
        options={settings.step1.price_range.options}
        onSubmit={(option) => {
          setAnswer((prev) => {
            const next = { ...prev, priceRange: option };
            onComplete(next);
            return next;
          });
        }}
      />
    );
  }

  return null;
}

function getBrandStoryAIPrompt(answer: Step1Answer): string {
  const brandNamePrompt =
    answer.brandName.value == ""
      ? `The tenant is starting a new brand. `
      : `The tenant owns a brand called "${answer.brandName.value}". `;
  return (
    brandNamePrompt +
    `You need to write a concise and compelling brand story. It should help landlords and investors better understand the brand and get interested. What defines the brand? What makes it unique? Please limit to at most 2 sentences. Below are some thoughts that the tenant provided:"`
  );
}
