"use client";

import { useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { QueryEmptyState } from "@/components/shared/query-state";
import * as mediaApi from "@/lib/api/media";
import { getErrorMessage } from "@/lib/errors/api-error";

export default function MediaPage() {
  const { addToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<
    { id: string; url?: string | null }[]
  >([]);

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const asset = await mediaApi.uploadMedia(form);
        setUploaded((prev) => [...prev, asset]);
      }
      addToast({ title: "Upload complete", variant: "success" });
    } catch (err) {
      addToast({
        title: "Upload failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    } finally {
      setUploading(false);
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
            Upload and manage images for your websites.
          </p>
        </div>
        <Button onClick={() => inputRef.current?.click()} isLoading={uploading}>
          <Upload className="size-4" aria-hidden />
          Upload
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {uploaded.length === 0 ? (
        <QueryEmptyState
          title="No media yet"
          description="Upload images to use in your website sections."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {uploaded.map((asset) => (
            <div
              key={asset.id}
              className="surface-2 border-border aspect-square overflow-hidden rounded-[var(--radius-xl)] border"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
