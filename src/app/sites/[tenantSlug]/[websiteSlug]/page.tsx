"use client";

import { use } from "react";
import { PublishedSiteRenderer } from "@/features/builder/renderer/published-site-renderer";
import {
  QueryErrorState,
  QueryLoadingState,
} from "@/components/shared/query-state";
import { usePublishedWebsite } from "@/hooks/use-api-queries";

interface PublishedSitePageProps {
  params: Promise<{ tenantSlug: string; websiteSlug: string }>;
}

export default function PublishedSitePage({ params }: PublishedSitePageProps) {
  const { tenantSlug, websiteSlug } = use(params);
  const publishedQuery = usePublishedWebsite(tenantSlug, websiteSlug);

  if (publishedQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <QueryLoadingState
          label="Loading published website…"
          className="w-full max-w-md"
        />
      </div>
    );
  }

  if (publishedQuery.error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <QueryErrorState
          error={publishedQuery.error}
          onRetry={() => publishedQuery.refetch()}
          isRetrying={publishedQuery.isFetching}
          className="w-full max-w-lg"
        />
      </div>
    );
  }

  const website = publishedQuery.data;
  if (!website) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <QueryErrorState
          title="Website not found"
          description="This published website could not be loaded."
          className="w-full max-w-lg"
        />
      </div>
    );
  }

  return <PublishedSiteRenderer website={website} />;
}
