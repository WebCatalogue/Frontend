/** Shared TypeScript types for the Website Catalogue Platform */

export type * from "./api";

export type Theme = "light" | "dark" | "system";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
