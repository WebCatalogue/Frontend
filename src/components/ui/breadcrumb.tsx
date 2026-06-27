import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends ComponentProps<"nav"> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

function Breadcrumb({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const Separator = separator ?? (
    <ChevronRight className="text-muted-foreground size-4" aria-hidden="true" />
  );

  return (
    <nav aria-label="Breadcrumb" className={cn("", className)} {...props}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="inline-flex items-center gap-1.5"
            >
              {index > 0 && (
                <span className="inline-flex" aria-hidden="true">
                  {Separator}
                </span>
              )}
              {isLast ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function BreadcrumbEllipsis({ className }: { className?: string }) {
  return (
    <span
      className={cn("flex size-9 items-center justify-center", className)}
      aria-hidden="true"
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export { Breadcrumb, BreadcrumbEllipsis };
