"use client";

import { motion } from "framer-motion";
import {
  FileText,
  GripVertical,
  Image,
  Layers,
  LayoutTemplate,
  Menu,
  Navigation,
  Puzzle,
  ChefHat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilderStudio } from "./builder-context";
import type { SidebarPanel } from "./builder-context";

const PANELS: { id: SidebarPanel; label: string; icon: LucideIcon }[] = [
  { id: "pages", label: "Pages", icon: FileText },
  { id: "sections", label: "Sections", icon: Layers },
  { id: "components", label: "Components", icon: Puzzle },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "recipes", label: "Recipes", icon: ChefHat },
  { id: "media", label: "Media", icon: Image },
  { id: "navigation", label: "Navigation", icon: Navigation },
];

interface BuilderSidebarProps {
  children: React.ReactNode;
}

export function BuilderSidebar({ children }: BuilderSidebarProps) {
  const { sidebarPanel, setSidebarPanel } = useBuilderStudio();

  return (
    <aside className="border-border bg-background flex w-72 shrink-0 flex-col border-r">
      <nav
        className="border-border flex gap-1 overflow-x-auto border-b p-2"
        aria-label="Builder panels"
      >
        {PANELS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSidebarPanel(id)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-1 rounded-[var(--radius-md)] px-2 py-1.5 text-[10px] transition-colors",
              sidebarPanel === id
                ? "bg-accent-muted text-foreground"
                : "text-foreground-muted hover:bg-muted/60",
            )}
            aria-current={sidebarPanel === id ? "page" : undefined}
          >
            <Icon className="size-4" strokeWidth={1.75} aria-hidden />
            {label}
          </button>
        ))}
      </nav>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </aside>
  );
}

export function SectionDragHandle() {
  return (
    <GripVertical
      className="text-foreground-subtle size-4 shrink-0 cursor-grab"
      aria-hidden
    />
  );
}

export function BuilderCanvasFrame({
  children,
  websiteName,
}: {
  children: React.ReactNode;
  websiteName: string;
}) {
  return (
    <div className="bg-muted/40 flex min-w-0 flex-1 flex-col">
      <div className="border-border bg-background/80 flex h-11 items-center justify-between border-b px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Menu
            className="text-foreground-muted size-4 lg:hidden"
            aria-hidden
          />
          <span className="type-body-sm font-medium">{websiteName}</span>
          <span className="type-label text-foreground-subtle">Preview</span>
        </div>
      </div>
      <motion.div
        className="flex-1 overflow-y-auto p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="preview-canvas border-border mx-auto min-h-full max-w-5xl overflow-hidden rounded-[var(--preview-radius,var(--radius-2xl))] border shadow-lg"
          style={{
            background: "var(--preview-background, var(--color-background))",
            color: "var(--preview-foreground, var(--color-foreground))",
            fontFamily: "var(--preview-font-body, var(--font-sans))",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function BuilderRightPanel({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {title && (
        <div className="border-border hidden border-b px-4 py-3 sm:block">
          <h2 className="type-heading-sm font-medium">{title}</h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
