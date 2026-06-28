"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ContributorAvatar } from "./contributor-avatar";
import type { ChecklistItem, Contributor } from "@/types/agency";
import { cn } from "@/lib/utils";

interface ProjectChecklistProps {
  items: ChecklistItem[];
  onToggle: (itemId: string, contributor: Contributor) => void;
  contributor?: Contributor;
}

export function ProjectChecklist({
  items,
  onToggle,
  contributor = "Garvit",
}: ProjectChecklistProps) {
  const completed = items.filter((i) => i.completed).length;
  const percent = Math.round((completed / items.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="type-body-sm text-foreground-muted">
          {completed} of {items.length} complete
        </p>
        <span className="type-label text-accent">{percent}%</span>
      </div>
      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <motion.div
          className="bg-accent h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <button
              type="button"
              onClick={() => onToggle(item.id, contributor)}
              className={cn(
                "hover:bg-muted/60 flex w-full items-start gap-3 rounded-[var(--radius-lg)] p-3 text-left transition-colors",
                item.completed && "opacity-80",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors",
                  item.completed
                    ? "border-success bg-success text-white"
                    : "border-border",
                )}
              >
                {item.completed && <Check className="size-3" />}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "type-body-sm",
                    item.completed && "text-foreground-muted line-through",
                  )}
                >
                  {item.label}
                </p>
                {item.completed && item.completedBy && item.completedAt && (
                  <p className="type-label text-foreground-subtle mt-1 flex items-center gap-2">
                    <ContributorAvatar name={item.completedBy} />
                    {item.completedBy} ·{" "}
                    {new Date(item.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
