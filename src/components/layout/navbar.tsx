"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/shared";
import { Button } from "@/components/ui";
import { APP_NAME, ROUTES } from "@/constants";
import { MAIN_NAV } from "@/mock/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-index-sticky)] transition-all duration-500 ease-[var(--ease-out-expo)]",
        scrolled || mobileOpen
          ? "border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-glass)] shadow-[0_1px_0_rgba(17,17,16,0.04)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[var(--container-2xl)] items-center justify-between gap-4 px-5 sm:h-16 sm:px-6 lg:px-12">
        <Link
          href={ROUTES.home}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="bg-primary flex size-7 items-center justify-center rounded-full shadow-sm transition-shadow group-hover:shadow-md sm:size-8">
            <span className="type-label text-primary-foreground !text-[0.5rem] sm:!text-[0.5625rem]">
              A
            </span>
          </div>
          <span className="type-body-sm text-foreground font-medium tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {MAIN_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "type-body-sm hover:bg-muted/50 hover:text-foreground rounded-[var(--radius-md)] px-3 py-2 transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href={ROUTES.enquiry}>Submit enquiry</Link>
          </Button>

          <button
            type="button"
            className="text-foreground-muted hover:text-foreground flex size-10 items-center justify-center rounded-[var(--radius-md)] transition-colors lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-current transition-all duration-300",
                  mobileOpen ? "top-[7px] rotate-45" : "top-0.5",
                )}
              />
              <span
                className={cn(
                  "absolute top-[7px] left-0 block h-0.5 w-4 bg-current transition-all duration-300",
                  mobileOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-current transition-all duration-300",
                  mobileOpen ? "top-[7px] -rotate-45" : "top-3.5",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-[var(--color-border-subtle)] bg-[var(--color-background)] px-5 py-6 lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="type-body-md text-foreground-muted hover:text-foreground block rounded-[var(--radius-md)] px-3 py-3 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-border-subtle)] pt-6">
            <ThemeToggle />
            <Button variant="primary" className="flex-1" asChild>
              <Link href={ROUTES.enquiry}>Submit enquiry</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
