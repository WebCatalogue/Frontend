"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import { getIndustryPreset } from "@/features/platform/industry-presets";
import { getDefaultSelections } from "@/features/marketplace/catalog";
import { useLatestInProgressDraft } from "@/hooks/use-wizard-drafts";
import { getErrorMessage } from "@/lib/errors/api-error";
import { createBusinessWebsite, updateWebsiteConfig } from "@/lib/api/website";
import { cn } from "@/lib/utils";
import {
  computeCompletionPercent,
  getWizardSteps,
  WIZARD_TOTAL_STEPS,
} from "./constants";
import {
  createInitialWizardSettings,
  mergeWizardSettings,
} from "./draft-utils";
import { materializeWizardDraft } from "./materialize-draft";
import type { MarketplaceOption } from "@/features/marketplace/types";
import type { WizardDraftSettings } from "./types";
import { useWizardAutosave } from "./use-wizard-autosave";
import { WizardAutosaveIndicator, WizardProgressBar } from "./wizard-progress";
import { WizardFinishStep } from "./wizard-finish-step";
import { WizardIndustryStep } from "./wizard-industry-step";
import { WizardMiniPreview } from "./wizard-mini-preview";
import { WizardOptionStep } from "./wizard-option-step";
import { WizardResumePrompt, WizardStartForm } from "./wizard-start-flow";
import { WizardStyleStep } from "./wizard-style-step";

type WizardPhase = "resume" | "start" | "wizard" | "finish";

interface VisualiseWizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDraftId?: string | null;
}

