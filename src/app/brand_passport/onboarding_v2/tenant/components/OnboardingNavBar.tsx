"use client";

import React, { useState } from "react";

interface Props {
  progress: number;
}

export default function OnboardingNavBar(props: Props) {
  return (
    <div className="flex w-full flex-row items-center px-6 py-4 shadow-md shadow-indigo-200 gap-10">
      <h1 className="text-xl font-semibold text-gray-800">BrandPassport</h1>
      <div className="h-1 w-400 bg-gray-200">
        <div
          className="h-1 bg-purple-600 transition-all duration-500 ease-out"
          style={{
            width: `${props.progress}%`,
          }}
        />
      </div>
    </div>
  );
}
