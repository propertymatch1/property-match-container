"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface EnhancedTypewriterHeroProps {
  className?: string;
}

export function EnhancedTypewriterHero({ className = "" }: EnhancedTypewriterHeroProps) {
  const dynamicTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const taglines = [
    { text: "Find Their Space", color: "#6b7c6e" },
    { text: "Tell Their Story", color: "#d4a574" },
    { text: "Build Their Future", color: "#7d8f81" },
    { text: "Create Their Impact", color: "#c4956a" },
    { text: "Live Their Vision", color: "#6b7c6e" },
    { text: "Shape Their Legacy", color: "#a3b1a6" },
    { text: "Express Their Soul", color: "#d4a574" },
    { text: "Claim Their Ground", color: "#556259" }
  ];

  useEffect(() => {
    if (!dynamicTextRef.current || !cursorRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const firstTagline = taglines[0];
      if (firstTagline) {
        dynamicTextRef.current.textContent = firstTagline.text;
      }
      cursorRef.current.style.display = 'none';
      return;
    }

    const dynamicElement = dynamicTextRef.current;
    const cursorElement = cursorRef.current;
    let currentTaglineIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    gsap.to(cursorElement, {
      opacity: 0,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    function typeWriter() {
      const currentTagline = taglines[currentTaglineIndex];
      if (!currentTagline) return;
      
      if (!isDeleting) {
        const currentText = currentTagline.text.substring(0, charIndex + 1);
        charIndex++;
        
        dynamicElement.textContent = currentText;
        dynamicElement.style.color = currentTagline.color;
        
        if (charIndex === currentTagline.text.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 3000);
          return;
        }
      } else {
        const currentText = currentTagline.text.substring(0, charIndex - 1);
        charIndex--;
        
        dynamicElement.textContent = currentText;
        
        if (charIndex === 0) {
          isDeleting = false;
          currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
          timeoutId = setTimeout(typeWriter, 500);
          return;
        }
      }
      
      const speed = isDeleting ? 40 : 100;
      timeoutId = setTimeout(typeWriter, speed + Math.random() * 50);
    }

    timeoutId = setTimeout(typeWriter, 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      gsap.killTweensOf(cursorElement);
    };
  }, []);

  return (
    <span className={className}>
      <span className="text-[var(--warm-900)]">Where Brands </span>
      <span 
        ref={dynamicTextRef} 
        className="font-medium"
        style={{ color: "var(--sage-500)" }}
      >
        Find Their Space
      </span>
      <span 
        ref={cursorRef}
        className="inline-block w-[3px] ml-1 rounded-sm align-baseline"
        style={{ 
          background: "var(--sage-500)",
          height: "0.85em"
        }}
        aria-hidden="true"
      />
    </span>
  );
}
