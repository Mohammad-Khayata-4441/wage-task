import { cn } from "@/lib/cn";
import { formatPrice, getDiscountPercent } from "../utils/product";

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  size?: "sm" | "lg";
}

export function PriceDisplay({ price, oldPrice, size = "sm" }: PriceDisplayProps) {
  const discount = getDiscountPercent(price, oldPrice);

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span
        className={cn(
          "font-semibold tracking-tight text-ink",
          size === "lg" ? "text-xl" : "text-sm"
        )}
      >
        {formatPrice(price)}
      </span>

      {oldPrice && (
        <span
          className={cn(
            "text-ink-subtle line-through",
            size === "lg" ? "text-sm" : "text-xs"
          )}
        >
          {formatPrice(oldPrice)}
        </span>
      )}

      {discount !== null && (
        <span
          className={cn(
            "rounded-full bg-sale/10 font-medium text-sale",
            size === "lg" ? "px-2 py-0.5 text-xs" : "px-1.5 py-px text-[10px]"
          )}
        >
          -{discount}%
        </span>
      )}
    </div>
  );
}
