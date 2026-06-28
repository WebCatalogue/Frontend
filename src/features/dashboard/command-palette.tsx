"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, Search, Users } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useAgencyStore } from "@/features/agency";
import { ROUTES } from "@/constants";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUICK_LINKS = [
  { title: "Dashboard", href: ROUTES.app, subtitle: "Agency overview" },
  {
    title: "New Enquiries",
    href: ROUTES.appEnquiries,
    subtitle: "Incoming leads",
  },
  { title: "Our To-Do", href: ROUTES.appTodo, subtitle: "Kanban board" },
  { title: "Clients", href: ROUTES.appClients, subtitle: "CRM" },
  {
    title: "Calendar",
    href: ROUTES.appCalendar,
    subtitle: "Meetings & deadlines",
  },
] as const;

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const { projects, clients, isLoading } = useAgencyStore();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return [
        ...QUICK_LINKS.map((l) => ({
          type: "link" as const,
          ...l,
          id: l.href,
        })),
        ...projects.slice(0, 4).map((p) => ({
          type: "project" as const,
          id: p.id,
          title: p.businessName,
          href: `${ROUTES.appProjects}/${p.id}`,
          subtitle: p.industry,
        })),
      ];
    }

    const projectHits = projects
      .filter(
        (p) =>
          p.businessName.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((p) => ({
        type: "project" as const,
        id: p.id,
        title: p.businessName,
        href: `${ROUTES.appProjects}/${p.id}`,
        subtitle: p.industry,
      }));

    const clientHits = clients
      .filter(
        (c) =>
          c.businessName.toLowerCase().includes(q) ||
          c.ownerName.toLowerCase().includes(q),
      )
      .slice(0, 4)
      .map((c) => ({
        type: "client" as const,
        id: c.id,
        title: c.businessName,
        href: `${ROUTES.appClients}/${c.id}`,
        subtitle: c.ownerName,
      }));

    return [...projectHits, ...clientHits];
  }, [clients, projects, query]);

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
              placeholder="Search projects, clients…"
              className="pl-10"
              autoFocus
              aria-label="Search command palette"
            />
          </div>
        </ModalHeader>

        <div className="max-h-80 overflow-y-auto p-2" role="listbox">
          {isLoading && (
            <p className="type-body-sm text-foreground-muted px-3 py-4">
              Loading…
            </p>
          )}

          {!isLoading && results.length === 0 && (
            <p className="type-body-sm text-foreground-muted px-3 py-4">
              No results found.
            </p>
          )}

          {results.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.href}
              role="option"
              onClick={() => onOpenChange(false)}
              className="hover:bg-muted/60 flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 transition-colors"
            >
              {item.type === "client" ? (
                <Users className="text-accent size-4" aria-hidden />
              ) : (
                <Building2 className="text-accent size-4" aria-hidden />
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
