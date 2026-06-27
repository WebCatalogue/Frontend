import Link from "next/link";
import { ROUTES } from "@/constants";
import { INDUSTRIES } from "@/mock/industries";
import { SERVICES } from "@/mock/services";

interface MegaMenuProps {
  type: "services" | "industries";
  onClose: () => void;
}

export function MegaMenu({ type, onClose }: MegaMenuProps) {
  const items =
    type === "services" ? SERVICES.slice(0, 6) : INDUSTRIES.slice(0, 6);
  const href = type === "services" ? ROUTES.services : ROUTES.industries;
  const title = type === "services" ? "Our Services" : "Industries We Serve";

  return (
    <div
      className="animate-fade-in absolute top-full left-1/2 z-[var(--z-index-dropdown)] mt-2 w-[32rem] -translate-x-1/2 rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-6 shadow-lg"
      role="menu"
    >
      <p className="type-label text-foreground-subtle mb-4">{title}</p>
      <div className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={href}
            onClick={onClose}
            className="hover:bg-muted/60 rounded-[var(--radius-md)] px-3 py-2.5 transition-colors"
            role="menuitem"
          >
            <p className="type-body-sm text-foreground font-medium">
              {"title" in item ? item.title : item.name}
            </p>
            <p className="type-body-sm text-foreground-muted mt-0.5 line-clamp-1">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 border-t border-[var(--color-border-subtle)] pt-4">
        <Link
          href={href}
          onClick={onClose}
          className="type-body-sm text-accent hover:text-accent/80 font-medium transition-colors"
        >
          View all {type} →
        </Link>
      </div>
    </div>
  );
}
