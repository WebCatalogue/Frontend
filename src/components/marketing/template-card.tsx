"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Eye, Sparkles } from "lucide-react";
import { DemoImage } from "@/components/marketing/demo-image";
import { ColorSwatches } from "@/components/marketing/color-swatches";
import { Badge, Button } from "@/components/ui";
import { ROUTES } from "@/constants";
import { getTheme } from "@/features/platform/themes";
import type { IndustryTemplate } from "@/mock/industry-templates";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: IndustryTemplate;
  industrySlug: string;
  onPreview: (template: IndustryTemplate) => void;
  index?: number;
}

export function TemplateCard({
  template,
  industrySlug: _industrySlug,
  onPreview,
  index = 0,
}: TemplateCardProps) {
  const theme = getTheme(template.themeId);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group depth-panel flex h-full flex-col overflow-hidden"
    >
      <div className="relative grid grid-cols-[1fr_5rem] gap-2 p-3 pb-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)]">
          <DemoImage
            src={template.desktopImage}
            alt={`${template.name} desktop preview`}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-md)]">
          <DemoImage
            src={template.mobileImage}
            alt={`${template.name} mobile preview`}
            sizes="80px"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">{theme?.name ?? template.themeId}</Badge>
          <Badge variant="outline" className="capitalize">
            {template.animationStyle}
          </Badge>
        </div>

        <h3 className="type-heading-sm text-foreground mt-3">
          {template.name}
        </h3>
        <p className="type-body-sm text-foreground-muted mt-2 flex-1">
          {template.description}
        </p>

        <div className="mt-4 space-y-3 border-t border-[var(--color-border-subtle)] pt-4">
          <div>
            <p className="type-label text-foreground-subtle mb-1.5">Pages</p>
            <p className="type-body-sm text-foreground-muted">
              {template.pages.join(" · ")}
            </p>
          </div>

          <div>
            <p className="type-label text-foreground-subtle mb-2">Palette</p>
            <ColorSwatches paletteId={template.paletteId} size="sm" />
          </div>

          <div>
            <p className="type-label text-foreground-subtle mb-2">Sections</p>
            <ul className="flex flex-wrap gap-1.5">
              {template.sections.slice(0, 6).map((s) => (
                <li
                  key={s}
                  className="type-label text-foreground-muted bg-muted flex items-center gap-1 rounded-full px-2 py-0.5 !tracking-normal !normal-case"
                >
                  <Check className="text-accent size-3" aria-hidden />
                  {s}
                </li>
              ))}
              {template.sections.length > 6 && (
                <li className="type-label text-foreground-subtle px-1">
                  +{template.sections.length - 6} more
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onPreview(template)}
          >
            <Eye className="size-4" aria-hidden />
            Preview
          </Button>
          <Button variant="primary" className="flex-1" asChild>
            <Link href={ROUTES.visualise}>
              <Sparkles className="size-4" aria-hidden />
              Visualise
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

interface ThemeInfoRowProps {
  label: string;
  value: string;
  className?: string;
}

export function ThemeInfoRow({ label, value, className }: ThemeInfoRowProps) {
  return (
    <div className={cn("flex justify-between gap-4 py-2", className)}>
      <span className="type-body-sm text-foreground-muted">{label}</span>
      <span className="type-body-sm text-foreground text-right font-medium">
        {value}
      </span>
    </div>
  );
}
