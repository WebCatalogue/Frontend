export default function AnalyticsPage() {
  const metrics = [
    { label: "Total page views", value: "—", hint: "Connect analytics API" },
    { label: "Published websites", value: "—", hint: "Live data coming soon" },
    { label: "Avg. load time", value: "—", hint: "Performance monitoring" },
    { label: "Conversion rate", value: "—", hint: "Goal tracking" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Analytics
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Website performance insights — placeholder until analytics APIs ship.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="surface-2 border-border rounded-[var(--radius-2xl)] border border-dashed p-6"
          >
            <p className="type-body-sm text-foreground-muted">{m.label}</p>
            <p className="type-display-md text-foreground mt-2 font-[family-name:var(--font-display)]">
              {m.value}
            </p>
            <p className="type-body-sm text-foreground-subtle mt-2">{m.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
