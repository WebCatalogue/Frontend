import Link from "next/link";
import { FooterCta } from "@/components/layout/footer-cta";
import { APP_NAME } from "@/constants";
import { FOOTER_NAV } from "@/mock/navigation";

const FOOTER_DISCLAIMER =
  "BhaiKiSite helps businesses plan and launch premium websites through curated templates, components, and a guided visualise flow. Preview experiences on this site are illustrative and may differ from your final build.";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background relative z-[2] overflow-visible">
      <FooterCta />

      <div className="mx-auto max-w-[var(--container-2xl)] px-5 pb-16 sm:px-6 lg:px-12 lg:pb-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-x-20 xl:gap-x-28">
          <div className="max-w-md">
            <p className="text-foreground-subtle text-[0.6875rem] leading-relaxed">
              * Platform previews and metrics shown are illustrative.
            </p>
            <p className="text-foreground-subtle mt-4 text-[0.6875rem] leading-[1.7]">
              {FOOTER_DISCLAIMER}
            </p>
            <p className="text-foreground-subtle mt-8 text-[0.6875rem]">
              © {year} {APP_NAME}. All rights reserved.
            </p>
          </div>

          <div className="min-w-[9rem]">
            <p className="text-foreground mb-5 text-sm font-medium">
              {APP_NAME}
            </p>
            <ul className="space-y-3">
              {FOOTER_NAV.platform.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-foreground-muted text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[9rem]">
            <p className="text-foreground mb-5 text-sm font-medium">Legal</p>
            <ul className="space-y-3">
              {FOOTER_NAV.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-foreground-muted text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
