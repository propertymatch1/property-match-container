"use client";

import { withAuth } from "~/lib/auth-context";

function LandlordOnboarding() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Landlord Onboarding
        </h1>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <p className="text-gray-600">
            Welcome! Let&apos;s get your landlord profile set up so you can start listing your properties and connecting with tenants.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication guard for LANDLORD role
export default withAuth(LandlordOnboarding, "LANDLORD");