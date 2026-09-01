"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { SpinnerIcon } from "./icons";

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
      <div className="absolute inset-0 flex items-center justify-center bg-surface-muted p-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, optimization adds no value */}
        <img src="/fallback.svg" alt={alt} className="h-full max-w-[65%] object-contain opacity-90" />
      </div>
    );
  }

  const isReady = loadedSrc === src;

  return (
    <>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-muted">
          <SpinnerIcon className="h-6 w-6 animate-spin text-ink-subtle" />
        </div>
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
