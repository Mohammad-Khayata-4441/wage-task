"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { BrokenImageIcon } from "./icons";

interface ProductImageProps {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function ProductImage({ src, alt, sizes, priority, className }: ProductImageProps) {
  // Tracking which src settled (rather than a boolean) means swapping colour
  // variants re-enters the loading state without an effect or a remount.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-muted text-ink-subtle">
        <BrokenImageIcon className="h-7 w-7" />
        <span className="text-[10px] uppercase tracking-[0.08em]">Unavailable</span>
      </div>
    );
  }

  const isReady = loadedSrc === src;

  return (
    <>
      {!isReady && (
        <div className="shimmer absolute inset-0 overflow-hidden bg-surface-muted" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
        className={cn(
          "object-cover transition-opacity duration-300",
          isReady ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </>
  );
}
