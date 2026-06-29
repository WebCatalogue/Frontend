"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TemplateCategory {
  slug: string;
  name: string;
}

interface TemplateCategoryFilterProps {
  categories: TemplateCategory[];
}

function getSectionId(slug: string) {
  return `templates-${slug}`;
}

export function TemplateCategoryFilter({
  categories,
}: TemplateCategoryFilterProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");

  const scrollToCategory = useCallback((slug: string) => {
    const section = document.getElementById(getSectionId(slug));
    if (!section) return;

    setActiveSlug(slug);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!categories.length) return;

    const sectionIds = categories.map((category) =>
      getSectionId(category.slug),
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];
        if (!topEntry) return;

        const slug = topEntry.target.id.replace("templates-", "");
        setActiveSlug(slug);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [categories]);

  if (!categories.length) return null;

  return (
    <nav
      aria-label="Filter templates by industry"
      className="border-border-subtle bg-background/85 sticky top-[calc(1.25rem+4.75rem)] z-30 -mx-5 mb-12 border-y px-5 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-[var(--radius-xl)] lg:border lg:px-4"
    >
      <div className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = activeSlug === category.slug;

          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => scrollToCategory(category.slug)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "type-body-sm shrink-0 rounded-[var(--radius-md)] border px-4 py-2 transition-colors",
                isActive
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
