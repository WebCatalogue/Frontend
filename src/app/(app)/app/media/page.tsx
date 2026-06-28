"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import {
  QueryEmptyState,
  QueryErrorState,
  QueryLoadingState,
} from "@/components/shared/query-state";
import {
  useDeleteMedia,
  useMediaLibrary,
  useUploadMedia,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import { cn } from "@/lib/utils";

export default function MediaPage() {
  const { addToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [sessionUploads, setSessionUploads] = useState<
    { id: string; url?: string | null }[]
  >([]);

  const mediaQuery = useMediaLibrary(search);
  const uploadMedia = useUploadMedia();
  const deleteMedia = useDeleteMedia();

  const assets = [
    ...(mediaQuery.data ?? []),
    ...sessionUploads.filter(
      (s) => !(mediaQuery.data ?? []).some((m) => m.id === s.id),
    ),
  ];

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      try {
        for (const file of Array.from(files)) {
          const form = new FormData();
          form.append("file", file);
          const asset = await uploadMedia.mutateAsync(form);
          setSessionUploads((prev) => [...prev, asset]);
        }
        addToast({ title: "Upload complete", variant: "success" });
      } catch (err) {
        addToast({
          title: "Upload failed",
          description: getErrorMessage(err),
          variant: "error",
        });
      }
    },
    [uploadMedia, addToast],
  );

  async function handleDelete(id: string) {
    try {
      await deleteMedia.mutateAsync(id);
      setSessionUploads((prev) => prev.filter((a) => a.id !== id));
      addToast({ title: "Deleted", variant: "success" });
    } catch (err) {
      addToast({
        title: "Delete failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
            Media library
          </h1>
          <p className="type-body-sm text-foreground-muted mt-2">
            Upload, search, and manage images for your websites.
          </p>
        </div>
        <Button
          onClick={() => inputRef.current?.click()}
          isLoading={uploadMedia.isPending}
        >
          <Upload className="size-4" aria-hidden />
          Upload
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => void handleUpload(e.target.files)}
        />
      </div>

      <div className="relative max-w-md">
        <Search className="text-foreground-muted absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          className="pl-10"
          placeholder="Search media…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleUpload(e.dataTransfer.files);
        }}
        className={cn(
          "border-border rounded-[var(--radius-2xl)] border border-dashed p-8 text-center transition-colors",
          dragOver && "border-accent bg-accent-muted/20",
        )}
      >
        <p className="type-body-sm text-foreground-muted">
          Drag and drop images here, or use the Upload button.
        </p>
      </div>

      {mediaQuery.isLoading && assets.length === 0 ? (
        <QueryLoadingState label="Loading media library…" />
      ) : mediaQuery.isError && assets.length === 0 ? (
        <div className="space-y-4">
          <QueryErrorState
            error={mediaQuery.error}
            onRetry={() => void mediaQuery.refetch()}
          />
          <p className="type-body-sm text-foreground-muted text-center">
            You can still upload files — they will appear after a successful
            upload.
          </p>
        </div>
      ) : assets.length === 0 ? (
        <QueryEmptyState
          title="No media yet"
          description="Upload images to use in your website sections."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="surface-2 border-border group relative aspect-square overflow-hidden rounded-[var(--radius-xl)] border"
            >
              {asset.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset.url}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <div className="text-foreground-muted flex size-full items-center justify-center">
                  <ImagePlus className="size-8" aria-hidden />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => void handleDelete(asset.id)}
                  aria-label="Delete"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
