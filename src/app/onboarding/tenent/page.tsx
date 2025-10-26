"use client";

import { withAuth } from "~/lib/auth-context";

function TenantOnboarding() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Tenant Onboarding
        </h1>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <p className="text-gray-600">
            Welcome! Let&apos;s get your tenant profile set up so you can start finding the perfect rental property.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication guard for TENANT role
export default withAuth(TenantOnboarding, "TENANT");