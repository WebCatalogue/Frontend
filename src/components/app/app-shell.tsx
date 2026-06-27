"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Globe2, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME, ROUTES } from "@/constants";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/app/businesses", label: "Businesses", icon: Building2 },
] as const;

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border bg-background/90 sticky top-0 z-[var(--z-index-sticky)] border-b backdrop-blur-md">
        <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/app"
              className="type-heading-sm text-foreground font-medium tracking-tight"
            >
              {APP_NAME}
            </Link>
            <nav className="hidden items-center gap-1 md:flex" aria-label="App">
              {NAV_ITEMS.map(({ href, label, icon: Icon, ...item }) => {
                const exact = "exact" in item && item.exact;
                const active = exact
                  ? pathname === href
                  : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-[var(--radius-lg)] px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent-muted text-foreground"
                        : "text-foreground-muted hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.home}
              className="type-body-sm text-foreground-muted hover:text-foreground hidden sm:inline"
            >
              Marketing site
            </Link>
            {user?.email && (
              <span className="type-body-sm text-foreground-muted hidden lg:inline">
                {user.email}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              disabled={isLoading}
            >
              <LogOut className="size-4" strokeWidth={1.75} aria-hidden />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="section-pad mx-auto max-w-6xl py-10">{children}</main>
    </div>
  );
}

export function WebsiteIcon() {
  return <Globe2 className="size-4" strokeWidth={1.75} aria-hidden />;
}
