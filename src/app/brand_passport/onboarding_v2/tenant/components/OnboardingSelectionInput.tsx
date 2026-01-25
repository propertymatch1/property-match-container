"use client";

import React, { useState } from "react";

interface Props {
  prompt: string;
  subprompt?: string;
  options: string[];
  onSubmit: (option: number) => void;
  aiGenerate?: () => Promise<string>;
}

export default function OnboardingSelectionInput(props: Props) {
  const { prompt, subprompt, options, onSubmit, aiGenerate } = props;
  const [text, setText] = useState("");
  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-4 text-gray-700">
      <div className="gap-2s mb-8 flex flex-col">
        <div className="text-xl">{prompt}</div>
        {props.subprompt ? (
          <div className="text-md text-gray-500">{subprompt}</div>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => onSubmit(index)}
            className="cursor-pointer rounded-lg border-2 border-indigo-800 bg-indigo-200 px-4 py-2 text-2xl"
          >
            {option}
          </div>
        ))}
      </div>
      {aiGenerate ? (
        <button
          onClick={() => {
            aiGenerate().then((result) => setText(result));
          }}
          className={`cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-lg text-white transition-all hover:bg-cyan-600`}
        >
          Help me estimate
        </button>
      ) : null}
      <div>{text}</div>
    </div>
  );
}
