"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

interface CardGroupSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'highlighted' | 'subtle';
}

/**
 * CardGroupSection provides visual grouping for related dashboard cards
 * with subtle background sections and visual flow indicators.
 */
export default function CardGroupSection({
  children,
  className,
  title,
  subtitle,
  variant = 'default',
}: CardGroupSectionProps) {
  return (
    <section 
      className={cn(
        "card-group-section",
        variant === 'highlighted' && "card-group-highlighted",
        variant === 'subtle' && "card-group-subtle",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-xl font-semibold text-[var(--warm-800)] mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-[var(--warm-600)] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export { CardGroupSection };