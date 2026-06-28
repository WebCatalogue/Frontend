"use client";

import { useEffect, useState } from "react";
import { ProjectTimeline } from "@/features/agency/components";
import { fetchRecentActivity } from "@/services/agency";
import type { ActivityItem } from "@/types/agency";
import { ListSkeleton } from "@/components/shared/list-skeleton";

export default function ActivityPage() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchRecentActivity().then((a) => {
      setActivity(a);
      setLoading(false);
    });
  }, []);

  if (loading) return <ListSkeleton rows={6} />;

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
