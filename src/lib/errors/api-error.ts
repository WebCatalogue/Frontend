import type { AxiosError } from "axios";
import type { ApiErrorBody } from "@/types/api";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: ApiErrorBody["error"]["details"];
  readonly isNetworkError: boolean;
  readonly isTimeout: boolean;
  readonly isUnauthorized: boolean;
  readonly isForbidden: boolean;
  readonly isNotFound: boolean;
  readonly isValidation: boolean;
  readonly isServerError: boolean;
  readonly isColdStart: boolean;

  constructor(
    message: string,
    status = 500,
    code = "UNKNOWN_ERROR",
    options?: {
      details?: ApiErrorBody["error"]["details"];
      isNetworkError?: boolean;
      isTimeout?: boolean;
      isColdStart?: boolean;
    },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = options?.details;
    this.isNetworkError = options?.isNetworkError ?? false;
    this.isTimeout = options?.isTimeout ?? false;
    this.isUnauthorized = status === 401;
    this.isForbidden = status === 403;
    this.isNotFound = status === 404;
    this.isValidation = status === 400 || status === 422;
    this.isServerError = status >= 500;
    this.isColdStart = options?.isColdStart ?? false;
  }
}

function isApiErrorBody(data: unknown): data is ApiErrorBody {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    (data as ApiErrorBody).success === false &&
    "error" in data
  );
}

export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (isAxiosLike(error)) {
    const axiosError = error as AxiosError<
      ApiErrorBody | Record<string, unknown>
    >;
    const status = axiosError.response?.status ?? 0;
    const data = axiosError.response?.data;

    if (axiosError.code === "ECONNABORTED") {
      return new ApiError(
        "The request timed out. Please try again.",
        408,
        "TIMEOUT",
        { isTimeout: true },
      );
    }

    if (!axiosError.response) {
      return new ApiError(
        "Unable to reach the server. Check your connection and try again.",
        0,
        "NETWORK_ERROR",
        { isNetworkError: true },
      );
    }

    if (isApiErrorBody(data)) {
      const isColdStart =
        status >= 500 &&
        (data.error.code === "INTERNAL_SERVER_ERROR" ||
          data.error.message.toLowerCase().includes("unexpected"));

      return new ApiError(data.error.message, status, data.error.code, {
        details: data.error.details,
        isColdStart,
      });
    }

    const fallbackMessage =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : axiosError.message || "Something went wrong.";

    return new ApiError(fallbackMessage, status || 500, "HTTP_ERROR", {
      isColdStart: status >= 500,
    });
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500, "UNKNOWN_ERROR");
  }

  return new ApiError("An unexpected error occurred.", 500, "UNKNOWN_ERROR");
}

function isAxiosLike(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

export function getErrorMessage(error: unknown): string {
  return parseApiError(error).message;
}

export function getErrorTitle(error: unknown): string {
  const apiError = parseApiError(error);

  if (apiError.isNetworkError) return "Connection lost";
  if (apiError.isTimeout) return "Request timed out";
  if (apiError.isColdStart) return "Server is waking up";
  if (apiError.isUnauthorized) return "Session expired";
  if (apiError.isForbidden) return "Access denied";
  if (apiError.isNotFound) return "Not found";
  if (apiError.isValidation) return "Invalid input";
  if (apiError.isServerError) return "Server error";

  return "Something went wrong";
}
