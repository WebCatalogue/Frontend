# Design Tokens

Website Catalogue Platform — Foundation Design System documentation.

## Overview

Design tokens are the visual design atoms of the system. They are defined as CSS custom properties in `src/styles/tokens.css` and mirrored as TypeScript constants in `src/themes/tokens.ts`.

## Color Palette

### Semantic Colors

| Token                      | Light     | Dark      | Usage                |
| -------------------------- | --------- | --------- | -------------------- |
| `--color-background`       | `#ffffff` | `#020617` | Page background      |
| `--color-foreground`       | `#0f172a` | `#f8fafc` | Primary text         |
| `--color-muted`            | `#f1f5f9` | `#1e293b` | Subtle backgrounds   |
| `--color-muted-foreground` | `#64748b` | `#94a3b8` | Secondary text       |
| `--color-border`           | `#e2e8f0` | `#334155` | Borders and dividers |
| `--color-ring`             | `#3b82f6` | `#60a5fa` | Focus rings          |

### Brand Colors

| Token               | Usage                  |
| ------------------- | ---------------------- |
| `--color-primary`   | Primary actions, links |
| `--color-secondary` | Secondary actions      |
| `--color-accent`    | Highlights, accents    |

### Status Colors

| Token             | Usage                    |
| ----------------- | ------------------------ |
| `--color-success` | Success states           |
| `--color-warning` | Warning states           |
| `--color-error`   | Error/destructive states |
| `--color-info`    | Informational states     |

## Typography

| Token                      | Value                 |
| -------------------------- | --------------------- |
| `--font-sans`              | Geist Sans, system-ui |
| `--font-mono`              | Geist Mono, monospace |
| `--text-xs` → `--text-6xl` | 0.75rem → 3.75rem     |

## Spacing

Uses Tailwind's default spacing scale. Custom spacing tokens available in `src/themes/tokens.ts`.

## Border Radius

| Token           | Value    |
| --------------- | -------- |
| `--radius-sm`   | 0.25rem  |
| `--radius-md`   | 0.375rem |
| `--radius-lg`   | 0.5rem   |
| `--radius-xl`   | 0.75rem  |
| `--radius-2xl`  | 1rem     |
| `--radius-3xl`  | 1.5rem   |
| `--radius-full` | 9999px   |

## Shadows

| Token          | Usage             |
| -------------- | ----------------- |
| `--shadow-sm`  | Subtle elevation  |
| `--shadow-md`  | Cards, dropdowns  |
| `--shadow-lg`  | Modals, popovers  |
| `--shadow-xl`  | High elevation    |
| `--shadow-2xl` | Maximum elevation |

## Breakpoints

| Name  | Min Width |
| ----- | --------- |
| `sm`  | 640px     |
| `md`  | 768px     |
| `lg`  | 1024px    |
| `xl`  | 1280px    |
| `2xl` | 1536px    |

## Container Sizes

| Token             | Max Width |
| ----------------- | --------- |
| `--container-sm`  | 640px     |
| `--container-md`  | 768px     |
| `--container-lg`  | 1024px    |
| `--container-xl`  | 1280px    |
| `--container-2xl` | 1400px    |

## Z-Index Scale

| Token                | Value | Usage               |
| -------------------- | ----- | ------------------- |
| `--z-dropdown`       | 1000  | Dropdowns           |
| `--z-sticky`         | 1100  | Sticky elements     |
| `--z-fixed`          | 1200  | Fixed elements      |
| `--z-modal-backdrop` | 1300  | Modal overlays      |
| `--z-modal`          | 1400  | Modal content       |
| `--z-popover`        | 1500  | Popovers, selects   |
| `--z-toast`          | 1600  | Toast notifications |
| `--z-tooltip`        | 1700  | Tooltips            |

## Animation Presets

| Token                      | Description         |
| -------------------------- | ------------------- |
| `--animate-fade-in`        | Fade in             |
| `--animate-fade-out`       | Fade out            |
| `--animate-slide-in-up`    | Slide from bottom   |
| `--animate-slide-in-down`  | Slide from top      |
| `--animate-slide-in-left`  | Slide from right    |
| `--animate-slide-in-right` | Slide from left     |
| `--animate-scale-in`       | Scale up            |
| `--animate-spin`           | Continuous rotation |

### Duration

| Token               | Value |
| ------------------- | ----- |
| `--duration-fast`   | 150ms |
| `--duration-normal` | 200ms |
| `--duration-slow`   | 300ms |
| `--duration-slower` | 500ms |

## Dark Mode

Dark mode is implemented via the `class` strategy using `next-themes`. The `.dark` class on `<html>` swaps all semantic color tokens automatically.

## Usage

```tsx
// CSS / Tailwind
<div className="bg-background text-foreground border-border" />;

// TypeScript
import { colors, spacing, zIndex } from "@/themes";
```
