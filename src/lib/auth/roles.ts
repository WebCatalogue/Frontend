import type { UserRole } from "@/types/api";

export function isSuperAdmin(role?: UserRole | null): boolean {
  if (!role) return false;
  const normalized = role.toUpperCase();
  return normalized === "SUPER_ADMIN" || normalized === "ADMIN";
}

export function isBusinessOwner(role?: UserRole | null): boolean {
  if (!role) return true;
  const normalized = role.toUpperCase();
  return normalized === "BUSINESS_OWNER" || normalized === "OWNER";
}

export function getRoleLabel(role?: UserRole | null): string {
  if (!role) return "User";
  return role
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
