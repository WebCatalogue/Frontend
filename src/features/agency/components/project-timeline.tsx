"use client";

import { motion } from "framer-motion";
import { ContributorAvatar } from "./contributor-avatar";
import type { TimelineEvent } from "@/types/agency";

interface ProjectTimelineProps {
  events: TimelineEvent[];
}

export function ProjectTimeline({ events }: ProjectTimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="relative space-y-0">
      <div className="bg-border absolute top-2 bottom-2 left-[15px] w-px" />
      {sorted.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className="relative flex gap-4 pb-6 last:pb-0"
        >
          <div className="bg-background border-border relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border">
            {event.contributor ? (
              <ContributorAvatar name={event.contributor} />
            ) : (
              <span className="bg-muted size-2 rounded-full" />
            )}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="type-body-sm">{event.message}</p>
            <p className="type-label text-foreground-subtle mt-1">
              {new Date(event.timestamp).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              })}
              {event.contributor && ` · ${event.contributor}`}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
