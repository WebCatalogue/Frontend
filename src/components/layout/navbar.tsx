"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ThemeToggle } from "@/components/shared";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { useIsMobile } from "@/hooks/use-media-query";
import { MAIN_NAV } from "@/mock/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-index-sticky)]">
      <div
        className={cn(
          "pointer-events-auto fixed left-1/2 flex -translate-x-1/2 items-center justify-between gap-4 rounded-[18px] border backdrop-blur-[12px]",
          "border-[var(--nav-glass-border,rgba(255,255,255,0.06))] bg-[var(--nav-glass-bg,rgba(15,15,18,0.55))]",
          isMobile
            ? "top-3 w-[calc(100vw-24px)] px-5 py-4"
            : "top-5 w-[min(1400px,calc(100vw-80px))] px-8 py-[18px]",
        )}
      >
        <NavbarInner
          pathname={pathname}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {mobileOpen && (
        <MobileMenu
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
          className="border-border bg-background pointer-events-auto fixed top-[calc(0.75rem+4.25rem)] right-3 left-3 rounded-[18px] border px-5 py-6 shadow-lg backdrop-blur-xl lg:hidden"
        />
      )}
    </header>
  );
}

interface NavbarInnerProps {
  pathname: string;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

function NavbarInner({
  pathname,
  mobileOpen,
  setMobileOpen,
}: NavbarInnerProps) {
  return (
    <>
      <Logo href={ROUTES.home} size="sm" />

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
          className="text-foreground/80 hover:text-foreground flex size-10 items-center justify-center rounded-[var(--radius-md)] transition-colors lg:hidden"
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
    </>
  );
}

function MobileMenu({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <nav id="mobile-menu" className={className} aria-label="Mobile navigation">
      <ul className="space-y-1">
        {MAIN_NAV.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "type-body-md block rounded-[var(--radius-md)] px-3 py-3 transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-border mt-6 flex items-center gap-3 border-t pt-6">
        <ThemeToggle />
        <Button variant="primary" className="flex-1" asChild>
          <Link href={ROUTES.enquiry} onClick={onNavigate}>
            Submit enquiry
          </Link>
        </Button>
      </div>
    </nav>
  );
}
