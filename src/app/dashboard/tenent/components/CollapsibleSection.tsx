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
  sectionId?: string; // For scroll-to navigation
  variant?: "standard" | "featured"; // For bento grid layout
}

export default function CollapsibleSection({
  title,
  icon: Icon,
  preview,
  defaultOpen = false,
  accentColor = "var(--sage-500, #6B7B6B)",
  children,
  sectionId,
  variant = "standard",
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        id={sectionId}
        className={cn(
          "card-elevated overflow-hidden",
          variant === "featured"
            ? "bento-card-featured"
            : "bento-card-standard",
        )}
        style={{ borderRadius: "var(--radius-2xl, 1.5rem)" }}
        data-state={isOpen ? "open" : "closed"}
      >
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full cursor-pointer items-center justify-between px-6 py-5",
              "hover:bg-[var(--warm-50)]/50 active:bg-[var(--warm-100)]/50",
              "focus-visible:ring-2 focus-visible:ring-[var(--sage-500)] focus-visible:outline-none focus-visible:ring-inset",
              "transition-colors",
            )}
            style={{
              borderLeft: `4px solid ${accentColor}`,
              transitionDuration: "var(--transition-fast, 150ms)",
            }}
          >
            <div className="flex flex-1 items-center gap-3 text-left">
              <div
                className="p-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                  color: accentColor,
                  borderRadius: "var(--radius-lg, 0.75rem)",
                  transition:
                    "background-color var(--transition-base, 300ms ease)",
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
                    className="mt-1 line-clamp-1 text-sm text-[var(--warm-500,#78716c)]"
                    style={{
                      transition: "opacity var(--transition-base, 300ms ease)",
                    }}
                  >
                    {preview}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown
              size={20}
              className={cn(
                "flex-shrink-0 text-[var(--warm-400,#a8a29e)]",
                isOpen && "rotate-180",
              )}
              style={{
                transition: "transform var(--transition-base, 300ms ease)",
              }}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent
          className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up"
          style={{
            transition: "height var(--transition-base, 300ms ease)",
          }}
        >
          <div
            className={cn(
              "px-6 pt-2 pb-6",
              variant === "featured" && "collapsible-content",
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
