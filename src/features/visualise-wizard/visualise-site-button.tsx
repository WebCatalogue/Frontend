"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VisualiseWizardDialog } from "./visualise-wizard-dialog";

interface VisualiseSiteButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  draftId?: string | null;
}

export function VisualiseSiteButton({
  variant = "primary",
  size = "lg",
  className,
  draftId,
}: VisualiseSiteButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        Visualise Your Site
      </Button>
      <VisualiseWizardDialog
        open={open}
        onOpenChange={setOpen}
        initialDraftId={draftId}
      />
    </>
  );
}
