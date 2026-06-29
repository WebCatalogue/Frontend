"use client";

import { usePathname } from "next/navigation";
import {
  AmbientBackground,
  NoiseOverlay,
} from "@/components/playground/ambient/ambient-background";

export function SiteAmbient() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <>
      <AmbientBackground />
      <NoiseOverlay />
    </>
  );
}
