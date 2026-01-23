"use client";

import * as React from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

interface MediaSocialCardProps {
  logoUrl: string | null;
}

export function MediaSocialCard({ logoUrl }: MediaSocialCardProps) {
  // Check if there's any data to display
  const hasLogo = logoUrl !== null && logoUrl !== "";

  // Generate preview text
  const getPreview = () => {
    return hasLogo ? "Logo available" : "No media available";
  };

  return (
    <CollapsibleSection
      title="Media & Social Presence"
      icon={Camera}
      preview={getPreview()}
      defaultOpen={false}
      accentColor="#EC4899"
    >
      <div className="space-y-[var(--space-6,1.5rem)]">
        {/* Logo Section */}
        <div className="space-y-[var(--space-3,0.75rem)]">
          <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
            Brand Logo
          </h4>
          {hasLogo ? (
            <div 
              className="flex items-center gap-[var(--space-4,1rem)] bg-gradient-to-br from-pink-50 to-pink-50/50 p-[var(--space-4,1rem)]"
              style={{ borderRadius: "var(--radius-xl, 1rem)" }}
            >
              <Avatar className="h-20 w-20 border-2 border-white shadow-[var(--shadow-medium)]">
                <AvatarImage src={logoUrl} alt="Brand logo" />
                <AvatarFallback>
                  <ImageIcon className="h-10 w-10 text-pink-300" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-[var(--warm-700,#44403c)] font-medium">
                  Logo uploaded
                </p>
                <p className="text-xs text-[var(--warm-500,#78716c)] mt-1">
                  Your brand logo is set and will be displayed to landlords
                </p>
              </div>
            </div>
          ) : (
            <div 
              className="bg-[var(--warm-50,#fafaf9)] p-[var(--space-4,1rem)] text-center"
              style={{ borderRadius: "var(--radius-xl, 1rem)" }}
            >
              <ImageIcon className="h-12 w-12 text-[var(--warm-300,#d6d3d1)] mx-auto mb-[var(--space-2,0.5rem)]" />
              <p className="text-sm text-[var(--warm-500,#78716c)]">
                No logo uploaded yet
              </p>
            </div>
          )}
        </div>

        {/* Placeholder for future features */}
        <div 
          className="bg-[var(--warm-50,#fafaf9)] p-[var(--space-4,1rem)] text-center"
          style={{ borderRadius: "var(--radius-xl, 1rem)" }}
        >
          <p className="text-sm text-[var(--warm-500,#78716c)]">
            Social media links and photo gallery coming soon
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
