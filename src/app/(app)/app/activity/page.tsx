"use client";

import { ProjectTimeline } from "@/features/agency/components";
import { useDashboardActivity } from "@/hooks/use-agency-queries";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryErrorState } from "@/components/shared/query-state";

export default function ActivityPage() {
  const activityQuery = useDashboardActivity();

  if (activityQuery.isLoading) return <ListSkeleton rows={6} />;

  if (activityQuery.error) {
    return (
      <QueryErrorState
        error={activityQuery.error}
        onRetry={() => void activityQuery.refetch()}
        isRetrying={activityQuery.isFetching}
      />
    );
  }

  const activity = activityQuery.data ?? [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Activity
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Team contributions across all projects.
        </p>
      </header>
      <div className="surface-2 border-border max-w-2xl rounded-[var(--radius-2xl)] border p-6">
        <ProjectTimeline
          events={activity.map((a) => ({
            id: a.id,
            projectId: a.projectId ?? "",
            type: a.type,
            message: a.projectName
              ? `${a.message} — ${a.projectName}`
              : a.message,
            contributor: a.contributor,
            timestamp: a.timestamp,
          }))}
        />
      </div>
    </div>
  );
}
