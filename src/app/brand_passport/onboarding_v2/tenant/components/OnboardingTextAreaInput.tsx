"use client";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  prompt: string;
  subprompt?: string;
  text: string;
  onSubmit: (text: string, notExist: boolean) => void;
  allowOptional?: boolean;
  placeholder?: string;
  aiGenerate?: (text: string) => Promise<string>;
}

export default function OnboardingTextAreaInput(props: Props) {
  const {
    prompt,
    subprompt,
    onSubmit,
    allowOptional,
    placeholder,
    aiGenerate,
  } = props;
  const textareaRef = useRef(null);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset to shrink
      el.style.height = el.scrollHeight + "px"; // Adjust height
    }
  }, [text]);

  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-4 text-gray-700">
      <div className="gap-2s mb-8 flex flex-col">
        <div className="text-xl">{prompt}</div>
        {subprompt ? (
          <div className="text-md text-gray-500">{subprompt}</div>
        ) : null}
      </div>
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder={placeholder ?? "Type answer here..."}
        className="w-full resize-none border-0 border-b-2 border-indigo-300 pb-2 text-2xl text-indigo-800 placeholder-indigo-300 transition-all outline-none focus:border-indigo-800 focus:ring-0"
        onKeyDown={(e) => (e.key === "Enter" ? onSubmit(text, false) : "")}
      />
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => {
            onSubmit(text, false);
          }}
          className={`rounded-md px-4 py-2 text-lg text-white transition-all ${
            text == ""
              ? "bg-indigo-300"
              : "cursor-pointer bg-indigo-800 hover:bg-indigo-900"
          }`}
        >
          OK
        </button>
        {allowOptional ? (
          <button
            onClick={() => {
              onSubmit(text, true);
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
            Polish with AI
          </button>
        ) : null}
      </div>
    </div>
  );
}
