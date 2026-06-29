import { unwrapApiData } from "@/lib/api/client";
import type { PaginatedList } from "@/types/api";

export function normalizeList<T>(payload: unknown): T[] {
  const data = unwrapApiData<T[] | PaginatedList<T> | T>(payload);
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "items" in data) {
    return (data as PaginatedList<T>).items ?? [];
  }
  if (data && typeof data === "object") return [data as T];
  return [];
}

export function pickField<T>(
  record: Record<string, unknown>,
  ...keys: string[]
): T | undefined {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null) return value as T;
  }
  return undefined;
}
