"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { RegistrySection } from "@/features/builder/registry";
import {
  INDUSTRY_PRESETS,
  getIndustryPreset,
} from "@/features/platform/industry-presets";
import {
  PaletteSelector,
  ThemeEngineProvider,
  useThemeEngine,
} from "@/features/platform/theme-engine";
import { PLATFORM_THEMES, getTheme } from "@/features/platform/themes";
import {
  useBusinesses,
  useComponentRegistry,
  useCreateWebsite,
} from "@/hooks/use-api-queries";
import * as pagesApi from "@/lib/api/pages";
import { updateWebsiteConfig } from "@/lib/api/website";
import { getErrorMessage } from "@/lib/errors/api-error";
import { getTemplateById } from "@/mock/industry-templates";
import type { PublishedSection } from "@/types/api";

const STEPS = [
  "Industry",
  "Theme",
  "Template",
  "Customize",
  "Preview",
  "Publish",
] as const;

export default function ComposePage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [industryId, setIndustryId] = useState<string | null>(null);
  const [themeId, setThemeId] = useState("modern");
  const [paletteId, setPaletteId] = useState("blue");
  const [sections, setSections] = useState<string[]>([]);
  const [websiteName, setWebsiteName] = useState("My Website");
  const [businessId, setBusinessId] = useState<string | null>(null);
  const registryQuery = useComponentRegistry();
  const registryKeys = registryQuery.data?.map((c) => c.key) ?? [];

  useEffect(() => {
    const industry = searchParams.get("industry");
    const templateId = searchParams.get("template");
    const sectionsParam = searchParams.get("sections");
    const themeParam = searchParams.get("theme");
    const paletteParam = searchParams.get("palette");

    if (industry) {
      const preset = getIndustryPreset(industry);
      if (preset) {
        setIndustryId(industry);
        setThemeId(themeParam ?? preset.recommendedThemeId);
        setPaletteId(paletteParam ?? preset.recommendedPaletteId);
        if (sectionsParam) {
          setSections(sectionsParam.split(",").filter(Boolean));
        } else {
          setSections(preset.recommendedSections);
        }
        setWebsiteName(`My ${preset.name}`);
        setStep(sectionsParam ? 3 : 1);
      }
    }
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        setIndustryId(template.industrySlug);
        setThemeId(template.themeId);
        setPaletteId(template.paletteId);
        setWebsiteName(template.name);
        setStep(2);
      }
    }
  }, [searchParams]);

  const preset = industryId ? getIndustryPreset(industryId) : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="type-display-md text-foreground font-[family-name:var(--font-display)] tracking-tight">
          Compose a website
        </h1>
        <p className="type-body-sm text-foreground-muted mt-2">
          Choose your industry, theme, and components — then publish in minutes.
        </p>
      </div>

      <ol className="flex flex-wrap gap-2" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`type-label rounded-full px-3 py-1 ${
              i === step
                ? "bg-accent text-accent-foreground"
                : i < step
                  ? "bg-success-muted text-success"
                  : "bg-muted text-foreground-muted"
            }`}
          >
            {i < step ? <Check className="mr-1 inline size-3" /> : null}
            {label}
          </li>
        ))}
      </ol>

      <ThemeEngineProvider
        initialThemeId={preset?.recommendedThemeId ?? themeId}
        initialPaletteId={preset?.recommendedPaletteId ?? paletteId}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <IndustryStep
                value={industryId}
                onChange={(id) => {
                  setIndustryId(id);
                  const p = getIndustryPreset(id);
                  if (p) {
                    setThemeId(p.recommendedThemeId);
                    setPaletteId(p.recommendedPaletteId);
                    setSections(p.recommendedSections);
                  }
                }}
              />
            )}
            {step === 1 && (
              <ThemeStep
                themeId={themeId}
                paletteId={paletteId}
                onThemeChange={setThemeId}
                onPaletteChange={setPaletteId}
              />
            )}
            {step === 2 && (
              <TemplateStep
                sections={sections}
                onChange={setSections}
                preset={preset ?? undefined}
              />
            )}
            {step === 3 && (
              <CustomizeStep
                sections={sections}
                onChange={setSections}
                registryKeys={registryKeys}
              />
            )}
            {step === 4 && <PreviewStep sections={sections} />}
            {step === 5 && (
              <PublishStep
                websiteName={websiteName}
                onNameChange={setWebsiteName}
                businessId={businessId}
                onBusinessChange={setBusinessId}
                industryId={industryId}
                themeId={themeId}
                paletteId={paletteId}
                sections={sections}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </ThemeEngineProvider>

      <div className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)}>
            Continue
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function IndustryStep({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {INDUSTRY_PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onChange(preset.id)}
          className={`surface-2 rounded-[var(--radius-2xl)] border p-5 text-left transition-all ${
            value === preset.id
              ? "border-accent ring-accent/20 ring-2"
              : "border-border hover:border-border-strong"
          }`}
        >
          <span className="text-3xl" aria-hidden>
            {preset.icon}
          </span>
          <p className="type-heading-sm mt-3 font-medium">{preset.name}</p>
          <p className="type-body-sm text-foreground-muted mt-1">
            {preset.description}
          </p>
        </button>
      ))}
    </div>
  );
}

