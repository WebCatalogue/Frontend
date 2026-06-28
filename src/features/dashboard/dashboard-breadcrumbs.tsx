"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  app: "Dashboard",
  enquiries: "New Enquiries",
  todo: "Our To-Do",
  projects: "Projects",
  waiting: "Waiting For Client",
  completed: "Completed",
  maintenance: "Maintenance",
  clients: "Clients",
  calendar: "Calendar",
  activity: "Activity",
  templates: "Templates",
  assets: "Assets",
  analytics: "Analytics",
  settings: "Settings",
  builder: "Builder",
};

export function DashboardBreadcrumbs() {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] !== "app") return [];

    const items: { href: string; label: string }[] = [];
    let path = "";

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      path += `/${segment}`;

      if (segment === "app" && i === 0) {
        items.push({ href: "/app", label: "Dashboard" });
        continue;
      }

      const label =
        LABELS[segment] ??
        (segment.length > 20 ? `${segment.slice(0, 8)}…` : segment);

      items.push({ href: path, label });
    }

    return items;
  }, [pathname]);

  if (crumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 overflow-x-auto"
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight
                className="text-foreground-subtle size-3.5 shrink-0"
                aria-hidden
              />
            )}
            {isLast ? (
              <span
                className="type-body-sm text-foreground font-medium"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className={cn(
                  "type-body-sm text-foreground-muted hover:text-foreground whitespace-nowrap",
                )}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
