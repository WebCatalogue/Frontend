import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const sectionContainerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-[var(--container-sm)]",
      md: "max-w-[var(--container-md)]",
      lg: "max-w-[var(--container-lg)]",
      xl: "max-w-[var(--container-xl)]",
      "2xl": "max-w-[var(--container-2xl)]",
      full: "max-w-full",
    },
    padding: {
      none: "py-0",
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
      xl: "py-24",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "md",
  },
});

export interface SectionContainerProps
  extends
    HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionContainerVariants> {
  as?: "section" | "div" | "article" | "main";
}

const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  (
    { className, size, padding, as: Component = "section", children, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(sectionContainerVariants({ size, padding }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
SectionContainer.displayName = "SectionContainer";

export { SectionContainer, sectionContainerVariants };
