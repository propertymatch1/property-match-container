"use client";

import { withAuth } from "~/lib/auth-context";

function LandlordDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Landlord Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <p className="text-gray-600">
            Welcome to your landlord dashboard. Here you can manage your properties and tenant applications.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication guard for LANDLORD role
export default withAuth(LandlordDashboard, "LANDLORD");