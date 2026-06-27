"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import {
  QueryEmptyState,
  QueryErrorState,
} from "@/components/shared/query-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { BusinessFormModal } from "@/features/businesses/business-form-modal";
import {
  useBusinesses,
  useCreateBusiness,
  useDeleteBusiness,
  useUpdateBusiness,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import type { Business, CreateBusinessRequest } from "@/types/api";

export default function BusinessesPage() {
  const { addToast } = useToast();
  const businessesQuery = useBusinesses();
  const createMutation = useCreateBusiness();
  const deleteMutation = useDeleteBusiness();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Business | null>(null);
  const updateMutation = useUpdateBusiness(editing?.id ?? "");

  if (businessesQuery.isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <ListSkeleton rows={5} />
      </div>
    );
  }

  if (businessesQuery.error) {
    return (
      <QueryErrorState
        error={businessesQuery.error}
        onRetry={() => businessesQuery.refetch()}
        isRetrying={businessesQuery.isFetching}
      />
    );
  }

  const businesses = businessesQuery.data ?? [];

  async function handleCreate(payload: CreateBusinessRequest) {
    try {
      await createMutation.mutateAsync(payload);
      addToast({ title: "Business created", variant: "success" });
    } catch (error) {
      addToast({
        title: "Could not create business",
        description: getErrorMessage(error),
        variant: "error",
      });
      throw error;
    }
  }

  async function handleUpdate(
    payload: Parameters<typeof updateMutation.mutateAsync>[0],
  ) {
    if (!editing) return;
    try {
      await updateMutation.mutateAsync(payload);
      addToast({ title: "Business updated", variant: "success" });
      setEditing(null);
    } catch (error) {
      addToast({
        title: "Could not update business",
        description: getErrorMessage(error),
        variant: "error",
      });
      throw error;
    }
  }

  async function handleDelete(business: Business) {
    if (!confirm(`Delete "${business.name}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(business.id);
      addToast({ title: "Business deleted", variant: "success" });
    } catch (error) {
      addToast({
        title: "Could not delete business",
        description: getErrorMessage(error),
        variant: "error",
      });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader />
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="size-4" aria-hidden />
          New business
        </Button>
      </div>

      {businesses.length === 0 ? (
        <QueryEmptyState
          title="No businesses yet"
          description="Create your first business to start building websites."
        />
      ) : (
        <div className="space-y-3">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="surface-2 border-border flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-xl)] border p-5"
            >
              <Link
                href={`/app/businesses/${business.id}`}
                className="min-w-0 flex-1"
              >
                <h2 className="type-heading-sm hover:text-accent font-medium transition-colors">
                  {business.name}
                </h2>
                {business.description && (
                  <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
                    {business.description}
                  </p>
                )}
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                {business.industry && (
                  <Badge variant="outline">{business.industry}</Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${business.name}`}
                  onClick={() => setEditing(business)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${business.name}`}
                  onClick={() => handleDelete(business)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BusinessFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
      />

      <BusinessFormModal
        open={Boolean(editing)}
        onOpenChange={(open) => !open && setEditing(null)}
        business={editing}
        onSubmit={handleUpdate}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
        Businesses
      </h1>
      <p className="type-body-sm text-foreground-muted mt-2">
        Manage all businesses in your workspace.
      </p>
    </div>
  );
}
