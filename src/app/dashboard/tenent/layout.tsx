import NavigationBar from "./components/NavigationBar";

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="pt-[4.5rem] sm:pt-[5.5rem]">
        {children}
      </div>
    </div>
  );
}
