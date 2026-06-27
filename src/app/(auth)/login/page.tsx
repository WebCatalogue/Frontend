"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, useToast } from "@/components/ui";
import { APP_NAME, APP_TAGLINE, ROUTES } from "@/constants";
import { getErrorMessage } from "@/lib/errors/api-error";
import { hasAuthSession } from "@/lib/auth/session";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const { login, isAuthenticated, isLoading, isInitialized } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    if (isInitialized && (isAuthenticated || hasAuthSession())) {
      router.replace("/app");
    }
  }, [isAuthenticated, isInitialized, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await login({ email, password });
      addToast({
        title: "Welcome back",
        description: "You are now signed in.",
        variant: "success",
      });
      router.push("/app");
    } catch (error) {
      addToast({
        title: "Sign in failed",
        description: getErrorMessage(error),
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href={ROUTES.home}
            className="type-heading-md text-foreground inline-block font-medium"
          >
            {APP_NAME}
          </Link>
          <p className="type-body-sm text-foreground-muted mt-2">
            {APP_TAGLINE}
          </p>
        </div>

        <div className="surface-2 border-border rounded-[var(--radius-2xl)] border p-8 shadow-sm">
          <h1 className="type-heading-md text-foreground font-medium">
            Sign in
          </h1>
          <p className="type-body-sm text-foreground-muted mt-2">
            Access your businesses, websites, and workspace.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              placeholder="you@business.com"
              required
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              placeholder="••••••••"
              required
            />
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isSubmitting || isLoading}
            >
              Sign in
            </Button>
          </form>
        </div>

        <p className="type-body-sm text-foreground-muted mt-6 text-center">
          <Link href={ROUTES.home} className="text-accent hover:underline">
            Back to {APP_NAME}
          </Link>
        </p>
      </div>
    </div>
  );
}
