"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { getClient, projects } = useAgencyStore();
  const client = getClient(clientId);
  if (!client) notFound();

  const clientProjects = projects.filter((p) => p.clientId === clientId);

  return (
    <div className="space-y-8">
      <header>
        <ProjectStatusBadge status={client.projectStatus} />
        <h1 className="type-display-sm text-foreground mt-3 font-[family-name:var(--font-display)]">
          {client.businessName}
        </h1>
        <p className="type-body-sm text-foreground-muted mt-1">
          {client.ownerName}
        </p>
      </header>
      <dl className="surface-2 border-border grid gap-4 rounded-[var(--radius-2xl)] border p-6 sm:grid-cols-2">
        <div>
          <dt className="type-label text-foreground-subtle">Phone</dt>
          <dd className="type-body-sm mt-1">{client.phone}</dd>
        </div>
        <div>
          <dt className="type-label text-foreground-subtle">Email</dt>
          <dd className="type-body-sm mt-1">{client.email}</dd>
        </div>
        <div>
          <dt className="type-label text-foreground-subtle">Industry</dt>
          <dd className="type-body-sm mt-1">{client.industry}</dd>
        </div>
        <div>
          <dt className="type-label text-foreground-subtle">Plan</dt>
          <dd className="type-body-sm mt-1">{client.currentPlan ?? "—"}</dd>
        </div>
      </dl>
      {client.notes && (
        <p className="type-body-sm text-foreground-muted surface-2 border-border rounded-[var(--radius-xl)] border p-4">
          {client.notes}
        </p>
      )}
      <section>
        <h2 className="type-heading-sm mb-4 font-medium">Projects</h2>
        <div className="space-y-2">
          {clientProjects.map((p) => (
            <Link
              key={p.id}
              href={`/app/projects/${p.id}`}
              className="surface-2 border-border flex items-center justify-between rounded-[var(--radius-lg)] border p-4"
            >
              <span className="type-body-sm font-medium">{p.businessName}</span>
              <ProjectStatusBadge status={p.status} />
            </Link>
          ))}
        </div>
      </section>
      <Button asChild>
        <Link href={`/app/projects/new?client=${client.id}`}>New Project</Link>
      </Button>
    </div>
  );
}
