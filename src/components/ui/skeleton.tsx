import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse rounded-[var(--radius-md)] bg-muted",
  {
    variants: {
      variant: {
        default: "",
        circle: "rounded-full",
        text: "h-4 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface SkeletonProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        backgroundSize: "200% 100%",
        animation:
          "shimmer 1.5s ease-in-out infinite, pulse 2s ease-in-out infinite",
      }}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
