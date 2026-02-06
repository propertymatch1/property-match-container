"use client";

import { cn } from "~/lib/utils";

interface DecorativeBackgroundProps {
  variant?: 'subtle' | 'prominent';
  className?: string;
}

/**
 * DecorativeBackground component provides CSS-only gradient patterns and subtle decorative elements
 * using the sage color palette. Designed for performance with no JavaScript animations.
 * 
 * Features:
 * - CSS-only gradient overlays using sage palette
 * - Subtle geometric patterns with pseudo-elements
 * - Respects prefers-reduced-motion for accessibility
 * - Two variants: subtle (default) and prominent
 * - Mobile-responsive with reduced decorative elements on small screens
 * 
 * Requirements: 5.1, 5.2
 */
export function DecorativeBackground({ 
  variant = 'subtle', 
  className 
}: DecorativeBackgroundProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        "decorative-background",
        variant === 'prominent' && "decorative-background--prominent",
        className
      )}
      aria-hidden="true"
    >
      {/* Primary gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--sage-50)]/30 via-[var(--warm-50)]/20 to-[var(--sage-100)]/40" />
      
      {/* Secondary gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--sage-200)]/10 to-[var(--sage-300)]/15" />
      
      {/* Decorative geometric elements - hidden on mobile for performance */}
      <div className="decorative-desktop-only">
        {/* Large subtle circle - top left */}
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--sage-200)]/8 to-[var(--sage-300)]/4 blur-sm" />
        
        {/* Medium circle - top right */}
        <div className="absolute -right-24 top-16 h-48 w-48 rounded-full bg-gradient-to-bl from-[var(--sage-100)]/12 to-[var(--warm-200)]/6" />
        
        {/* Small accent circle - bottom left */}
        <div className="absolute bottom-32 left-16 h-32 w-32 rounded-full bg-gradient-to-tr from-[var(--gold-300)]/8 to-[var(--gold-400)]/4" />
        
        {/* Elongated oval - bottom right */}
        <div className="absolute -bottom-16 -right-16 h-40 w-56 rounded-full bg-gradient-to-tl from-[var(--sage-300)]/6 to-transparent transform rotate-12" />
      </div>
      
      {/* Subtle texture overlay using CSS patterns */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, var(--sage-200, #c7d0c9) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, var(--sage-100, #e3e7e4) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 32px 32px',
            backgroundPosition: '0 0, 16px 16px'
          }}
        />
      </div>
      
      {/* Prominent variant additional elements */}
      {variant === 'prominent' && (
        <>
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--sage-400)]/5 via-transparent to-[var(--sage-500)]/8" />
          
          {/* Additional decorative elements for prominent variant */}
          <div className="decorative-desktop-only">
            {/* Diagonal gradient stripe */}
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-[var(--sage-400)]/20 to-transparent transform rotate-12 origin-top" />
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-[var(--sage-300)]/10 to-transparent" />
          </div>
        </>
      )}
    </div>
  );
}

export default DecorativeBackground;