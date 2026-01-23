"use client";

import { withAuth } from "~/lib/auth-context";
import { PageContainer } from "~/components/layout";

function LandlordOnboarding() {
  return (
    <div className="min-h-screen bg-[var(--warm-50)] py-8 sm:py-12">
      <PageContainer>
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 font-[var(--font-playfair)] text-2xl font-semibold tracking-tight text-[var(--warm-900)] sm:text-3xl">
            Landlord Onboarding
          </h1>
          <div className="card-elevated p-6 sm:p-8">
            <p className="text-[var(--warm-700)]">
              Welcome! Let&apos;s get your landlord profile set up so you can start listing your properties and connecting with tenants.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

// Export the component wrapped with authentication guard for LANDLORD role
export default withAuth(LandlordOnboarding, "LANDLORD");