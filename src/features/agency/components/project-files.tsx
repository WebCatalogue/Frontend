"use client";

import {
  FileImage,
  FileText,
  ImagePlus,
  Receipt,
  ScrollText,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContributorAvatar } from "./contributor-avatar";
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
  attachments: ProjectAttachment[];
}

export function ProjectFiles({ attachments }: ProjectFilesProps) {
  return (
    <div className="space-y-4">
      <Button variant="outline" size="sm" className="gap-2">
        <Upload className="size-4" />
        Upload file (mock)
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
