"use client";

import { cn } from "@/lib/utils";
import { useBuilderStudio, type PreviewDevice } from "./builder-context";

const DEVICES: { id: PreviewDevice; label: string; width: string }[] = [
  { id: "desktop", label: "Desktop", width: "max-w-5xl" },
  { id: "tablet", label: "Tablet", width: "max-w-2xl" },
  { id: "mobile", label: "Mobile", width: "max-w-sm" },
];

export function PreviewDeviceToolbar() {
  const { previewDevice, setPreviewDevice } = useBuilderStudio();

  return (
    <div
      className="border-border bg-background/80 flex gap-1 border-b px-4 py-2 backdrop-blur-sm"
      role="toolbar"
      aria-label="Preview device"
    >
      {DEVICES.map((d) => (
        <button
          key={d.id}
          type="button"
          onClick={() => setPreviewDevice(d.id)}
          className={cn(
            "type-body-sm rounded-[var(--radius-md)] px-3 py-1 transition-colors",
            previewDevice === d.id
              ? "bg-accent-muted text-foreground font-medium"
              : "text-foreground-muted hover:text-foreground",
          )}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}

export function previewDeviceWidth(device: PreviewDevice): string {
  return DEVICES.find((d) => d.id === device)?.width ?? "max-w-5xl";
}

export function BuilderStatusBar({
  websiteStatus,
}: {
  websiteStatus?: string | null;
}) {
  const { isDirty, isSaving, lastSavedAt, canUndo, canRedo, undo, redo } =
    useBuilderStudio();

  return (
    <div className="border-border bg-muted/30 flex h-8 items-center justify-between border-t px-4 text-xs">
      <div className="text-foreground-muted flex items-center gap-3">
        <span>
          {isSaving
            ? "Saving…"
            : isDirty
              ? "Unsaved changes"
              : lastSavedAt
                ? `Saved ${lastSavedAt.toLocaleTimeString()}`
                : "All changes saved"}
        </span>
        <button
          type="button"
          disabled={!canUndo}
          onClick={() => undo()}
          className="hover:text-foreground disabled:opacity-40"
        >
          Undo
        </button>
        <button
          type="button"
          disabled={!canRedo}
          onClick={() => redo()}
          className="hover:text-foreground disabled:opacity-40"
        >
          Redo
        </button>
      </div>
      <span className="text-foreground-subtle capitalize">
        {websiteStatus ?? "draft"}
      </span>
    </div>
  );
}
