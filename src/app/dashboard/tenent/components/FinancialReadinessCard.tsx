"use client";

import * as React from "react";
import { DollarSign, CheckCircle2 } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";

interface FinancialReadinessCardProps {
  rentRangeDesire: number | null;
}

// Icon sizes standardized to design system: 16px (small), 20px (standard), 24px (large)
const ICON_SIZE = {
  small: 16,
  standard: 20,
  large: 24,
} as const;

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
      accentColor="var(--gold-500, #c4956a)"
    >
      <div className="space-y-[var(--space-6,1.5rem)]">
        {/* Readiness Status */}
        <div className="space-y-[var(--space-3,0.75rem)]">
          <div className="flex items-center gap-[var(--space-2,0.5rem)]">
            <CheckCircle2 size={ICON_SIZE.standard} className="text-[var(--gold-500,#c4956a)]" />
            <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
              Readiness Status
            </h4>
          </div>
          <Badge
            className={`${
              rentRangeDesire
                ? "bg-[var(--gold-300,#e4c5a4)]/30 text-[var(--gold-600,#b4855a)]"
                : "bg-[var(--warm-100,#f5f5f4)] text-[var(--warm-500,#78716c)]"
            } hover:opacity-90 px-4 py-2 text-sm rounded-full transition-opacity`}
            style={{ transitionDuration: "var(--transition-fast, 150ms)" }}
          >
            {rentRangeDesire ? "Budget Defined" : "Pending"}
          </Badge>
        </div>

        {/* Budget Information - Gold variant for financial info */}
        {rentRangeDesire && (
          <div className="space-y-[var(--space-3,0.75rem)]">
            <div className="flex items-center gap-[var(--space-2,0.5rem)]">
              <DollarSign size={ICON_SIZE.standard} className="text-[var(--gold-500,#c4956a)]" />
              <h4 className="text-sm font-semibold text-[var(--warm-500,#78716c)] uppercase tracking-wide">
                Monthly Rent Budget
              </h4>
            </div>
            <div 
              className="bg-gradient-to-br from-[var(--gold-300,#e4c5a4)]/20 to-[var(--gold-300,#e4c5a4)]/10 p-[var(--space-4,1rem)] space-y-[var(--space-3,0.75rem)]"
              style={{ borderRadius: "var(--radius-xl, 1rem)" }}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-[var(--warm-800,#292524)]">
                  {formatCurrency(rentRangeDesire)}
                </span>
                <span className="text-sm text-[var(--warm-500,#78716c)]">/month</span>
              </div>
              <Progress
                value={getBudgetProgress(rentRangeDesire)}
                className="h-2 bg-[var(--gold-300,#e4c5a4)]/30"
              />
              <p className="text-xs text-[var(--warm-500,#78716c)]">
                Allocated monthly budget for commercial space rent
              </p>
            </div>
          </div>
        )}

        {/* Placeholder for future features */}
        <div 
          className="bg-[var(--warm-50,#fafaf9)] p-[var(--space-4,1rem)] text-center"
          style={{ borderRadius: "var(--radius-xl, 1rem)" }}
        >
          <p className="text-sm text-[var(--warm-500,#78716c)]">
            Additional financial details (funding status, documents) coming soon
          </p>
        </div>

        {/* Empty State */}
        {!rentRangeDesire && (
          <p className="text-[var(--warm-500,#78716c)] text-center py-[var(--space-4,1rem)]">
            No financial information available yet.
          </p>
        )}
      </div>
    </CollapsibleSection>
  );
}
