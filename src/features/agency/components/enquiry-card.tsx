"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Inbox, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ProjectStatusBadge } from "./project-status-badge";
import type { AgencyProject } from "@/types/agency";
import { cn } from "@/lib/utils";

const SOURCE_LABELS: Record<AgencyProject["source"], string> = {
  website: "Website",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  referral: "Referral",
  "walk-in": "Walk-in",
  "returning-client": "Returning Client",
  "phone-call": "Phone Call",
};

const PRIORITY_COLORS: Record<AgencyProject["priority"], string> = {
  low: "text-foreground-muted",
  medium: "text-amber-600",
  high: "text-orange-600",
  urgent: "text-red-600",
};

interface EnquiryCardProps {
  project: AgencyProject;
  onMoveToTodo: (id: string) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export function EnquiryCard({
  project,
  onMoveToTodo,
  onDelete,
  index = 0,
}: EnquiryCardProps) {
  const { addToast } = useToast();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="surface-2 border-border group overflow-hidden rounded-[var(--radius-2xl)] border transition-shadow hover:shadow-lg"
    >
      <div className="bg-muted relative aspect-[16/9] overflow-hidden">
        {project.draft?.previewThumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.draft.previewThumbnail}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="size-full"
            style={{
              background: `linear-gradient(135deg, var(--accent-muted) 0%, var(--muted) 100%)`,
            }}
          />
        )}
        <div className="absolute top-3 left-3">
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="type-heading-sm font-medium">
            {project.businessName}
          </h3>
          <p className="type-body-sm text-foreground-muted mt-1 capitalize">
            {project.industry.replace("-", " ")}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="type-label text-foreground-subtle">Submitted</dt>
            <dd className="type-body-sm mt-0.5">
              {new Date(project.submittedAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="type-label text-foreground-subtle">Source</dt>
            <dd className="type-body-sm mt-0.5">
              {SOURCE_LABELS[project.source]}
            </dd>
          </div>
          {project.draft?.themeName && (
            <div>
              <dt className="type-label text-foreground-subtle">Theme</dt>
              <dd className="type-body-sm mt-0.5">{project.draft.themeName}</dd>
            </div>
          )}
          {project.estimatedBudget && (
            <div>
              <dt className="type-label text-foreground-subtle">Budget</dt>
              <dd className="type-body-sm mt-0.5">{project.estimatedBudget}</dd>
            </div>
          )}
          <div>
            <dt className="type-label text-foreground-subtle">Priority</dt>
            <dd
              className={cn(
                "type-body-sm mt-0.5 font-medium capitalize",
                PRIORITY_COLORS[project.priority],
              )}
            >
              {project.priority}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2 border-t pt-4">
          <Button asChild size="sm" variant="outline">
            <Link href={`/app/projects/${project.id}`}>
              <Eye className="size-4" aria-hidden />
              View Details
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onMoveToTodo(project.id);
              addToast({
                title: "Moved to Our To-Do",
                description: project.businessName,
                variant: "success",
              });
            }}
          >
            <Inbox className="size-4" aria-hidden />
            Move To Our To-Do
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              onDelete(project.id);
              addToast({ title: "Enquiry deleted", variant: "success" });
            }}
            aria-label="Delete enquiry"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
