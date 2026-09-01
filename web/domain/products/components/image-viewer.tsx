"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";
import { useZoomPan } from "../hooks/use-zoom-pan";
import { getVariant, getVariantImages, wrapIndex } from "../utils/product";
import { ColorSwatches } from "./color-swatches";
import { ChevronIcon, CloseIcon, ZoomIcon } from "./icons";
import { ProductImage } from "./product-image";

interface ImageViewerProps {
  product: Product;
  variantIndex: number;
  imageIndex: number;
  onSelectVariant: (index: number) => void;
  onImageIndexChange: (index: number) => void;
  onClose: () => void;
}

const iconButton =
  "grid h-9 w-9 shrink-0 place-items-center rounded-control text-white/85 transition-colors hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent";

const overlayButton =
  "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-control bg-black/45 text-white/90 backdrop-blur-sm transition hover:bg-black/70 hover:text-white";

export function ImageViewer({
  product,
  variantIndex,
  imageIndex,
  onSelectVariant,
  onImageIndexChange,
  onClose,
}: ImageViewerProps) {
  const variant = getVariant(product, variantIndex);
  const images = getVariantImages(product, variantIndex);
  const total = images.length;
  const activeIndex = Math.min(imageIndex, Math.max(total - 1, 0));

  const go = (direction: 1 | -1) => {
    if (total > 1) onImageIndexChange(wrapIndex(activeIndex + direction, total));
  };

  const { frameRef, transform, swipeDx, isInteracting, isZoomed, zoomIn, zoomOut, reset, handlers } =
    useZoomPan({
      onSwipe: go,
      resetKey: `${product.id}:${variantIndex}:${activeIndex}`,
    });

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const slides = total > 0 ? images : [undefined];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} image viewer`}
      className="fixed inset-0 z-50 flex flex-col bg-viewer-backdrop"
    >
      <header className="flex shrink-0 items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-medium text-white sm:text-base">{product.name}</h2>
          <p className="truncate text-xs text-white/50">{variant?.color}</p>
        </div>

        <div className="flex items-center gap-0.5 rounded-control bg-white/10 p-0.5">
          <button type="button" onClick={zoomOut} disabled={!isZoomed} aria-label="Zoom out" className={iconButton}>
            <ZoomIcon className="h-4 w-4" variant="out" />
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={!isZoomed}
            aria-label="Reset zoom"
            className="hidden min-w-12 rounded-control px-2 py-1.5 text-[11px] tabular-nums text-white/85 transition-colors hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent sm:block"
          >
            {Math.round(transform.scale * 100)}%
          </button>
          <button type="button" onClick={zoomIn} aria-label="Zoom in" className={iconButton}>
            <ZoomIcon className="h-4 w-4" variant="in" />
          </button>
        </div>

        <button type="button" onClick={onClose} aria-label="Close image viewer" className={iconButton}>
          <CloseIcon className="h-5 w-5" />
        </button>
      </header>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {/* Width is driven by both the container and the remaining viewport
            height so the 3.5:6 frame is never squeezed on small screens. */}
        <div
          ref={frameRef}
          {...handlers}
          className={cn(
            "relative aspect-product w-[min(100%,calc((100dvh-10rem)*3.5/6))]",
            "touch-none select-none overflow-hidden rounded-card bg-black/25",
            isZoomed && (isInteracting ? "cursor-grabbing" : "cursor-grab")
          )}
        >
          <div
            className="flex h-full w-full"
            style={{
              transform: `translate3d(calc(${-activeIndex * 100}% + ${swipeDx}px), 0, 0)`,
              transition: isInteracting ? "none" : "transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1)",
            }}
          >
            {slides.map((src, index) => (
              <div key={`${src ?? "empty"}-${index}`} className="relative h-full w-full shrink-0 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={
                    index === activeIndex
                      ? {
                          transform: `translate3d(${transform.offset.x}px, ${transform.offset.y}px, 0) scale(${transform.scale})`,
                          transition: isInteracting ? "none" : "transform 220ms ease-out",
                        }
                      : undefined
                  }
                >
                  <ProductImage
                    src={src}
                    alt={`${product.name}, ${variant?.color ?? ""} — image ${index + 1} of ${total}`}
                    sizes="(max-width: 1024px) 92vw, 45vw"
                    priority={index === activeIndex}
                  />
                </div>
              </div>
            ))}
          </div>

          <span className="pointer-events-none absolute right-2.5 top-2.5 z-10 rounded-control bg-black/55 px-2 py-0.5 text-[11px] tabular-nums text-white/90 backdrop-blur-sm">
            {total > 0 ? activeIndex + 1 : 0} / {total}
          </span>

          {total > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={cn(overlayButton, "left-2")}>
                <ChevronIcon className="h-5 w-5" direction="left" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className={cn(overlayButton, "right-2")}>
                <ChevronIcon className="h-5 w-5" direction="right" />
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/55 to-transparent pb-3 pt-10">
                <div className="pointer-events-auto flex items-center gap-1.5">
                  {images.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => onImageIndexChange(index)}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === activeIndex}
                      className={cn(
                        "h-1.5 rounded-control transition-all duration-200",
                        index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
                      )}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-center px-4 py-3.5">
        <ColorSwatches
          variants={product.variants}
          selectedIndex={variantIndex}
          onSelect={onSelectVariant}
          size="lg"
          tone="dark"
        />
      </footer>
    </div>
  );
}
