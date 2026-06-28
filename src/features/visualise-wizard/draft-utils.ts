import {
  buildComposeSections,
  getDefaultSelections,
  getOptionById,
} from "@/features/marketplace/catalog";
import type { Website, WebsiteConfig } from "@/types/api";
import {
  computeCompletionPercent,
  getWizardSectionOrder,
  WIZARD_TOTAL_STEPS,
} from "./constants";
import type { WizardDraft, WizardDraftSettings } from "./types";

export const WIZARD_SOURCE = "visualise-wizard" as const;

export function isWizardDraftSettings(
  value: unknown,
): value is WizardDraftSettings {
  if (!value || typeof value !== "object") return false;
  const w = value as WizardDraftSettings;
  return w.source === WIZARD_SOURCE && typeof w.industryId === "string";
}

export function parseWizardSettings(
  config: WebsiteConfig | undefined,
): WizardDraftSettings | null {
  const raw = config?.settings?.wizard;
  return isWizardDraftSettings(raw) ? raw : null;
}

export function isWizardDraftWebsite(
  website: Website,
  config?: WebsiteConfig,
): boolean {
  if (website.status !== "draft") return false;
  return parseWizardSettings(config) !== null;
}

export function buildWizardDraft(
  website: Website,
  config: WebsiteConfig | undefined,
): WizardDraft | null {
  const settings = parseWizardSettings(config);
  if (!settings) return null;
  return {
    websiteId: website.id,
    websiteName: website.name,
    businessId: settings.businessId ?? website.businessId ?? "",
    status: website.status,
    updatedAt: config?.updatedAt ?? website.updatedAt,
    settings,
  };
}

export function createInitialWizardSettings(
  businessId: string,
  industryId: string,
  themeId: string,
  paletteId: string,
): WizardDraftSettings {
  const sectionOrder = getWizardSectionOrder(industryId);
  const defaultSelections = getDefaultSelections(industryId, [
    "navigation",
    "hero",
    "about",
    getIndustryCategoryId(industryId),
    "gallery",
    "contact",
  ]);

  return {
    source: WIZARD_SOURCE,
    wizardStep: 0,
    wizardStatus: "in_progress",
    completionPercent: 0,
    industryId,
    themeId,
    paletteId,
    typographyId: "typography-instrument-inter",
    businessId,
    selections: defaultSelections,
    sectionOrder,
    selectedComponentIds: [],
    selectedEffectIds: [],
    contactInfo: {},
    photoMediaIds: [],
    lastSavedAt: new Date().toISOString(),
  };
}

function getIndustryCategoryId(industryId: string): string {
  const map: Record<string, string> = {
    cafe: "menu",
    bakery: "menu",
    restaurant: "menu",
    gym: "membership",
    salon: "services",
    hotel: "rooms",
    clinic: "services",
    jewellery: "collections",
    furniture: "catalogue",
    "real-estate": "listings",
    photography: "portfolio",
    fashion: "lookbook",
    education: "testimonials",
  };
  return map[industryId] ?? "testimonials";
}

export function mergeWizardSettings(
  current: WizardDraftSettings,
  patch: Partial<WizardDraftSettings>,
): WizardDraftSettings {
  const wizardStep = patch.wizardStep ?? current.wizardStep;
  const wizardStatus =
    patch.wizardStatus ??
    (wizardStep >= WIZARD_TOTAL_STEPS ? "complete" : current.wizardStatus);

  const merged: WizardDraftSettings = {
    ...current,
    ...patch,
    selections: { ...current.selections, ...patch.selections },
    wizardStep,
    wizardStatus,
    completionPercent:
      patch.completionPercent ??
      computeCompletionPercent(
        wizardStatus === "complete" ? WIZARD_TOTAL_STEPS : wizardStep,
      ),
    lastSavedAt: new Date().toISOString(),
  };

  merged.selectedComponentIds = buildSelectedComponentIds(merged);
  merged.sectionOrder = getWizardSectionOrder(merged.industryId);

  return merged;
}

export function buildSelectedComponentIds(
  settings: WizardDraftSettings,
): string[] {
  const order = getWizardSectionOrder(settings.industryId);
  const keys = buildComposeSections(settings.selections, order);
  return keys.map((key) => `component-${key}`);
}

export function buildSectionPayloads(settings: WizardDraftSettings): Array<{
  componentKey: string;
  variant?: string;
  settings?: Record<string, unknown>;
}> {
  const order = getWizardSectionOrder(settings.industryId);
  const payloads: Array<{
    componentKey: string;
    variant?: string;
    settings?: Record<string, unknown>;
  }> = [];
  const seen = new Set<string>();

  for (const categoryId of order) {
    if (categoryId === "footer") {
      if (!seen.has("footer.simple")) {
        payloads.push({ componentKey: "footer.standard" });
        seen.add("footer.standard");
      }
      continue;
    }

    const optionId = settings.selections[categoryId];
    if (!optionId) continue;
    const option = getOptionById(optionId);
    if (!option || seen.has(option.componentKey)) continue;
    seen.add(option.componentKey);
    payloads.push({
      componentKey: option.componentKey,
      variant: option.variant ?? undefined,
      settings: option.settings ?? undefined,
    });
  }

  return payloads;
}

export function formatSavedTime(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) {
    const mins = Math.floor(diff / 60_000);
    return `${mins} min${mins === 1 ? "" : "s"} ago`;
  }
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
