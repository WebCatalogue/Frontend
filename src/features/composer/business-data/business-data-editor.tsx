"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui";
import { useToast } from "@/components/ui/toast";
import {
  QueryEmptyState,
  QueryErrorState,
  QueryLoadingState,
} from "@/components/shared/query-state";
import {
  useBusinessDataCollection,
  useCreateBusinessDataItem,
  useDeleteBusinessDataItem,
  useUpdateBusinessDataItem,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import type { BusinessDataCollection } from "@/types/api";
import type { BusinessDataField, BusinessDataSource } from "./types";

interface BusinessDataEditorProps {
  websiteId: string;
  source: BusinessDataSource & { collection: BusinessDataCollection };
}

export function BusinessDataEditor({
  websiteId,
  source,
}: BusinessDataEditorProps) {
  const { addToast } = useToast();
  const query = useBusinessDataCollection(websiteId, source.collection);
  const createItem = useCreateBusinessDataItem(websiteId, source.collection);
  const updateItem = useUpdateBusinessDataItem(websiteId, source.collection);
  const deleteItem = useDeleteBusinessDataItem(websiteId, source.collection);

  const [drafts, setDrafts] = useState<Record<string, Record<string, unknown>>>(
    {},
  );
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());
  const [savingId, setSavingId] = useState<string | null>(null);

  const items = query.data ?? [];

  useEffect(() => {
    const next: Record<string, Record<string, unknown>> = {};
    for (const item of items) {
      next[item.id] = { ...item };
    }
    setDrafts(next);
    setDirtyIds(new Set());
  }, [items]);

  const updateField = useCallback((id: string, key: string, value: unknown) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
    setDirtyIds((prev) => new Set(prev).add(id));
  }, []);

  const saveItem = useCallback(
    async (id: string) => {
      const draft = drafts[id];
      if (!draft) return;
      setSavingId(id);
      try {
        const {
          id: _id,
          websiteId: _w,
          createdAt,
          updatedAt,
          version,
          sortOrder,
          ...payload
        } = draft;
        await updateItem.mutateAsync({ itemId: id, payload });
        setDirtyIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        addToast({ title: "Saved", variant: "success" });
      } catch (err) {
        addToast({
          title: "Save failed",
          description: getErrorMessage(err),
          variant: "error",
        });
      } finally {
        setSavingId(null);
      }
    },
    [drafts, updateItem, addToast],
  );

  async function handleCreate() {
    const empty = Object.fromEntries(source.fields.map((f) => [f.key, ""]));
    try {
      await createItem.mutateAsync(empty);
      addToast({ title: "Item added", variant: "success" });
    } catch (err) {
      addToast({
        title: "Could not add item",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteItem.mutateAsync(id);
      addToast({ title: "Deleted", variant: "success" });
    } catch (err) {
      addToast({
        title: "Delete failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  if (query.isLoading) return <QueryLoadingState label="Loading collection…" />;
  if (query.isError) {
    return (
      <QueryErrorState
        error={query.error}
        onRetry={() => void query.refetch()}
        isRetrying={query.isFetching}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="type-heading-sm font-medium">{source.name}</h3>
          <p className="type-body-sm text-foreground-muted mt-1">
            {source.description}
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleCreate}
          isLoading={createItem.isPending}
        >
          <Plus className="size-4" aria-hidden />
          Add
        </Button>
      </div>

      {items.length === 0 ? (
        <QueryEmptyState
          title="No items yet"
          description={`Add your first ${source.name.toLowerCase()} entry.`}
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const draft = drafts[item.id] ?? item;
            const isDirty = dirtyIds.has(item.id);
            return (
              <div
                key={item.id}
                className="border-border space-y-3 rounded-[var(--radius-lg)] border p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={isDirty ? "accent" : "outline"}>
                    {isDirty ? "Unsaved" : "Saved"}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void saveItem(item.id)}
                      isLoading={savingId === item.id}
                      disabled={!isDirty}
                    >
                      <Save className="size-3.5" aria-hidden />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => void handleDelete(item.id)}
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                </div>
                {source.fields.map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={String(draft[field.key] ?? "")}
                    onChange={(v) => updateField(item.id, field.key, v)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: BusinessDataField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "textarea") {
    return (
      <Textarea
        label={field.label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
      />
    );
  }
  return (
    <Input
      label={field.label}
      type={field.type === "number" ? "number" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
    />
  );
}
