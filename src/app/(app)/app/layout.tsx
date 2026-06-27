import type { Metadata } from "next";
import { DashboardLayout } from "@/features/dashboard/dashboard-layout";
import { ProtectedRoute } from "@/components/app/protected-route";

export const metadata: Metadata = {
  title: "Workspace",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