function ThemeStep({
  themeId,
  paletteId,
  onThemeChange,
  onPaletteChange,
}: {
  themeId: string;
  paletteId: string;
  onThemeChange: (id: string) => void;
  onPaletteChange: (id: string) => void;
}) {
  const engine = useThemeEngine();
  const theme = getTheme(themeId);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {PLATFORM_THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              onThemeChange(t.id);
              onPaletteChange(t.defaultPaletteId);
              engine.setThemeId(t.id);
              engine.setPaletteId(t.defaultPaletteId);
            }}
            className={`rounded-[var(--radius-xl)] border p-4 text-left ${
              themeId === t.id
                ? "border-accent ring-accent/20 ring-2"
                : "border-border"
            }`}
          >
            <div
              className="mb-3 h-12 rounded-lg"
              style={{ background: t.previewGradient }}
              aria-hidden
            />
            <p className="type-body-sm font-medium">{t.name}</p>
          </button>
        ))}
      </div>
      <PaletteSelector
        value={paletteId}
        onChange={(id) => {
          onPaletteChange(id);
          engine.setPaletteId(id);
        }}
        options={theme.supportedPalettes}
      />
    </div>
  );
}

function TemplateStep({
  sections,
  onChange,
  preset,
}: {
  sections: string[];
  onChange: (s: string[]) => void;
  preset: ReturnType<typeof getIndustryPreset> | undefined;
}) {
  return (
    <div className="space-y-4">
      <p className="type-body-sm text-foreground-muted">
        {preset
          ? `Recommended sections for ${preset.name}:`
          : "Select a starting template:"}
      </p>
      <div className="flex flex-wrap gap-2">
        {(preset?.recommendedSections ?? sections).map((key) => (
          <Badge
            key={key}
            variant={sections.includes(key) ? "accent" : "outline"}
          >
            {key}
          </Badge>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => onChange(preset?.recommendedSections ?? sections)}
      >
        Apply recommended template
      </Button>
    </div>
  );
}

function CustomizeStep({
  sections,
  onChange,
  registryKeys,
}: {
  sections: string[];
  onChange: (s: string[]) => void;
  registryKeys: string[];
}) {
  return (
    <div className="space-y-3">
      <p className="type-body-sm text-foreground-muted">
        Toggle components. Drag-to-reorder coming soon — use arrows in the
        builder.
      </p>
      {registryKeys.map((key) => {
        const active = sections.includes(key);
        return (
          <button
            key={key}
            type="button"
            onClick={() =>
              onChange(
                active ? sections.filter((s) => s !== key) : [...sections, key],
              )
            }
            className={`flex w-full items-center justify-between rounded-[var(--radius-lg)] border px-4 py-3 text-sm ${
              active ? "border-accent bg-accent-muted/30" : "border-border"
            }`}
          >
            {key}
            {active && <Check className="text-accent size-4" />}
          </button>
        );
      })}
    </div>
  );
}

function PreviewStep({ sections }: { sections: string[] }) {
  return (
    <div
      className="preview-canvas border-border overflow-hidden rounded-[var(--radius-2xl)] border shadow-lg"
      style={{
        background: "var(--preview-background)",
        color: "var(--preview-foreground)",
      }}
    >
      {sections.map((key, i) => (
        <RegistrySection
          key={`${key}-${i}`}
          section={
            {
              id: String(i),
              componentKey: key,
              settings: {},
            } as PublishedSection
          }
        />
      ))}
      {sections.length === 0 && (
        <p className="text-foreground-muted p-12 text-center">
          No sections selected.
        </p>
      )}
    </div>
  );
}

function PublishStep({
  websiteName,
  onNameChange,
  businessId,
  onBusinessChange,
  themeId,
  paletteId,
  sections,
}: {
  websiteName: string;
  onNameChange: (n: string) => void;
  businessId: string | null;
  onBusinessChange: (id: string) => void;
  industryId: string | null;
  themeId: string;
  paletteId: string;
  sections: string[];
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const businessesQuery = useBusinesses();
  const createWebsite = useCreateWebsite(businessId ?? "");
  const [publishing, setPublishing] = useState(false);

  async function handlePublish() {
    if (!businessId || !websiteName.trim()) {
      addToast({ title: "Select a business and name", variant: "error" });
      return;
    }
    setPublishing(true);
    try {
      const website = await createWebsite.mutateAsync({
        name: websiteName.trim(),
        slug: websiteName.trim().toLowerCase().replace(/\s+/g, "-"),
      });

      await updateWebsiteConfig(website.id, {
        themeId,
        settings: { paletteId },
      });

      if (sections.length > 0) {
        const page = await pagesApi.createWebsitePage(website.id, {
          title: "Home",
        });
        for (const componentKey of sections) {
          await pagesApi.createPageSection(page.id, { componentKey });
        }
      }

      addToast({ title: "Website created!", variant: "success" });
      router.push(`/app/websites/${website.id}/builder`);
    } catch (err) {
      addToast({
        title: "Error",
        description: getErrorMessage(err),
        variant: "error",
      });
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="surface-2 border-border max-w-md space-y-4 rounded-[var(--radius-2xl)] border p-6">
      <Input
        label="Website name"
        value={websiteName}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <div>
        <label
          className="type-body-sm mb-2 block font-medium"
          htmlFor="business-select"
        >
          Business
        </label>
        <select
          id="business-select"
          value={businessId ?? ""}
          onChange={(e) => onBusinessChange(e.target.value)}
          className="border-input bg-surface-1 h-11 w-full rounded-[var(--radius-lg)] border px-3 text-sm"
        >
          <option value="">Select business…</option>
          {(businessesQuery.data ?? []).map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        className="w-full"
        size="lg"
        onClick={handlePublish}
        isLoading={publishing || createWebsite.isPending}
      >
        <Rocket className="size-4" aria-hidden />
        Create & open builder
      </Button>
    </div>
  );
}
