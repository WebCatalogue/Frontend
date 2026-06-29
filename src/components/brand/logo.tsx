"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { BrandWordmark } from "./brand-wordmark";

export const BRAND_LOGO = {
  dark: "/brand/logo-dark.png",
  light: "/brand/logo-light.png",
} as const;

interface LogoProps {
  href?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  wordmarkClassName?: string;
}

const SIZE_CLASSES = {
  sm: "size-9",
  md: "size-10",
  lg: "size-12",
} as const;

export function Logo({
  href,
  showWordmark = true,
  size = "md",
  className,
  wordmarkClassName,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "light" ? BRAND_LOGO.light : BRAND_LOGO.dark;

  const content = (
    <>
      <Image
        src={logoSrc}
        alt={`${APP_NAME} logo`}
        width={44}
        height={44}
        className={cn("shrink-0 object-contain", SIZE_CLASSES[size], className)}
        priority
      />
      {showWordmark && (
        <BrandWordmark size={size} className={wordmarkClassName} />
      )}
    </>
  );

  const rootClassName = cn("group flex shrink-0 items-center gap-2");

  if (href) {
    return (
      <Link href={href} className={rootClassName}>
        {content}
      </Link>
    );
  }

  return <div className={rootClassName}>{content}</div>;
}
