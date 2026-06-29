import { SiteLayout } from "@/components/layout";
import { SiteAmbient } from "@/components/marketing/site-ambient";
import { BuilderWizardProvider } from "@/features/builder-wizard";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BuilderWizardProvider>
      <SiteAmbient />
      <SiteLayout>{children}</SiteLayout>
    </BuilderWizardProvider>
  );
}
