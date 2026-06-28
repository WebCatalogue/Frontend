"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BUSINESS_DATA_SOURCES } from "./datasets";
import { BusinessDataEditor } from "./business-data-editor";
import type { BusinessDataType } from "./types";

interface BusinessDataPanelProps {
  websiteId: string;
}

export function BusinessDataPanel({ websiteId }: BusinessDataPanelProps) {
  const [selected, setSelected] = useState<BusinessDataType | null>(null);
  const [editing, setEditing] = useState(false);
  const source = BUSINESS_DATA_SOURCES.find((s) => s.id === selected);

  if (editing && source) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
          ← Back to collections
        </Button>
        <BusinessDataEditor websiteId={websiteId} source={source} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="type-body-sm text-foreground-muted">
        Manage dynamic content for your website sections. Changes autosave to
        the backend.
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
              <Badge variant="success">Live API</Badge>
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
          <p className="type-body-sm text-foreground-muted mb-4">
            Endpoint:{" "}
            <code className="text-xs">
              {source.apiEndpoint.replace(":id", websiteId.slice(0, 8) + "…")}
            </code>
          </p>
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => setEditing(true)}
          >
            Open editor
          </Button>
        </div>
      )}
    </div>
  );
}
