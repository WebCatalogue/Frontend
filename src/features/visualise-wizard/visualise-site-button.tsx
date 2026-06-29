"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { BuilderWizard } from "@/features/builder-wizard";
import { useBuilderWizard } from "@/features/builder-wizard/context";

interface VisualiseSiteButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  industryId?: string | null;
}

export function VisualiseSiteButton({
  variant = "primary",
  size = "lg",
  className,
  industryId,
}: VisualiseSiteButtonProps) {
  const [open, setOpen] = useState(false);
  const { prepareBuilder } = useBuilderWizard();

  const handleOpen = () => {
    if (industryId) {
      prepareBuilder({
        industryId,
        returnPath: `/industries/${industryId}`,
      });
    } else {
      prepareBuilder({
        industryId: null,
        returnPath: ROUTES.visualise,
      });
    }
    setOpen(true);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleOpen}
      >
        Visualise Your Site
      </Button>
      <BuilderWizard open={open} onOpenChange={setOpen} />
    </>
  );
}
