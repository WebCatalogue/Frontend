"use client";

import { useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { useToast } from "@/components/ui/toast";
import { VisualPropertyEditor } from "@/features/builder/properties/visual-property-editor";
import { RegistrySection } from "@/features/builder/registry";
import { BusinessDataPanel } from "@/features/composer/business-data/business-data-panel";
import {
  PaletteSelector,
  useThemeEngine,
} from "@/features/platform/theme-engine";
import { PLATFORM_THEMES, getTheme } from "@/features/platform/themes";
import {
  useUpdateSection,
  useUpdateSeo,
  useUpdateWebsiteConfig,
  useWebsiteSeo,
} from "@/hooks/use-api-queries";
import { getErrorMessage } from "@/lib/errors/api-error";
import type { PublishedSection, Section } from "@/types/api";
import { useBuilderStudio } from "./builder-context";
import { DesignTokenEditor } from "./design-token-editor";
import { EffectLayersPanel } from "./effect-layers-panel";

export function SectionSettingsEditor({
  section,
  pageId,
}: {
  section: Section;
  pageId: string;
}) {
  const updateSection = useUpdateSection(pageId);
  const { addToast } = useToast();
  const { setDirty, setSaving, setLastSavedAt } = useBuilderStudio();
  const [settings, setSettings] = useState<Record<string, unknown>>(
    (section.settings as Record<string, unknown>) ?? {},
  );

  async function handleSave() {
    setSaving(true);
    try {
      await updateSection.mutateAsync({
        sectionId: section.id,
        payload: { settings },
      });
      setDirty(false);
      setLastSavedAt(new Date());
      addToast({ title: "Settings saved", variant: "success" });
    } catch (err) {
      addToast({
        title: "Error",
        description: getErrorMessage(err),
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <VisualPropertyEditor
      componentKey={section.componentKey}
      settings={settings}
      onChange={(next) => {
        setSettings(next);
        setDirty(true);
      }}
      onSave={handleSave}
      isSaving={updateSection.isPending}
    />
  );
}

export function ThemePanelContent({ websiteId }: { websiteId: string }) {
  const { themeId, paletteId, setThemeId, setPaletteId } = useThemeEngine();
  const updateConfig = useUpdateWebsiteConfig(websiteId);
  const { addToast } = useToast();
  const { setDirty, setSaving, setLastSavedAt } = useBuilderStudio();
  const theme = getTheme(themeId);

  const demoSection: PublishedSection = {
    id: "theme-demo",
    componentKey: "hero.basic",
    settings: {
      headline: theme.name,
      subtitle: "Live preview updates as you edit tokens and palette.",
      ctaLabel: "Primary action",
      ctaHref: "#",
    },
  };

  return (
    <div className="space-y-5">
      <div
        className="preview-canvas border-border overflow-hidden rounded-[var(--radius-lg)] border"
        style={{
          background: "var(--preview-background)",
          fontFamily: "var(--preview-font-body)",
        }}
      >
        <RegistrySection section={demoSection} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PLATFORM_THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setThemeId(t.id);
              setPaletteId(t.defaultPaletteId);
              setDirty(true);
            }}
            className={`rounded-[var(--radius-lg)] border p-2 text-left ${
              themeId === t.id
                ? "border-accent ring-accent/20 ring-2"
                : "border-border"
            }`}
          >
            <div
              className="mb-1 h-5 rounded-md"
              style={{ background: t.previewGradient }}
            />
            <p className="type-body-sm font-medium">{t.name}</p>
          </button>
        ))}
      </div>
      <PaletteSelector
        value={paletteId}
        onChange={(id) => {
          setPaletteId(id);
          setDirty(true);
        }}
        options={theme.supportedPalettes}
      />
      <Button
        className="w-full"
        onClick={async () => {
          setSaving(true);
          try {
            await updateConfig.mutateAsync({
              themeId,
              settings: { paletteId },
            });
            setDirty(false);
            setLastSavedAt(new Date());
            addToast({ title: "Theme saved", variant: "success" });
          } catch (err) {
            addToast({
              title: "Error",
              description: getErrorMessage(err),
              variant: "error",
            });
          } finally {
            setSaving(false);
          }
        }}
        isLoading={updateConfig.isPending}
      >
        Save to website
      </Button>
    </div>
  );
}

export function TokensPanelContent() {
  const { designTokens, setDesignToken } = useBuilderStudio();
  return <DesignTokenEditor tokens={designTokens} onChange={setDesignToken} />;
}

export function SeoPanelContent({ websiteId }: { websiteId: string }) {
  const seoQuery = useWebsiteSeo(websiteId);
  const updateSeo = useUpdateSeo(websiteId);
  const { addToast } = useToast();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (seoQuery.data) {
      setTitle(seoQuery.data.metaTitle ?? "");
      setDesc(seoQuery.data.metaDescription ?? "");
    }
  }, [seoQuery.data]);

  if (seoQuery.isLoading) {
    return <p className="type-body-sm text-foreground-muted">Loading SEO…</p>;
  }

  return (
    <div className="space-y-3">
      <Input
        label="Meta title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Your business — City"
      />
      <label className="block space-y-1">
        <span className="type-body-sm text-foreground-muted">
          Meta description
        </span>
        <textarea
          className="border-border bg-background type-body-sm w-full rounded-[var(--radius-md)] border px-3 py-2"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>
      <Button
        size="sm"
        className="w-full"
        onClick={async () => {
          try {
            await updateSeo.mutateAsync({
              metaTitle: title,
              metaDescription: desc,
            });
            addToast({ title: "SEO saved", variant: "success" });
          } catch (err) {
            addToast({
              title: "Error",
              description: getErrorMessage(err),
              variant: "error",
            });
          }
        }}
        isLoading={updateSeo.isPending}
      >
        Save SEO
      </Button>
    </div>
  );
}

export function RightPanelTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  const tabs = [
    { id: "properties", label: "Props" },
    { id: "theme", label: "Theme" },
    { id: "tokens", label: "Tokens" },
    { id: "animations", label: "FX" },
    { id: "business-data", label: "Data" },
    { id: "seo", label: "SEO" },
  ] as const;

  return (
    <div className="border-border flex gap-0.5 overflow-x-auto border-b p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`type-body-sm shrink-0 rounded-[var(--radius-md)] px-2 py-1.5 transition-colors ${
            active === tab.id
              ? "bg-accent-muted text-foreground font-medium"
              : "text-foreground-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function BusinessDataPanelWrapper({ websiteId }: { websiteId: string }) {
  return <BusinessDataPanel websiteId={websiteId} />;
}

export { EffectLayersPanel as AnimationsPanelContent };
