"use client";

import { useEffect, useState, useRef } from "react";

interface UseActiveSectionOptions {
  /**
   * Array of section IDs to observe
   */
  sectionIds: string[];
  /**
   * Root margin for the Intersection Observer
   * @default "-20% 0px -80% 0px"
   */
  rootMargin?: string;
  /**
   * Threshold for intersection detection
   * @default 0.1
   */
  threshold?: number;
}

/**
 * Custom hook that uses Intersection Observer to track which section is currently active
 * in the viewport. This is used by the NavigationSidebar to highlight the current section.
 * 
 * @param options Configuration options for the hook
 * @returns The ID of the currently active section, or null if none are active
 */
export function useActiveSection({
  sectionIds,
  rootMargin = "-20% 0px -80% 0px",
  threshold = 0.1,
}: UseActiveSectionOptions): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting entries
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        
        if (intersectingEntries.length === 0) {
          // No sections are intersecting, keep the current active section
          return;
        }

        // If multiple sections are intersecting, choose the one with the highest intersection ratio
        // or the first one in the document order if ratios are equal
        const mostVisible = intersectingEntries.reduce((prev, current) => {
          if (current.intersectionRatio > prev.intersectionRatio) {
            return current;
          }
          if (current.intersectionRatio === prev.intersectionRatio) {
            // If ratios are equal, prefer the one that appears first in the sectionIds array
            const currentIndex = sectionIds.indexOf(current.target.id);
            const prevIndex = sectionIds.indexOf(prev.target.id);
            return currentIndex < prevIndex ? current : prev;
          }
          return prev;
        });

        setActiveSection(mostVisible.target.id);
      },
      {
        rootMargin,
        threshold,
      }
    );

    // Observe all sections
    const elementsToObserve: Element[] = [];
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current!.observe(element);
        elementsToObserve.push(element);
      }
    });

    // If no elements were found to observe, set active section to null
    if (elementsToObserve.length === 0) {
      setActiveSection(null);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, rootMargin, threshold]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return activeSection;
}

export default useActiveSection;