"use client";

import { CardGridSkeleton } from "@/components/shared/list-skeleton";
import { QueryEmptyState } from "@/components/shared/query-state";
import { EnquiryCard } from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";

export default function EnquiriesPage() {
  const { projects, isLoading, moveToTodo, deleteProject } = useAgencyStore();
  const enquiries = projects.filter((p) => p.status === "new-enquiry");

  if (isLoading) return <CardGridSkeleton count={3} />;

  return (
    <div className="space-y-8">
      <header>
        <p className="type-label text-accent mb-2">Pipeline</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          New Enquiries
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Website requests from visitors and external channels.
        </p>
      </header>

      {enquiries.length === 0 ? (
        <QueryEmptyState
          title="No new enquiries"
          description="When visitors submit a website request, it will appear here."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {enquiries.map((project, i) => (
            <EnquiryCard
              key={project.id}
              project={project}
              index={i}
              onMoveToTodo={moveToTodo}
              onDelete={deleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
