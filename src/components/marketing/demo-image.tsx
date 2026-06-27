import Image from "next/image";
import { cn } from "@/lib/utils";

interface DemoImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export function DemoImage({
  src,
  alt,
  className,
  priority,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: DemoImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
