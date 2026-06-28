"use client";

import { CardGridSkeleton } from "@/components/shared/list-skeleton";
import {
  QueryEmptyState,
  QueryErrorState,
} from "@/components/shared/query-state";
import { VisualiseSiteButton } from "@/features/visualise-wizard";
import { DraftCard } from "@/features/drafts/draft-card";
import { useWizardDrafts } from "@/hooks/use-wizard-drafts";

export default function DraftsPage() {
  const { drafts, isLoading, error, refetch } = useWizardDrafts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <CardGridSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return <QueryErrorState error={error} onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      {drafts.length === 0 ? (
        <div className="space-y-4">
          <QueryEmptyState
            title="No drafts yet"
            description="Start the Visualise Your Site wizard to create your first website draft."
          />
          <div className="flex justify-center">
            <VisualiseSiteButton size="md" />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {drafts.map((draft) => (
            <DraftCard
              key={draft.websiteId}
              draft={draft}
              onDeleted={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="type-label text-accent mb-2">Website drafts</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          My Drafts
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2 max-w-xl">
          Resume unfinished websites or open completed drafts in the Composer.
        </p>
      </div>
      <VisualiseSiteButton variant="outline" size="md" />
    </div>
  );
}
