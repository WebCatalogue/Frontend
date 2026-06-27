"use client";

import { useState } from "react";
import { TemplateCard } from "@/components/marketing/template-card";
import { TemplatePreviewModal } from "@/components/marketing/template-preview-modal";
import type { IndustryTemplate } from "@/mock/industry-templates";

interface IndustryTemplateGridProps {
  templates: IndustryTemplate[];
  industrySlug: string;
}

export function IndustryTemplateGrid({
  templates,
  industrySlug,
}: IndustryTemplateGridProps) {
  const [previewTemplate, setPreviewTemplate] =
    useState<IndustryTemplate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePreview = (template: IndustryTemplate) => {
    setPreviewTemplate(template);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template, i) => (
          <TemplateCard
            key={template.id}
            template={template}
            industrySlug={industrySlug}
            onPreview={handlePreview}
            index={i}
          />
        ))}
      </div>

      <TemplatePreviewModal
        template={previewTemplate}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
