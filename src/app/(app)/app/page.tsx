"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Inbox,
  IndianRupee,
  Plus,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CardGridSkeleton,
  ListSkeleton,
} from "@/components/shared/list-skeleton";
import { QueryErrorState } from "@/components/shared/query-state";
import {
  NewProjectModal,
  ProjectTimeline,
  StatCard,
} from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import {
  useCalendarEvents,
  useDashboardActivity,
  useDashboardSummary,
} from "@/hooks/use-agency-queries";
import { useToast } from "@/components/ui/toast";

export default function AgencyDashboardPage() {
  const { createProject, projects } = useAgencyStore();
  const { addToast } = useToast();
  const statsQuery = useDashboardSummary();
  const activityQuery = useDashboardActivity();
  const eventsQuery = useCalendarEvents();
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  const loading =
    statsQuery.isLoading || activityQuery.isLoading || eventsQuery.isLoading;
  const error = statsQuery.error ?? activityQuery.error ?? eventsQuery.error;

  if (loading) {
    return (
      <div className="space-y-8">
        <CardGridSkeleton count={4} />
        <ListSkeleton rows={4} />
      </div>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        error={error}
        onRetry={() => {
          void statsQuery.refetch();
          void activityQuery.refetch();
          void eventsQuery.refetch();
        }}
        isRetrying={
          statsQuery.isFetching ||
          activityQuery.isFetching ||
          eventsQuery.isFetching
        }
      />
    );
  }

  const stats = statsQuery.data;
  const activity = activityQuery.data ?? [];
  const events = eventsQuery.data ?? [];

  const upcomingDeadlines = events
    .filter((e) => e.type === "deadline")
    .slice(0, 3);
  const todayTasks = projects
    .filter(
      (p) =>
        p.deadline &&
        new Date(p.deadline) <= new Date(Date.now() + 86400000 * 3),
    )
    .slice(0, 4);

  return (
    <div className="space-y-10">
      <section>
        <p className="type-label text-accent mb-2">Agency OS</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Dashboard
        </h1>
        <p className="type-body-lg text-foreground-muted mt-2">
          Website projects, enquiries, and client work — all in one place.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="New Enquiries"
          value={stats?.newEnquiries ?? 0}
          icon={Inbox}
          gradient="from-blue-500/20 to-blue-500/5"
        />
        <StatCard
          label="In Progress"
          value={stats?.projectsInProgress ?? 0}
          icon={Sparkles}
          gradient="from-violet-500/20 to-violet-500/5"
        />
        <StatCard
          label="Completed This Month"
          value={stats?.completedThisMonth ?? 0}
          icon={CheckCircle2}
          gradient="from-emerald-500/20 to-emerald-500/5"
        />
        <StatCard
          label="Maintenance"
          value={stats?.maintenanceClients ?? 0}
          icon={Wrench}
          gradient="from-cyan-500/20 to-cyan-500/5"
        />
        <StatCard
          label="Revenue"
          value={stats?.revenuePlaceholder ?? "—"}
          icon={IndianRupee}
          gradient="from-amber-500/20 to-amber-500/5"
        />
      </section>

      <section className="flex flex-wrap gap-3">
        <Button onClick={() => setNewProjectOpen(true)}>
          <Plus className="size-4" />
          Create Manual Project
        </Button>
        <Button asChild variant="outline">
          <Link href="/app/clients">Add Client</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/app/assets">Open Asset Library</Link>
        </Button>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="type-heading-sm font-medium">Recent Activity</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/activity">View all</Link>
            </Button>
          </div>
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
        </section>

        <section className="space-y-6">
          <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="text-accent size-4" />
              <h2 className="type-heading-sm font-medium">
                Upcoming Deadlines
              </h2>
            </div>
            <ul className="space-y-3">
              {upcomingDeadlines.map((e) => (
                <li
                  key={e.id}
                  className="type-body-sm flex justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3 last:border-0"
                >
                  <span>{e.title}</span>
                  <span className="text-foreground-muted shrink-0">
                    {new Date(e.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
            <h2 className="type-heading-sm mb-4 font-medium">
              Today&apos;s Tasks
            </h2>
            {todayTasks.length === 0 ? (
              <p className="type-body-sm text-foreground-muted">
                No urgent deadlines.
              </p>
            ) : (
              <ul className="space-y-2">
                {todayTasks.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/app/projects/${p.id}`}
                      className="type-body-sm hover:text-accent flex justify-between"
                    >
                      {p.businessName}
                      <span className="text-foreground-muted">
                        {p.deadline &&
                          new Date(p.deadline).toLocaleDateString()}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
        <h2 className="type-heading-sm mb-4 font-medium">Project Progress</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Enquiries",
              count: projects.filter((p) => p.status === "new-enquiry").length,
              color: "bg-blue-500",
            },
            {
              label: "Active",
              count: projects.filter((p) =>
                ["planning", "design", "development", "review"].includes(
                  p.status,
                ),
              ).length,
              color: "bg-violet-500",
            },
            {
              label: "Waiting",
              count: projects.filter((p) => p.status === "waiting-for-client")
                .length,
              color: "bg-amber-500",
            },
            {
              label: "Done",
              count: projects.filter((p) => p.status === "completed").length,
              color: "bg-emerald-500",
            },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="mb-2 flex justify-between">
                <span className="type-body-sm">{bar.label}</span>
                <span className="type-body-sm font-medium">{bar.count}</span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <motion.div
                  className={`h-full rounded-full ${bar.color}`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (bar.count / Math.max(projects.length, 1)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewProjectModal
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
        onSubmit={(input) => {
          createProject(input);
          addToast({ title: "Project created", variant: "success" });
        }}
      />
    </div>
  );
}
