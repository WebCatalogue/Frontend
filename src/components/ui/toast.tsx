"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  [
    "pointer-events-auto relative flex w-full items-start gap-3",
    "overflow-hidden rounded-[var(--radius-xl)] border p-4",
    "shadow-lg animate-fade-up",
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "surface-2 border-border",
        success: "border-success/20 bg-success-muted",
        error: "border-error/20 bg-error-muted",
        warning: "border-warning/20 bg-warning-muted",
        info: "border-info/20 bg-info-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const toastIcons = {
  default: null,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: VariantProps<typeof toastVariants>["variant"];
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = crypto.randomUUID();
      const newToast: ToastData = { ...toast, id };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-maxToasts);
      });

      const duration = toast.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [maxToasts, removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="fixed right-6 bottom-6 z-[var(--z-index-toast)] flex w-full max-w-[22rem] flex-col gap-3"
            aria-live="polite"
            aria-label="Notifications"
          >
            {toasts.map((toast) => (
              <ToastItem
                key={toast.id}
                toast={toast}
                onDismiss={() => removeToast(toast.id)}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: ToastData;
  onDismiss: () => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const variant = toast.variant ?? "default";
  const Icon = toastIcons[variant];

  return (
    <div role="alert" className={cn(toastVariants({ variant }))}>
      {Icon && (
        <Icon
          className="text-foreground-muted mt-0.5 size-4 shrink-0"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0 flex-1 space-y-1">
        {toast.title && (
          <p className="type-body-sm text-foreground font-medium">
            {toast.title}
          </p>
        )}
        {toast.description && (
          <p className="type-body-sm text-foreground-muted">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-foreground-subtle hover:bg-muted/60 hover:text-foreground focus:ring-ring shrink-0 rounded-[var(--radius-md)] p-1 transition-colors focus:ring-2 focus:outline-none"
        aria-label="Dismiss notification"
      >
        <X className="size-3.5" strokeWidth={1.75} />
      </button>
    </div>
  );
}

export { toastVariants };
