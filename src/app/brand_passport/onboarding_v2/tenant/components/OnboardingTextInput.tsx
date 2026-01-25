"use client";

import React, { useState } from "react";
import type { OptionalWrapper } from "~/lib/utils";

interface Props {
  prompt: string;
  subprompt?: string;
  text: string;
  onSubmit: (text: OptionalWrapper<string>) => void;
  allowOptional?: boolean;
  aiGenerate?: (text: string) => Promise<string>;
}

export default function OnboardingTextInput(props: Props) {
  const { prompt, subprompt, onSubmit, allowOptional, aiGenerate } = props;
  const [text, setText] = useState(props.text);
  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-4 text-gray-700">
      <div className="gap-2s mb-8 flex flex-col">
        <div className="text-xl">{props.prompt}</div>
        {props.subprompt ? (
          <div className="text-md text-gray-500">{props.subprompt}</div>
        ) : null}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Type answer here..."
        className="w-full border-0 border-b-2 border-indigo-300 pb-2 text-2xl text-indigo-800 placeholder-indigo-300 transition-all outline-none focus:border-indigo-800 focus:ring-0"
        onKeyDown={(e) => {
          if (e.key === "Enter" && text != "") {
            onSubmit({ value: text, exists: true });
          }
        }}
      />
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => {
            if (text != "") {
              onSubmit({ value: text, exists: true });
            }
          }}
          className={`rounded-md px-4 py-2 text-lg text-white transition-all ${
            text == ""
              ? "bg-indigo-300"
              : "cursor-pointer bg-indigo-800 hover:bg-indigo-900"
          }`}
        >
          OK
        </button>
        {props.allowOptional ? (
          <button
            onClick={() => {
              onSubmit({ value: "", exists: false });
            }}
            className={`cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-lg text-white transition-all hover:bg-cyan-600`}
          >
            I don't have one yet
          </button>
        ) : null}
        {aiGenerate ? (
          <button
            onClick={() => {
              aiGenerate(text).then((result) => setText(result));
            }}
            className={`rounded-md px-4 py-2 text-lg text-white transition-all ${
              text == ""
                ? "bg-cyan-300"
                : "cursor-pointer bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            Generate with AI
          </button>
        ) : null}
      </div>
    </div>
  );
}
