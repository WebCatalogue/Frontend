"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Archive, ExternalLink, Globe2, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisualiseSiteButton } from "@/features/visualise-wizard";
import { WebsiteStatusBadge } from "@/features/websites/website-status-badge";
import {
  useBusinesses,
  useBusinessWebsites,
  useCurrentTenant,
} from "@/hooks/use-api-queries";
import { useWizardDrafts } from "@/hooks/use-wizard-drafts";
import type { Website } from "@/types/api";

type FilterStatus = "all" | "draft" | "published" | "archived";

export function ProjectHub() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");
  const [sort, setSort] = useState<"recent" | "name">("recent");
  const businessesQuery = useBusinesses();
  const tenantQuery = useCurrentTenant();
  const { drafts } = useWizardDrafts();
  const businesses = businessesQuery.data ?? [];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="type-heading-md font-medium">Your websites</h2>
          <p className="type-body-sm text-foreground-muted mt-1">
            {drafts.length} wizard draft{drafts.length === 1 ? "" : "s"} ·
            manage all projects
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <VisualiseSiteButton variant="outline" size="sm" />
          <Button asChild size="sm" variant="outline">
            <Link href="/app/drafts">My Drafts</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="text-foreground-muted absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            className="pl-10"
            placeholder="Search websites…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as FilterStatus)}
          className="border-input bg-surface-1 h-11 rounded-[var(--radius-lg)] border px-3 text-sm"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="draft">Drafts</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "recent" | "name")}
          className="border-input bg-surface-1 h-11 rounded-[var(--radius-lg)] border px-3 text-sm"
          aria-label="Sort websites"
        >
          <option value="recent">Recently edited</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {businesses.length === 0 ? (
        <div className="surface-2 border-border rounded-[var(--radius-2xl)] border border-dashed p-10 text-center">
          <Globe2 className="text-foreground-muted mx-auto size-10" />
          <p className="type-body-md mt-4 font-medium">No businesses yet</p>
          <p className="type-body-sm text-foreground-muted mt-2">
            Create a business first, then start building websites.
          </p>
          <Button asChild className="mt-4">
            <Link href="/app/businesses">Add business</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {businesses.map((business) => (
            <BusinessWebsiteList
              key={business.id}
              businessId={business.id}
              businessName={business.name}
              tenantSlug={tenantQuery.data?.slug ?? undefined}
              search={search}
              status={status}
              sort={sort}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function BusinessWebsiteList({
  businessId,
  businessName,
  tenantSlug,
  search,
  status,
  sort,
}: {
  businessId: string;
  businessName: string;
  tenantSlug?: string;
  search: string;
  status: FilterStatus;
  sort: "recent" | "name";
}) {
  const websitesQuery = useBusinessWebsites(businessId);
  const websites = useMemo(() => {
    let list = websitesQuery.data ?? [];
    if (status !== "all") {
      list = list.filter((w) => w.status === status);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) || w.slug?.toLowerCase().includes(q),
      );
    }
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort((a, b) => {
        const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return bt - at;
      });
    }
    return list;
  }, [websitesQuery.data, status, search, sort]);

  if (websitesQuery.isLoading) {
    return <p className="type-body-sm text-foreground-muted">Loading…</p>;
  }

  if (websites.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="type-heading-sm text-foreground-muted font-medium">
        {businessName}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {websites.map((website) => (
          <WebsiteProjectCard
            key={website.id}
            website={website}
            tenantSlug={tenantSlug}
          />
        ))}
      </div>
    </div>
  );
}

function WebsiteProjectCard({
  website,
  tenantSlug,
}: {
  website: Website;
  tenantSlug?: string;
}) {
  const previewHref =
    tenantSlug && website.slug ? `/sites/${tenantSlug}/${website.slug}` : null;

  return (
    <article className="surface-2 border-border group rounded-[var(--radius-2xl)] border p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="type-heading-sm truncate font-medium">
            {website.name}
          </h4>
          {website.slug && (
            <p className="type-body-sm text-foreground-muted mt-1">
              /{website.slug}
            </p>
          )}
        </div>
        <WebsiteStatusBadge status={website.status} />
      </div>

      {website.updatedAt && (
        <p className="type-body-sm text-foreground-subtle mt-3">
          Edited {new Date(website.updatedAt).toLocaleDateString()}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link href={`/app/websites/${website.id}/builder`}>
            <Sparkles className="size-4" aria-hidden />
            Continue
          </Link>
        </Button>
        {previewHref && (
          <Button asChild size="sm" variant="outline">
            <Link href={previewHref} target="_blank">
              <ExternalLink className="size-4" aria-hidden />
              Preview
            </Link>
          </Button>
        )}
        {website.status === "archived" && (
          <Badge variant="outline" className="gap-1">
            <Archive className="size-3" aria-hidden />
            Archived
          </Badge>
        )}
      </div>
    </article>
  );
}
