"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AVAILABLE_EFFECTS,
  createEffectLayer,
  type EffectLayer,
  type EffectLayerTarget,
} from "@/features/builder/effects/layers";
import { useBuilderStudio } from "./builder-context";

export function EffectLayersPanel() {
  const {
    effectLayers,
    addEffectLayer,
    removeEffectLayer,
    toggleEffectLayer,
    selectedSectionId,
    selectedPageId,
  } = useBuilderStudio();

  function add(target: EffectLayerTarget, effectKey: string) {
    addEffectLayer(
      createEffectLayer(
        effectKey,
        target,
        target === "section"
          ? (selectedSectionId ?? undefined)
          : (selectedPageId ?? undefined),
      ),
    );
  }

  return (
    <div className="space-y-4">
      <p className="type-body-sm text-foreground-muted">
        Effects are separate from section components. Apply to page, section, or
        component — preview updates instantly.
      </p>

      <div className="space-y-2">
        <p className="type-label text-foreground-subtle">Add effect</p>
        <div className="flex flex-wrap gap-1">
          {AVAILABLE_EFFECTS.map((fx) => (
            <Button
              key={fx.key}
              variant="outline"
              size="sm"
              onClick={() => add("page", fx.key)}
            >
              <Plus className="size-3" aria-hidden />
              {fx.name}
            </Button>
          ))}
        </div>
        {selectedSectionId && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => add("section", "effect.spotlight")}
          >
            Add spotlight to selected section
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <p className="type-label text-foreground-subtle">Active layers</p>
        {effectLayers.length === 0 ? (
          <p className="type-body-sm text-foreground-muted">
            No effect layers.
          </p>
        ) : (
          effectLayers.map((layer) => (
            <EffectLayerRow
              key={layer.id}
              layer={layer}
              onToggle={() => toggleEffectLayer(layer.id)}
              onRemove={() => removeEffectLayer(layer.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function EffectLayerRow({
  layer,
  onToggle,
  onRemove,
}: {
  layer: EffectLayer;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border-border flex items-center gap-2 rounded-[var(--radius-md)] border p-2">
      <button
        type="button"
        onClick={onToggle}
        className={`size-2 shrink-0 rounded-full ${layer.enabled ? "bg-accent" : "bg-muted"}`}
        aria-label={layer.enabled ? "Disable layer" : "Enable layer"}
      />
      <div className="min-w-0 flex-1">
        <p className="type-body-sm truncate font-mono">{layer.effectKey}</p>
        <Badge variant="outline" className="mt-0.5 capitalize">
          {layer.target}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label="Remove"
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
