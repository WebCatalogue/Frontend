"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { QueryEmptyState } from "@/components/shared/query-state";
import { useMediaLibrary } from "@/hooks/use-api-queries";
import { cn } from "@/lib/utils";

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImagePickerField({
  label,
  value,
  onChange,
}: ImagePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const mediaQuery = useMediaLibrary(search);
  const assets = mediaQuery.data ?? [];

  return (
    <div className="space-y-2">
      <label className="type-body-sm block font-medium">{label}</label>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
        >
          Browse
        </Button>
      </div>
      {value ? (
        <div className="border-border aspect-video overflow-hidden rounded-[var(--radius-lg)] border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="size-full object-cover" />
        </div>
      ) : null}

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
          <ModalHeader>
            <ModalTitle>Choose image</ModalTitle>
          </ModalHeader>
          <Input
            placeholder="Search media…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          {mediaQuery.isError ? (
            <QueryEmptyState
              title="Media library unavailable"
              description="Upload images from the Media page, or paste a URL directly."
            />
          ) : assets.length === 0 ? (
            <QueryEmptyState
              title="No images found"
              description="Upload images from Media → Upload, then return here."
            />
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    if (asset.url) onChange(asset.url);
                    setOpen(false);
                  }}
                  className={cn(
                    "border-border hover:ring-accent/40 aspect-square overflow-hidden rounded-[var(--radius-lg)] border transition-all hover:ring-2",
                    value === asset.url && "ring-accent ring-2",
                  )}
                >
                  {asset.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset.url}
                      alt={asset.alt ?? ""}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="text-foreground-muted flex size-full items-center justify-center">
                      <ImagePlus className="size-6" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
