import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium overflow-hidden",
    "transition-all duration-500 ease-[var(--ease-out-expo)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "shadow-[0_1px_2px_rgba(17,17,16,0.08),0_4px_12px_rgba(17,17,16,0.06)]",
          "hover:shadow-[0_2px_4px_rgba(17,17,16,0.1),0_12px_32px_rgba(17,17,16,0.12)]",
          "hover:-translate-y-0.5",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
          "hover:before:opacity-100",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border border-border-subtle",
          "hover:bg-muted hover:-translate-y-px",
          "hover:shadow-sm",
        ].join(" "),
        accent: [
          "bg-accent text-accent-foreground",
          "shadow-[0_1px_2px_rgba(94,106,210,0.2),0_4px_16px_rgba(94,106,210,0.15)]",
          "hover:shadow-[0_4px_24px_rgba(94,106,210,0.3)]",
          "hover:-translate-y-0.5",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/15 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
          "hover:before:opacity-100",
        ].join(" "),
        outline: [
          "border border-border bg-transparent",
          "text-foreground hover:bg-muted/50 hover:border-border-strong",
          "hover:-translate-y-px",
        ].join(" "),
        ghost: "text-foreground-muted hover:bg-muted/60 hover:text-foreground",
        destructive: "bg-error text-error-foreground hover:bg-error/90",
        link: "text-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3.5 text-[0.8125rem] rounded-[var(--radius-md)]",
        md: "h-10 px-5 text-[0.9375rem] rounded-[var(--radius-lg)]",
        lg: "h-12 px-7 text-[1rem] rounded-[var(--radius-lg)]",
        icon: "h-10 w-10 rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading && (
              <Spinner size="sm" variant="white" className="absolute" />
            )}
            <span
              className={cn(
                "relative z-10 inline-flex items-center justify-center gap-2",
                isLoading && "opacity-0",
              )}
            >
              {children}
            </span>
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
