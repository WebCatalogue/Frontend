"use client";

import { KanbanBoard } from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import { ListSkeleton } from "@/components/shared/list-skeleton";

export default function TodoPage() {
  const { projects, isLoading, moveKanban } = useAgencyStore();

  if (isLoading) return <ListSkeleton rows={4} />;

  return (
    <div className="space-y-8">
      <header>
        <p className="type-label text-accent mb-2">Team board</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Our To-Do
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Shared agency pipeline — drag projects between columns. No individual
          assignments.
        </p>
      </header>
      <KanbanBoard projects={projects} onMove={moveKanban} />
    </div>
  );
}
