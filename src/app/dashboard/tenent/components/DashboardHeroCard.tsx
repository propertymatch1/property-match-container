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

  const attributes = [
    {
      icon: Users,
      label: typcialCustomer.length > 0 ? typcialCustomer[0] : "General",
      color: "bg-[#6B7B6B]/10 text-[#6B7B6B]",
    },
    {
      icon: DollarSign,
      label: typcialCustomerSpend || "Not specified",
      color: "bg-[#C4A77D]/20 text-[#8B6914]",
    },
    {
      icon: Store,
      label: getBusinessStage(),
      color: "bg-blue-50 text-blue-700",
    },
    {
      icon: Rocket,
      label: getExpansionStatus(),
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  // Use logo as hero image or fallback to a gradient
  const heroImage = logoUrl || "/api/placeholder/1200/400";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pb-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-[#2D2D2D]/5 overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
            {logoUrl ? (
              <div className="w-full h-full bg-gradient-to-br from-[#6B7B6B] to-[#4A5A4A] flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt={brandName || "Brand"}
                  className="max-w-[60%] max-h-[60%] object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#6B7B6B] to-[#4A5A4A] flex items-center justify-center">
                <span className="text-white text-6xl font-bold">
                  {brandName?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Floating Category Badge */}
            {industry && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-sm text-[#2D2D2D] hover:bg-white/90 px-3 py-1.5 text-xs font-medium rounded-full shadow-lg">
                  {industry}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Brand Name & Location */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] tracking-tight mb-2">
                  {brandName || "Unnamed Business"}
                </h1>
                {cityNext.length > 0 && (
                  <div className="flex items-center gap-2 text-[#2D2D2D]/60">
                    <MapPin size={16} className="text-[#6B7B6B]" />
                    <span className="text-sm sm:text-base">
                      {cityNext.length === 1
                        ? cityNext[0]
                        : `${cityNext.join(", ")}`}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-full border-[#2D2D2D]/20 hover:bg-[#2D2D2D]/5 gap-2"
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button className="rounded-full bg-[#6B7B6B] hover:bg-[#5A6A5A] gap-2 shadow-lg shadow-[#6B7B6B]/20">
                  <MessageCircle size={16} />
                  <span className="hidden sm:inline">Request Intro</span>
                </Button>
              </div>
            </div>

            {/* Tagline */}
            {notes && (
              <p className="text-lg sm:text-xl text-[#2D2D2D]/70 leading-relaxed mb-8 max-w-2xl">
                {notes}
              </p>
            )}

            {/* Attribute Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {attributes.map((attr, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Badge
                    className={`${attr.color} hover:opacity-90 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full flex items-center gap-2 cursor-default`}
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
