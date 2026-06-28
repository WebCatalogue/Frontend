"use client";

import Link from "next/link";
import { ProjectStatusBadge } from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import { QueryEmptyState } from "@/components/shared/query-state";

export default function WaitingPage() {
  const { projects } = useAgencyStore();
  const waiting = projects.filter((p) => p.status === "waiting-for-client");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Waiting For Client
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Projects paused pending client feedback or approvals.
        </p>
      </header>
      {waiting.length === 0 ? (
        <QueryEmptyState
          title="Nothing waiting"
          description="All projects are moving forward."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {waiting.map((p) => (
            <Link
              key={p.id}
              href={`/app/projects/${p.id}`}
              className="surface-2 border-border rounded-[var(--radius-2xl)] border p-5 hover:shadow-md"
            >
              <ProjectStatusBadge status={p.status} />
              <h3 className="type-heading-sm mt-3 font-medium">
                {p.businessName}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
