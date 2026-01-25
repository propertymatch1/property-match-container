"use client";

import React, { useState } from "react";

interface Props {
  onSubmit: () => void;
}

export default function OnboardingWelcome(props: Props) {
  return (
    <div className="flex h-screen w-screen flex-col gap-12 bg-gray-100">
      <div className="flex w-full flex-row items-center justify-center py-8 text-2xl font-semibold text-indigo-800 shadow-md shadow-indigo-200">
        BrandPassport
      </div>
      <div className="flex h-screen w-screen flex-col gap-12 bg-gray-100 px-8">
        <div className="flex w-full text-xl text-gray-800">
          Welcome! You're about to create your Brand Passport — your brand's
          professional identity, built beautifully and clearly in minutes.
        </div>
        <div className="flex w-full text-xl text-gray-800">
          Whether you're exploring a new location or simply organizing your
          brand for the future, this onboarding makes everything simple and
          stress-free.
        </div>
        <button
          onClick={() => {
            props.onSubmit();
          }}
          className={`cursor-pointer rounded-md bg-indigo-800 px-4 py-2 text-lg text-white transition-all hover:bg-indigo-900`}
        >
          Let's Begin!
        </button>
      </div>
    </div>
  );
}
