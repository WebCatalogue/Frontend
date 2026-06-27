"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared";
import { ScrollProgress } from "@/components/playground/scroll-progress";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "craft", label: "Craft" },
  { id: "typography", label: "Type" },
  { id: "surfaces", label: "Depth" },
  { id: "system", label: "System" },
] as const;

interface PremiumShellProps {
  children: React.ReactNode;
}

export function PremiumShell({ children }: PremiumShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ScrollProgress />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-index-sticky)] transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-glass)] shadow-[0_1px_0_rgba(17,17,16,0.04)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[var(--container-2xl)] items-center justify-between gap-4 px-5 sm:h-16 sm:px-6 lg:px-12">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="bg-primary relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:size-8">
              <span className="type-label text-primary-foreground !text-[0.5rem]">
                W
              </span>
            </div>
            <span className="type-body-sm text-foreground truncate font-medium tracking-tight">
              WebCatalog
            </span>
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex lg:gap-8"
            aria-label="Main"
          >
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "type-body-sm text-foreground-muted hover:text-foreground transition-colors duration-300",
                  !scrolled && "md:opacity-70",
                )}
              >
                {label}
              </a>
            ))}
          </nav>

          <ThemeToggle className="shrink-0" />
        </div>
      </header>

      <nav
        className="fixed top-1/2 right-5 z-[var(--z-index-fixed)] hidden -translate-y-1/2 flex-col gap-3 xl:right-8 xl:flex"
        aria-label="Section navigation"
      >
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center justify-end gap-2.5 py-1"
            aria-label={`Go to ${label}`}
          >
            <span className="type-label text-foreground-subtle pointer-events-none translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              {label}
            </span>
            <span className="bg-foreground-subtle/30 group-hover:bg-accent block size-1.5 shrink-0 rounded-full transition-all duration-500 group-hover:size-2" />
          </a>
        ))}
      </nav>

      <main className="relative z-[2] lg:pr-4 xl:pr-8">{children}</main>
    </div>
  );
}
