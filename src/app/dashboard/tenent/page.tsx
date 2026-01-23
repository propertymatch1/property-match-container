"use client";

import Link from "next/link";
import { AlertCircle, Building } from "lucide-react";
import { withAuth } from "~/lib/auth-context";
import { useTenantProfile } from "./hooks/use-tenant-profile";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { TooltipProvider } from "~/components/ui/tooltip";
import { DashboardHeroCard } from "./components/DashboardHeroCard";
import { BrandStoryCard } from "./components/BrandStoryCard";
import { CustomerPricingCard } from "./components/CustomerPricingCard";
import { OperationsMaturityCard } from "./components/OperationsMaturityCard";
import { ExpansionIntentCard } from "./components/ExpansionIntentCard";
import { FinancialReadinessCard } from "./components/FinancialReadinessCard";
import { MediaSocialCard } from "./components/MediaSocialCard";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";

function TenantDashboard() {
  const { profile, isLoading, error, retry } = useTenantProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--warm-50)] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-4">
            <div className="bg-white/50 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="bg-white/50 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--warm-50)] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span>{error}</span>
              <Button
                onClick={retry}
                variant="outline"
                size="sm"
                className="min-h-[44px] w-full sm:w-auto sm:ml-4"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[var(--warm-50)] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Alert>
            <Building className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-semibold mb-1">Complete Your Profile</p>
                <p className="text-sm">
                  Get started by completing your tenant onboarding to create
                  your business profile.
                </p>
              </div>
              <Button asChild size="sm" className="min-h-[44px] w-full sm:w-auto sm:ml-4">
                <Link href="/onboarding/tenent">Start Onboarding</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[var(--warm-50)]">
        <main className="pb-24 md:pb-8">
          {/* Hero Section */}
          <DashboardHeroCard
            brandName={profile.brandName}
            logoUrl={profile.logoUrl}
            industry={profile.industry}
            typcialCustomer={profile.typcialCustomer}
            typcialCustomerSpend={profile.typcialCustomerSpend}
            spaceLooking={profile.spaceLooking}
            cityNext={profile.cityNext}
            whenNextOpen={profile.whenNextOpen}
            notes={profile.notes}
          />

          {/* Content Sections - Single column on mobile, responsive spacing */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {/* Brand Story Section */}
            <BrandStoryCard
              brandKeywords={profile.brandKeywords}
              personalityTags={profile.personalityTags}
              toneTags={profile.toneTags}
              notes={profile.notes}
            />

            {/* Customer & Pricing Section */}
            <CustomerPricingCard
              typcialCustomer={profile.typcialCustomer}
              typcialCustomerSpend={profile.typcialCustomerSpend}
              rentRangeDesire={profile.rentRangeDesire}
            />

            {/* Operations & Maturity Section */}
            <OperationsMaturityCard
              tennentExperience={profile.tennentExperience}
              spaceLooking={profile.spaceLooking}
              mode={profile.mode}
            />

            {/* Expansion Intent Section */}
            <ExpansionIntentCard
              cityNext={profile.cityNext}
              whenNextOpen={profile.whenNextOpen}
              spaceNeed={profile.spaceNeed}
            />

            {/* Financial Readiness Section */}
            <FinancialReadinessCard
              rentRangeDesire={profile.rentRangeDesire}
            />

            {/* Media & Social Section */}
            <MediaSocialCard logoUrl={profile.logoUrl} />
          </div>
        </main>

        {/* Footer - Hidden on mobile to avoid overlap with MobileCTA */}
        <div className="hidden sm:block">
          <Footer />
        </div>

        {/* Mobile CTA */}
        <MobileCTA />
      </div>
    </TooltipProvider>
  );
}

// Export the component wrapped with authentication guard for TENANT role
export default withAuth(TenantDashboard, "TENANT");
