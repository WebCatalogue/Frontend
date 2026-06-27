import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-8", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href={ROUTES.home}
            className="text-foreground-subtle hover:text-foreground-muted flex items-center transition-colors"
            aria-label="Home"
          >
            <Home className="size-3.5" strokeWidth={1.75} />
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex items-center gap-1.5"
            >
              <ChevronRight
                className="text-foreground-subtle size-3.5"
                aria-hidden
              />
              {isLast || !item.href ? (
                <span
                  className="type-body-sm text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="type-body-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
