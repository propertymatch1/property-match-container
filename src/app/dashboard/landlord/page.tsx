"use client";

import { withAuth } from "~/lib/auth-context";

function LandlordDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Landlord Dashboard
        </h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-gray-600">
            Welcome to your landlord dashboard. Here you can manage your
            properties and tenant applications.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication guard for LANDLORD role
export default withAuth(LandlordDashboard, "LANDLORD");
