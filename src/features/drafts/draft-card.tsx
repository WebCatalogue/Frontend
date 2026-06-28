"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Copy,
  ExternalLink,
  Layout,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useCreateWebsite, useDeleteWebsite } from "@/hooks/use-api-queries";
import { getIndustryPreset } from "@/features/platform/industry-presets";
import { getTheme } from "@/features/platform/themes";
import {
  formatSavedTime,
  parseWizardSettings,
} from "@/features/visualise-wizard/draft-utils";
import { VisualiseWizardDialog } from "@/features/visualise-wizard/visualise-wizard-dialog";
import type { WizardDraft } from "@/features/visualise-wizard/types";
import { getWebsiteConfig } from "@/lib/api/website";
import { getErrorMessage } from "@/lib/errors/api-error";
import { WebsiteStatusBadge } from "@/features/websites/website-status-badge";

interface DraftCardProps {
  draft: WizardDraft;
  onDeleted?: () => void;
}

export function DraftCard({ draft, onDeleted }: DraftCardProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const createWebsite = useCreateWebsite(draft.businessId);
  const deleteWebsite = useDeleteWebsite(draft.businessId);

  const preset = getIndustryPreset(draft.settings.industryId);
  const theme = getTheme(draft.settings.themeId);
  const isComplete = draft.settings.wizardStatus === "complete";

  async function handleDuplicate() {
    setDuplicating(true);
    try {
      const config = await getWebsiteConfig(draft.websiteId);
      const wizard = parseWizardSettings(config);
      if (!wizard) throw new Error("Draft settings not found");

      const copyName = `${draft.websiteName} (copy)`;
      const website = await createWebsite.mutateAsync({
        name: copyName,
        slug: copyName.toLowerCase().replace(/\s+/g, "-"),
      });

      const { updateWebsiteConfig } = await import("@/lib/api/website");
      await updateWebsiteConfig(website.id, {
        themeId: wizard.themeId,
        settings: {
          paletteId: wizard.paletteId,
          wizard: {
            ...wizard,
            wizardStep: 0,
            wizardStatus: "in_progress",
            completionPercent: 0,
            lastSavedAt: new Date().toISOString(),
          },
        },
      });

      addToast({ title: "Draft duplicated", variant: "success" });
      router.push("/app/drafts");
    } catch (err) {
      addToast({
        title: "Duplicate failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    } finally {
      setDuplicating(false);
      setMenuOpen(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteWebsite.mutateAsync(draft.websiteId);
      addToast({ title: "Draft deleted", variant: "success" });
      onDeleted?.();
    } catch (err) {
      addToast({
        title: "Delete failed",
        description: getErrorMessage(err),
        variant: "error",
      });
    } finally {
      setDeleting(false);
      setMenuOpen(false);
    }
  }

  return (
    <>
      <article className="surface-2 border-border group relative rounded-[var(--radius-2xl)] border p-6 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="type-heading-sm truncate font-medium">
              {draft.websiteName}
            </h3>
            <p className="type-body-sm text-foreground-muted mt-1">
              {preset?.name ?? draft.settings.industryId} · {theme.name}
            </p>
          </div>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Draft actions"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MoreHorizontal className="size-4" />
            </Button>
            {menuOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-10"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                />
                <div
                  role="menu"
                  className="surface-2 border-border absolute top-full right-0 z-20 mt-1 w-44 rounded-[var(--radius-lg)] border py-1 shadow-lg"
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="hover:bg-muted/60 flex w-full items-center gap-2 px-3 py-2 text-sm"
                    onClick={() => void handleDuplicate()}
                    disabled={duplicating}
                  >
                    <Copy className="size-4" aria-hidden />
                    Duplicate
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-2 px-3 py-2 text-sm"
                    onClick={() => void handleDelete()}
                    disabled={deleting}
                  >
                    <Trash2 className="size-4" aria-hidden />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <WebsiteStatusBadge status={draft.status} />
          <Badge variant={isComplete ? "accent" : "outline"}>
            {draft.settings.completionPercent}% complete
          </Badge>
          {draft.updatedAt && (
            <span className="type-body-sm text-foreground-subtle">
              Edited{" "}
              {formatSavedTime(draft.settings.lastSavedAt ?? draft.updatedAt)}
            </span>
          )}
        </div>

        <div className="bg-muted mt-4 h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full transition-all"
            style={{ width: `${draft.settings.completionPercent}%` }}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setWizardOpen(true)}>
            <Layout className="size-4" aria-hidden />
            Continue Editing
          </Button>
          {isComplete && (
            <Button asChild size="sm" variant="outline">
              <Link href={`/app/websites/${draft.websiteId}/builder`}>
                Open Composer
              </Link>
            </Button>
          )}
          <Button asChild size="sm" variant="ghost">
            <Link href={`/app/websites/${draft.websiteId}`}>
              <ExternalLink className="size-4" aria-hidden />
              Preview
            </Link>
          </Button>
        </div>
      </article>

      <VisualiseWizardDialog
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        initialDraftId={draft.websiteId}
      />
    </>
  );
}
