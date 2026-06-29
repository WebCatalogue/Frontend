import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "text-[1.125rem]",
  md: "text-[1.1875rem]",
  lg: "text-2xl",
} as const;

interface BrandWordmarkProps {
  className?: string;
  size?: keyof typeof SIZE_CLASSES;
}

export function BrandWordmark({ className, size = "md" }: BrandWordmarkProps) {
  return (
    <span
      className={cn(
        "brand-wordmark inline-flex items-baseline whitespace-nowrap",
        SIZE_CLASSES[size],
        className,
      )}
    >
      <span className="brand-wordmark__lead">BhaiKi</span>
      <span className="brand-wordmark__tail">Site</span>
    </span>
  );
}
