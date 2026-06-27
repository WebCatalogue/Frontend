"use client";

import { use } from "react";
import {
  QueryErrorState,
  QueryLoadingState,
} from "@/components/shared/query-state";
import { BuilderStudio } from "@/features/builder/studio/builder-studio";
import { useWebsite } from "@/hooks/use-api-queries";

interface BuilderPageProps {
  params: Promise<{ websiteId: string }>;
}

export default function WebsiteBuilderPage({ params }: BuilderPageProps) {
  const { websiteId } = use(params);
  const websiteQuery = useWebsite(websiteId);

  if (websiteQuery.isLoading) {
    return <QueryLoadingState label="Loading builder…" />;
  }

  if (websiteQuery.error || !websiteQuery.data) {
    return (
      <QueryErrorState
        error={websiteQuery.error}
        title="Website not found"
        onRetry={() => websiteQuery.refetch()}
        isRetrying={websiteQuery.isFetching}
      />
    );
  }

  return <BuilderStudio website={websiteQuery.data} />;
}