export function VisualiseWizardDialog({
  open,
  onOpenChange,
  initialDraftId,
}: VisualiseWizardDialogProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const { draft: latestDraft, isLoading: draftsLoading } =
    useLatestInProgressDraft();

  const [phase, setPhase] = useState<WizardPhase>("start");
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [websiteName, setWebsiteName] = useState("");
  const [settings, setSettings] = useState<WizardDraftSettings | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [creating, setCreating] = useState(false);
  const [materializing, setMaterializing] = useState(false);

  const steps = useMemo(
    () => getWizardSteps(settings?.industryId ?? "cafe"),
    [settings?.industryId],
  );

  const isFinish = currentStep >= WIZARD_TOTAL_STEPS;

  const autosave = useWizardAutosave({
    websiteId,
    settings,
    enabled: phase === "wizard" || phase === "finish",
  });

  useEffect(() => {
    if (!open) return;
    if (initialDraftId && latestDraft?.websiteId === initialDraftId) {
      setWebsiteId(latestDraft.websiteId);
      setWebsiteName(latestDraft.websiteName);
      setSettings(latestDraft.settings);
      setCurrentStep(latestDraft.settings.wizardStep);
      setPhase(
        latestDraft.settings.wizardStatus === "complete" ? "finish" : "wizard",
      );
      return;
    }
    if (!draftsLoading && latestDraft && !initialDraftId) {
      setPhase("resume");
    } else if (!draftsLoading) {
      setPhase("start");
    }
  }, [open, latestDraft, draftsLoading, initialDraftId]);

  const resetState = useCallback(() => {
    setPhase("start");
    setWebsiteId(null);
    setWebsiteName("");
    setSettings(null);
    setCurrentStep(0);
  }, []);

  const handleClose = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) resetState();
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetState],
  );

  const handleCreateDraft = useCallback(
    async (businessId: string, name: string) => {
      setCreating(true);
      try {
        const industryId = "cafe";
        const preset = getIndustryPreset(industryId);
        const initial = createInitialWizardSettings(
          businessId,
          industryId,
          preset?.recommendedThemeId ?? "modern",
          preset?.recommendedPaletteId ?? "blue",
        );

        const website = await createBusinessWebsite(businessId, {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        });

        await updateWebsiteConfig(website.id, {
          themeId: initial.themeId,
          settings: { paletteId: initial.paletteId, wizard: initial },
        });

        setWebsiteId(website.id);
        setWebsiteName(name);
        setSettings(initial);
        setCurrentStep(0);
        setPhase("wizard");
      } catch (err) {
        addToast({
          title: "Could not create draft",
          description: getErrorMessage(err),
          variant: "error",
        });
      } finally {
        setCreating(false);
      }
    },
    [addToast],
  );

  const handleContinueDraft = useCallback(() => {
    if (!latestDraft) return;
    setWebsiteId(latestDraft.websiteId);
    setWebsiteName(latestDraft.websiteName);
    setSettings(latestDraft.settings);
    setCurrentStep(latestDraft.settings.wizardStep);
    setPhase(
      latestDraft.settings.wizardStatus === "complete" ? "finish" : "wizard",
    );
  }, [latestDraft]);

  const advanceStep = useCallback(
    (nextStep: number) => {
      if (!settings) return;
      const merged = mergeWizardSettings(settings, {
        wizardStep: nextStep,
        wizardStatus:
          nextStep >= WIZARD_TOTAL_STEPS ? "complete" : "in_progress",
        completionPercent: computeCompletionPercent(nextStep),
      });
      setSettings(merged);
      setCurrentStep(nextStep);
      void autosave.saveImmediate({ wizardStep: nextStep }, merged);
      if (nextStep >= WIZARD_TOTAL_STEPS) setPhase("finish");
    },
    [settings, autosave],
  );

  const handleIndustryChange = useCallback(
    (industryId: string) => {
      if (!settings) return;
      const preset = getIndustryPreset(industryId);
      const industryCategory =
        getWizardSteps(industryId).find((s) => s.id === "industry-section")
          ?.categoryId ?? "testimonials";
      const newSelections = {
        ...getDefaultSelections(industryId, [
          "navigation",
          "hero",
          "about",
          industryCategory,
          "gallery",
          "contact",
        ]),
        ...settings.selections,
      };
      const patch: Partial<WizardDraftSettings> = {
        industryId,
        themeId: preset?.recommendedThemeId ?? settings.themeId,
        paletteId: preset?.recommendedPaletteId ?? settings.paletteId,
        selections: newSelections,
      };
      const merged = mergeWizardSettings(settings, patch);
      setSettings(merged);
      autosave.save(patch);
    },
    [settings, autosave],
  );

  const handleThemeChange = useCallback(
    (themeId: string, paletteId: string) => {
      if (!settings) return;
      const patch = { themeId, paletteId };
      const merged = mergeWizardSettings(settings, patch);
      setSettings(merged);
      autosave.save(patch);
    },
    [settings, autosave],
  );

  const handleComponentSelect = useCallback(
    (categoryId: string, option: MarketplaceOption) => {
      if (!settings) return;
      const patch = {
        selections: { ...settings.selections, [categoryId]: option.id },
      };
      const merged = mergeWizardSettings(settings, patch);
      setSettings(merged);
      autosave.save(patch);
    },
    [settings, autosave],
  );

  const handleOpenComposer = useCallback(async () => {
    if (!websiteId || !settings) return;
    setMaterializing(true);
    try {
      const completeSettings = mergeWizardSettings(settings, {
        wizardStatus: "complete",
        wizardStep: WIZARD_TOTAL_STEPS,
        completionPercent: 100,
      });
      await autosave.saveImmediate(
        {
          wizardStatus: "complete",
          wizardStep: WIZARD_TOTAL_STEPS,
          completionPercent: 100,
        },
        completeSettings,
      );
      await materializeWizardDraft(websiteId, completeSettings);
      handleClose(false);
      router.push(`/app/websites/${websiteId}/builder`);
    } catch (err) {
      addToast({
        title: "Could not open Composer",
        description: getErrorMessage(err),
        variant: "error",
      });
    } finally {
      setMaterializing(false);
    }
  }, [websiteId, settings, autosave, handleClose, router, addToast]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (phase !== "wizard" || isFinish) return;
      if (e.key === "ArrowRight" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        advanceStep(Math.min(currentStep + 1, WIZARD_TOTAL_STEPS));
      }
      if (e.key === "ArrowLeft" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setCurrentStep((s) => Math.max(0, s - 1));
      }
    },
    [phase, isFinish, currentStep, advanceStep],
  );

  const stepDef = steps[currentStep];
  const canContinue = currentStep === 0 ? Boolean(settings?.industryId) : true;

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade-in fixed inset-0 z-[var(--z-index-modal-backdrop)] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "bg-background fixed inset-0 z-[var(--z-index-modal)] flex flex-col overflow-hidden",
            "animate-fade-in focus:outline-none",
          )}
          onKeyDown={handleKeyDown}
          aria-describedby={undefined}
        >
          <div className="border-border flex items-center justify-between border-b px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden>
                ✨
              </span>
              <Dialog.Title className="type-heading-sm font-medium">
                Visualise Your Site
              </Dialog.Title>
            </div>
            <div className="flex items-center gap-4">
              {(phase === "wizard" || phase === "finish") && (
                <WizardAutosaveIndicator
                  isSaving={autosave.isSaving}
                  isDirty={autosave.isDirty}
                  lastSavedAt={autosave.lastSavedAt}
                  error={autosave.error}
                />
              )}
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label="Close wizard">
                  <X className="size-5" />
                </Button>
              </Dialog.Close>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
            <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-6 lg:p-8">
              {phase === "resume" && latestDraft && (
                <WizardResumePrompt
                  draft={latestDraft}
                  onContinue={handleContinueDraft}
                  onStartNew={() => setPhase("start")}
                />
              )}

              {phase === "start" && (
                <WizardStartForm
                  onStart={handleCreateDraft}
                  isLoading={creating}
                />
              )}

              {(phase === "wizard" || phase === "finish") && settings && (
                <ThemeEngineProvider
                  initialThemeId={settings.themeId}
                  initialPaletteId={settings.paletteId}
                >
                  {phase === "finish" || isFinish ? (
                    <WizardFinishStep
                      settings={settings}
                      websiteId={websiteId!}
                      websiteName={websiteName}
                      onOpenComposer={handleOpenComposer}
                      isMaterializing={materializing}
                    />
                  ) : (
                    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
                      <WizardProgressBar currentStep={currentStep} />

                      <div>
                        <h2 className="type-heading-md font-medium">
                          {stepDef?.label}
                        </h2>
                        <p className="type-body-sm text-foreground-muted mt-1">
                          Pick the option that feels right for your business.
                        </p>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.25 }}
                        >
                          {currentStep === 0 && (
                            <WizardIndustryStep
                              value={settings.industryId}
                              onChange={handleIndustryChange}
                            />
                          )}
                          {currentStep === 1 && (
                            <WizardStyleStep
                              industryId={settings.industryId}
                              themeId={settings.themeId}
                              paletteId={settings.paletteId}
                              onThemeChange={handleThemeChange}
                            />
                          )}
                          {currentStep >= 2 &&
                            stepDef?.kind === "component" &&
                            stepDef.categoryId && (
                              <WizardOptionStep
                                categoryId={stepDef.categoryId}
                                industryId={settings.industryId}
                                themeId={settings.themeId}
                                paletteId={settings.paletteId}
                                selectedOptionId={
                                  settings.selections[stepDef.categoryId]
                                }
                                onSelect={(option) =>
                                  handleComponentSelect(
                                    stepDef.categoryId!,
                                    option,
                                  )
                                }
                              />
                            )}
                        </motion.div>
                      </AnimatePresence>

                      <div className="border-border flex justify-between border-t pt-6">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentStep((s) => Math.max(0, s - 1))
                          }
                          disabled={currentStep === 0}
                        >
                          <ArrowLeft className="size-4" aria-hidden />
                          Back
                        </Button>
                        <Button
                          onClick={() => advanceStep(currentStep + 1)}
                          disabled={!canContinue}
                        >
                          {currentStep === WIZARD_TOTAL_STEPS - 1
                            ? "Finish"
                            : "Continue"}
                          <ArrowRight className="size-4" aria-hidden />
                        </Button>
                      </div>
                    </div>
                  )}
                </ThemeEngineProvider>
              )}
            </div>

            {(phase === "wizard" || phase === "finish") && settings && (
              <div className="border-border hidden w-full max-w-md border-l p-4 lg:block lg:p-6">
                <WizardMiniPreview
                  settings={settings}
                  currentStep={currentStep}
                  className="sticky top-0 h-[calc(100vh-8rem)]"
                />
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
