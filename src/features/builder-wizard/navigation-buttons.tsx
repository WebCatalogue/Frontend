"use client";

import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  step: number;
  minStep: number;
  hideBack?: boolean;
  canGoNext: boolean;
  isLastStep?: boolean;
  enquiryComplete?: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  onDownloadPdf?: () => void;
  isSubmitting?: boolean;
  isDownloadingPdf?: boolean;
}

export function NavigationButtons({
  step,
  minStep,
  hideBack = false,
  canGoNext,
  isLastStep = false,
  enquiryComplete = false,
  onBack,
  onNext,
  onSubmit,
  onDownloadPdf,
  isSubmitting = false,
  isDownloadingPdf = false,
}: NavigationButtonsProps) {
  const actionsBusy = isSubmitting || isDownloadingPdf;

  return (
    <div className="builder-wizard-nav border-border-subtle border-t px-6 py-4 sm:px-8">
      <div
        className={cn(
          "builder-wizard-nav__inner",
          isLastStep && !enquiryComplete && "builder-wizard-nav__inner--final",
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          disabled={actionsBusy}
          className={cn("builder-wizard-nav__back", hideBack && "invisible")}
        >
          <ArrowLeft className="size-4" aria-hidden />
          {step <= minStep && minStep > 0 ? "Back to industry" : "Back"}
        </Button>

        {isLastStep ? (
          enquiryComplete ? (
            <div aria-hidden />
          ) : (
            <div className="builder-wizard-nav__actions builder-wizard-nav__actions--final">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="builder-wizard-nav__btn builder-wizard-nav__btn--download"
                isLoading={isDownloadingPdf}
                disabled={actionsBusy}
                onClick={onDownloadPdf}
              >
                <Download className="size-4" aria-hidden />
                Download Preview PDF
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="builder-wizard-nav__btn builder-wizard-nav__btn--submit"
                isLoading={isSubmitting}
                disabled={actionsBusy}
                onClick={onSubmit}
              >
                Submit Enquiry
              </Button>
            </div>
          )
        ) : (
          <Button
            type="button"
            variant="primary"
            size="md"
            className="builder-wizard-nav__btn builder-wizard-nav__btn--next"
            disabled={!canGoNext}
            onClick={onNext}
          >
            Next
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
}
