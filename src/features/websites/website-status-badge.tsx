import type { WebsiteStatus } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_VARIANTS: Record<
  string,
  "default" | "accent" | "success" | "warning" | "outline"
> = {
  draft: "outline",
  published: "success",
  active: "success",
  archived: "warning",
};

export function WebsiteStatusBadge({
  status,
  className,
}: {
  status?: WebsiteStatus | null;
  className?: string;
}) {
  if (!status) return null;

  const normalized = status.toLowerCase();
  const variant = STATUS_VARIANTS[normalized] ?? "default";

  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {normalized}
    </Badge>
  );
}
