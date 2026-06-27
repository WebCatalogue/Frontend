"use client";

import { Input } from "@/components/ui";
import {
  TOKEN_GROUPS,
  type DesignTokens,
} from "@/features/platform/design-tokens";

interface DesignTokenEditorProps {
  tokens: DesignTokens;
  onChange: <K extends keyof DesignTokens>(
    key: K,
    value: DesignTokens[K],
  ) => void;
}

export function DesignTokenEditor({
  tokens,
  onChange,
}: DesignTokenEditorProps) {
  return (
    <div className="space-y-6">
      <p className="type-body-sm text-foreground-muted">
        Design tokens update the live preview instantly. Saved with website
        config on publish.
      </p>
      {TOKEN_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="type-label text-foreground-subtle mb-3">
            {group.label}
          </p>
          <div className="space-y-3">
            {group.keys.map((key) => (
              <TokenField
                key={key}
                label={key}
                value={tokens[key]}
                onChange={(v) => onChange(key, v)}
                isColor={
                  ![
                    "radius",
                    "shadow",
                    "spacing",
                    "animationSpeed",
                    "fontDisplay",
                    "fontBody",
                  ].includes(key)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TokenField({
  label,
  value,
  onChange,
  isColor,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isColor: boolean;
}) {
  return (
    <label className="flex items-center gap-3">
      {isColor && (
        <input
          type="color"
          value={value.startsWith("#") ? value : "#2563EB"}
          onChange={(e) => onChange(e.target.value)}
          className="border-border size-8 shrink-0 cursor-pointer rounded border"
          aria-label={`${label} colour`}
        />
      )}
      <Input
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
    </label>
  );
}
