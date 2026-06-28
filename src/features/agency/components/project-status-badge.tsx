import type { ProjectStatus } from "@/types/agency";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  "new-enquiry": {
    label: "New Enquiry",
    className: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  },
  "our-todo": {
    label: "Our To-Do",
    className: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  },
  planning: {
    label: "Planning",
    className: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  },
  design: {
    label: "Design",
    className: "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  },
  development: {
    label: "Development",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  review: {
    label: "Review",
    className: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  },
  "waiting-for-client": {
    label: "Waiting For Client",
    className: "bg-yellow-500/15 text-yellow-800 dark:text-yellow-300",
  },
  "ready-to-publish": {
    label: "Ready To Publish",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  completed: {
    label: "Completed",
    className: "bg-green-500/15 text-green-700 dark:text-green-300",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
  },
  archived: {
    label: "Archived",
    className: "bg-muted text-foreground-muted",
  },
};

export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.archived;
  return (
    <span
      className={cn(
        "type-label inline-flex items-center rounded-full px-2.5 py-1 !tracking-normal !normal-case",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

export function getStatusLabel(status: ProjectStatus): string {
  return STATUS_CONFIG[status]?.label ?? status;
}
