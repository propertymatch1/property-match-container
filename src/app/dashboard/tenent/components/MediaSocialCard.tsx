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
      <div className="space-y-6">
        {/* Logo Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
            Brand Logo
          </h4>
          {hasLogo ? (
            <div className="flex items-center gap-4 bg-gradient-to-br from-pink-50 to-pink-50/50 rounded-xl p-4">
              <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                <AvatarImage src={logoUrl} alt="Brand logo" />
                <AvatarFallback>
                  <ImageIcon className="h-10 w-10 text-[#EC4899]/40" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-[#2D2D2D]/80 font-medium">
                  Logo uploaded
                </p>
                <p className="text-xs text-[#2D2D2D]/60 mt-1">
                  Your brand logo is set and will be displayed to landlords
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-[#2D2D2D]/60">
                No logo uploaded yet
              </p>
            </div>
          )}
        </div>

        {/* Placeholder for future features */}
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-[#2D2D2D]/60">
            Social media links and photo gallery coming soon
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
