"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ExternalLink,
  Globe2,
  Pencil,
  Plus,
  Rocket,
  Trash2,
} from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import {
  QueryEmptyState,
  QueryErrorState,
} from "@/components/shared/query-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { WebsiteFormModal } from "@/features/websites/website-form-modal";
import { WebsiteStatusBadge } from "@/features/websites/website-status-badge";
import {
  useArchiveWebsite,
  useBusiness,
  useBusinessWebsites,
  useCreateWebsite,
  useCurrentTenant,
  useDeleteWebsite,
  usePublishWebsite,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import type { Website } from "@/types/api";

interface BusinessDetailPageProps {
  params: Promise<{ businessId: string }>;
}

export default function BusinessDetailPage({
  params,
}: BusinessDetailPageProps) {
  const { businessId } = use(params);
  const { addToast } = useToast();
  const tenantQuery = useCurrentTenant();
  const businessQuery = useBusiness(businessId);
  const websitesQuery = useBusinessWebsites(businessId);
  const createWebsite = useCreateWebsite(businessId);
  const deleteWebsite = useDeleteWebsite(businessId);
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);

  const isLoading =
    businessQuery.isLoading || websitesQuery.isLoading || tenantQuery.isLoading;
  const error = businessQuery.error ?? websitesQuery.error ?? tenantQuery.error;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-muted h-8 w-64 animate-pulse rounded-md" />
        <ListSkeleton rows={4} />
      </div>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        error={error}
        onRetry={() => {
          void businessQuery.refetch();
          void websitesQuery.refetch();
        }}
        isRetrying={businessQuery.isFetching || websitesQuery.isFetching}
      />
    );
  }

  const business = businessQuery.data;
  const websites = websitesQuery.data ?? [];
  const tenantSlug = tenantQuery.data?.slug;

  if (!business) {
    return (
      <QueryErrorState
        title="Business not found"
        description="This business may have been removed or you may not have access."
      />
    );
  }

  async function handleCreateWebsite(
    payload: Parameters<typeof createWebsite.mutateAsync>[0],
  ) {
    try {
      await createWebsite.mutateAsync(payload);
      addToast({ title: "Website created", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not create website",
        description: getErrorMessage(err),
        variant: "error",
      });
      throw err;
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
            <Link href="/app/businesses">← All businesses</Link>
          </Button>
          <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
            {business.name}
          </h1>
          {business.description && (
            <p className="type-body-lg text-foreground-muted mt-3 max-w-2xl">
              {business.description}
            </p>
          )}
        </div>
        <Button onClick={() => setWebsiteModalOpen(true)}>
          <Plus className="size-4" aria-hidden />
          New website
        </Button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe2 className="text-accent size-5" strokeWidth={1.75} />
          <h2 className="type-heading-md font-medium">Websites</h2>
        </div>

        {websites.length === 0 ? (
          <QueryEmptyState
            title="No websites yet"
            description="Create a website to open the visual builder."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {websites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                businessId={businessId}
                tenantSlug={tenantSlug ?? undefined}
                onDelete={async () => {
                  if (!confirm(`Delete "${website.name}"?`)) return;
                  try {
                    await deleteWebsite.mutateAsync(website.id);
                    addToast({ title: "Website deleted", variant: "success" });
                  } catch (err) {
                    addToast({
                      title: "Could not delete website",
                      description: getErrorMessage(err),
                      variant: "error",
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>

      <WebsiteFormModal
        open={websiteModalOpen}
        onOpenChange={setWebsiteModalOpen}
        onSubmit={handleCreateWebsite}
        isLoading={createWebsite.isPending}
      />
    </div>
  );
}

function WebsiteCard({
  website,
  businessId,
  tenantSlug,
  onDelete,
}: {
  website: Website;
  businessId: string;
  tenantSlug?: string;
  onDelete: () => void;
}) {
  const { addToast } = useToast();
  const publish = usePublishWebsite(website.id, businessId);
  const archive = useArchiveWebsite(website.id, businessId);

  async function handlePublish() {
    try {
      await publish.mutateAsync();
      addToast({ title: "Website published", variant: "success" });
    } catch (err) {
      addToast({
        title: "Publish failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  async function handleArchive() {
    try {
      await archive.mutateAsync();
      addToast({ title: "Website archived", variant: "success" });
    } catch (err) {
      addToast({
        title: "Archive failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  const previewHref =
    tenantSlug && website.slug ? `/sites/${tenantSlug}/${website.slug}` : null;

  return (
    <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="type-heading-sm font-medium">{website.name}</h3>
          {website.domain && (
            <p className="type-body-sm text-foreground-muted mt-1">
              {website.domain}
            </p>
          )}
        </div>
        <WebsiteStatusBadge status={website.status} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link href={`/app/websites/${website.id}/builder`}>
            <Pencil className="size-4" aria-hidden />
            Builder
          </Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handlePublish}
          isLoading={publish.isPending}
        >
          <Rocket className="size-4" aria-hidden />
          Publish
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleArchive}
          isLoading={archive.isPending}
        >
          <Archive className="size-4" aria-hidden />
          Archive
        </Button>
        {previewHref && (
          <Button asChild size="sm" variant="ghost">
            <Link href={previewHref} target="_blank">
              <ExternalLink className="size-4" aria-hidden />
              Preview
            </Link>
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={onDelete}
          aria-label={`Delete ${website.name}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
