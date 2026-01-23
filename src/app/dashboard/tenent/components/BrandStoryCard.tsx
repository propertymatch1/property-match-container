"use client";

import * as React from "react";
import { BookOpen } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Badge } from "~/components/ui/badge";

interface BrandStoryCardProps {
  brandKeywords: string[];
  personalityTags: string[];
  toneTags: string[];
  notes: string | null;
}

export function BrandStoryCard({
  brandKeywords,
  personalityTags,
  toneTags,
  notes,
}: BrandStoryCardProps) {
  // Create a story text from available data
  const getStoryText = () => {
    const parts: string[] = [];
    
    if (notes) {
      parts.push(notes);
    }
    
    if (brandKeywords.length > 0) {
      parts.push(`Key brand elements: ${brandKeywords.join(", ")}`);
    }
    
    if (personalityTags.length > 0) {
      parts.push(`Brand personality: ${personalityTags.join(", ")}`);
    }
    
    if (toneTags.length > 0) {
      parts.push(`Communication tone: ${toneTags.join(", ")}`);
    }
    
    return parts.length > 0 
      ? parts.join(". ") 
      : "No brand story available yet. Complete your profile to add your brand story.";
  };

  const story = getStoryText();
  const preview = story.substring(0, 120) + (story.length > 120 ? "..." : "");

  return (
    <CollapsibleSection
      title="Brand Story & Concept"
      icon={BookOpen}
      preview={preview}
      defaultOpen={true}
      accentColor="var(--sage-500, #6B7B6B)"
    >
      <div className="space-y-[var(--space-6,1.5rem)]">
        {/* Main Story Text */}
        <p className="text-[var(--warm-700,#44403c)] leading-relaxed text-base sm:text-lg">
          {story}
        </p>

        {/* Brand Attributes Grid */}
        {(brandKeywords.length > 0 || personalityTags.length > 0 || toneTags.length > 0) && (
          <div className="space-y-[var(--space-5,1.25rem)]">
            {/* Brand Keywords */}
            {brandKeywords.length > 0 && (
              <div className="space-y-[var(--space-3,0.75rem)]">
                <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                  Brand Keywords
                </h4>
                <div className="flex flex-wrap gap-[var(--space-2,0.5rem)]">
                  {brandKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      className="bg-[var(--sage-100,#e3e7e4)] text-[var(--sage-700,#454f47)] hover:bg-[var(--sage-200,#c7d0c9)] px-3 py-1.5 rounded-full transition-colors"
                      style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Personality Tags */}
            {personalityTags.length > 0 && (
              <div className="space-y-[var(--space-3,0.75rem)]">
                <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                  Brand Personality
                </h4>
                <div className="flex flex-wrap gap-[var(--space-2,0.5rem)]">
                  {personalityTags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors"
                      style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tone Tags */}
            {toneTags.length > 0 && (
              <div className="space-y-[var(--space-3,0.75rem)]">
                <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                  Communication Tone
                </h4>
                <div className="flex flex-wrap gap-[var(--space-2,0.5rem)]">
                  {toneTags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                      style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
