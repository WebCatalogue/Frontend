"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const drawerVariants = cva(
  "fixed z-[var(--z-index-modal)] flex flex-col border-border bg-card text-card-foreground shadow-xl transition-transform duration-slow ease-out",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full border-r",
        right: "inset-y-0 right-0 h-full border-l",
        top: "inset-x-0 top-0 w-full border-b",
        bottom: "inset-x-0 bottom-0 w-full border-t",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        full: "",
      },
    },
    compoundVariants: [
      { side: "left", size: "sm", className: "w-72" },
      { side: "left", size: "md", className: "w-96" },
      { side: "left", size: "lg", className: "w-[28rem]" },
      { side: "left", size: "full", className: "w-full" },
      { side: "right", size: "sm", className: "w-72" },
      { side: "right", size: "md", className: "w-96" },
      { side: "right", size: "lg", className: "w-[28rem]" },
      { side: "right", size: "full", className: "w-full" },
      { side: "top", size: "sm", className: "h-48" },
      { side: "top", size: "md", className: "h-64" },
      { side: "top", size: "lg", className: "h-80" },
      { side: "top", size: "full", className: "h-full" },
      { side: "bottom", size: "sm", className: "h-48" },
      { side: "bottom", size: "md", className: "h-64" },
      { side: "bottom", size: "lg", className: "h-80" },
      { side: "bottom", size: "full", className: "h-full" },
    ],
    defaultVariants: {
      side: "right",
      size: "md",
    },
  },
);

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
}

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

function Drawer({ open = false, onOpenChange, children }: DrawerProps) {
  const handleOpenChange = useCallback(
    (value: boolean) => {
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
}

interface DrawerTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function DrawerTrigger({ children, onClick, ...props }: DrawerTriggerProps) {
  const { onOpenChange } = useDrawer();
  return (
    <button
      type="button"
      onClick={(e) => {
        onOpenChange(true);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

interface DrawerContentProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerVariants> {
  showClose?: boolean;
}

function DrawerContent({
  className,
  side,
  size,
  showClose = true,
  children,
  ...props
}: DrawerContentProps) {
  const { open, onOpenChange } = useDrawer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <div
        className="animate-fade-in fixed inset-0 z-[var(--z-index-modal-backdrop)] bg-black/50"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(drawerVariants({ side, size }), className)}
        {...props}
      >
        {showClose && (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-ring absolute top-4 right-4 rounded-md p-1 transition-colors focus:ring-2 focus:outline-none"
            aria-label="Close drawer"
          >
            <X className="size-4" />
          </button>
        )}
        {children}
      </div>
    </>,
    document.body,
  );
}

function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border flex flex-col space-y-1.5 border-b p-6",
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

function DrawerBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)} {...props} />
  );
}

function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border flex flex-col-reverse gap-2 border-t p-6 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  drawerVariants,
};
