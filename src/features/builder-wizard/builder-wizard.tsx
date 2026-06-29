"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ThemeEngineProvider } from "@/features/platform/theme-engine";
import { canAdvanceBuilderStep } from "./constants";
import { useBuilderWizard } from "./context";
import { BuilderProgressBar } from "./progress-bar";
import { NavigationButtons } from "./navigation-buttons";
import { StepIndustry } from "./step-industry";
import { StepStyle } from "./step-style";
import { StepSections } from "./step-sections";
import { StepTemplates } from "./step-templates";
import { StepPreview } from "./step-preview";
import { SubmitEnquiryPanel } from "./submit-enquiry-panel";
import { EnquirySuccess } from "./enquiry-success";
import { useBuilderEnquiryFlow } from "./use-builder-enquiry-flow";
import { usePreviewPdfDownload } from "./use-preview-pdf-download";
import type { BuilderEnquiryConfig } from "./types";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
  }),
};

interface BuilderWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuilderWizard({ open, onOpenChange }: BuilderWizardProps) {
  const router = useRouter();
  const {
    state,
    setIndustry,
    setStyle,
    toggleSection,
    setSelection,
    nextStep,
    prevStep,
    hydrateSelectionsForTemplates,
  } = useBuilderWizard();

  const [direction, setDirection] = useState(0);

  const enquiryConfig = useMemo<BuilderEnquiryConfig | null>(() => {
    if (!state.industryId || !state.styleId) return null;
    return {
      industryId: state.industryId,
      styleId: state.styleId,
      themeId: state.themeId,
      paletteId: state.paletteId,
      enabledSections: state.enabledSections,
      sectionOrder: state.sectionOrder,
      selections: state.selections,
    };
  }, [state]);

  const {
    phase: enquiryPhase,
    formErrors,
    isSubmitting,
    handleSubmit,
    resetFlow,
  } = useBuilderEnquiryFlow(enquiryConfig);

  const { isDownloading, handleDownload, resetDownload } =
    usePreviewPdfDownload(enquiryConfig);

  useEffect(() => {
    if (!open) {
      resetFlow();
      resetDownload();
    }
  }, [open, resetFlow, resetDownload]);

  useEffect(() => {
    if (state.step === 3) {
      hydrateSelectionsForTemplates();
    }
  }, [state.step, hydrateSelectionsForTemplates]);

  const canGoNext = useMemo(
    () =>
      canAdvanceBuilderStep(state.step, {
        industryId: state.industryId,
        styleId: state.styleId,
        enabledSections: state.enabledSections,
        selections: state.selections,
      }),
    [state],
  );

  const closeBuilder = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleNext = useCallback(() => {
    setDirection(1);
    nextStep();
  }, [nextStep]);

  const handleBack = useCallback(() => {
    if (state.step <= state.minStep) {
      closeBuilder();
      if (state.returnPath) {
        router.push(state.returnPath);
      }
      return;
    }

    setDirection(-1);
    prevStep();
  }, [
    state.step,
    state.minStep,
    state.returnPath,
    closeBuilder,
    router,
    prevStep,
  ]);

  const handleSubmitEnquiry = useCallback(() => {
    const form = document.getElementById(
      "builder-enquiry-form",
    ) as HTMLFormElement | null;
    form?.requestSubmit();
  }, []);

  const hideBackButton = state.step === 0 && state.minStep === 0;
  const enquiryComplete = enquiryPhase === "success";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="builder-wizard-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            className="builder-wizard-shell"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="builder-wizard-card">
              <div className="builder-wizard-card__corner">
                <span
                  className="builder-wizard-card__corner-frame"
                  aria-hidden
                />
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="builder-wizard-close"
                    aria-label="Close builder"
                  >
                    <X className="size-4" strokeWidth={2.25} />
                  </button>
                </Dialog.Close>
              </div>

              <div className="builder-wizard-card__header">
                <BuilderProgressBar step={state.step} />
              </div>

              <ThemeEngineProvider
                key={`${state.themeId}-${state.paletteId}`}
                initialThemeId={state.themeId}
                initialPaletteId={state.paletteId}
              >
                <div className="builder-wizard-card__body">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={state.step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className="builder-wizard-step"
                    >
                      {state.step === 0 && (
                        <StepIndustry
                          value={state.industryId}
                          onChange={setIndustry}
                        />
                      )}
                      {state.step === 1 && (
                        <StepStyle value={state.styleId} onChange={setStyle} />
                      )}
                      {state.step === 2 && state.industryId && (
                        <StepSections
                          industryId={state.industryId}
                          enabledSections={state.enabledSections}
                          onToggle={toggleSection}
                        />
                      )}
                      {state.step === 3 && state.industryId && (
                        <StepTemplates
                          industryId={state.industryId}
                          enabledSections={state.enabledSections}
                          selections={state.selections}
                          onSelect={setSelection}
                        />
                      )}
                      {state.step === 4 && state.industryId && (
                        <>
                          <StepPreview
                            industryId={state.industryId}
                            themeId={state.themeId}
                            paletteId={state.paletteId}
                            sectionOrder={state.sectionOrder}
                            selections={state.selections}
                          />
                          {enquiryComplete ? (
                            <EnquirySuccess onClose={closeBuilder} />
                          ) : (
                            enquiryConfig && (
                              <form
                                id="builder-enquiry-form"
                                onSubmit={handleSubmit}
                              >
                                <SubmitEnquiryPanel
                                  config={enquiryConfig}
                                  errors={formErrors}
                                  disabled={isSubmitting}
                                />
                              </form>
                            )
                          )}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </ThemeEngineProvider>

              <NavigationButtons
                step={state.step}
                minStep={state.minStep}
                hideBack={hideBackButton || enquiryComplete}
                canGoNext={canGoNext}
                isLastStep={state.step === 4}
                enquiryComplete={enquiryComplete}
                onBack={handleBack}
                onNext={handleNext}
                onSubmit={handleSubmitEnquiry}
                onDownloadPdf={handleDownload}
                isSubmitting={isSubmitting}
                isDownloadingPdf={isDownloading}
              />
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
