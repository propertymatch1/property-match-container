import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "~/app/onboarding/tenent/types";

export type AIRefinementConfig<T> = {
  starter: string;
  prompt: string;
  solutionToPrompt: (solution: T) => string;
  responseToSolution: (responseText: string) => T;
};

interface Props<T> {
  config: AIRefinementConfig<T>;
  solution: T;
  setSolution: (solution: T) => void;
}

export default function OnboardingAIRefinement<T>({
  config,
  solution,
  setSolution,
}: Props<T>) {
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([
    {
      id: `original`,
      role: "assistant",
      content: config.starter,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tmpSolution, setTmpSolution] = useState<T>(solution);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [localMessages]);

  async function generate() {
    setLoading(true);
    const response = await fetch(
      "/api/brand_passport/onboarding_v2/tenant/ai_refine",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: config.prompt,
          message: config.solutionToPrompt(solution),
        }),
      },
    );
    const { answer: result } = await response.json();
    setTmpSolution(config.responseToSolution(result));

    const aiMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: result,
    };
    setLocalMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  }

  return (
    <div className="flex h-60 w-full flex-col justify-end rounded-md border bg-stone-200">
      <div
        ref={containerRef}
        className="flex h-full w-full flex-col gap-3 overflow-scroll px-4 py-3"
      >
        {localMessages.map((m) =>
          m.role === "assistant" ? (
            <div key={m.id} className="flex items-start gap-3">
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200 text-center text-sm leading-8 text-gray-700">
                AI
              </div>
              <div className="max-w-[80%] rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-sm">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-lg bg-indigo-300 px-3 py-2 text-sm text-gray-800">
                {m.content}
              </div>
            </div>
          ),
        )}

        {loading ? (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200 text-center text-sm leading-8 text-gray-700">
              AI
            </div>
            <div className="max-w-[60%] rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-800">
              <span className="animate-pulse">AI is typing...</span>
            </div>
          </div>
        ) : null}
      </div>
      {/* Auto reply option pills */}
      <div className="w-full p-3">
        <div className="flex flex-wrap gap-2">
          {localMessages.length <= 2
            ? [
                <button
                  onClick={async () => {
                    // add a user message showing the chosen quick action
                    const userMsg: ChatMessage = {
                      id: `u-${Date.now()}`,
                      role: "user",
                      content: `Help me refine!`,
                    };
                    setLocalMessages((prev) => [...prev, userMsg]);
                    generate();
                  }}
                  className="rounded-full bg-indigo-300 px-3 py-1 text-sm text-gray-800"
                >
                  Help me refine!
                </button>,
              ]
            : [
                <button
                  onClick={async () => {
                    // add a user message showing the chosen quick action
                    const userMsg: ChatMessage = {
                      id: `u-${Date.now()}`,
                      role: "user",
                      content: `Looks good!`,
                    };
                    setLocalMessages((prev) => [...prev, userMsg]);
                    setSolution(tmpSolution);
                  }}
                  className="rounded-full bg-indigo-300 px-3 py-1 text-sm text-gray-800"
                >
                  Looks good!
                </button>,
                <button
                  onClick={async () => {
                    // add a user message showing the chosen quick action
                    const userMsg: ChatMessage = {
                      id: `u-${Date.now()}`,
                      role: "user",
                      content: `Try again!`,
                    };
                    setLocalMessages((prev) => [...prev, userMsg]);
                    generate();
                  }}
                  className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-gray-800"
                >
                  Try again!
                </button>,
              ]}
        </div>
      </div>
    </div>
  );
}
