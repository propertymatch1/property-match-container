"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Store, Sparkles, Building, Mail } from "lucide-react";
import { Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

// Custom hook for intersection observer (scroll-triggered animations)
function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback((element: HTMLElement | null, id: string) => {
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // If reduced motion is preferred, mark as visible immediately
      setVisibleElements(prev => new Set(prev).add(id));
      return;
    }

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const targetId = entry.target.getAttribute('data-animate-id');
              if (targetId) {
                setVisibleElements(prev => new Set(prev).add(targetId));
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
          ...options,
        }
      );
    }

    element.setAttribute('data-animate-id', id);
    observerRef.current.observe(element);
  }, [options]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { visibleElements, observe };
}

export default function HomePage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { visibleElements, observe } = useIntersectionObserver();

  // Refs for animated sections
  const statsRef = useRef<HTMLElement>(null);
  const whatWeDoRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);

  // Scroll detection for navigation border appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up intersection observers for each section
  useEffect(() => {
    observe(statsRef.current, 'stats');
    observe(whatWeDoRef.current, 'whatWeDo');
    observe(featuresRef.current, 'features');
    observe(howItWorksRef.current, 'howItWorks');
    observe(testimonialRef.current, 'testimonial');
    observe(ctaRef.current, 'cta');
    observe(missionRef.current, 'mission');
  }, [observe]);

  const handleNavigation = (route: string, errorContext: string) => {
    try {
      router.push(route);
    } catch (error) {
      console.error(`Navigation error (${errorContext}):`, error);
      toast.error("Unable to navigate. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--warm-50)]">
      {/* Enhanced Navigation with Glass-morphism */}
      <header 
        className={`sticky top-0 z-50 backdrop-blur-[12px] bg-[rgba(250,250,249,0.8)] transition-[border-color] duration-300 ${
          isScrolled ? "border-b border-[rgba(0,0,0,0.08)]" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Brand name with distinctive Playfair Display typography */}
          <h1 className="font-[var(--font-playfair)] text-xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-2xl">
            Identia
          </h1>
          <nav className="flex items-center gap-2 sm:gap-4 md:gap-8">
            {/* Nav links with underline hover animation - hidden on mobile, shown on md+ */}
            <div className="hidden md:flex md:items-center md:gap-8">
              <a 
                href="#brands" 
                className="nav-link relative text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                For Brands
              </a>
              <a 
                href="#landlords" 
                className="nav-link relative text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                For Landlords
              </a>
              <a 
                href="#how-it-works" 
                className="nav-link relative text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                How It Works
              </a>
              <a 
                href="#about" 
                className="nav-link relative text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                About
              </a>
            </div>
            <Button
              onClick={() => handleNavigation("/onboarding/tenent", "generate passport button")}
              className="min-h-[40px] bg-[var(--sage-500)] px-3 text-xs text-white transition-colors hover:bg-[var(--sage-600)] sm:min-h-[44px] sm:px-6 sm:text-sm"
              aria-label="Generate your brand passport"
            >
              <span className="hidden sm:inline">Generate Passport</span>
              <span className="sm:hidden">Generate</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Redesigned with layered background and visual accents */}
      <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-[var(--warm-50)] via-[var(--sage-50)] to-[var(--warm-100)] sm:min-h-[90vh]">
        {/* Decorative circle elements with absolute positioning - scaled for mobile */}
        <div 
          className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[rgba(107,124,110,0.08)] to-[rgba(107,124,110,0.02)] sm:-left-32 sm:-top-32 sm:h-96 sm:w-96"
          aria-hidden="true"
        />
        <div 
          className="absolute -right-10 top-1/4 h-36 w-36 rounded-full bg-gradient-to-br from-[rgba(107,124,110,0.06)] to-[rgba(107,124,110,0.01)] sm:-right-20 sm:h-72 sm:w-72"
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-gradient-to-br from-[rgba(212,165,116,0.08)] to-[rgba(212,165,116,0.02)] sm:h-48 sm:w-48"
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-8 right-1/3 h-32 w-32 rounded-full bg-gradient-to-br from-[rgba(107,124,110,0.05)] to-transparent sm:-bottom-16 sm:h-64 sm:w-64"
          aria-hidden="true"
        />

        {/* Hero content container */}
        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-12 sm:min-h-[90vh] sm:px-6 sm:py-20">
          <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              {/* Label */}
              <p className="label mb-4 text-[var(--sage-500)] sm:mb-6">
                Brand Identity Platform
              </p>
              
              {/* Hero headline with Playfair Display - responsive sizing */}
              <h2 className="font-[var(--font-playfair)] text-4xl font-semibold leading-tight tracking-tight text-[var(--warm-900)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Where Brands
                <br />
                <span className="text-[var(--sage-500)]">Find Their Space</span>
              </h2>
              
              {/* Subheadline with Inter - responsive sizing */}
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#4a5568] sm:mt-6 sm:text-lg lg:mx-0 lg:text-xl">
                Create your professional brand passport and connect with premium retail spaces that align with your vision.
              </p>
              
              {/* CTA buttons with enhanced styling - responsive layout */}
              <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 lg:justify-start">
                <Button
                  onClick={() => handleNavigation("/onboarding/tenent", "generate passport CTA")}
                  className="btn-primary w-full min-h-[48px] rounded-xl bg-[var(--sage-500)] px-6 text-sm font-medium text-white shadow-lg shadow-[var(--sage-500)]/20 transition-all duration-300 hover:bg-[var(--sage-600)] hover:shadow-xl hover:shadow-[var(--sage-500)]/30 sm:w-auto sm:min-h-[52px] sm:px-8 sm:text-base"
                  aria-label="Generate your brand passport"
                >
                  <span className="sm:hidden">Generate Passport</span>
                  <span className="hidden sm:inline">Generate Your Brand Passport</span>
                </Button>
                <button
                  onClick={() => handleNavigation("#how-it-works", "learn more link")}
                  className="btn-primary group flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[var(--warm-300)] bg-white/50 px-6 text-sm font-medium text-[var(--sage-800)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--sage-500)] hover:bg-white hover:text-[var(--sage-500)] sm:w-auto sm:min-h-[52px] sm:text-base"
                >
                  Learn how it works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right side - Abstract geometric visual accent */}
            <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
              <div className="relative h-[480px] w-[480px]">
                {/* Main geometric pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute h-[400px] w-[400px] rounded-full border-2 border-[var(--sage-500)]/10" />
                  
                  {/* Middle ring with gradient */}
                  <div className="absolute h-[320px] w-[320px] rounded-full border border-[var(--sage-500)]/20 bg-gradient-to-br from-[var(--sage-50)] to-transparent" />
                  
                  {/* Inner filled circle */}
                  <div className="absolute h-[240px] w-[240px] rounded-full bg-gradient-to-br from-[var(--sage-100)] to-[var(--sage-200)]/50 shadow-inner" />
                  
                  {/* Center accent */}
                  <div className="absolute h-[120px] w-[120px] rounded-full bg-gradient-to-br from-[var(--sage-500)] to-[var(--sage-400)] shadow-lg" />
                  
                  {/* Decorative dots */}
                  <div className="absolute -right-4 top-1/4 h-4 w-4 rounded-full bg-[var(--gold-400)]" />
                  <div className="absolute bottom-1/4 left-0 h-3 w-3 rounded-full bg-[var(--sage-500)]/60" />
                  <div className="absolute right-1/4 top-0 h-2 w-2 rounded-full bg-[var(--sage-300)]" />
                </div>
                
                {/* Floating accent shapes */}
                <div className="absolute -left-8 top-1/3 h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--sage-500)]/20 to-transparent backdrop-blur-sm" />
                <div className="absolute -right-4 bottom-1/3 h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--gold-400)]/30 to-transparent" />
                <div className="absolute bottom-8 left-1/4 h-8 w-8 rounded-lg bg-[var(--sage-200)]/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--warm-50)] to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* Stats/Social Proof Section */}
      <section 
        ref={statsRef}
        className={`relative bg-[var(--sage-50)] py-16 fade-in-section ${visibleElements.has('stats') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {/* Stat Item 1 */}
            <div className={`text-center fade-in-section stagger-1 ${visibleElements.has('stats') ? 'is-visible' : ''}`}>
              <p className="font-[var(--font-playfair)] text-5xl font-semibold tracking-tight text-[var(--warm-900)] md:text-6xl">
                500+
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-[var(--sage-500)]">
                Brands Connected
              </p>
            </div>

            {/* Stat Item 2 */}
            <div className={`text-center fade-in-section stagger-2 ${visibleElements.has('stats') ? 'is-visible' : ''}`}>
              <p className="font-[var(--font-playfair)] text-5xl font-semibold tracking-tight text-[var(--warm-900)] md:text-6xl">
                200+
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-[var(--sage-500)]">
                Premium Spaces
              </p>
            </div>

            {/* Stat Item 3 */}
            <div className={`text-center fade-in-section stagger-3 ${visibleElements.has('stats') ? 'is-visible' : ''}`}>
              <p className="font-[var(--font-playfair)] text-5xl font-semibold tracking-tight text-[var(--warm-900)] md:text-6xl">
                98%
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-[var(--sage-500)]">
                Match Success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section 
        ref={whatWeDoRef}
        className={`bg-white mx-auto max-w-7xl px-6 py-16 fade-in-section ${visibleElements.has('whatWeDo') ? 'is-visible' : ''}`}
      >
        <p className="mb-8 text-xs font-semibold uppercase tracking-wider text-[var(--sage-500)]">
          WHAT WE DO
        </p>
        <p className="max-w-3xl text-base leading-relaxed text-[var(--warm-800)]">
          Identia creates structured Brand Passports that help commercial brands present themselves clearly — and help decision-makers evaluate them with confidence.
        </p>
      </section>

      {/* Feature Cards Section - Enhanced with elevation and hover effects */}
      <section 
        id="brands" 
        ref={featuresRef}
        className={`bg-white mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 fade-in-section ${visibleElements.has('features') ? 'is-visible' : ''}`}
      >
        {/* Section header */}
        <div className="mb-8 text-center sm:mb-12">
          <p className="label mb-4 text-[var(--sage-500)]">Our Platform</p>
          <h2 className="font-[var(--font-playfair)] text-2xl font-medium leading-tight tracking-tight text-[var(--warm-900)] sm:text-3xl md:text-4xl">Built for Connection</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--warm-800)] sm:text-lg">
            Whether you&apos;re a brand seeking the perfect space or a landlord looking for ideal tenants, Identia bridges the gap.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* For Brands Card */}
          <div 
            className={`feature-card group cursor-pointer fade-in-section stagger-1 ${visibleElements.has('features') ? 'is-visible' : ''}`}
            onClick={() => handleNavigation("/onboarding/tenent", "brands generate passport")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigation("/onboarding/tenent", "brands generate passport");
              }
            }}
            aria-label="Generate your brand passport"
          >
            {/* Icon container with sage background */}
            <div className="feature-icon mb-4 sm:mb-6">
              <Store className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </div>
            <p className="label mb-2 text-[var(--sage-500)]">For Brands</p>
            <h3 className="font-[var(--font-playfair)] text-xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-2xl">
              Create Your Identity
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--warm-800)] sm:mt-4 sm:text-base">
              Build a professional brand passport that showcases your story, values, and vision — ready to share when opportunity knocks.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--sage-500)] transition-colors group-hover:text-[var(--sage-700)] sm:mt-8 sm:text-sm">
              Generate Passport
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" aria-hidden="true" />
            </div>
          </div>

          {/* AI-Powered Matching Card */}
          <div 
            className={`feature-card group cursor-pointer fade-in-section stagger-2 ${visibleElements.has('features') ? 'is-visible' : ''}`}
            onClick={() => handleNavigation("#how-it-works", "ai matching learn more")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigation("#how-it-works", "ai matching learn more");
              }
            }}
            aria-label="Learn about AI-powered matching"
          >
            {/* Icon container with sage background */}
            <div className="feature-icon mb-4 sm:mb-6">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </div>
            <p className="label mb-2 text-[var(--sage-500)]">Smart Technology</p>
            <h3 className="font-[var(--font-playfair)] text-xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-2xl">
              AI-Powered Matching
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--warm-800)] sm:mt-4 sm:text-base">
              Our intelligent algorithm analyzes brand profiles and space requirements to create perfect matches based on values, aesthetics, and goals.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--sage-500)] transition-colors group-hover:text-[var(--sage-700)] sm:mt-8 sm:text-sm">
              Learn How It Works
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" aria-hidden="true" />
            </div>
          </div>

          {/* For Landlords Card */}
          <div 
            id="landlords"
            className={`feature-card group cursor-pointer fade-in-section stagger-3 ${visibleElements.has('features') ? 'is-visible' : ''}`}
            onClick={() => handleNavigation("#how-it-works", "landlords explore")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigation("#how-it-works", "landlords explore");
              }
            }}
            aria-label="Explore landlord features"
          >
            {/* Icon container with sage background */}
            <div className="feature-icon mb-4 sm:mb-6">
              <Building className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </div>
            <p className="label mb-2 text-[var(--sage-500)]">For Landlords</p>
            <h3 className="font-[var(--font-playfair)] text-xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-2xl">
              Find Ideal Tenants
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--warm-800)] sm:mt-4 sm:text-base">
              Discover and evaluate brands through comprehensive, structured profiles — making informed decisions beyond traditional listings.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--sage-500)] transition-colors group-hover:text-[var(--sage-700)] sm:mt-8 sm:text-sm">
              Learn More
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        id="how-it-works" 
        ref={howItWorksRef}
        className={`bg-white py-12 sm:py-16 md:py-20 fade-in-section ${visibleElements.has('howItWorks') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section header */}
          <div className="mb-12 text-center sm:mb-16">
            <p className="label mb-4 text-[var(--sage-500)]">Simple Process</p>
            <h2 className="font-[var(--font-playfair)] text-2xl font-medium leading-tight tracking-tight text-[var(--warm-900)] sm:text-3xl md:text-4xl">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--warm-800)] sm:text-lg">
              Get matched with your perfect space in three simple steps
            </p>
          </div>

          {/* Three-step process */}
          <div className="relative">
            {/* Connecting line - hidden on mobile, visible on md+ */}
            <div 
              className="absolute left-1/2 top-6 hidden h-0.5 w-[calc(66.666%-4rem)] -translate-x-1/2 bg-gradient-to-r from-[var(--sage-200)] via-[var(--sage-500)] to-[var(--sage-200)] md:top-8 md:block"
              aria-hidden="true"
            />
            
            {/* Vertical connecting line for mobile */}
            <div 
              className="absolute left-6 top-12 h-[calc(100%-6rem)] w-0.5 bg-gradient-to-b from-[var(--sage-200)] via-[var(--sage-500)] to-[var(--sage-200)] sm:left-8 sm:top-16 sm:h-[calc(100%-8rem)] md:hidden"
              aria-hidden="true"
            />

            {/* Steps container */}
            <div className="relative grid gap-8 sm:gap-12 md:grid-cols-3 md:gap-8">
              {/* Step 1 */}
              <div className={`flex gap-4 sm:gap-6 md:flex-col md:items-center md:text-center fade-in-section stagger-1 ${visibleElements.has('howItWorks') ? 'is-visible' : ''}`}>
                {/* Step circle */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--sage-500)] to-[var(--sage-600)] shadow-lg shadow-[var(--sage-500)]/20 sm:h-16 sm:w-16">
                  <span className="font-[var(--font-playfair)] text-lg font-semibold text-white sm:text-2xl">1</span>
                </div>
                {/* Step content */}
                <div className="flex-1">
                  <h3 className="font-[var(--font-playfair)] text-lg font-semibold tracking-tight text-[var(--warm-900)] sm:text-xl md:mt-6">
                    Create Your Profile
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--warm-800)] sm:mt-3 sm:text-base">
                    Answer a few questions about your brand&apos;s story, values, and vision. Our AI-powered system builds your comprehensive brand passport.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`flex gap-4 sm:gap-6 md:flex-col md:items-center md:text-center fade-in-section stagger-2 ${visibleElements.has('howItWorks') ? 'is-visible' : ''}`}>
                {/* Step circle */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--sage-500)] to-[var(--sage-600)] shadow-lg shadow-[var(--sage-500)]/20 sm:h-16 sm:w-16">
                  <span className="font-[var(--font-playfair)] text-lg font-semibold text-white sm:text-2xl">2</span>
                </div>
                {/* Step content */}
                <div className="flex-1">
                  <h3 className="font-[var(--font-playfair)] text-lg font-semibold tracking-tight text-[var(--warm-900)] sm:text-xl md:mt-6">
                    Get Matched
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--warm-800)] sm:mt-3 sm:text-base">
                    Our intelligent algorithm analyzes your profile and matches you with premium retail spaces that align with your brand identity and goals.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`flex gap-4 sm:gap-6 md:flex-col md:items-center md:text-center fade-in-section stagger-3 ${visibleElements.has('howItWorks') ? 'is-visible' : ''}`}>
                {/* Step circle */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--sage-500)] to-[var(--sage-600)] shadow-lg shadow-[var(--sage-500)]/20 sm:h-16 sm:w-16">
                  <span className="font-[var(--font-playfair)] text-lg font-semibold text-white sm:text-2xl">3</span>
                </div>
                {/* Step content */}
                <div className="flex-1">
                  <h3 className="font-[var(--font-playfair)] text-lg font-semibold tracking-tight text-[var(--warm-900)] sm:text-xl md:mt-6">
                    Connect & Grow
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--warm-800)] sm:mt-3 sm:text-base">
                    Review your matches, connect with landlords directly, and find the perfect space to bring your brand vision to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section 
        ref={testimonialRef}
        className={`bg-[var(--sage-50)] py-12 sm:py-16 md:py-20 lg:py-24 fade-in-section ${visibleElements.has('testimonial') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* Large decorative quote mark - opening */}
          <div 
            className="mb-4 font-[var(--font-playfair)] text-5xl leading-none text-[var(--sage-200)] sm:mb-6 sm:text-7xl md:text-8xl"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          
          {/* Quote text with Playfair Display italic */}
          <blockquote>
            <p className="font-[var(--font-playfair)] text-lg font-normal italic leading-relaxed text-[var(--warm-800)] sm:text-xl md:text-2xl lg:text-3xl">
              Identia transformed how we present our brand to potential landlords. Within weeks of creating our passport, we connected with three premium spaces that perfectly aligned with our vision.
            </p>
          </blockquote>
          
          {/* Large decorative quote mark - closing */}
          <div 
            className="mt-4 font-[var(--font-playfair)] text-5xl leading-none text-[var(--sage-200)] sm:mt-6 sm:text-7xl md:text-8xl"
            aria-hidden="true"
          >
            &rdquo;
          </div>
          
          {/* Author attribution */}
          <div className="mt-6 sm:mt-8">
            <p className="font-[var(--font-inter)] text-sm font-semibold text-[var(--warm-900)] sm:text-base">
              Ethan Chen
            </p>
            <p className="mt-1 font-[var(--font-inter)] text-xs text-[var(--sage-500)] sm:text-sm">
              Founder & Creative Director, Identia
            </p>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section - Gradient Banner */}
      <section 
        ref={ctaRef}
        className={`bg-gradient-to-br from-[var(--sage-500)] to-[var(--sage-600)] py-12 sm:py-16 md:py-20 fade-in-section ${visibleElements.has('cta') ? 'is-visible' : ''}`}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          {/* Compelling headline */}
          <h2 className="font-[var(--font-playfair)] text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to Find Your Perfect Space?
          </h2>
          
          {/* Subtext */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base md:text-lg">
            Join hundreds of brands who have already discovered their ideal retail locations through Identia. Your brand passport is just minutes away.
          </p>
          
          {/* CTA Button - White on sage for contrast */}
          <Button
            onClick={() => handleNavigation("/onboarding/tenent", "secondary CTA button")}
            className="btn-primary mt-8 min-h-[48px] w-full rounded-xl bg-white px-8 text-sm font-semibold text-[var(--sage-500)] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-[var(--warm-100)] hover:shadow-xl sm:mt-10 sm:w-auto sm:min-h-[52px] sm:px-10 sm:text-base"
            aria-label="Start creating your brand passport"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section 
        id="about"
        ref={missionRef}
        className={`bg-white mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 fade-in-section ${visibleElements.has('mission') ? 'is-visible' : ''}`}
      >
        <p className="text-center text-xs italic text-[var(--sage-500)] sm:text-sm">
          Identia is building the foundation for how commercial brands are understood and evaluated.
        </p>
      </section>

      {/* Enhanced Footer - Multi-column layout */}
      <footer className="border-t border-[var(--warm-200)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          {/* Main footer content - Multi-column grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5">
            {/* Brand column with tagline */}
            <div className="sm:col-span-2 lg:col-span-2">
              <h4 className="font-[var(--font-playfair)] text-xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-2xl">
                Identia
              </h4>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--warm-800)] sm:mt-4 sm:text-base">
                A modern identity layer for commercial brands. Building the foundation for how brands are understood and evaluated.
              </p>
              {/* Social links section */}
              <div className="mt-4 flex items-center gap-3 sm:mt-6 sm:gap-4">
                <a 
                  href="https://twitter.com/identia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] hover:bg-[var(--sage-500)] hover:text-white sm:h-10 sm:w-10"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://linkedin.com/company/identia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] hover:bg-[var(--sage-500)] hover:text-white sm:h-10 sm:w-10"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </a>
                <a 
                  href="mailto:hello@identia.com"
                  className="social-icon flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage-50)] text-[var(--sage-500)] hover:bg-[var(--sage-500)] hover:text-white sm:h-10 sm:w-10"
                  aria-label="Email us"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* For Brands column */}
            <div>
              <h5 className="label mb-3 text-[var(--warm-900)] sm:mb-4">For Brands</h5>
              <nav className="flex flex-col gap-2 sm:gap-3">
                <a 
                  href="#brands" 
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  How It Works
                </a>
                <button
                  onClick={() => handleNavigation("/onboarding/tenent", "footer get started")}
                  className="text-left text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Get Started
                </button>
              </nav>
            </div>

            {/* Resources column */}
            <div>
              <h5 className="label mb-3 text-[var(--warm-900)] sm:mb-4">Resources</h5>
              <nav className="flex flex-col gap-2 sm:gap-3">
                <a 
                  href="#about" 
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  About Us
                </a>
                <a 
                  href="#" 
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Blog
                </a>
                <a 
                  href="#" 
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Help Center
                </a>
                <a 
                  href="mailto:support@identia.com" 
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Connect column */}
            <div>
              <h5 className="label mb-3 text-[var(--warm-900)] sm:mb-4">Connect</h5>
              <nav className="flex flex-col gap-2 sm:gap-3">
                <a 
                  href="https://twitter.com/identia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Twitter
                </a>
                <a 
                  href="https://linkedin.com/company/identia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:hello@identia.com"
                  className="text-xs text-[var(--warm-800)] transition-colors hover:text-[var(--sage-500)] sm:text-sm"
                >
                  Email
                </a>
              </nav>
            </div>
          </div>

          {/* Copyright bar with legal links */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--warm-200)] pt-6 sm:mt-16 sm:flex-row sm:gap-4 sm:pt-8">
            <p className="text-xs text-[var(--sage-500)] sm:text-sm">
              © {new Date().getFullYear()} Identia. All rights reserved.
            </p>
            <nav className="flex items-center gap-4 sm:gap-6">
              <a 
                href="#" 
                className="text-xs text-[var(--sage-500)] transition-colors hover:text-[var(--sage-700)] sm:text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-xs text-[var(--sage-500)] transition-colors hover:text-[var(--sage-700)] sm:text-sm"
              >
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}