"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/shared";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "philosophy", label: "Philosophy" },
  { id: "typography", label: "Typography" },
  { id: "color", label: "Color" },
  { id: "surfaces", label: "Surfaces" },
  { id: "elevation", label: "Elevation" },
  { id: "spacing", label: "Spacing" },
  { id: "motion", label: "Motion" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "interactions", label: "Interactions" },
] as const;

interface PlaygroundShellProps {
  children: React.ReactNode;
}

export function PlaygroundShell({ children }: PlaygroundShellProps) {
  const [activeSection, setActiveSection] = useState("philosophy");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* Top bar */}
      <header className="surface-glass fixed inset-x-0 top-0 z-[var(--z-index-sticky)]">
        <div className="mx-auto flex h-14 max-w-[var(--container-2xl)] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex size-7 items-center justify-center rounded-[var(--radius-md)]">
              <span className="type-label text-primary-foreground !text-[0.5625rem]">
                WC
              </span>
            </div>
            <span className="type-body-sm text-foreground font-medium">
              Design System
            </span>
            <span className="text-foreground-subtle hidden sm:inline">/</span>
            <span className="type-body-sm text-foreground-muted hidden sm:inline">
              Playground
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-[var(--container-2xl)] lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav
            className="sticky top-24 py-10"
            aria-label="Design system sections"
          >
            <p className="type-label text-foreground-subtle mb-6">Contents</p>
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={cn(
                      "type-body-sm block rounded-[var(--radius-md)] px-3 py-2 transition-colors duration-[var(--duration-fast)]",
                      activeSection === id
                        ? "bg-accent-muted text-accent font-medium"
                        : "text-foreground-muted hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="px-6 pt-20 pb-32 lg:px-0 lg:pr-10">{children}</main>
      </div>
    </div>
  );
}
