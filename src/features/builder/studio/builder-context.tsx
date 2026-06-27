"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EffectLayer } from "@/features/builder/effects/layers";
import {
  DEFAULT_DESIGN_TOKENS,
  applyDesignTokens,
  type DesignTokens,
} from "@/features/platform/design-tokens";
import type { Page, Section } from "@/types/api";

export type SidebarPanel =
  | "pages"
  | "sections"
  | "components"
  | "templates"
  | "media"
  | "navigation"
  | "recipes";

export type RightPanel =
  | "properties"
  | "theme"
  | "tokens"
  | "animations"
  | "business-data"
  | "seo";

export type PreviewDevice = "desktop" | "tablet" | "mobile";

interface HistorySnapshot {
  sectionIds: string[];
  label: string;
}

interface BuilderStudioState {
  websiteId: string;
  sidebarPanel: SidebarPanel;
  setSidebarPanel: (panel: SidebarPanel) => void;
  selectedPageId: string | null;
  setSelectedPageId: (id: string | null) => void;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  rightPanel: RightPanel;
  setRightPanel: (panel: RightPanel) => void;
  pages: Page[];
  sections: Section[];
  previewDevice: PreviewDevice;
  setPreviewDevice: (d: PreviewDevice) => void;
  effectLayers: EffectLayer[];
  addEffectLayer: (layer: EffectLayer) => void;
  removeEffectLayer: (id: string) => void;
  toggleEffectLayer: (id: string) => void;
  designTokens: DesignTokens;
  setDesignToken: <K extends keyof DesignTokens>(
    key: K,
    value: DesignTokens[K],
  ) => void;
  isDirty: boolean;
  setDirty: (v: boolean) => void;
  isSaving: boolean;
  setSaving: (v: boolean) => void;
  lastSavedAt: Date | null;
  setLastSavedAt: (d: Date | null) => void;
  pushHistory: (sections: Section[], label: string) => void;
  undo: () => HistorySnapshot | null;
  redo: () => HistorySnapshot | null;
  canUndo: boolean;
  canRedo: boolean;
}

const BuilderStudioContext = createContext<BuilderStudioState | null>(null);

interface BuilderStudioProviderProps {
  websiteId: string;
  pages: Page[];
  sections: Section[];
  children: ReactNode;
}

export function BuilderStudioProvider({
  websiteId,
  pages,
  sections,
  children,
}: BuilderStudioProviderProps) {
  const [sidebarPanel, setSidebarPanel] = useState<SidebarPanel>("pages");
  const [selectedPageId, setSelectedPageIdState] = useState<string | null>(
    pages[0]?.id ?? null,
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [rightPanel, setRightPanel] = useState<RightPanel>("properties");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [effectLayers, setEffectLayers] = useState<EffectLayer[]>([]);
  const [designTokens, setDesignTokensState] = useState(DEFAULT_DESIGN_TOKENS);
  const [isDirty, setDirty] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [undoStack, setUndoStack] = useState<HistorySnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<HistorySnapshot[]>([]);

  const setSelectedPageId = useCallback((id: string | null) => {
    setSelectedPageIdState(id);
    setSelectedSectionId(null);
  }, []);

  const setDesignToken = useCallback(
    <K extends keyof DesignTokens>(key: K, value: DesignTokens[K]) => {
      setDesignTokensState((prev) => {
        const next = { ...prev, [key]: value };
        applyDesignTokens(next);
        return next;
      });
      setDirty(true);
    },
    [],
  );

  const addEffectLayer = useCallback((layer: EffectLayer) => {
    setEffectLayers((prev) => [...prev, layer]);
    setDirty(true);
  }, []);

  const removeEffectLayer = useCallback((id: string) => {
    setEffectLayers((prev) => prev.filter((l) => l.id !== id));
    setDirty(true);
  }, []);

  const toggleEffectLayer = useCallback((id: string) => {
    setEffectLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)),
    );
    setDirty(true);
  }, []);

  const pushHistory = useCallback((secs: Section[], label: string) => {
    const snap: HistorySnapshot = {
      sectionIds: secs.map((s) => s.id),
      label,
    };
    setUndoStack((prev) => [...prev.slice(-19), snap]);
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    let result: HistorySnapshot | null = null;
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      result = prev[prev.length - 1];
      return prev.slice(0, -1);
    });
    if (result) setRedoStack((r) => [...r, result!]);
    return result;
  }, []);

  const redo = useCallback(() => {
    let result: HistorySnapshot | null = null;
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      result = prev[prev.length - 1];
      return prev.slice(0, -1);
    });
    if (result) setUndoStack((u) => [...u, result!]);
    return result;
  }, []);

  const value = useMemo(
    () => ({
      websiteId,
      sidebarPanel,
      setSidebarPanel,
      selectedPageId,
      setSelectedPageId,
      selectedSectionId,
      setSelectedSectionId,
      rightPanel,
      setRightPanel,
      pages,
      sections,
      previewDevice,
      setPreviewDevice,
      effectLayers,
      addEffectLayer,
      removeEffectLayer,
      toggleEffectLayer,
      designTokens,
      setDesignToken,
      isDirty,
      setDirty,
      isSaving,
      setSaving,
      lastSavedAt,
      setLastSavedAt,
      pushHistory,
      undo,
      redo,
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
    }),
    [
      websiteId,
      sidebarPanel,
      selectedPageId,
      setSelectedPageId,
      selectedSectionId,
      rightPanel,
      pages,
      sections,
      previewDevice,
      effectLayers,
      addEffectLayer,
      removeEffectLayer,
      toggleEffectLayer,
      designTokens,
      setDesignToken,
      isDirty,
      isSaving,
      lastSavedAt,
      pushHistory,
      undo,
      redo,
      undoStack.length,
      redoStack.length,
    ],
  );

  return (
    <BuilderStudioContext.Provider value={value}>
      {children}
    </BuilderStudioContext.Provider>
  );
}

export function useBuilderStudio(): BuilderStudioState {
  const ctx = useContext(BuilderStudioContext);
  if (!ctx) {
    throw new Error(
      "useBuilderStudio must be used within BuilderStudioProvider",
    );
  }
  return ctx;
}
