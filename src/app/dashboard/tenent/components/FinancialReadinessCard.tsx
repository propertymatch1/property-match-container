"use client";

import * as React from "react";
import { DollarSign, CheckCircle2 } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

interface FinancialReadinessCardProps {
  rentRangeDesire: number | null;
}

export function FinancialReadinessCard({
  rentRangeDesire,
}: FinancialReadinessCardProps) {
  // Generate preview text
  const getPreview = () => {
    if (rentRangeDesire) {
      return `Budget: ${formatCurrency(rentRangeDesire)}/mo`;
    }
    return "Financial information pending";
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

  // Calculate progress percentage for budget visualization (assuming max of $50k/month)
  const getBudgetProgress = (budget: number) => {
    const maxBudget = 50000;
    return Math.min((budget / maxBudget) * 100, 100);
  };

  return (
    <CollapsibleSection
      title="Financial Readiness"
      icon={DollarSign}
      preview={getPreview()}
      defaultOpen={false}
      accentColor="#6366F1"
    >
      <div className="space-y-6">
        {/* Readiness Status */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#6366F1]" />
            <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
              Readiness Status
            </h4>
          </div>
          <Badge
            className={`${
              rentRangeDesire
                ? "bg-indigo-50 text-indigo-700"
                : "bg-gray-50 text-gray-600"
            } hover:opacity-90 px-4 py-2 text-sm rounded-full`}
          >
            {rentRangeDesire ? "Budget Defined" : "Pending"}
          </Badge>
        </div>

        {/* Budget Information */}
        {rentRangeDesire && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-[#6366F1]" />
              <h4 className="text-sm font-semibold text-[#2D2D2D]/60 uppercase tracking-wide">
                Monthly Rent Budget
              </h4>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-50/50 rounded-xl p-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-[#2D2D2D]">
                  {formatCurrency(rentRangeDesire)}
                </span>
                <span className="text-sm text-[#2D2D2D]/60">/month</span>
              </div>
              <Progress
                value={getBudgetProgress(rentRangeDesire)}
                className="h-2 bg-indigo-100"
              />
              <p className="text-xs text-[#2D2D2D]/60">
                Allocated monthly budget for commercial space rent
              </p>
            </div>
          </div>
        )}

        {/* Placeholder for future features */}
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-[#2D2D2D]/60">
            Additional financial details (funding status, documents) coming soon
          </p>
        </div>

        {/* Empty State */}
        {!rentRangeDesire && (
          <p className="text-[#2D2D2D]/60 text-center py-4">
            No financial information available yet.
          </p>
        )}
      </div>
    </CollapsibleSection>
  );
}
