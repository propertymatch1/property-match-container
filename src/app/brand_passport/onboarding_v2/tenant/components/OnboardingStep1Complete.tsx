"use client";

import React, { useState } from "react";

interface Props {
  onReady: () => void;
}

export default function OnboardingStep1Complete(props: Props) {
  return (
    <div className="flex h-screen w-screen flex-col gap-12 bg-gray-100">
      <div className="flex w-full flex-row items-center justify-center py-8 text-2xl font-semibold text-indigo-800 shadow-md shadow-indigo-200">
        BrandPassport
      </div>
      <div className="flex h-screen w-screen flex-col gap-12 bg-gray-100 px-8">
        <div className="flex w-full text-xl text-gray-800">
          Awesome! You have completed your brand passport.
        </div>
        <div className="flex w-full text-xl text-gray-800">
          Check out your passport and add more details. When you're ready to
          expand, click "I'm ready" and we'll help connect you to landlords.
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`cursor-pointer rounded-md bg-indigo-800 px-4 py-2 text-lg text-white transition-all hover:bg-indigo-900`}
          >
            View Passport
          </button>
          <button
            onClick={props.onReady}
            className={`cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-lg text-white transition-all hover:bg-cyan-600`}
          >
            I'm ready to expand
          </button>
        </div>
      </div>
    </div>
  );
}
