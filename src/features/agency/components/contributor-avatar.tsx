import type { Contributor } from "@/types/agency";
import { cn } from "@/lib/utils";

const COLORS: Record<Contributor, string> = {
  Garvit: "bg-violet-500",
  Aarush: "bg-sky-500",
};

export function ContributorAvatar({
  name,
  size = "sm",
  className,
}: {
  name: Contributor;
  size?: "sm" | "md";
  className?: string;
}) {
  const sizeClass = size === "md" ? "size-8 text-sm" : "size-6 text-xs";
  return (
    <span
      title={name}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium text-white",
        COLORS[name],
        sizeClass,
        className,
      )}
    >
      {name[0]}
    </span>
  );
}

export function ContributorStack({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const unique = [...new Set(contributors)];
  return (
    <div className="flex -space-x-2">
      {unique.map((name) => (
        <ContributorAvatar
          key={name}
          name={name}
          className="ring-background ring-2"
        />
      ))}
    </div>
  );
}
