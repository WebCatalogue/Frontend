import type { DemoImageKey } from "@/lib/demo-images";

export type AccessibilityRating = "aa" | "aaa" | "partial";
export type PerformanceRating = "light" | "moderate" | "heavy";

export interface MarketplaceCategory {
  id: string;
  label: string;
  description: string;
  /** Universal sections appear on every industry; extras are industry-specific */
  kind: "universal" | "industry";
}

export interface MarketplaceOption {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  componentKey: string;
  variant?: string | null;
  settings?: Record<string, unknown> | null;
  screenshot: string;
  supportedThemes: string[];
  supportedIndustries: string[];
  animations: string[];
  mobileReady: boolean;
  accessibility: AccessibilityRating;
  performance: PerformanceRating;
  tags?: string[];
}

export interface MarketplaceIndustryConfig {
  industrySlug: string;
  categories: MarketplaceCategory[];
  defaultSelections: Record<string, string>;
}

export type PreviewDevice = "desktop" | "tablet" | "mobile";

export interface MarketplaceSelections {
  [categoryId: string]: string;
}

/** Helper for catalog authors */
export interface OptionDef {
  id: string;
  name: string;
  description: string;
  componentKey: string;
  imageKey: DemoImageKey;
  variant?: string;
  settings?: Record<string, unknown>;
  supportedThemes?: string[];
  supportedIndustries?: string[];
  animations?: string[];
  mobileReady?: boolean;
  accessibility?: AccessibilityRating;
  performance?: PerformanceRating;
  tags?: string[];
}
