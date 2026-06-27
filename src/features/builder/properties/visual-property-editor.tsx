"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { getPropertySchema, type PropertyFieldSchema } from "./schemas";

interface VisualPropertyEditorProps {
  componentKey: string;
  settings: Record<string, unknown>;
  onChange: (settings: Record<string, unknown>) => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function VisualPropertyEditor({
  componentKey,
  settings,
  onChange,
  onSave,
  isSaving,
}: VisualPropertyEditorProps) {
  const [advanced, setAdvanced] = useState(false);
  const [json, setJson] = useState(() => JSON.stringify(settings, null, 2));
  const schema = getPropertySchema(componentKey);

  const groups = schema.reduce<Record<string, PropertyFieldSchema[]>>(
    (acc, field) => {
      const g = field.group ?? "General";
      acc[g] = acc[g] ?? [];
      acc[g].push(field);
      return acc;
    },
    {},
  );

  function updateField(key: string, value: unknown) {
    const next = { ...settings, [key]: value };
    onChange(next);
    setJson(JSON.stringify(next, null, 2));
  }

  if (advanced) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="type-label text-foreground-subtle">Advanced mode</p>
          <Button variant="ghost" size="sm" onClick={() => setAdvanced(false)}>
            Visual editor
          </Button>
        </div>
        <Textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={12}
          className="font-mono text-xs"
          aria-label="Settings JSON"
        />
        <Button
          size="sm"
          className="w-full"
          isLoading={isSaving}
          onClick={() => {
            try {
              onChange(JSON.parse(json) as Record<string, unknown>);
              onSave();
            } catch {
              /* parent handles toast */
            }
          }}
        >
          Save JSON
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {Object.entries(groups).map(([group, fields]) => (
        <div key={group}>
          <p className="type-label text-foreground-subtle mb-2">{group}</p>
          <div className="space-y-3">
            {fields.map((field) => (
              <PropertyField
                key={field.key}
                field={field}
                value={settings[field.key]}
                onChange={(v) => updateField(field.key, v)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-2 border-t pt-4">
        <Button
          size="sm"
          className="flex-1"
          onClick={onSave}
          isLoading={isSaving}
        >
          Save changes
        </Button>
        <Button variant="outline" size="sm" onClick={() => setAdvanced(true)}>
          Advanced
        </Button>
      </div>
    </div>
  );
}

function PropertyField({
  field,
  value,
  onChange,
}: {
  field: PropertyFieldSchema;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "toggle") {
    return (
      <label className="flex items-center justify-between gap-2">
        <span className="type-body-sm">{field.label}</span>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="border-border size-4 rounded"
        />
      </label>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <label className="block space-y-1">
        <span className="type-body-sm text-foreground-muted">
          {field.label}
        </span>
        <select
          value={String(value ?? field.options[0]?.value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="border-border bg-background type-body-sm w-full rounded-[var(--radius-md)] border px-3 py-2"
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        label={field.label}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    );
  }

  if (field.type === "number") {
    return (
      <Input
        label={field.label}
        type="number"
        min={field.min}
        max={field.max}
        value={value !== undefined ? String(value) : ""}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  return (
    <Input
      label={field.label}
      type={field.type === "url" ? "url" : "text"}
      placeholder={field.placeholder}
      value={String(value ?? "")}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
