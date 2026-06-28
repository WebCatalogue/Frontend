"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useBusinesses } from "@/hooks/use-api-queries";
import * as websiteApi from "@/lib/api/website";
import { queryKeys } from "@/lib/query/keys";
import { buildWizardDraft } from "@/features/visualise-wizard/draft-utils";
import type { WizardDraft } from "@/features/visualise-wizard/types";

export function useWizardDrafts() {
  const businessesQuery = useBusinesses();
  const businesses = businessesQuery.data ?? [];

  const websiteQueries = useQueries({
    queries: businesses.map((b) => ({
      queryKey: queryKeys.businesses.websites(b.id),
      queryFn: () => websiteApi.listBusinessWebsites(b.id),
      enabled: Boolean(b.id),
    })),
  });

  const allWebsites = useMemo(
    () => websiteQueries.flatMap((q) => q.data ?? []),
    [websiteQueries],
  );

  const draftWebsiteIds = useMemo(
    () => allWebsites.filter((w) => w.status === "draft").map((w) => w.id),
    [allWebsites],
  );

  const configQueries = useQueries({
    queries: draftWebsiteIds.map((id) => ({
      queryKey: queryKeys.websites.config(id),
      queryFn: () => websiteApi.getWebsiteConfig(id),
      enabled: Boolean(id),
    })),
  });

  const drafts = useMemo(() => {
    const result: WizardDraft[] = [];
    for (let i = 0; i < allWebsites.length; i++) {
      const website = allWebsites[i];
      if (website.status !== "draft") continue;
      const configIndex = draftWebsiteIds.indexOf(website.id);
      const config = configQueries[configIndex]?.data;
      const draft = buildWizardDraft(website, config);
      if (draft) result.push(draft);
    }
    return result.sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [allWebsites, configQueries, draftWebsiteIds]);

  const inProgressDrafts = drafts.filter(
    (d) => d.settings.wizardStatus === "in_progress",
  );

  const isLoading =
    businessesQuery.isLoading ||
    websiteQueries.some((q) => q.isLoading) ||
    configQueries.some((q) => q.isLoading);

  const error =
    businessesQuery.error ??
    websiteQueries.find((q) => q.error)?.error ??
    configQueries.find((q) => q.error)?.error;

  return {
    drafts,
    inProgressDrafts,
    isLoading,
    error,
    refetch: () => {
      void businessesQuery.refetch();
      websiteQueries.forEach((q) => void q.refetch());
      configQueries.forEach((q) => void q.refetch());
    },
  };
}

export function useLatestInProgressDraft() {
  const { inProgressDrafts, isLoading } = useWizardDrafts();
  return {
    draft: inProgressDrafts[0] ?? null,
    isLoading,
  };
}
