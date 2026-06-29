"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ROUTES } from "@/constants";
import { getDefaultSelections } from "@/features/marketplace/catalog";
import {
  BUILDER_STYLES,
  getBuilderSectionsForIndustry,
  getDefaultEnabledSections,
  getDefaultSectionOrder,
} from "./constants";
import type { BuilderOpenOptions, BuilderWizardState } from "./types";

const STYLE_DEFAULT = BUILDER_STYLES[1];

function getStartStep(industryId: string | null): number {
  return industryId ? 1 : 0;
}

function createInitialState(
  options: BuilderOpenOptions = {},
): BuilderWizardState {
  const industryId = options.industryId ?? null;
  const enabledSections = industryId
    ? getDefaultEnabledSections(industryId)
    : [];

  return {
    step: getStartStep(industryId),
    minStep: getStartStep(industryId),
    entrySource: industryId ? "industry" : "visualise",
    returnPath: options.returnPath ?? (industryId ? null : ROUTES.visualise),
    industryId,
    styleId: null,
    themeId: STYLE_DEFAULT.themeId,
    paletteId: STYLE_DEFAULT.paletteId,
    enabledSections,
    sectionOrder: industryId
      ? getDefaultSectionOrder(industryId, enabledSections)
      : [],
    selections: {},
  };
}

interface BuilderWizardContextValue {
  state: BuilderWizardState;
  prepareBuilder: (options?: BuilderOpenOptions) => void;
  setIndustry: (industryId: string) => void;
  setStyle: (styleId: string, themeId: string, paletteId: string) => void;
  toggleSection: (sectionId: string) => void;
  setSectionOrder: (order: string[]) => void;
  setSelection: (sectionId: string, optionId: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  hydrateSelectionsForTemplates: () => void;
}

const BuilderWizardContext = createContext<BuilderWizardContextValue | null>(
  null,
);

export function BuilderWizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BuilderWizardState>(() =>
    createInitialState(),
  );

  const prepareBuilder = useCallback((options: BuilderOpenOptions = {}) => {
    setState(createInitialState(options));
  }, []);

  const setIndustry = useCallback((industryId: string) => {
    const enabledSections = getDefaultEnabledSections(industryId);
    setState((prev) => ({
      ...prev,
      industryId,
      enabledSections,
      sectionOrder: getDefaultSectionOrder(industryId, enabledSections),
      selections: {},
    }));
  }, []);

  const setStyle = useCallback(
    (styleId: string, themeId: string, paletteId: string) => {
      setState((prev) => ({
        ...prev,
        styleId,
        themeId,
        paletteId,
      }));
    },
    [],
  );

  const toggleSection = useCallback((sectionId: string) => {
    setState((prev) => {
      if (!prev.industryId) return prev;

      const sections = getBuilderSectionsForIndustry(prev.industryId);
      const section = sections.find((item) => item.id === sectionId);
      if (!section || section.required) return prev;

      const enabled = prev.enabledSections.includes(sectionId)
        ? prev.enabledSections.filter((id) => id !== sectionId)
        : [...prev.enabledSections, sectionId];

      const sectionOrder = getDefaultSectionOrder(prev.industryId, enabled);
      const selections = { ...prev.selections };
      if (!enabled.includes(sectionId)) {
        delete selections[sectionId];
      }

      return {
        ...prev,
        enabledSections: enabled,
        sectionOrder,
        selections,
      };
    });
  }, []);

  const setSectionOrder = useCallback((order: string[]) => {
    setState((prev) => ({ ...prev, sectionOrder: order }));
  }, []);

  const setSelection = useCallback((sectionId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      selections: { ...prev.selections, [sectionId]: optionId },
    }));
  }, []);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      step: Math.max(prev.minStep, Math.min(step, 4)),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.min(prev.step + 1, 4),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.max(prev.step - 1, prev.minStep),
    }));
  }, []);

  const hydrateSelectionsForTemplates = useCallback(() => {
    setState((prev) => {
      if (!prev.industryId) return prev;
      const defaults = getDefaultSelections(
        prev.industryId,
        prev.enabledSections,
      );
      const selections = { ...defaults, ...prev.selections };
      for (const sectionId of prev.enabledSections) {
        if (!selections[sectionId]) {
          const fallback = getDefaultSelections(prev.industryId, [sectionId]);
          selections[sectionId] = fallback[sectionId];
        }
      }
      return { ...prev, selections };
    });
  }, []);

  const value = useMemo(
    () => ({
      state,
      prepareBuilder,
      setIndustry,
      setStyle,
      toggleSection,
      setSectionOrder,
      setSelection,
      setStep,
      nextStep,
      prevStep,
      hydrateSelectionsForTemplates,
    }),
    [
      state,
      prepareBuilder,
      setIndustry,
      setStyle,
      toggleSection,
      setSectionOrder,
      setSelection,
      setStep,
      nextStep,
      prevStep,
      hydrateSelectionsForTemplates,
    ],
  );

  return (
    <BuilderWizardContext.Provider value={value}>
      {children}
    </BuilderWizardContext.Provider>
  );
}

export function useBuilderWizard() {
  const context = useContext(BuilderWizardContext);
  if (!context) {
    throw new Error(
      "useBuilderWizard must be used within BuilderWizardProvider",
    );
  }
  return context;
}
