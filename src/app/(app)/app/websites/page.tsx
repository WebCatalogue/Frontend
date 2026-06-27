"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import {
  QueryEmptyState,
  QueryErrorState,
} from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { WebsiteStatusBadge } from "@/features/websites/website-status-badge";
import {
  useBusinesses,
  useBusinessWebsites,
  useCurrentTenant,
} from "@/hooks/use-api-queries";
import type { Website } from "@/types/api";

export default function WebsitesPage() {
  const tenantQuery = useCurrentTenant();
  const businessesQuery = useBusinesses();

  const isLoading = tenantQuery.isLoading || businessesQuery.isLoading;
  const error = tenantQuery.error ?? businessesQuery.error;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <ListSkeleton rows={5} />
      </div>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        error={error}
        onRetry={() => {
          void tenantQuery.refetch();
          void businessesQuery.refetch();
        }}
      />
    );
  }

  const businesses = businessesQuery.data ?? [];
  const tenantSlug = tenantQuery.data?.slug;

  return (
    <div className="space-y-8">
      <PageHeader />
      {businesses.length === 0 ? (
        <QueryEmptyState
          title="No websites yet"
          description="Create a business first, then add websites from the business page."
        />
      ) : (
        <div className="space-y-8">
          {businesses.map((business) => (
            <BusinessWebsitesGroup
              key={business.id}
              businessId={business.id}
              businessName={business.name}
              tenantSlug={tenantSlug ?? undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BusinessWebsitesGroup({
  businessId,
  businessName,
  tenantSlug,
}: {
  businessId: string;
  businessName: string;
  tenantSlug?: string;
}) {
  const websitesQuery = useBusinessWebsites(businessId);
  const websites = websitesQuery.data ?? [];

  return (
    <section className="space-y-3">
      <h2 className="type-heading-sm text-foreground-muted font-medium">
        {businessName}
      </h2>
      {websitesQuery.isLoading ? (
        <ListSkeleton rows={2} />
      ) : websites.length === 0 ? (
        <p className="type-body-sm text-foreground-subtle">No websites</p>
      ) : (
        websites.map((website) => (
          <WebsiteRow
            key={website.id}
            website={website}
            tenantSlug={tenantSlug}
          />
        ))
      )}
    </section>
  );
}

function WebsiteRow({
  website,
  tenantSlug,
}: {
  website: Website;
  tenantSlug?: string;
}) {
  const previewHref = useMemo(
    () =>
      tenantSlug && website.slug
        ? `/sites/${tenantSlug}/${website.slug}`
        : null,
    [tenantSlug, website.slug],
  );

  return (
    <div className="surface-2 border-border flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-xl)] border p-5">
      <div>
        <p className="type-heading-sm font-medium">{website.name}</p>
        {website.slug && (
          <p className="type-body-sm text-foreground-muted mt-1">
            /{website.slug}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <WebsiteStatusBadge status={website.status} />
        <Button asChild size="sm" variant="outline">
          <Link href={`/app/websites/${website.id}/builder`}>Builder</Link>
        </Button>
        {previewHref && (
          <Button asChild size="sm" variant="ghost">
            <Link href={previewHref} target="_blank">
              <ExternalLink className="size-4" aria-hidden />
              Preview
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
        Websites
      </h1>
      <p className="type-body-sm text-foreground-muted mt-2">
        All websites across your businesses.
      </p>
    </div>
  );
}
