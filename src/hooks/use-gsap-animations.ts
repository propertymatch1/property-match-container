"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPAnimations() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create main timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Hero section animations
    tl.fromTo(".hero-content", 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    )
    .fromTo(".hero-cta", 
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6"
    )
    .fromTo(".hero-visual", 
      { 
        opacity: 0, 
        scale: 0.8,
        rotation: -5
      },
      { 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      }, "-=1"
    );

    // Floating animation for hero visual elements
    gsap.to(".hero-visual .floating-element", {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    // Stats section with counter animation
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".stat-number", 
          { 
            opacity: 0,
            scale: 0.5
          },
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power2.out",
            stagger: 0.2,
            onStart: function() {
              // Initialize counter for each element
              this.targets().forEach((target: any) => {
                const finalValue = parseInt(target.getAttribute("data-value") || "0");
                const suffix = target.getAttribute("data-suffix") || "";
                const counter = { value: 0 };
                
                gsap.to(counter, {
                  value: finalValue,
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: () => {
                    target.textContent = Math.ceil(counter.value) + suffix;
                  }
                });
              });
            }
          }
        );
      }
    });

    // Feature cards with stagger animation
    ScrollTrigger.create({
      trigger: ".features-section",
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(".feature-card", 
          { 
            opacity: 0, 
            y: 80,
            rotationX: 15
          },
          { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
          }
        );
      }
    });

    // How it works section with timeline animation
    ScrollTrigger.create({
      trigger: ".how-it-works-section",
      start: "top 70%",
      onEnter: () => {
        const steps = gsap.timeline();
        
        // Animate connecting line
        steps.fromTo(".connecting-line", 
          { 
            scaleX: 0,
            transformOrigin: "left center"
          },
          { 
            scaleX: 1,
            duration: 1.5,
            ease: "power2.out"
          }
        )
        // Animate step circles
        .fromTo(".step-circle", 
          { 
            scale: 0,
            rotation: 180
          },
          { 
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.3
          }, "-=1"
        )
        // Animate step content
        .fromTo(".step-content", 
          { 
            opacity: 0, 
            x: -30 
          },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.3
          }, "-=1.2"
        );
      }
    });

    // Testimonial section with elegant fade
    ScrollTrigger.create({
      trigger: ".testimonial-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".testimonial-content", 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          }
        );
      }
    });

    // CTA section with attention-grabbing animation
    ScrollTrigger.create({
      trigger: ".cta-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".cta-content", 
          { 
            opacity: 0, 
            scale: 0.9,
            y: 40
          },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          }
        );
      }
    });

    // Parallax effect for decorative elements
    gsap.utils.toArray(".parallax-element").forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Hover animations for interactive elements
    const interactiveElements = gsap.utils.toArray(".gsap-hover");
    interactiveElements.forEach((element: any) => {
      const hoverTl = gsap.timeline({ paused: true });
      
      hoverTl.to(element, {
        scale: 1.05,
        y: -8,
        duration: 0.3,
        ease: "power2.out"
      });

      element.addEventListener("mouseenter", () => hoverTl.play());
      element.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return timelineRef;
}

// Utility function for creating custom GSAP animations
export function createGSAPAnimation(
  target: string | Element,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  trigger?: string | Element
) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  if (trigger) {
    return ScrollTrigger.create({
      trigger,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(target, fromVars, toVars);
      }
    });
  } else {
    return gsap.fromTo(target, fromVars, toVars);
  }
}

// Utility for text reveal animations
export function animateTextReveal(target: string | Element, delay = 0) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return gsap.fromTo(target, 
    {
      opacity: 0,
      y: 30,
      skewY: 3
    },
    {
      opacity: 1,
      y: 0,
      skewY: 0,
      duration: 0.8,
      ease: "power3.out",
      delay
    }
  );
}