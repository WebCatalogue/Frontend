"use client";

import Link from "next/link";
import { INDUSTRY_PRESETS } from "@/features/platform/industry-presets";
import { getTemplatesForIndustry } from "@/mock/industry-templates";
import { Badge } from "@/components/ui/badge";

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="type-label text-accent mb-2">Internal library</p>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Templates
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Starting points for client projects — reference only, not
          client-facing.
        </p>
      </header>
      <div className="space-y-10">
        {INDUSTRY_PRESETS.slice(0, 8).map((preset) => {
          const templates = getTemplatesForIndustry(preset.id).slice(0, 3);
          return (
            <section key={preset.id}>
              <h2 className="type-heading-sm mb-4 font-medium">
                {preset.icon} {preset.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {templates.map((t) => (
                  <div
                    key={t.id}
                    className="surface-2 border-border rounded-[var(--radius-xl)] border p-5"
                  >
                    <p className="type-body-sm font-medium">{t.name}</p>
                    <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
                      {t.description}
                    </p>
                    <Badge variant="outline" className="mt-3">
                      {t.themeId}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link
                href={`/industries/${preset.id}`}
                className="type-body-sm text-accent mt-2 inline-block hover:underline"
                target="_blank"
              >
                View public industry page →
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}
