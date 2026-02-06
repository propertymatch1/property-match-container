"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

/**
 * DashboardLayout provides the main layout wrapper for the tenant dashboard.
 * 
 * Features:
 * - Responsive grid layout with sidebar slot for desktop (≥1024px)
 * - Sidebar is hidden on mobile and tablet (<1024px)
 * - Uses CSS Grid for layout management
 * - Maintains consistent spacing using design tokens
 * 
 * Layout behavior:
 * - Mobile/Tablet (<1024px): Single column, sidebar hidden
 * - Desktop (≥1024px): Two columns with 240px sidebar + main content
 */
export default function DashboardLayout({
  children,
  sidebar,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("dashboard-layout", className)}>
      {/* Sidebar - Only visible on desktop */}
      {sidebar && (
        <aside className="dashboard-sidebar">
          {sidebar}
        </aside>
      )}
      
      {/* Main content area */}
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

// Export as named export as well for flexibility
export { DashboardLayout };