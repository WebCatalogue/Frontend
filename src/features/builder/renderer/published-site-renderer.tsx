"use client";

import { memo } from "react";
import type { PublishedPage, PublishedWebsite } from "@/types/api";
import { RegistrySection } from "@/features/builder/registry";

interface PublishedSiteRendererProps {
  website: PublishedWebsite;
  activePageSlug?: string;
}

export const PublishedSiteRenderer = memo(function PublishedSiteRenderer({
  website,
  activePageSlug,
}: PublishedSiteRendererProps) {
  const page =
    website.pages.find(
      (p) => p.slug === activePageSlug || p.path === `/${activePageSlug}`,
    ) ?? website.pages[0];

  if (!page) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8 text-center">
        <p className="text-foreground-muted">
          This website has no published pages yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <SiteHeader website={website} page={page} />
      <main id="published-content">
        {[...page.sections]
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((section) => (
            <RegistrySection key={section.id} section={section} />
          ))}
      </main>
    </div>
  );
});

function SiteHeader({
  website,
  page,
}: {
  website: PublishedWebsite;
  page: PublishedPage;
}) {
  const nav = website.navigation ?? [];

  return (
    <header className="border-border border-b">
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <span className="type-heading-sm font-medium">{website.name}</span>
        <nav className="hidden items-center gap-4 md:flex" aria-label="Site">
          {nav.map((item, i) => (
            <a
              key={item.id ?? i}
              href={item.href}
              className="type-body-sm text-foreground-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span className="type-body-sm text-foreground-subtle md:hidden">
          {page.title}
        </span>
      </div>
    </header>
  );
}
