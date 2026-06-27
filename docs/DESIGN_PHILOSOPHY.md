# WebCatalog Design Philosophy

> A design system for convincing business owners that their website will feel handcrafted—not generated.

---

## 1. Design Philosophy

### The core belief

Offline business owners judge quality in seconds. They don't read feature lists—they feel whether something is trustworthy. Our design system exists to create that feeling before a single word of copy is written.

### What premium means here

Premium is not decoration. It is **restraint applied with precision**:

- Fewer colors, used with purpose
- More whitespace, treated as structure
- Typography that commands attention without shouting
- Motion that confirms, never distracts
- Surfaces that layer subtly, not theatrically

### What we reject

- Default blue primary buttons (shadcn aesthetic)
- Card grids labeled "Buttons" and "Form Controls"
- Gradient meshes and glassmorphism everywhere
- Purple-on-white AI landing page patterns
- Dense admin-dashboard component showcases

---

## 2. Visual Language Decisions

### Color philosophy

| Principle               | Decision                            | Rationale                                                                         |
| ----------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| **Warm neutrals**       | `#FAFAF8` background, `#111110` ink | Cool grays feel clinical. Warm stone feels approachable to local business owners. |
| **Ink-first hierarchy** | Primary = near-black, not blue      | Stripe and Vercel use ink for confidence. Color is earned, not default.           |
| **Single accent**       | Indigo `#5E6AD2` at ≤10% of UI      | Linear's discipline: one accent for links, focus, and emphasis only.              |
| **Muted status**        | 10% opacity backgrounds             | Status colors inform without alarming. No neon badges.                            |

### Typography system

| Role            | Typeface         | Usage                                        |
| --------------- | ---------------- | -------------------------------------------- |
| **Display**     | Instrument Serif | Headlines, hero text. Editorial warmth.      |
| **Interface**   | Inter            | Body, labels, UI. Precision and readability. |
| **Code/Labels** | Geist Mono       | Section labels, tokens, metadata.            |

**Scale**: Display sizes use negative tracking (-0.035em). Body uses 15px default with 1.65 line-height for comfortable reading.

### Elevation system

Five levels, each adding exactly one layer:

1. **Surface 0** — Page background
2. **Surface 1** — Cards (border + xs shadow)
3. **Surface 2** — Raised panels (md shadow)
4. **Surface Inset** — Recessed controls
5. **Surface Glass** — Navigation overlays only

Shadows use warm ink tints (`rgba(17,17,16,…)`) not pure black.

### Border system

- **Subtle**: `rgba(17,17,16,0.05)` — card edges
- **Default**: `rgba(17,17,16,0.08)` — dividers
- **Strong**: `rgba(17,17,16,0.14)` — hover states

Borders replace heavy shadows wherever possible.

### Spacing philosophy

4px base unit. Key rhythms:

- **Component gap**: 24px (`--space-6`)
- **Section padding**: 80px (`--space-20`)
- **Card padding**: 28px (`p-7`)
- **Hero margin**: 96px+ below fold

Generous whitespace signals quality to non-technical users.

### Grid system

12-column grid with 24px gutters. Max content width: 1320px. Sidebar navigation at 220px for design system pages.

---

## 3. UX Principles

1. **Clarity before cleverness** — Every element has one job. If it doesn't serve the user, remove it.

2. **Progressive disclosure** — Show what's needed now. Advanced options stay hidden until requested.

3. **Forgiving interactions** — Large touch targets (44px minimum). Clear error messages. Undo where possible.

4. **Consistent spatial logic** — Same padding inside all cards. Same gap between all sections. Predictability builds trust.

5. **Accessible by default** — Focus rings, ARIA labels, reduced-motion support. Premium includes everyone.

---

## 4. Motion Principles

### Easing

| Token              | Curve                               | Usage              |
| ------------------ | ----------------------------------- | ------------------ |
| `--ease-out-expo`  | `cubic-bezier(0.16, 1, 0.3, 1)`     | Entrances, reveals |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)`     | UI transitions     |
| `--ease-spring`    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Emphasis (rare)    |

### Duration

- **Instant**: 100ms — opacity toggles
- **Fast**: 150ms — hover states
- **Normal**: 250ms — panel transitions
- **Slow**: 400ms — page section reveals

### Rules

- Animate `transform` and `opacity` only (GPU-accelerated)
- Stagger children by 60ms maximum
- Never animate layout properties (width, height, top)
- Always respect `prefers-reduced-motion`

---

## 5. Design Tokens

Full token reference: `docs/DESIGN_TOKENS.md` and `src/styles/tokens.css`.

Key token categories:

- **Surfaces** — 5 levels + glass
- **Typography** — 10 size tokens with line-height and tracking
- **Spacing** — 4px base, 13 steps
- **Elevation** — 6 shadow levels including glow
- **Motion** — 4 durations, 4 easing curves
- **Z-index** — 8 layers

---

## 6. Component Philosophy

### Principles

1. **Variants, not one-offs** — Every visual state is a CVA variant, not inline styles.
2. **Composition over configuration** — CardHeader, CardTitle as composable parts.
3. **Semantic HTML first** — `<button>`, `<nav>`, `<section>` before `<div>`.
4. **No business logic** — Components are purely presentational.
5. **Dark mode is equal** — Not an afterthought. Tokens swap, components don't.

### Button hierarchy

| Variant       | When to use                          |
| ------------- | ------------------------------------ |
| **Primary**   | One main action per view             |
| **Accent**    | High-emphasis CTA (publish, upgrade) |
| **Secondary** | Supporting actions                   |
| **Outline**   | Tertiary actions                     |
| **Ghost**     | Inline/toolbar actions               |

### Input standards

- 44px height minimum (md size)
- Label above, hint below
- Error replaces hint, never stacks
- Focus ring at 40% accent opacity

---

## 7. Preview Summary

The Premium Design Playground (`/`) demonstrates:

- **Hero** — Instrument Serif headline with gradient wash
- **Philosophy** — 6 principle cards
- **Typography** — Full type scale specimens
- **Color** — Swatches with hex values
- **Surfaces** — All 5 surface levels
- **Elevation** — Shadow scale visualization
- **Spacing** — Token table with visual bars
- **Motion** — Live replay animation
- **Buttons** — All variants and sizes
- **Inputs** — Default and error states
- **Interactions** — Tabs, toasts, loading

Navigation: sticky glass header + scroll-synced sidebar (desktop).

---

## 8. Areas for Refinement

| Area                  | Status                   | Next step                                   |
| --------------------- | ------------------------ | ------------------------------------------- |
| Modal/Drawer polish   | Functional               | Add spring animation, refine backdrop blur  |
| Select component      | Radix default            | Restyle to match input system               |
| Icon system           | Lucide generic           | Curate icon set, define stroke width (1.75) |
| Responsive playground | Sidebar hidden on mobile | Add bottom sheet nav for mobile             |
| Font loading          | Google Fonts             | Self-host for production performance        |
| Component tests       | None                     | Visual regression with Chromatic            |
| Storybook             | None                     | Consider for Milestone 2                    |

---

_This document is the source of truth for design decisions. Update it when tokens or principles change._
