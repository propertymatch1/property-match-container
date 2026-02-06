"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * BentoGrid component provides a responsive CSS Grid layout for dashboard cards.
 * 
 * Breakpoint behavior:
 * - Mobile (<640px): 1 column
 * - Tablet (640px-1024px): 2 columns  
 * - Desktop (≥1024px): 3 columns
 * 
 * Cards can use CSS classes to control their span:
 * - .bento-card-standard: 1 column span (default)
 * - .bento-card-featured: 2 column span on tablet+, 1 column on mobile
 */
export default function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("bento-grid", className)}>
      {children}
    </div>
  );
}

// Export the component as named export as well for flexibility
export { BentoGrid };