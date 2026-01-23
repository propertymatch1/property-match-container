"use client";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Share2,
  MessageCircle,
  MapPin,
  Users,
  DollarSign,
  Rocket,
  Store,
} from "lucide-react";
import { motion } from "motion/react";

interface DashboardHeroCardProps {
  brandName: string | null;
  logoUrl: string | null;
  industry: string | null;
  typcialCustomer: string[];
  typcialCustomerSpend: string | null;
  spaceLooking: string[];
  cityNext: string[];
  whenNextOpen: string | null;
  notes: string | null;
}

// Badge variant styles using design tokens
const badgeVariants = {
  sage: "bg-[var(--sage-100)] text-[var(--sage-700)] border-[var(--sage-200)]",
  gold: "bg-[var(--gold-300)]/20 text-[var(--gold-600)] border-[var(--gold-400)]/30",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  neutral: "bg-[var(--warm-100)] text-[var(--warm-700)] border-[var(--warm-200)]",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export function DashboardHeroCard({
  brandName,
  logoUrl,
  industry,
  typcialCustomer,
  typcialCustomerSpend,
  spaceLooking,
  cityNext,
  whenNextOpen,
  notes,
}: DashboardHeroCardProps) {
  // Determine business stage based on space types
  const getBusinessStage = () => {
    if (spaceLooking.includes("Pop-up")) return "Pop-up";
    if (spaceLooking.includes("Kiosk")) return "Emerging";
    if (spaceLooking.includes("Inline")) return "Established";
    return "Growing";
  };

  // Determine expansion status
  const getExpansionStatus = () => {
    if (!whenNextOpen) return "Planning";
    if (whenNextOpen.toLowerCase().includes("month")) return "Active";
    if (whenNextOpen.toLowerCase().includes("year")) return "Long-term";
    return "Exploring";
  };

  const attributes: Array<{
    icon: typeof Users;
    label: string;
    variant: BadgeVariant;
  }> = [
    {
      icon: Users,
      label: typcialCustomer.length > 0 ? (typcialCustomer[0] ?? "General") : "General",
      variant: "sage",
    },
    {
      icon: DollarSign,
      label: typcialCustomerSpend || "Not specified",
      variant: "gold",
    },
    {
      icon: Store,
      label: getBusinessStage(),
      variant: "blue",
    },
    {
      icon: Rocket,
      label: getExpansionStatus(),
      variant: "emerald",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pb-[var(--space-8)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Apply card-elevated utility class for consistent elevation */}
        <div className="card-elevated overflow-hidden">
          {/* Hero Image with enhanced gradient overlay */}
          <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
            {logoUrl ? (
              <div className="w-full h-full bg-gradient-to-br from-[var(--sage-400)] via-[var(--sage-500)] to-[var(--sage-700)] flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt={brandName || "Brand"}
                  className="max-w-[60%] max-h-[60%] object-contain drop-shadow-lg"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--sage-400)] via-[var(--sage-500)] to-[var(--sage-700)] flex items-center justify-center">
                <span className="text-white text-6xl sm:text-7xl md:text-8xl font-bold drop-shadow-lg">
                  {brandName?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
            )}
            {/* Multi-layer gradient overlay for depth and visual interest */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--sage-900)]/10 via-transparent to-[var(--sage-900)]/20" />

            {/* Floating Category Badge */}
            {industry && (
              <div className="absolute top-[var(--space-4)] left-[var(--space-4)]">
                <Badge className="bg-white/95 backdrop-blur-sm text-[var(--warm-800)] hover:bg-white px-3 py-1.5 text-xs font-medium rounded-full shadow-lg border border-white/20 transition-colors duration-[var(--transition-fast)]">
                  {industry}
                </Badge>
              </div>
            )}
          </div>

          {/* Content with improved spacing and layout */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Header row: Brand Name + CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
              {/* Brand Name - Large and prominent */}
              <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--warm-900)]">
                {brandName || "Unnamed Business"}
              </h1>

              {/* CTA Buttons - Touch-friendly with min-h-[44px] */}
              <div className="flex gap-3 flex-shrink-0">
                <Button
                  variant="outline"
                  className="rounded-full min-h-[44px] px-4 sm:px-5 border-[var(--warm-300)] text-[var(--warm-700)] hover:bg-[var(--warm-100)] hover:border-[var(--warm-400)] hover:shadow-sm gap-2 transition-all duration-[var(--transition-base)]"
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button 
                  className="rounded-full min-h-[44px] px-4 sm:px-5 bg-[var(--sage-500)] hover:bg-[var(--sage-600)] gap-2 shadow-md shadow-[var(--sage-500)]/20 hover:shadow-lg hover:shadow-[var(--sage-500)]/30 transition-all duration-[var(--transition-base)]"
                >
                  <MessageCircle size={16} />
                  <span className="hidden sm:inline">Request Intro</span>
                </Button>
              </div>
            </div>

            {/* Location - Below brand name with proper spacing */}
            {cityNext.length > 0 && (
              <div className="flex items-center gap-2 mt-3 text-[var(--warm-500)]">
                <MapPin size={18} className="text-[var(--sage-500)] flex-shrink-0" />
                <span className="text-base font-medium">
                  {cityNext.length === 1
                    ? cityNext[0]
                    : cityNext.join(", ")}
                </span>
              </div>
            )}

            {/* Tagline/Notes - With breathing room */}
            {notes && (
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--warm-600)] max-w-3xl">
                {notes}
              </p>
            )}

            {/* Divider for visual separation */}
            <div className="my-6 sm:my-8 border-t border-[var(--warm-200)]" />

            {/* Attribute Chips - Well spaced */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {attributes.map((attr, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Badge
                    className={`${badgeVariants[attr.variant]} border hover:opacity-90 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full flex items-center gap-2 cursor-default transition-opacity duration-[var(--transition-fast)]`}
                  >
                    <attr.icon size={14} />
                    {attr.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
