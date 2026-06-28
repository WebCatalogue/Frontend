"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ExternalLink, Layout, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIndustryPreset } from "@/features/platform/industry-presets";
import { getTheme } from "@/features/platform/themes";
import { getWizardSectionOrder } from "./constants";
import type { WizardDraftSettings } from "./types";

interface WizardFinishStepProps {
  settings: WizardDraftSettings;
  websiteId: string;
  websiteName: string;
  onOpenComposer: () => void;
  isMaterializing?: boolean;
}

export function WizardFinishStep({
  settings,
  websiteId,
  websiteName,
  onOpenComposer,
  isMaterializing,
}: WizardFinishStepProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const preset = getIndustryPreset(settings.industryId);
  const theme = getTheme(settings.themeId);
  const sectionOrder = getWizardSectionOrder(settings.industryId);
  const selectedSections = sectionOrder.filter(
    (id) => settings.selections[id] || id === "footer",
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-xl space-y-8 text-center"
    >
      <div>
        <p className="text-4xl" aria-hidden>
          🎉
        </p>
        <h2 className="type-display-sm text-foreground mt-4 font-[family-name:var(--font-display)] tracking-tight">
          Your website draft is ready!
        </h2>
        <p className="type-body-md text-foreground-muted mt-2">
          {websiteName} has been assembled with your selections.
        </p>
      </div>

      <div className="surface-2 border-border space-y-4 rounded-[var(--radius-2xl)] border p-6 text-left">
        <SummaryRow
          label="Industry"
          value={preset?.name ?? settings.industryId}
        />
        <SummaryRow label="Theme" value={theme.name} />
        <SummaryRow
          label="Selected sections"
          value={`${selectedSections.length} sections`}
        />
        <SummaryRow
          label="Estimated pages"
          value={`${preset?.recommendedPages.length ?? 1} pages`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Button
          size="lg"
          onClick={onOpenComposer}
          isLoading={isMaterializing}
          className="gap-2"
        >
          <Layout className="size-4" aria-hidden />
          Open in Composer
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={`/app/websites/${websiteId}`}>
            <ExternalLink className="size-4" aria-hidden />
            Preview Website
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setSaved(true);
            router.push("/app/drafts");
          }}
        >
          <Save className="size-4" aria-hidden />
          {saved ? "Saved" : "Save Draft"}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => router.push("/app/websites")}
        >
          <Clock className="size-4" aria-hidden />
          Publish Later
        </Button>
      </div>

      <Button
        variant="link"
        onClick={onOpenComposer}
        className="text-foreground-muted"
      >
        Continue to fine-tune in Composer
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </motion.div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-3 last:border-0 last:pb-0">
      <span className="type-body-sm text-foreground-muted">{label}</span>
      <span className="type-body-sm font-medium">{value}</span>
    </div>
  );
}
