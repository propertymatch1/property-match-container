"use client";

import { useEffect, useState } from "react";

export function GSAPLoader({ children }: { children: React.ReactNode }) {
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    // Check if GSAP is available
    const checkGSAP = () => {
      if (typeof window !== "undefined") {
        try {
          // Try to import GSAP
          import("gsap").then(() => {
            setGsapLoaded(true);
            document.documentElement.classList.add("gsap-loaded");
          }).catch(() => {
            // Fallback to CSS animations
            document.documentElement.classList.add("no-gsap");
            setGsapLoaded(false);
          });
        } catch (error) {
          document.documentElement.classList.add("no-gsap");
          setGsapLoaded(false);
        }
      }
    };

    checkGSAP();
  }, []);

  return (
    <div className={gsapLoaded ? "gsap-ready" : "gsap-loading"}>
      {children}
    </div>
  );
}