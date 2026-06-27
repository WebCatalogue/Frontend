export interface DesignTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  muted: string;
  text: string;
  heading: string;
  radius: string;
  shadow: string;
  spacing: string;
  animationSpeed: string;
  fontDisplay: string;
  fontBody: string;
}

export const DEFAULT_DESIGN_TOKENS: DesignTokens = {
  primary: "#2563EB",
  secondary: "#60A5FA",
  accent: "#3B82F6",
  background: "#FAFAF8",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  muted: "#F3F4F6",
  text: "#111827",
  heading: "#0F172A",
  radius: "0.75rem",
  shadow: "0 4px 24px rgba(0,0,0,0.06)",
  spacing: "1rem",
  animationSpeed: "0.3s",
  fontDisplay: "var(--font-instrument-serif)",
  fontBody: "var(--font-inter)",
};

export const TOKEN_GROUPS: { label: string; keys: (keyof DesignTokens)[] }[] = [
  {
    label: "Colours",
    keys: [
      "primary",
      "secondary",
      "accent",
      "background",
      "surface",
      "border",
      "success",
      "warning",
      "danger",
      "muted",
      "text",
      "heading",
    ],
  },
  {
    label: "Shape & motion",
    keys: ["radius", "shadow", "spacing", "animationSpeed"],
  },
  {
    label: "Typography",
    keys: ["fontDisplay", "fontBody"],
  },
];

export function applyDesignTokens(tokens: DesignTokens): void {
  const root = document.documentElement;
  root.style.setProperty("--token-primary", tokens.primary);
  root.style.setProperty("--token-secondary", tokens.secondary);
  root.style.setProperty("--token-accent", tokens.accent);
  root.style.setProperty("--token-background", tokens.background);
  root.style.setProperty("--token-surface", tokens.surface);
  root.style.setProperty("--token-border", tokens.border);
  root.style.setProperty("--token-success", tokens.success);
  root.style.setProperty("--token-warning", tokens.warning);
  root.style.setProperty("--token-danger", tokens.danger);
  root.style.setProperty("--token-muted", tokens.muted);
  root.style.setProperty("--token-text", tokens.text);
  root.style.setProperty("--token-heading", tokens.heading);
  root.style.setProperty("--token-radius", tokens.radius);
  root.style.setProperty("--token-shadow", tokens.shadow);
  root.style.setProperty("--token-spacing", tokens.spacing);
  root.style.setProperty("--token-animation-speed", tokens.animationSpeed);
  root.style.setProperty("--preview-primary", tokens.primary);
  root.style.setProperty("--preview-accent", tokens.accent);
  root.style.setProperty("--preview-background", tokens.background);
  root.style.setProperty("--preview-foreground", tokens.text);
  root.style.setProperty("--preview-muted", tokens.muted);
  root.style.setProperty("--preview-radius", tokens.radius);
  root.style.setProperty("--preview-font-display", tokens.fontDisplay);
  root.style.setProperty("--preview-font-body", tokens.fontBody);
}

export function tokensFromPalette(_paletteId: string): Partial<DesignTokens> {
  return {};
}
