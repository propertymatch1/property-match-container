"use client";

import * as React from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/ui/collapsible";
import { cn } from "~/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  icon: LucideIcon;
  preview?: string;
  defaultOpen?: boolean;
  accentColor?: string;
  children: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  icon: Icon,
  preview,
  defaultOpen = false,
  accentColor = "#6B7B6B",
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white rounded-2xl shadow-md shadow-[#2D2D2D]/5 overflow-hidden">
        <CollapsibleTrigger asChild>
          <button
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
            style={{
              borderLeft: `4px solid ${accentColor}`,
            }}
          >
            <div className="flex items-center gap-3 flex-1 text-left">
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                }}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#2D2D2D]">
                  {title}
                </h3>
                {!isOpen && preview && (
                  <p className="text-sm text-[#2D2D2D]/60 mt-1 line-clamp-1">
                    {preview}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown
              size={20}
              className={cn(
                "text-[#2D2D2D]/40 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6 pt-2">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
