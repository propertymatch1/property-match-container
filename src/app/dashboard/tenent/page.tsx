"use client";

import { withAuth } from "~/lib/auth-context";

function TenantDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Tenant Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <p className="text-gray-600">
            Welcome to your tenant dashboard. Here you can manage your rental search and applications.
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the component wrapped with authentication guard for TENANT role
export default withAuth(TenantDashboard, "TENANT");