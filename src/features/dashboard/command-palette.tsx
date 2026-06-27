"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Globe2, Search } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useBusinesses } from "@/hooks/use-api-queries";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const businessesQuery = useBusinesses();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const businesses = businessesQuery.data ?? [];
    if (!q) {
      return businesses.slice(0, 6).map((b) => ({
        type: "business" as const,
        id: b.id,
        title: b.name,
        href: `/app/businesses/${b.id}`,
        subtitle: b.industry ?? "Business",
      }));
    }

    return businesses
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.industry?.toLowerCase().includes(q),
      )
      .slice(0, 8)
      .map((b) => ({
        type: "business" as const,
        id: b.id,
        title: b.name,
        href: `/app/businesses/${b.id}`,
        subtitle: b.industry ?? "Business",
      }));
  }, [businessesQuery.data, query]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-lg gap-0 p-0">
        <ModalHeader className="border-border border-b px-4 py-3">
          <ModalTitle className="sr-only">Command palette</ModalTitle>
          <div className="relative">
            <Search
              className="text-foreground-subtle absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search businesses…"
              className="pl-10"
              autoFocus
              aria-label="Search command palette"
            />
          </div>
        </ModalHeader>

        <div className="max-h-80 overflow-y-auto p-2" role="listbox">
          {businessesQuery.isLoading && (
            <p className="type-body-sm text-foreground-muted px-3 py-4">
              Loading…
            </p>
          )}

          {!businessesQuery.isLoading && results.length === 0 && (
            <p className="type-body-sm text-foreground-muted px-3 py-4">
              No results found.
            </p>
          )}

          {results.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              role="option"
              onClick={() => onOpenChange(false)}
              className="hover:bg-muted/60 flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 transition-colors"
            >
              {item.type === "business" ? (
                <Building2 className="text-accent size-4" aria-hidden />
              ) : (
                <Globe2 className="text-accent size-4" aria-hidden />
              )}
              <div className="min-w-0">
                <p className="type-body-sm truncate font-medium">
                  {item.title}
                </p>
                <p className="type-body-sm text-foreground-muted truncate">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
}
