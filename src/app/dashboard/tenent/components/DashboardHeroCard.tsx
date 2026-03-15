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
  neutral:
    "bg-[var(--warm-100)] text-[var(--warm-700)] border-[var(--warm-200)]",
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
      label:
        typcialCustomer.length > 0
          ? (typcialCustomer[0] ?? "General")
          : "General",
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
      <div className="mx-auto max-w-6xl">
        {/* Apply card-elevated utility class for consistent elevation */}
        <div className="card-elevated overflow-hidden">
          {/* Hero Image with enhanced gradient overlay */}
          <div className="relative h-48 overflow-hidden sm:h-64 md:h-80">
            {logoUrl ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--sage-400)] via-[var(--sage-500)] to-[var(--sage-700)]">
                <img
                  src={logoUrl}
                  alt={brandName || "Brand"}
                  className="max-h-[60%] max-w-[60%] object-contain drop-shadow-lg"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--sage-400)] via-[var(--sage-500)] to-[var(--sage-700)]">
                <span className="text-6xl font-bold text-white drop-shadow-lg sm:text-7xl md:text-8xl">
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
                <Badge className="rounded-full border border-white/20 bg-white/95 px-3 py-1.5 text-xs font-medium text-[var(--warm-800)] shadow-lg backdrop-blur-sm transition-colors duration-[var(--transition-fast)] hover:bg-white">
                  {industry}
                </Badge>
              </div>
            )}
          </div>

          {/* Content with improved spacing and layout */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Header row: Brand Name + CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              {/* Brand Name - Large and prominent */}
              <h1 className="text-3xl font-[var(--font-playfair)] font-semibold tracking-tight text-[var(--warm-900)] sm:text-4xl md:text-5xl">
                {brandName || "Unnamed Business"}
              </h1>

              {/* CTA Buttons - Touch-friendly with min-h-[44px] */}
              <div className="flex flex-shrink-0 gap-3">
                <Button
                  variant="outline"
                  className="min-h-[44px] gap-2 rounded-full border-[var(--warm-300)] px-4 text-[var(--warm-700)] transition-all duration-[var(--transition-base)] hover:border-[var(--warm-400)] hover:bg-[var(--warm-100)] hover:shadow-sm sm:px-5"
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button className="min-h-[44px] gap-2 rounded-full bg-[var(--sage-500)] px-4 shadow-[var(--sage-500)]/20 shadow-md transition-all duration-[var(--transition-base)] hover:bg-[var(--sage-600)] hover:shadow-[var(--sage-500)]/30 hover:shadow-lg sm:px-5">
                  <MessageCircle size={16} />
                  <span className="hidden sm:inline">Request Intro</span>
                </Button>
              </div>
            </div>

            {/* Location - Below brand name with proper spacing */}
            {cityNext.length > 0 && (
              <div className="mt-3 flex items-center gap-2 text-[var(--warm-500)]">
                <MapPin
                  size={18}
                  className="flex-shrink-0 text-[var(--sage-500)]"
                />
                <span className="text-base font-medium">
                  {cityNext.length === 1 ? cityNext[0] : cityNext.join(", ")}
                </span>
              </div>
            )}

            {/* Tagline/Notes - With breathing room */}
            {notes && (
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--warm-600)] sm:text-lg">
                {notes}
              </p>
            )}

            {/* Divider for visual separation */}
            <div className="my-6 border-t border-[var(--warm-200)] sm:my-8" />

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
                    className={`${badgeVariants[attr.variant]} flex cursor-default items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-opacity duration-[var(--transition-fast)] hover:opacity-90 sm:px-4 sm:text-sm`}
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
