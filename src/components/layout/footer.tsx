import Link from "next/link";
import { NewsletterSection } from "@/components/layout/newsletter-section";
import {
  APP_NAME,
  APP_TAGLINE,
  COMPANY_EMAIL,
  ROUTES,
  SOCIAL_LINKS,
} from "@/constants";
import { FOOTER_NAV } from "@/mock/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]">
      <NewsletterSection />

      <div className="mx-auto max-w-[var(--container-2xl)] px-5 py-16 sm:px-6 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={ROUTES.home} className="flex items-center gap-2.5">
              <div className="bg-primary flex size-8 items-center justify-center rounded-full">
                <span className="type-label text-primary-foreground !text-[0.5625rem]">
                  A
                </span>
              </div>
              <span className="type-body-sm text-foreground font-medium">
                {APP_NAME}
              </span>
            </Link>
            <p className="type-body-sm text-foreground-muted mt-4 max-w-xs">
              {APP_TAGLINE}
            </p>
            <p className="type-body-sm text-foreground-subtle mt-2">
              {COMPANY_EMAIL}
            </p>
          </div>

          <div>
            <p className="type-label text-foreground-subtle mb-4">Company</p>
            <ul className="space-y-2.5">
              {FOOTER_NAV.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="type-body-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label text-foreground-subtle mb-4">Services</p>
            <ul className="space-y-2.5">
              {FOOTER_NAV.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="type-body-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label text-foreground-subtle mb-4">Legal</p>
            <ul className="space-y-2.5">
              {FOOTER_NAV.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-body-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label text-foreground-subtle hover:text-foreground capitalize transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row sm:items-center">
          <p className="type-body-sm text-foreground-subtle">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <p className="type-body-sm text-foreground-subtle">
            Crafted with care in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
