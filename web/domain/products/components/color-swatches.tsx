"use client";

import { cn } from "@/lib/cn";
import type { ProductVariant } from "@/types/product";

interface ColorSwatchesProps {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  size?: "sm" | "lg";
  tone?: "light" | "dark";
}

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
  size = "sm",
  tone = "light",
}: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Colour">
      {variants.map((variant, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={variant.color}
            type="button"
            aria-label={variant.color}
            aria-pressed={isSelected}
            title={variant.color}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(index);
            }}
            className={cn(
              "rounded-control border transition-transform duration-150",
              size === "lg" ? "h-6 w-6" : "h-4 w-4",
              tone === "dark" ? "border-white/25" : "border-line-strong",
              isSelected
                ? cn(
                    "ring-2 ring-offset-2",
                    tone === "dark"
                      ? "ring-white ring-offset-transparent"
                      : "ring-accent ring-offset-surface"
                  )
                : "hover:scale-110"
            )}
            style={{ backgroundColor: variant.colorCode }}
          />
        );
      })}
    </div>
  );
}
