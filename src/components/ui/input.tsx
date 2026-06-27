import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "flex w-full rounded-[var(--radius-lg)] border bg-surface-1 px-4",
    "text-[0.9375rem] text-foreground",
    "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]",
    "placeholder:text-foreground-subtle",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-9 text-[0.8125rem]",
        md: "h-11",
        lg: "h-[3.25rem] text-[1rem]",
      },
      state: {
        default: "border-input hover:border-border-strong",
        error: "border-error focus-visible:ring-error/40",
        success: "border-success focus-visible:ring-success/40",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, label, error, hint, id, ...props }, ref) => {
    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorState = error ? "error" : state;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="type-body-sm text-foreground block font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(inputVariants({ size, state: errorState, className }))}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="type-body-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="type-body-sm text-foreground-muted"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
