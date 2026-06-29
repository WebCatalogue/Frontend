"use client";

import { useRef } from "react";
import {
  FileImage,
  FileText,
  ImagePlus,
  Receipt,
  ScrollText,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ContributorAvatar } from "./contributor-avatar";
import {
  useAddProjectAttachment,
  useDeleteProjectAttachment,
} from "@/hooks/use-agency-queries";
import { useUploadMedia } from "@/hooks/use-api-queries";
import type { ProjectAttachment } from "@/types/agency";

const TYPE_ICONS: Record<ProjectAttachment["type"], typeof FileText> = {
  logo: ImagePlus,
  image: FileImage,
  pdf: FileText,
  "brand-guide": ScrollText,
  invoice: Receipt,
  contract: ScrollText,
  other: FileText,
};

interface ProjectFilesProps {
  projectId: string;
  attachments: ProjectAttachment[];
}

export function ProjectFiles({ projectId, attachments }: ProjectFilesProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadMedia = useUploadMedia();
  const addAttachment = useAddProjectAttachment(projectId);
  const deleteAttachment = useDeleteProjectAttachment(projectId);
  const { addToast } = useToast();

  async function handleUpload(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const media = await uploadMedia.mutateAsync(formData);
      await addAttachment.mutateAsync({
        mediaId: media.id,
        name: media.filename ?? file.name,
        type: file.type.startsWith("image/") ? "image" : "other",
      });
      addToast({ title: "File uploaded", variant: "success" });
    } catch {
      addToast({
        title: "Upload failed",
        description: "Could not upload this file. Please try again.",
        variant: "error",
      });
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleUpload(file);
          event.target.value = "";
        }}
      />
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => inputRef.current?.click()}
        isLoading={uploadMedia.isPending || addAttachment.isPending}
      >
        <Upload className="size-4" />
        Upload file
      </Button>

      <div className="grid gap-3 sm:grid-cols-2">
        {attachments.map((file) => {
          const Icon = TYPE_ICONS[file.type] ?? FileText;
          return (
            <div
              key={file.id}
              className="surface-2 border-border flex items-center gap-3 rounded-[var(--radius-lg)] border p-4"
            >
              <div className="bg-muted flex size-10 items-center justify-center rounded-[var(--radius-md)]">
                <Icon className="text-foreground-muted size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="type-body-sm truncate font-medium">{file.name}</p>
                <p className="type-label text-foreground-subtle mt-0.5 flex items-center gap-2">
                  {file.size} · <ContributorAvatar name={file.uploadedBy} />
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void deleteAttachment.mutateAsync(file.id)}
                isLoading={deleteAttachment.isPending}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>

      {attachments.length === 0 && (
        <p className="type-body-sm text-foreground-muted border-border rounded-[var(--radius-lg)] border border-dashed p-8 text-center">
          No files uploaded yet. Logo, brand guides, and contracts appear here.
        </p>
      )}
    </div>
  );
}
