"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Layout, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ProjectChecklist,
  ProjectFiles,
  ProjectNotes,
  ProjectStatusBadge,
  ProjectTimeline,
} from "@/features/agency/components";
import { useAgencyStore } from "@/features/agency";
import { useProjectDetail } from "@/hooks/use-agency-queries";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { QueryErrorState } from "@/components/shared/query-state";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const {
    getProject,
    isLoading: storeLoading,
    toggleChecklist,
    addNote,
    getClient,
  } = useAgencyStore();
  const projectQuery = useProjectDetail(projectId);

  const isLoading = storeLoading || projectQuery.isLoading;
  if (isLoading) return <ListSkeleton rows={6} />;

  if (projectQuery.error) {
    return (
      <QueryErrorState
        error={projectQuery.error}
        onRetry={() => void projectQuery.refetch()}
        isRetrying={projectQuery.isFetching}
      />
    );
  }

  const project = projectQuery.data ?? getProject(projectId);
  if (!project) notFound();

  const client = project.clientId ? getClient(project.clientId) : undefined;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <ProjectStatusBadge status={project.status} />
          <h1 className="type-display-sm text-foreground mt-3 font-[family-name:var(--font-display)] tracking-tight">
            {project.businessName}
          </h1>
          <p className="type-body-sm text-foreground-muted mt-1 capitalize">
            {project.industry} · {project.source.replace("-", " ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/app/compose">
              <Layout className="size-4" />
              Open Composer
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/app/projects/${project.id}?preview=1`}>
              <ExternalLink className="size-4" />
              Preview Website
            </Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Pencil className="size-4" />
            Edit Information
          </Button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
            <h2 className="type-heading-sm mb-4 font-medium">
              Project Overview
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Info label="Contact" value={project.contactName} />
              <Info label="Phone" value={project.contactPhone} />
              <Info label="Email" value={project.contactEmail} />
              <Info label="Budget" value={project.estimatedBudget ?? "—"} />
              <Info
                label="Deadline"
                value={
                  project.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "—"
                }
              />
              <Info label="Priority" value={project.priority} />
            </dl>
          </section>

          {project.draft && (
            <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
              <h2 className="type-heading-sm mb-4 font-medium">
                Website Draft
              </h2>
              <div className="bg-muted aspect-video overflow-hidden rounded-[var(--radius-xl)]">
                <div
                  className="flex size-full items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-muted), var(--muted))",
                  }}
                >
                  <p className="type-body-sm text-foreground-muted">
                    {project.draft.themeName} · {project.draft.sections.length}{" "}
                    sections
                  </p>
                </div>
              </div>
            </section>
          )}

          <Tabs defaultValue="checklist">
            <TabsList>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent
              value="checklist"
              className="surface-2 border-border mt-4 rounded-[var(--radius-2xl)] border p-6"
            >
              <ProjectChecklist
                items={project.checklist}
                onToggle={(id, c) => toggleChecklist(project.id, id, c)}
              />
            </TabsContent>
            <TabsContent
              value="notes"
              className="surface-2 border-border mt-4 rounded-[var(--radius-2xl)] border p-6"
            >
              <ProjectNotes
                notes={project.projectNotes}
                onAdd={(content, c) => addNote(project.id, content, c)}
              />
            </TabsContent>
            <TabsContent
              value="files"
              className="surface-2 border-border mt-4 rounded-[var(--radius-2xl)] border p-6"
            >
              <ProjectFiles
                projectId={project.id}
                attachments={project.attachments}
              />
            </TabsContent>
            <TabsContent
              value="activity"
              className="surface-2 border-border mt-4 rounded-[var(--radius-2xl)] border p-6"
            >
              <ProjectTimeline events={project.timeline} />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          {client && (
            <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
              <h2 className="type-heading-sm mb-4 font-medium">Client</h2>
              <p className="type-body-sm font-medium">{client.ownerName}</p>
              <p className="type-body-sm text-foreground-muted mt-1">
                {client.email}
              </p>
              <Button asChild variant="link" size="sm" className="mt-3 px-0">
                <Link href={`/app/clients/${client.id}`}>
                  View client profile
                </Link>
              </Button>
            </section>
          )}
          <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
            <h2 className="type-heading-sm mb-4 font-medium">Timeline</h2>
            <ProjectTimeline events={project.timeline.slice(0, 5)} />
          </section>
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="type-label text-foreground-subtle">{label}</dt>
      <dd className="type-body-sm mt-1 capitalize">{value}</dd>
    </div>
  );
}
