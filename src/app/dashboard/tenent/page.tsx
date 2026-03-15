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
import DashboardLayout from "./components/DashboardLayout";
import {
  NavigationSidebar,
  DASHBOARD_SECTIONS,
} from "./components/NavigationSidebar";
import BentoGrid from "./components/BentoGrid";
import QuickStatsSection from "./components/QuickStatsSection";
import ProfileCompletenessBar from "./components/ProfileCompletenessBar";
import { extractQuickStats } from "./utils/profile-utils";

function TenantDashboard() {
  const { profile, isLoading, error, retry } = useTenantProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--warm-50)]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="space-y-4">
            <div className="animate-pulse rounded-lg bg-white/50 p-6">
              <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
            <div className="animate-pulse rounded-lg bg-white/50 p-6">
              <div className="h-4 w-1/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--warm-50)]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span>{error}</span>
              <Button
                onClick={retry}
                variant="outline"
                size="sm"
                className="min-h-[44px] w-full sm:ml-4 sm:w-auto"
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
      <div className="flex min-h-screen items-center justify-center bg-[var(--warm-50)]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Alert>
            <Building className="h-4 w-4" />
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 font-semibold">Complete Your Profile</p>
                <p className="text-sm">
                  Get started by completing your tenant onboarding to create
                  your business profile.
                </p>
              </div>
              <Button
                asChild
                size="sm"
                className="min-h-[44px] w-full sm:ml-4 sm:w-auto"
              >
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
        <DashboardLayout
          sidebar={<NavigationSidebar sections={DASHBOARD_SECTIONS} />}
        >
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

            {/* Profile Completeness and Quick Stats */}
            <div className="mx-auto mt-4 max-w-6xl space-y-4 px-4 sm:mt-6 sm:space-y-6 sm:px-6">
              {/* Profile Completeness Bar */}
              <ProfileCompletenessBar profile={profile} />

              {/* Quick Stats Section */}
              <QuickStatsSection stats={extractQuickStats(profile)} />
            </div>

            {/* Dashboard Cards in Bento Grid Layout */}
            <div className="mx-auto mt-4 max-w-6xl px-4 sm:mt-6 sm:px-6">
              <BentoGrid>
                {/* Featured Cards - 2 column span on desktop */}
                <BrandStoryCard
                  brandKeywords={profile.brandKeywords}
                  personalityTags={profile.personalityTags}
                  toneTags={profile.toneTags}
                  notes={profile.notes}
                  variant="featured"
                  sectionId="brand-story"
                />

                <CustomerPricingCard
                  typcialCustomer={profile.typcialCustomer}
                  typcialCustomerSpend={profile.typcialCustomerSpend}
                  rentRangeDesire={profile.rentRangeDesire}
                  variant="featured"
                  sectionId="customer-pricing"
                />

                {/* Standard Cards - 1 column span */}
                <OperationsMaturityCard
                  tennentExperience={profile.tennentExperience}
                  spaceLooking={profile.spaceLooking}
                  mode={profile.mode}
                  variant="standard"
                  sectionId="operations"
                />

                <ExpansionIntentCard
                  cityNext={profile.cityNext}
                  whenNextOpen={profile.whenNextOpen}
                  spaceNeed={profile.spaceNeed}
                  variant="standard"
                  sectionId="expansion"
                />

                <FinancialReadinessCard
                  rentRangeDesire={profile.rentRangeDesire}
                  variant="standard"
                  sectionId="financial"
                />

                <MediaSocialCard
                  logoUrl={profile.logoUrl}
                  variant="standard"
                  sectionId="media"
                />
              </BentoGrid>
            </div>
          </main>

          {/* Footer - Hidden on mobile to avoid overlap with MobileCTA */}
          <div className="hidden sm:block">
            <Footer />
          </div>
        </DashboardLayout>

        {/* Mobile CTA */}
        <MobileCTA />
      </div>
    </TooltipProvider>
  );
}

// Export the component wrapped with authentication guard for TENANT role
export default withAuth(TenantDashboard, "TENANT");
