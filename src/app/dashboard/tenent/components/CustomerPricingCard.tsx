"use client";

import * as React from "react";
import { Users, DollarSign, Heart, Sparkles, Clock, Star } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Badge } from "~/components/ui/badge";

interface CustomerPricingCardProps {
  typcialCustomer: string[];
  typcialCustomerSpend: string | null;
  rentRangeDesire: number | null;
}

const customerTypeColors: Record<string, string> = {
  "Young Professionals": "bg-purple-50 text-purple-700 border-purple-200",
  Families: "bg-blue-50 text-blue-700 border-blue-200",
  "Gen-Z": "bg-pink-50 text-pink-700 border-pink-200",
  Students: "bg-amber-50 text-amber-700 border-amber-200",
  Tourists: "bg-teal-50 text-teal-700 border-teal-200",
  "Luxury Shoppers": "bg-rose-50 text-rose-700 border-rose-200",
  "Health Conscious": "bg-green-50 text-green-700 border-green-200",
  "Remote Workers": "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const motivationIcons: Record<string, React.ElementType> = {
  Quality: Star,
  Convenience: Clock,
  Aesthetic: Sparkles,
  Community: Heart,
};

// Infer motivations from customer types (this is a simple heuristic)
const inferMotivations = (customers: string[]): string[] => {
  const motivations = new Set<string>();
  
  customers.forEach((customer) => {
    if (customer.includes("Professional") || customer.includes("Remote")) {
      motivations.add("Convenience");
      motivations.add("Quality");
    }
    if (customer.includes("Gen-Z") || customer.includes("Young")) {
      motivations.add("Aesthetic");
    }
    if (customer.includes("Health")) {
      motivations.add("Quality");
    }
    if (customer.includes("Families")) {
      motivations.add("Community");
    }
  });
  
  // Default motivations if none inferred
  if (motivations.size === 0) {
    return ["Quality", "Convenience"];
  }
  
  return Array.from(motivations);
};

export function CustomerPricingCard({
  typcialCustomer,
  typcialCustomerSpend,
  rentRangeDesire,
}: CustomerPricingCardProps) {
  // Generate preview text
  const getPreview = () => {
    const parts: string[] = [];
    if (typcialCustomer.length > 0) {
      parts.push(typcialCustomer.slice(0, 3).join(", "));
    }
    if (typcialCustomerSpend) {
      parts.push(typcialCustomerSpend);
    }
    return parts.join(" • ");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const motivations = inferMotivations(typcialCustomer);

  return (
    <CollapsibleSection
      title="Customer & Pricing"
      icon={Users}
      preview={getPreview()}
      defaultOpen={false}
      accentColor="#C4A77D"
    >
      <div className="space-y-6">
        {/* Target Customers */}
        {typcialCustomer.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide mb-3">
              Target Customers
            </h4>
            <div className="flex flex-wrap gap-2">
              {typcialCustomer.map((customer, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`${
                    customerTypeColors[customer] ||
                    "bg-gray-50 text-gray-700 border-gray-200"
                  } px-3 py-1.5 text-sm font-medium rounded-full cursor-default`}
                >
                  {customer}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Spend Range */}
        {typcialCustomerSpend && (
          <div className="bg-[#FAF9F7] rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C4A77D]/20 flex items-center justify-center">
                <DollarSign size={18} className="text-[#8B6914]" />
              </div>
              <div>
                <p className="text-sm text-[#2D2D2D]/60">
                  Customer Spend Range
                </p>
                <p className="text-xl font-semibold text-[#2D2D2D]">
                  {typcialCustomerSpend}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Rent Budget (if available) */}
        {rentRangeDesire && (
          <div className="bg-[#FAF9F7] rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C4A77D]/20 flex items-center justify-center">
                <DollarSign size={18} className="text-[#8B6914]" />
              </div>
              <div>
                <p className="text-sm text-[#2D2D2D]/60">Monthly Rent Budget</p>
                <p className="text-xl font-semibold text-[#2D2D2D]">
                  {formatCurrency(rentRangeDesire)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Motivations */}
        {motivations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide mb-3">
              What Draws Customers
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {motivations.map((motivation, index) => {
                const Icon = motivationIcons[motivation] || Heart;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#6B7B6B]/5 border border-[#6B7B6B]/10"
                  >
                    <Icon size={18} className="text-[#6B7B6B]" />
                    <span className="text-sm font-medium text-[#2D2D2D]">
                      {motivation}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {typcialCustomer.length === 0 &&
          !typcialCustomerSpend &&
          !rentRangeDesire && (
            <p className="text-[#2D2D2D]/60 text-center py-4">
              No customer or pricing information available yet.
            </p>
          )}
      </div>
    </CollapsibleSection>
  );
}
