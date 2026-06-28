/** Persisted wizard draft state stored in WebsiteConfig.settings.wizard */

export type WizardStatus = "in_progress" | "complete";

export interface WizardContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface WizardDraftSettings {
  source: "visualise-wizard";
  wizardStep: number;
  wizardStatus: WizardStatus;
  completionPercent: number;
  industryId: string;
  themeId: string;
  paletteId: string;
  typographyId?: string;
  businessId: string;
  /** categoryId → marketplace optionId */
  selections: Record<string, string>;
  sectionOrder: string[];
  selectedComponentIds: string[];
  selectedEffectIds?: string[];
  contactInfo?: WizardContactInfo;
  photoMediaIds?: string[];
  lastSavedAt?: string;
}

export interface WizardDraft {
  websiteId: string;
  websiteName: string;
  businessId: string;
  status: string | null | undefined;
  updatedAt?: string;
  settings: WizardDraftSettings;
}

export type WizardStepKind =
  | "industry"
  | "style"
  | "component"
  | "contact"
  | "finish";

export interface WizardStepDef {
  id: string;
  label: string;
  kind: WizardStepKind;
  categoryId?: string;
}
