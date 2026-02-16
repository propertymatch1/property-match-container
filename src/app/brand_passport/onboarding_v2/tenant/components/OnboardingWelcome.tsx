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
          Welcome — let's capture your brand as it truly is.
        </div>
        <div className="flex w-full text-xl text-gray-800">
          This short interview helps turn your story, customers, and identity
          into a clear, shareable Brand Passport — something you can use
          whenever opportunities come knocking.
        </div>
        <div className="flex w-full text-xl text-gray-800">
          No pressure. There are no right answers. This is simply about being
          understood.
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
