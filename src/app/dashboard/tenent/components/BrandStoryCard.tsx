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
      accentColor="#6B7B6B"
    >
      <div className="space-y-6">
        {/* Main Story Text */}
        <p className="text-[#2D2D2D]/80 leading-relaxed text-base sm:text-lg">
          {story}
        </p>

        {/* Brand Attributes Grid */}
        {(brandKeywords.length > 0 || personalityTags.length > 0 || toneTags.length > 0) && (
          <div className="space-y-4">
            {/* Brand Keywords */}
            {brandKeywords.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                  Brand Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {brandKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      className="bg-[#6B7B6B]/10 text-[#6B7B6B] hover:bg-[#6B7B6B]/20 px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Personality Tags */}
            {personalityTags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                  Brand Personality
                </h4>
                <div className="flex flex-wrap gap-2">
                  {personalityTags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tone Tags */}
            {toneTags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                  Communication Tone
                </h4>
                <div className="flex flex-wrap gap-2">
                  {toneTags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-full"
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
