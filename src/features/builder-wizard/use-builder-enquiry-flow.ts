"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui";
import { queryKeys } from "@/lib/query/keys";
import {
  getEnquiryFormValues,
  submitEnquiry,
  validateEnquiryForm,
} from "./enquiry";
import type { BuilderEnquiryConfig } from "./types";
import type { EnquiryFormErrors } from "./enquiry/validate-enquiry-form";

export type EnquiryFlowPhase = "form" | "submitting" | "success";

export function useBuilderEnquiryFlow(config: BuilderEnquiryConfig | null) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [phase, setPhase] = useState<EnquiryFlowPhase>("form");
  const [formErrors, setFormErrors] = useState<EnquiryFormErrors | null>(null);

  const invalidateEnquiryQueries = useCallback(() => {
    void queryClient.invalidateQueries({
      queryKey: queryKeys.agency.enquiries,
    });
    void queryClient.invalidateQueries({
      queryKey: queryKeys.agency.projects.all,
    });
    void queryClient.invalidateQueries({
      queryKey: queryKeys.agency.dashboard.summary,
    });
  }, [queryClient]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!config || phase === "submitting") return;

      const values = getEnquiryFormValues(event.currentTarget);
      const errors = validateEnquiryForm(values);
      if (errors) {
        setFormErrors(errors);
        addToast({
          title: "Please complete the form",
          description: "Fill in all required fields before submitting.",
          variant: "error",
        });
        return;
      }

      setFormErrors(null);
      setPhase("submitting");

      try {
        await submitEnquiry({ values, config });
        invalidateEnquiryQueries();
        setPhase("success");
      } catch {
        setPhase("form");
        addToast({
          title: "Submission failed",
          description: "Please try again or contact us directly.",
          variant: "error",
        });
      }
    },
    [addToast, config, invalidateEnquiryQueries, phase],
  );

  const resetFlow = useCallback(() => {
    setPhase("form");
    setFormErrors(null);
  }, []);

  return {
    phase,
    formErrors,
    isSubmitting: phase === "submitting",
    handleSubmit,
    resetFlow,
  };
}
