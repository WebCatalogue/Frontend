"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Accessibility,
  Check,
  Eye,
  Gauge,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { MarketplaceOption } from "./types";

interface ComponentOptionCardProps {
  option: MarketplaceOption;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  index?: number;
}

function RatingBadge({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <span
      className="type-label bg-muted text-foreground-muted inline-flex items-center gap-1 rounded-full px-2 py-0.5 !tracking-normal !normal-case"
      title={`${label}: ${value}`}
    >
      <Icon className="size-3" aria-hidden />
      {value}
    </span>
  );
}

export function ComponentOptionCard({
  option,
  isSelected,
  onSelect,
  onPreview,
  index = 0,
}: ComponentOptionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border transition-all duration-300 ${
        isSelected
          ? "border-accent ring-accent/30 shadow-lg ring-2"
          : "hover:border-accent/40 border-[var(--color-border-subtle)] hover:shadow-md"
      }`}
    >
      {isSelected && (
        <span className="bg-accent text-accent-foreground type-label absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full px-2.5 py-1">
          <Check className="size-3" aria-hidden />
          Selected
        </span>
      )}

      <button
        type="button"
        onClick={onPreview}
        className="bg-muted relative aspect-[16/10] w-full overflow-hidden text-left"
        aria-label={`Preview ${option.name}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={option.screenshot}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="type-body-sm bg-background/90 absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Eye className="size-3.5" aria-hidden />
          Quick preview
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="type-heading-sm text-foreground">{option.name}</h3>
        <p className="type-body-sm text-foreground-muted mt-2 line-clamp-2 flex-1">
          {option.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {option.animations.slice(0, 2).map((a) => (
            <Badge key={a} variant="accent" className="gap-1">
              <Sparkles className="size-3" aria-hidden />
              {a}
            </Badge>
          ))}
          {option.mobileReady && (
            <RatingBadge label="Mobile" value="Ready" icon={Smartphone} />
          )}
          <RatingBadge
            label="Accessibility"
            value={option.accessibility.toUpperCase()}
            icon={Accessibility}
          />
          <RatingBadge
            label="Performance"
            value={option.performance}
            icon={Gauge}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {option.supportedThemes.slice(0, 3).map((t) => (
            <span
              key={t}
              className="type-label bg-muted text-foreground-subtle rounded px-1.5 py-0.5 !tracking-normal !normal-case"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button
            variant={isSelected ? "outline" : "primary"}
            size="sm"
            className="flex-1"
            onClick={onSelect}
          >
            {isSelected ? "Selected" : "Use this"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
