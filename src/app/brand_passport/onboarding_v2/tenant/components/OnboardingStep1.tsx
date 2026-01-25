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
  brandName: OptionalWrapper<string>;
  brandStory: string;
  isNewConcept: boolean;
  priceRange: number;
  currentLocations: OptionalWrapper<string[]>;
  categories: string[];
  audience: string[];
  signatureProducts: string[];
}

export function getDefaultAnswer1(): Step1Answer {
  return {
    brandName: { value: "", exists: false },
    brandStory: "",
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

  const incProgress = () => {
    let newProgress = progress + 1;
    if (progress == 3 && answer.isNewConcept) {
      newProgress++;
    }

    setProgress(newProgress);
    setMaxProgress(Math.max(maxProgress, progress + 1));
  };

  const decProgress = () => {
    let newProgress = progress - 1;
    if (progress == 5 && answer.isNewConcept) {
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
            {progress == 1 ? (
              <OnboardingSelectionInput
                prompt="1. Are you a new founder or an existing brand?"
                options={[
                  "👀 I'm a new founder (planning first location)",
                  "😎 I have an existing brand (currently operating)",
                ]}
                onSubmit={(option) => {
                  setAnswer((prev) => {
                    prev.isNewConcept = option == 0;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 2 ? (
              <OnboardingTextInput
                prompt="2. What's the name of your brand?"
                text={answer.brandName.value}
                allowOptional
                onSubmit={(text) => {
                  setAnswer((prev) => {
                    prev.brandName = text;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 3 ? (
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
                  setAnswer((prev) => {
                    prev.categories = options.value;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 4 ? (
              <OnboardingMultiSelectionPillInput
                prompt="4. Where are you currently operating?"
                options={["New York", "Atlanta", "Dallas"]}
                allowOptional
                onSubmit={(options) => {
                  setAnswer((prev) => {
                    prev.currentLocations = options;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 5 ? (
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
                  setAnswer((prev) => {
                    prev.audience = options.value;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 6 ? (
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
                  setAnswer((prev) => {
                    prev.audience = options.value;
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 7 ? (
              <OnboardingTextAreaInput
                prompt="7. Tell us your brand story in a few sentences."
                subprompt="What defines your brand? Feel free to just jot down some thoughts and have our AI polish for you!"
                placeholder="We're a community-focused Thai comfort food brand known for family recipes and warm hospitality."
                text={answer.brandStory}
                onSubmit={(text) => {
                  setAnswer((prev) => {
                    prev.brandStory = text;
                    return prev;
                  });
                  incProgress();
                }}
                aiGenerate={async (text) => {
                  const response = await fetch(
                    "/api/brand_passport/onboarding_v2/tenant/ai_generate",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
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
            ) : progress == 8 ? (
              <OnboardingTextAreaInput
                prompt="8. What are your signature products or best-selling items?"
                subprompt="If you're still shaping your menu or catalog, just share what your 'hero items' might be."
                placeholder="Pad Thai, Thai milk tea, crispy chicken basil rice"
                text={answer.signatureProducts.join(", ")}
                onSubmit={(text) => {
                  setAnswer((prev) => {
                    prev.signatureProducts = text
                      .split(",")
                      .map((product) => product.trim());
                    return prev;
                  });
                  incProgress();
                }}
              />
            ) : progress == 9 ? (
              <OnboardingSelectionInput
                prompt="9. What's the typical customer spend?"
                options={settings.step1.price_range.options}
                onSubmit={(option) => {
                  setAnswer((prev) => {
                    prev.priceRange = option;
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
