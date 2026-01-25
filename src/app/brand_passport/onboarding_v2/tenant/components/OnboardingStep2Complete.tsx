"use client";

import React, { useState } from "react";

interface Props {}

export default function OnboardingStep2Complete(props: Props) {
  return (
    <div className="flex h-screen w-screen flex-col gap-12 bg-gray-100">
      <div className="flex w-full flex-row items-center justify-center py-8 text-2xl font-semibold text-indigo-800 shadow-md shadow-indigo-200">
        BrandPassport
      </div>
      <div className="flex h-screen w-screen flex-col gap-12 bg-gray-100 px-8">
        <div className="flex w-full text-xl text-gray-800">
          Perfect! Your brand passport is on its way to landlords.
        </div>
        <div className="flex w-full text-xl text-gray-800">
          Check out your passport and add more details. The more you add, the
          better chance it has to be picked up by a landlord.
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`cursor-pointer rounded-md bg-indigo-800 px-4 py-2 text-lg text-white transition-all hover:bg-indigo-900`}
          >
            View Passport
          </button>
        </div>
      </div>
    </div>
  );
}
