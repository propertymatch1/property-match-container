"use client";

import React, { useState } from "react";

type WithConfidence<T> = { value: T; confidence: number } | null;

type LinkParserOutput = {
  url: string;
  name: WithConfidence<string>;
  positioning: WithConfidence<string>;
  logo_url: WithConfidence<string>;
  category: WithConfidence<string[]>;
  target_customers: WithConfidence<string[]>;
  strengths: WithConfidence<string[]>;
};

export default function TempDevPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<LinkParserOutput | null>(null);

  async function handleParse(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setParsed(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `/api/onboarding/url_parse?url=${encodeURIComponent(url.trim())}`,
      );
      const json = await res.json();
      if (!res.ok || json?.success !== true) {
        setError(json?.error || `Unexpected response (${res.status})`);
      } else {
        setParsed(json.parsed ?? null);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  function renderField<T>(label: string, field: WithConfidence<T> | undefined) {
    if (!field) {
      return (
        <div className="mb-2">
          <div className="text-sm font-medium text-gray-600">{label}</div>
          <div className="text-sm text-gray-500 italic">No data</div>
        </div>
      );
    }
    return (
      <div className="mb-3">
        <div className="text-sm font-medium text-gray-600 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-xs text-gray-500">confidence: {field.confidence}</span>
        </div>
        <div className="mt-1 text-sm text-gray-800">
          {Array.isArray(field.value) ? (
            <ul className="list-disc pl-5">
              {(field.value as unknown as any[]).map((v, i) => (
                <li key={i} className="mb-1">
                  {String(v)}
                </li>
              ))}
            </ul>
          ) : (
            <div>{String(field.value)}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Top header + progress */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-semibold">identia</div>
        <div className="flex items-center gap-4">
          <button aria-label="profile" className="h-8 w-8 rounded-full bg-transparent border border-gray-300"></button>
          <button aria-label="refresh" className="h-8 w-8 rounded-full bg-transparent border border-gray-300"></button>
        </div>
      </header>

      <div className="px-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-2 rounded bg-emerald-100">
            <div className="h-2 w-1/3 rounded bg-emerald-400" />
          </div>
        </div>
      </div>

      {/* Main centered area */}
      <main className="flex items-center justify-center px-8 py-12">
        <div className="mx-auto w-full max-w-6xl rounded bg-transparent">
          <div className="flex items-stretch gap-8 bg-white px-12 py-12 rounded shadow-sm">
            {/* Left side: illustration + parsed output */}
            <div className="flex w-1/2 flex-col items-stretch gap-6">
              {/* Large brand title above the card */}
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">
                  {parsed?.name?.value ?? parsed?.url ?? "Untitled"}
                </h1>
              </div>

              {/* Dark rounded card following design */}
              <div className="rounded-2xl bg-gradient-to-b from-stone-900/80 to-stone-800/70 p-8 text-white shadow-inner">
                <div className="flex flex-col gap-6">
                  {/* Top row: Introduction (left) | Category (right) */}
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="text-xs opacity-60 tracking-wider">INTRODUCTION</div>
                      <div className="mt-2 text-sm leading-relaxed">
                        {parsed?.positioning?.value ?? parsed?.name?.value ?? "—"}
                      </div>
                    </div>
                    <div className="w-48">
                      <div className="text-xs opacity-60 tracking-wider">CATEGORY</div>
                      <div className="mt-2 text-sm">{(parsed?.category?.value ?? ["—"])[0]}</div>
                    </div>
                  </div>

                  <div className="border-t border-white/10" />

                  {/* Target Customer pills */}
                  <div>
                    <div className="text-xs opacity-60 tracking-wider mb-3">TARGET CUSTOMER</div>
                    <div className="flex flex-wrap gap-3">
                      {(parsed?.target_customers?.value ?? []).length === 0 ? (
                        <div className="text-sm italic opacity-60">None detected</div>
                      ) : (
                        (parsed?.target_customers?.value ?? []).map((t, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold"
                          >
                            {String(t).toUpperCase()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/10" />

                  {/* Brand Strengths pills */}
                  <div>
                    <div className="text-xs opacity-60 tracking-wider mb-3">BRAND STRENGTHS</div>
                    <div className="flex flex-wrap gap-3">
                      {(parsed?.strengths?.value ?? []).length === 0 ? (
                        <div className="text-sm italic opacity-60">None detected</div>
                      ) : (
                        (parsed?.strengths?.value ?? []).map((s, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold"
                          >
                            {String(s).toUpperCase()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-xs opacity-60">Powered by <span className="font-semibold">identia</span></div>
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="mx-2 w-px bg-emerald-200" />

            {/* Right side: input and CTA */}
            <div className="flex w-1/2 flex-col justify-center pl-8">
              <h2 className="mb-2 text-2xl font-bold">Where does your brand live online?</h2>
              <p className="mb-6 text-sm text-gray-500">
                Paste your link and our AI will instantly pull your logo, primary color palette,
                and brand bio. It's the fastest way to seed your Passport.
              </p>

              <form onSubmit={handleParse} className="flex items-center gap-3">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="www.url.com"
                  className="flex-1 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <button
                  type="submit"
                  aria-label="Submit URL"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 hover:bg-emerald-200"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5l7 7-7 7" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>

              <button
                onClick={() => {
                  setUrl("");
                  setParsed(null);
                  setError(null);
                }}
                className="mt-8 inline-flex w-64 items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800"
              >
                MY BRAND DOESN'T HAVE A URL YET
              </button>

              <div className="mt-6 text-xs text-gray-400">
                Or paste an Instagram / product link — our AI will do its best.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
