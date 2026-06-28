"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  gradient?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  gradient = "from-accent/20 to-accent/5",
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "surface-2 border-border relative overflow-hidden rounded-[var(--radius-2xl)] border p-6",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
          gradient,
        )}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <p className="type-body-sm text-foreground-muted">{label}</p>
          <div className="bg-background/80 flex size-9 items-center justify-center rounded-[var(--radius-lg)] backdrop-blur-sm">
            <Icon className="text-accent size-4" strokeWidth={1.75} />
          </div>
        </div>
        <p className="type-display-sm text-foreground font-[family-name:var(--font-display)] tracking-tight">
          {value}
        </p>
        {hint && (
          <p className="type-body-sm text-foreground-subtle mt-1">{hint}</p>
        )}
      </div>
    </motion.div>
  );
}
