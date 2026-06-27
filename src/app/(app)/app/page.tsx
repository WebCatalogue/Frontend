"use client";

import Link from "next/link";
import { Building2, Globe2, Sparkles } from "lucide-react";
import {
  CardGridSkeleton,
  ListSkeleton,
} from "@/components/shared/list-skeleton";
import {
  QueryEmptyState,
  QueryErrorState,
  QueryLoadingState,
} from "@/components/shared/query-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useBusinesses,
  useCurrentTenant,
  useCurrentUser,
} from "@/hooks/use-api-queries";

export default function AppOverviewPage() {
  const userQuery = useCurrentUser();
  const tenantQuery = useCurrentTenant();
  const businessesQuery = useBusinesses();

  const isInitialLoading =
    userQuery.isLoading || tenantQuery.isLoading || businessesQuery.isLoading;

  if (isInitialLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="bg-muted h-8 w-48 animate-pulse rounded-md" />
          <div className="bg-muted h-4 w-72 animate-pulse rounded-md" />
        </div>
        <CardGridSkeleton count={2} />
        <ListSkeleton rows={3} />
      </div>
    );
  }

  const primaryError =
    userQuery.error ?? tenantQuery.error ?? businessesQuery.error;

  if (primaryError) {
    return (
      <QueryErrorState
        error={primaryError}
        onRetry={() => {
          void userQuery.refetch();
          void tenantQuery.refetch();
          void businessesQuery.refetch();
        }}
        isRetrying={
          userQuery.isFetching ||
          tenantQuery.isFetching ||
          businessesQuery.isFetching
        }
      />
    );
  }

  const user = userQuery.data;
  const tenant = tenantQuery.data;
  const businesses = businessesQuery.data ?? [];

  return (
    <div className="space-y-10">
      <section>
        <p className="type-label text-accent mb-3">Workspace</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Welcome back
          {user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="type-body-lg text-foreground-muted mt-3 max-w-2xl">
          Build premium websites with components, themes, and templates.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link href="/app/compose">
            <Sparkles className="size-4" aria-hidden />
            Start composing
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-accent-muted flex size-10 items-center justify-center rounded-[var(--radius-lg)]">
              <Building2 className="text-accent size-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="type-heading-sm font-medium">Account</h2>
              <p className="type-body-sm text-foreground-muted">
                {user?.email}
              </p>
            </div>
          </div>
          {user?.role && <Badge variant="default">{user.role}</Badge>}
        </div>

        <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-accent-muted flex size-10 items-center justify-center rounded-[var(--radius-lg)]">
              <Globe2 className="text-accent size-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="type-heading-sm font-medium">Tenant</h2>
              <p className="type-body-sm text-foreground-muted">
                {tenant?.name ?? "Current workspace"}
              </p>
            </div>
          </div>
          {tenant?.plan && <Badge variant="outline">{tenant.plan}</Badge>}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="type-heading-md font-medium">Your businesses</h2>
            <p className="type-body-sm text-foreground-muted mt-1">
              {businesses.length} business{businesses.length === 1 ? "" : "es"}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/app/businesses">View all</Link>
          </Button>
        </div>

        {businessesQuery.isFetching && !businesses.length ? (
          <QueryLoadingState label="Loading businesses…" />
        ) : businesses.length === 0 ? (
          <QueryEmptyState
            title="No businesses yet"
            description="Once businesses are added to your workspace, they will appear here."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {businesses.slice(0, 4).map((business) => (
              <Link
                key={business.id}
                href={`/app/businesses/${business.id}`}
                className="surface-2 hover:border-border-strong group border-border rounded-[var(--radius-2xl)] border p-6 transition-colors"
              >
                <h3 className="type-heading-sm group-hover:text-accent font-medium transition-colors">
                  {business.name}
                </h3>
                {business.industry && (
                  <p className="type-body-sm text-foreground-muted mt-2">
                    {business.industry}
                  </p>
                )}
                {business.status && (
                  <Badge className="mt-4" variant="default">
                    {business.status}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
