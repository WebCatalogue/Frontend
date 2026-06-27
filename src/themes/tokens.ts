/**
 * WebCatalog Design Tokens — TypeScript reference
 * Runtime source of truth: src/styles/tokens.css
 * Philosophy: docs/DESIGN_PHILOSOPHY.md
 */

export const colors = {
  neutral: {
    background: "#fafaf8",
    backgroundSubtle: "#f4f4f1",
    foreground: "#111110",
    foregroundMuted: "#6b6b68",
    foregroundSubtle: "#9b9b97",
    surface1: "#ffffff",
    surface2: "#ffffff",
    surfaceInset: "#f0f0ed",
  },
  brand: {
    primary: "#111110",
    accent: "#5e6ad2",
    accentMuted: "rgba(94, 106, 210, 0.12)",
  },
  status: {
    success: "#2d9f6f",
    warning: "#c4841d",
    error: "#d14343",
    info: "#5e6ad2",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-sans)",
    display: "var(--font-display)",
    mono: "var(--font-mono)",
  },
  display: {
    "2xl": { size: "4.5rem", lineHeight: "1.05", tracking: "-0.035em" },
    xl: { size: "3.75rem", lineHeight: "1.05", tracking: "-0.035em" },
    lg: { size: "3rem", lineHeight: "1.05", tracking: "-0.035em" },
    md: { size: "2.25rem", lineHeight: "1.2", tracking: "-0.02em" },
  },
  heading: {
    lg: { size: "1.5rem", lineHeight: "1.2", tracking: "-0.02em" },
    md: { size: "1.25rem", lineHeight: "1.2", tracking: "-0.02em" },
    sm: { size: "1.0625rem", lineHeight: "1.35", tracking: "-0.02em" },
  },
  body: {
    lg: { size: "1.0625rem", lineHeight: "1.65", tracking: "-0.011em" },
    md: { size: "0.9375rem", lineHeight: "1.65", tracking: "-0.011em" },
    sm: { size: "0.8125rem", lineHeight: "1.35", tracking: "-0.011em" },
  },
  label: { size: "0.6875rem", lineHeight: "1", tracking: "0.08em" },
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const borderRadius = {
  xs: "0.25rem",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

export const elevation = {
  xs: "0 1px 2px rgba(17, 17, 16, 0.04)",
  sm: "0 1px 2px rgba(17, 17, 16, 0.04), 0 2px 4px rgba(17, 17, 16, 0.03)",
  md: "0 2px 4px rgba(17, 17, 16, 0.04), 0 8px 16px rgba(17, 17, 16, 0.06)",
  lg: "0 4px 8px rgba(17, 17, 16, 0.04), 0 16px 32px rgba(17, 17, 16, 0.08)",
  xl: "0 8px 16px rgba(17, 17, 16, 0.06), 0 24px 48px rgba(17, 17, 16, 0.1)",
  glow: "0 0 0 1px rgba(17, 17, 16, 0.04), 0 8px 40px rgba(94, 106, 210, 0.08)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1320px",
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const;

export const motion = {
  duration: {
    instant: "100ms",
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    slower: "600ms",
  },
  easing: {
    outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
    outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
    inOut: "cubic-bezier(0.45, 0, 0.55, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  breakpoints,
  containers,
  zIndex,
  motion,
} as const;

export type DesignTokens = typeof designTokens;
