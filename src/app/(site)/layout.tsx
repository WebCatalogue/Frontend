import { SiteLayout } from "@/components/layout";
import { SiteAmbient } from "@/components/marketing/site-ambient";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteAmbient />
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
