"use client";

import { ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOptionById } from "./catalog";
import type { MarketplaceCategory } from "./types";

interface YourWebsitePanelProps {
  categories: MarketplaceCategory[];
  selections: Record<string, string>;
  onJumpToCategory: (categoryId: string) => void;
  onCompose: () => void;
  industryName: string;
}

export function YourWebsitePanel({
  categories,
  selections,
  onJumpToCategory,
  onCompose,
  industryName,
}: YourWebsitePanelProps) {
  const filled = categories.filter((c) => selections[c.id]);

  return (
    <aside className="depth-panel sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden lg:top-28">
      <div className="border-b border-[var(--color-border-subtle)] p-5">
        <div className="flex items-center gap-2">
          <LayoutGrid className="text-accent size-5" aria-hidden />
          <h2 className="type-heading-sm text-foreground">Your website</h2>
        </div>
        <p className="type-body-sm text-foreground-muted mt-1">
          {filled.length} of {categories.length} sections chosen for your{" "}
          {industryName.toLowerCase()} site.
        </p>
      </div>

      <nav
        className="flex-1 overflow-y-auto p-3"
        aria-label="Selected components"
      >
        <ul className="space-y-1">
          {categories.map((category) => {
            const optionId = selections[category.id];
            const option = optionId ? getOptionById(optionId) : null;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => onJumpToCategory(category.id)}
                  className="hover:bg-muted/80 flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left transition-colors"
                >
                  <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
                    {option ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={option.screenshot}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="type-label text-foreground-subtle flex size-full items-center justify-center">
                        —
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="type-label text-foreground-subtle">
                      {category.label}
                    </p>
                    <p className="type-body-sm text-foreground truncate">
                      {option?.name ?? "Not selected"}
                    </p>
                  </div>
                  <ChevronRight
                    className="text-foreground-subtle size-4 shrink-0"
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--color-border-subtle)] p-4">
        <Button variant="primary" className="w-full" onClick={onCompose}>
          Open in composer
        </Button>
      </div>
    </aside>
  );
}
