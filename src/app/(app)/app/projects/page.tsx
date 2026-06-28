"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardGridSkeleton } from "@/components/shared/list-skeleton";
import { QueryEmptyState } from "@/components/shared/query-state";
import {
  NewProjectModal,
  ProjectStatusBadge,
} from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import { useToast } from "@/components/ui/toast";

const ACTIVE_STATUSES = [
  "our-todo",
  "planning",
  "design",
  "development",
  "review",
  "ready-to-publish",
] as const;

export default function ActiveProjectsPage() {
  const { projects, isLoading, createProject } = useAgencyStore();
  const { addToast } = useToast();
  const [newOpen, setNewOpen] = useState(false);
  const active = projects.filter((p) =>
    ACTIVE_STATUSES.includes(p.status as (typeof ACTIVE_STATUSES)[number]),
  );

  if (isLoading) return <CardGridSkeleton count={4} />;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-label text-accent mb-2">Delivery</p>
          <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
            Active Projects
          </h1>
        </div>
        <Button onClick={() => setNewOpen(true)}>
          <Plus className="size-4" />
          New Project
        </Button>
      </header>

      {active.length === 0 ? (
        <QueryEmptyState
          title="No active projects"
          description="Move enquiries to Our To-Do to start work."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((p) => (
            <Link
              key={p.id}
              href={`/app/projects/${p.id}`}
              className="surface-2 border-border hover:border-accent/40 rounded-[var(--radius-2xl)] border p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="type-heading-sm font-medium">
                  {p.businessName}
                </h3>
                <ProjectStatusBadge status={p.status} />
              </div>
              <p className="type-body-sm text-foreground-muted mt-2 capitalize">
                {p.industry}
              </p>
              {p.deadline && (
                <p className="type-label text-foreground-subtle mt-3">
                  Due {new Date(p.deadline).toLocaleDateString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <NewProjectModal
        open={newOpen}
        onOpenChange={setNewOpen}
        onSubmit={(input) => {
          createProject(input);
          addToast({ title: "Project created", variant: "success" });
        }}
      />
    </div>
  );
}
