import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full border px-2.5 py-0.5",
    "type-label !normal-case !tracking-[0.04em]",
    "transition-colors duration-[var(--duration-fast)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-border-subtle bg-muted text-foreground-muted",
        primary: "border-transparent bg-primary text-primary-foreground",
        accent: "border-transparent bg-accent-muted text-accent",
        outline: "border-border bg-transparent text-foreground-muted",
        success: "border-transparent bg-success-muted text-success",
        warning: "border-transparent bg-warning-muted text-warning",
        error: "border-transparent bg-error-muted text-error",
        info: "border-transparent bg-info-muted text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
