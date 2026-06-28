"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAnalytics } from "@/services/agency";
import type { AnalyticsData } from "@/types/agency";
import { getStatusLabel } from "@/features/agency/components";
import { CardGridSkeleton } from "@/components/shared/list-skeleton";

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchAnalytics().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) return <CardGridSkeleton count={4} />;

  return (
    <div className="space-y-10">
      <header>
        <p className="type-label text-accent mb-2">Insights</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Analytics
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Agency performance — mock data for planning.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Avg. delivery"
          value={`${data?.averageDeliveryDays ?? 0} days`}
        />
        <MetricCard label="Revenue" value={data?.revenuePlaceholder ?? "—"} />
        <MetricCard
          label="Industries"
          value={String(data?.projectsByIndustry.length ?? 0)}
        />
        <MetricCard
          label="Lead sources"
          value={String(data?.leadSources.length ?? 0)}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ChartSection title="Projects by Industry">
          {data?.projectsByIndustry.map((item) => (
            <BarRow
              key={item.industry}
              label={item.industry}
              count={item.count}
              max={Math.max(
                ...(data.projectsByIndustry.map((i) => i.count) ?? [1]),
              )}
            />
          ))}
        </ChartSection>

        <ChartSection title="Projects by Status">
          {data?.projectsByStatus.map((item) => (
            <BarRow
              key={item.status}
              label={getStatusLabel(item.status)}
              count={item.count}
              max={Math.max(
                ...(data.projectsByStatus.map((i) => i.count) ?? [1]),
              )}
            />
          ))}
        </ChartSection>

        <ChartSection title="Monthly Completions">
          {data?.monthlyCompletions.map((item) => (
            <BarRow
              key={item.month}
              label={item.month}
              count={item.count}
              max={Math.max(
                ...(data.monthlyCompletions.map((i) => i.count) ?? [1]),
              )}
            />
          ))}
        </ChartSection>

        <ChartSection title="Lead Sources">
          {data?.leadSources.map((item) => (
            <BarRow
              key={item.source}
              label={item.source.replace("-", " ")}
              count={item.count}
              max={Math.max(...(data.leadSources.map((i) => i.count) ?? [1]))}
            />
          ))}
        </ChartSection>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-5">
      <p className="type-body-sm text-foreground-muted">{label}</p>
      <p className="type-heading-md mt-2 font-medium">{value}</p>
    </div>
  );
}

function ChartSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface-2 border-border rounded-[var(--radius-2xl)] border p-6">
      <h2 className="type-heading-sm mb-4 font-medium">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function BarRow({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="type-body-sm capitalize">{label}</span>
        <span className="type-body-sm font-medium">{count}</span>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <motion.div
          className="bg-accent h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(count / max) * 100}%` }}
        />
      </div>
    </div>
  );
}
