"use client";

import Link from "next/link";
import { ProjectStatusBadge } from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import { QueryEmptyState } from "@/components/shared/query-state";

export default function MaintenancePage() {
  const { projects } = useAgencyStore();
  const items = projects.filter((p) => p.status === "maintenance");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Maintenance
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Ongoing maintenance and support clients.
        </p>
      </header>
      {items.length === 0 ? (
        <QueryEmptyState title="No maintenance clients" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/app/projects/${p.id}`}
              className="surface-2 border-border rounded-[var(--radius-2xl)] border p-5"
            >
              <ProjectStatusBadge status={p.status} />
              <h3 className="type-heading-sm mt-3 font-medium">
                {p.businessName}
              </h3>
              <p className="type-body-sm text-foreground-muted mt-1">
                {p.estimatedBudget}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
