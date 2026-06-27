import type { ReactNode } from "react";

/** Consistent contract for all effect / animation wrappers. */
export interface EffectComponentProps {
  className?: string;
  children?: ReactNode;
  settings?: Record<string, unknown> | null;
}

export type EffectRegistryEntry = React.ComponentType<EffectComponentProps>;

export function getEffectNumber(
  settings: Record<string, unknown> | null | undefined,
  key: string,
  fallback: number,
): number {
  const v = settings?.[key];
  return typeof v === "number" ? v : fallback;
}

export function getEffectString(
  settings: Record<string, unknown> | null | undefined,
  key: string,
  fallback: string,
): string {
  const v = settings?.[key];
  return typeof v === "string" ? v : fallback;
}
