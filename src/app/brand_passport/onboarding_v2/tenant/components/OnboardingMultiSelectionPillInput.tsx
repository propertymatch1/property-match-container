"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import type { OptionalWrapper } from "~/lib/utils";

interface Props {
  prompt: string;
  subprompt?: string;
  selected: string[];
  placeholder?: string;
  options: string[];
  onSubmit: (options: OptionalWrapper<string[]>) => void;
  allowOptional?: boolean;
}

export default function OnboardingMultiSelectionPillInput(props: Props) {
  const { prompt, subprompt, placeholder, options, onSubmit, allowOptional } =
    props;
  const [selected, setSelected] = useState<string[]>(props.selected);
  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-4 text-gray-700">
      <div className="gap-2s mb-8 flex flex-col">
        <div className="text-xl">{prompt}</div>
        {subprompt ? (
          <div className="text-md text-gray-500">{subprompt}</div>
        ) : null}
      </div>
      <CreatableSelect
        styles={{
          container: (baseStyles) => ({
            ...baseStyles,
            width: "80%",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            width: "100%",
            fontSize: 24,
          }),
        }}
        isMulti
        placeholder={placeholder ?? "Select or type..."}
        onChange={(values) => setSelected(values.map((value) => value.value))}
        options={options.map((option) => {
          return { value: option, label: option };
        })}
      />
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => {
            onSubmit({ value: options, exists: true });
          }}
          className={`rounded-md px-4 py-2 text-lg text-white transition-all ${
            selected.length == 0
              ? "bg-indigo-300"
              : "cursor-pointer bg-indigo-800 hover:bg-indigo-900"
          }`}
        >
          OK
        </button>
        {allowOptional ? (
          <button
            onClick={() => {
              onSubmit({ value: [], exists: false });
            }}
            className={`cursor-pointer rounded-md bg-cyan-500 px-4 py-2 text-lg text-white transition-all hover:bg-cyan-600`}
          >
            I don't have one yet
          </button>
        ) : null}
      </div>
    </div>
  );
}
