export const BUILDER_STORAGE_KEY = "bhaikisite-builder-wizard";

export type BuilderEntrySource = "visualise" | "industry";

export interface BuilderWizardState {
  step: number;
  minStep: number;
  entrySource: BuilderEntrySource;
  returnPath: string | null;
  industryId: string | null;
  styleId: string | null;
  themeId: string;
  paletteId: string;
  enabledSections: string[];
  sectionOrder: string[];
  selections: Record<string, string>;
}

export interface BuilderOpenOptions {
  industryId?: string | null;
  returnPath?: string | null;
}

export interface BuilderStyleOption {
  id: string;
  label: string;
  description: string;
  themeId: string;
  paletteId: string;
  previewGradient: string;
}

export interface BuilderSectionOption {
  id: string;
  label: string;
  description: string;
  required?: boolean;
}

export interface BuilderEnquiryConfig {
  industryId: string;
  styleId: string;
  themeId: string;
  paletteId: string;
  enabledSections: string[];
  sectionOrder: string[];
  selections: Record<string, string>;
}
