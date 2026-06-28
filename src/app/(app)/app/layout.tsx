import type { Metadata } from "next";
import { DashboardLayout } from "@/features/dashboard/dashboard-layout";
import { ProtectedRoute } from "@/components/app/protected-route";
import { AgencyProviders } from "@/providers/agency-providers";

export const metadata: Metadata = {
  title: "Agency Workspace",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AgencyProviders>
        <DashboardLayout>{children}</DashboardLayout>
      </AgencyProviders>
    </ProtectedRoute>
  );
}
