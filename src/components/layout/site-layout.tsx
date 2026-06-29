import { type ReactNode } from "react";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/playground/scroll-progress";

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="relative z-[1]">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <CookieBanner />
    </div>
  );
}
