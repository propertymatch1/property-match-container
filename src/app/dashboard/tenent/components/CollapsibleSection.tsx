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
  accentColor = "var(--sage-500, #6B7B6B)",
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div 
        className="card-elevated overflow-hidden"
        style={{ borderRadius: "var(--radius-2xl, 1.5rem)" }}
      >
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "w-full px-6 py-5 flex items-center justify-between cursor-pointer",
              "hover:bg-[var(--warm-50)]/50 active:bg-[var(--warm-100)]/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage-500)] focus-visible:ring-inset",
              "transition-colors"
            )}
            style={{
              borderLeft: `4px solid ${accentColor}`,
              transitionDuration: "var(--transition-fast, 150ms)",
            }}
          >
            <div className="flex items-center gap-3 flex-1 text-left">
              <div
                className="p-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                  color: accentColor,
                  borderRadius: "var(--radius-lg, 0.75rem)",
                  transition: "background-color var(--transition-base, 300ms ease)",
                }}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--warm-800,#2D2D2D)]">
                  {title}
                </h3>
                {!isOpen && preview && (
                  <p 
                    className="text-sm text-[var(--warm-500,#78716c)] mt-1 line-clamp-1"
                    style={{ transition: "opacity var(--transition-base, 300ms ease)" }}
                  >
                    {preview}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown
              size={20}
              className={cn(
                "text-[var(--warm-400,#a8a29e)] flex-shrink-0",
                isOpen && "rotate-180"
              )}
              style={{ transition: "transform var(--transition-base, 300ms ease)" }}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent 
          className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
          style={{ 
            transition: "height var(--transition-base, 300ms ease)",
          }}
        >
          <div className="px-6 pb-6 pt-2">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
