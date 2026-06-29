"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Activity,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Command,
  Image,
  Inbox,
  Kanban,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Menu,
  Search,
  Settings,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand";
import { ROUTES } from "@/constants";
import { getRoleLabel } from "@/lib/auth/roles";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./command-palette";
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs";
import { DevModeBanner } from "@/components/auth/dev-mode-banner";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.app, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: ROUTES.appEnquiries, label: "New Enquiries", icon: Inbox },
  { href: ROUTES.appTodo, label: "Our To-Do", icon: Kanban },
  { href: ROUTES.appProjects, label: "Active Projects", icon: FolderKanban },
  { href: ROUTES.appWaiting, label: "Waiting For Client", icon: Clock },
  { href: ROUTES.appCompleted, label: "Completed", icon: CheckCircle2 },
  { href: ROUTES.appMaintenance, label: "Maintenance", icon: Wrench },
  { href: ROUTES.appClients, label: "Clients", icon: Users },
  { href: ROUTES.appCalendar, label: "Calendar", icon: Calendar },
  { href: ROUTES.appActivity, label: "Activity", icon: Activity },
  { href: ROUTES.appTemplates, label: "Templates", icon: LayoutTemplate },
  { href: ROUTES.appAssets, label: "Assets", icon: Image },
  { href: ROUTES.appAnalytics, label: "Analytics", icon: BarChart3 },
  { href: ROUTES.appSettings, label: "Settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (pathname.includes("/builder")) {
    return <>{children}</>;
  }

  return (
    <div className="bg-background min-h-screen lg:flex">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[var(--z-index-modal-backdrop)] bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "border-border bg-background fixed inset-y-0 left-0 z-[var(--z-index-fixed)] flex w-72 flex-col border-r transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Dashboard sidebar"
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Logo href={ROUTES.app} size="sm" />
          <button
            type="button"
            className="text-foreground-muted hover:text-foreground rounded-md p-2 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav
          className="flex-1 space-y-0.5 overflow-y-auto p-3"
          aria-label="Main"
        >
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent-muted text-foreground font-medium"
                    : "text-foreground-muted hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Icon
                  className="size-4 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {label}
                {active && (
                  <ChevronRight
                    className="ml-auto size-4 opacity-50"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-border border-t p-4">
          <p className="type-body-sm text-foreground-muted truncate">
            {user?.email}
          </p>
          <p className="type-label text-foreground-subtle mt-1">
            {getRoleLabel(user?.role)}
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="border-border bg-background/90 sticky top-0 z-[var(--z-index-sticky)] flex h-16 items-center gap-3 border-b px-4 backdrop-blur-md lg:px-6">
          <button
            type="button"
            className="text-foreground-muted hover:text-foreground rounded-md p-2 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="border-border text-foreground-muted hover:border-border-strong hover:text-foreground hidden min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-lg)] border px-3 py-2 text-sm md:flex md:max-w-md"
            aria-label="Open command palette"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Search projects, clients…</span>
            <kbd className="border-border ml-auto hidden rounded border px-1.5 py-0.5 text-[10px] lg:inline">
              <Command className="mr-0.5 inline size-3" aria-hidden />K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href={ROUTES.home}
              className="type-body-sm text-foreground-muted hover:text-foreground hidden md:inline"
            >
              Public site
            </Link>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications (coming soon)"
            >
              <Bell className="size-4" strokeWidth={1.75} />
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setProfileOpen((v) => !v)}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                {user?.firstName?.[0] ?? user?.email?.[0]?.toUpperCase() ?? "U"}
              </Button>
              {profileOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-10"
                    aria-label="Close profile menu"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div
                    role="menu"
                    className="surface-2 border-border absolute top-full right-0 z-20 mt-2 w-48 rounded-[var(--radius-xl)] border py-1 shadow-lg"
                  >
                    <div className="border-border border-b px-3 py-2">
                      <p className="type-body-sm truncate font-medium">
                        {user?.firstName
                          ? `${user.firstName} ${user.lastName ?? ""}`.trim()
                          : user?.email}
                      </p>
                      <p className="type-body-sm text-foreground-muted">
                        {getRoleLabel(user?.role)}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="menuitem"
                      className="text-foreground-muted hover:bg-muted/60 flex w-full items-center gap-2 px-3 py-2 text-sm"
                      onClick={() => {
                        setProfileOpen(false);
                        void logout();
                      }}
                      disabled={isLoading}
                    >
                      <LogOut className="size-4" aria-hidden />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="border-border border-b px-4 py-3 lg:px-6">
          <DashboardBreadcrumbs />
        </div>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <DevModeBanner />
    </div>
  );
}
