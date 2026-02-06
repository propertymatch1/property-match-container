"use client";

import React from "react";
import { 
  BookOpen, 
  Users, 
  Building2, 
  Rocket, 
  DollarSign, 
  Camera,
  type LucideIcon 
} from "lucide-react";
import { cn } from "~/lib/utils";
import { useActiveSection } from "../hooks/useActiveSection";

interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavigationSidebarProps {
  sections: SidebarSection[];
  onSectionClick?: (sectionId: string) => void;
}

// Dashboard sections configuration as defined in the design document
export const DASHBOARD_SECTIONS: SidebarSection[] = [
  { id: 'brand-story', label: 'Brand Story', icon: BookOpen },
  { id: 'customer-pricing', label: 'Customer & Pricing', icon: Users },
  { id: 'operations', label: 'Operations', icon: Building2 },
  { id: 'expansion', label: 'Expansion', icon: Rocket },
  { id: 'financial', label: 'Financial', icon: DollarSign },
  { id: 'media', label: 'Media & Social', icon: Camera },
];

export function NavigationSidebar({
  sections,
  onSectionClick,
}: NavigationSidebarProps) {
  // Use the Intersection Observer hook to automatically detect active section
  const activeSection = useActiveSection({
    sectionIds: sections.map(section => section.id),
    rootMargin: "-20% 0px -80% 0px", // Section is active when it's in the middle 60% of viewport
    threshold: 0.1,
  });

  const handleSectionClick = (sectionId: string) => {
    // Call optional callback
    onSectionClick?.(sectionId);
    
    // Smooth scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <aside className="hidden lg:block w-60 flex-shrink-0">
      <div className="sticky top-8 space-y-2">
        {/* Sidebar Header */}
        <div className="px-4 py-3 mb-4">
          <h2 className="text-sm font-semibold text-[var(--warm-500)] uppercase tracking-wide">
            Dashboard Sections
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;
            
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-[var(--transition-fast)]",
                  "hover:bg-[var(--warm-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage-500)] focus-visible:ring-inset",
                  "min-h-[44px]", // Touch-friendly minimum height
                  isActive
                    ? "bg-[var(--sage-100)] text-[var(--sage-700)] border-l-4 border-[var(--sage-500)] shadow-sm"
                    : "text-[var(--warm-600)] hover:text-[var(--warm-800)] border-l-4 border-transparent"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg transition-colors duration-[var(--transition-fast)]",
                    isActive
                      ? "bg-[var(--sage-200)] text-[var(--sage-700)]"
                      : "bg-[var(--warm-100)] text-[var(--warm-500)] group-hover:bg-[var(--warm-200)]"
                  )}
                >
                  <Icon size={18} />
                </div>
                <span className="font-medium text-sm">
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Decorative Element */}
        <div className="mt-8 px-4 decorative-desktop-only">
          <div className="h-px bg-gradient-to-r from-[var(--sage-200)] via-[var(--sage-300)] to-transparent" />
        </div>
      </div>
    </aside>
  );
}

export default NavigationSidebar;