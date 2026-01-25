"use client";

import React, { useState } from "react";
import OnboardingWelcome from "./components/OnboardingWelcome";
import OnboardingStep1Complete from "./components/OnboardingStep1Complete";
import OnboardingStep1, {
  getDefaultAnswer1,
  type Step1Answer,
} from "./components/OnboardingStep1";
import OnboardingStep2 from "./components/OnboardingStep2";
import OnboardingStep2Complete from "./components/OnboardingStep2Complete";

export default function TenantOnboarding() {
  const [progress, setProgress] = useState(0);
  const [answer1, setAnswer1] = useState<Step1Answer>(getDefaultAnswer1());

  if (progress == 0) {
    return <OnboardingWelcome onSubmit={() => setProgress(progress + 1)} />;
  } else if (progress == 1) {
    return (
      <OnboardingStep1
        onComplete={(answer) => {
          setAnswer1(answer);
          setProgress(progress + 1);
        }}
      />
    );
  } else if (progress == 2) {
    return (
      <OnboardingStep1Complete onReady={() => setProgress(progress + 1)} />
    );
  } else if (progress == 3) {
    return (
      <OnboardingStep2
        step1Answer={answer1}
        onComplete={() => setProgress(progress + 1)}
      />
    );
  } else {
    return <OnboardingStep2Complete />;
  }
}
