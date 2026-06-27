import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-12",
    },
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface SpinnerProps
  extends HTMLAttributes<SVGSVGElement>, VariantProps<typeof spinnerVariants> {
  label?: string;
}

function Spinner({
  className,
  size,
  variant,
  label = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <Loader2
      className={cn(spinnerVariants({ size, variant }), className)}
      role="status"
      aria-label={label}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
