"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BUSINESS_DATA_SOURCES } from "./datasets";
import type { BusinessDataType } from "./types";

interface BusinessDataPanelProps {
  websiteId: string;
}

export function BusinessDataPanel({ websiteId }: BusinessDataPanelProps) {
  const [selected, setSelected] = useState<BusinessDataType | null>(null);
  const source = BUSINESS_DATA_SOURCES.find((s) => s.id === selected);

  return (
    <div className="space-y-4">
      <p className="type-body-sm text-foreground-muted">
        Visual editors for dynamic content. Connects to backend data APIs when
        available for site{" "}
        <span className="font-mono text-xs">{websiteId.slice(0, 8)}…</span>
      </p>

      <div className="space-y-2">
        {BUSINESS_DATA_SOURCES.map((ds) => (
          <button
            key={ds.id}
            type="button"
            onClick={() => setSelected(ds.id)}
            className={`w-full rounded-[var(--radius-lg)] border p-3 text-left transition-colors ${
              selected === ds.id
                ? "border-accent bg-accent-muted/30"
                : "border-border hover:border-border-strong"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span aria-hidden>{ds.icon}</span>
                <span className="type-body-sm font-medium">{ds.name}</span>
              </div>
              <Badge variant={ds.apiAvailable ? "success" : "outline"}>
                {ds.apiAvailable ? "API ready" : "Coming soon"}
              </Badge>
            </div>
            <p className="type-body-sm text-foreground-muted mt-1 line-clamp-2">
              {ds.description}
            </p>
          </button>
        ))}
      </div>

      {source && (
        <div className="border-t pt-4">
          <h3 className="type-body-sm mb-2 font-medium">{source.name}</h3>
          {!source.apiAvailable && (
            <p className="type-body-sm text-foreground-muted border-border mb-4 rounded-md border border-dashed p-3">
              Backend endpoint{" "}
              <code className="text-xs">GET {source.apiEndpoint}</code> is not
              available yet. Visual editor will activate when the API ships.
            </p>
          )}
          <ul className="mb-3 space-y-1">
            {source.fields.map((f) => (
              <li
                key={f.key}
                className="type-body-sm text-foreground-muted flex gap-2"
              >
                <span className="text-foreground-subtle font-mono text-xs">
                  {f.key}
                </span>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!source.apiAvailable}
          >
            {source.apiAvailable ? "Open editor" : "Coming soon"}
          </Button>
        </div>
      )}
    </div>
  );
}
