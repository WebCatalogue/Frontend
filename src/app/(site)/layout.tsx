import { SiteLayout } from "@/components/layout";
import {
  AmbientBackground,
  NoiseOverlay,
} from "@/components/playground/ambient/ambient-background";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />
      <NoiseOverlay />
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
