import NavigationBar from "./components/NavigationBar";

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="pt-16 sm:pt-20">
        {children}
      </div>
    </div>
  );
}
