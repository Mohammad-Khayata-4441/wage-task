"use client";

import type { Product } from "@/types/product";
import { getVariantImages } from "../utils/product";
import { ColorSwatches } from "./color-swatches";
import { FavoriteButton } from "./favorite-button";
import { PriceDisplay } from "./price-display";
import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: Product;
  variantIndex: number;
  isFavorite: boolean;
  priority?: boolean;
  onSelectVariant: (index: number) => void;
  onToggleFavorite: () => void;
  onOpenViewer: () => void;
}

export function ProductCard({
  product,
  variantIndex,
  isFavorite,
  priority,
  onSelectVariant,
  onToggleFavorite,
  onOpenViewer,
}: ProductCardProps) {
  const images = getVariantImages(product, variantIndex);

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <div className="relative">
        <button
          type="button"
          onClick={onOpenViewer}
          aria-label={`Open image viewer for ${product.name}`}
          className="relative block aspect-product w-full overflow-hidden bg-surface-muted"
        >
          <ProductImage
            src={images[0]}
            alt={product.name}
            sizes="(max-width: 1024px) 50vw, 17vw"
            priority={priority}
            className="duration-300 group-hover:scale-[1.04]"
          />

          {images.length > 1 && (
            <span className="absolute bottom-2 right-2 rounded-control bg-ink/70 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white">
              {images.length}
            </span>
          )}
        </button>

        <FavoriteButton
          isFavorite={isFavorite}
          productName={product.name}
          onToggle={onToggleFavorite}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="truncate text-xs font-medium text-ink" title={product.name}>
          {product.name}
        </h3>

        <PriceDisplay price={product.price} oldPrice={product.oldPrice} />

        <div className="mt-auto pt-1">
          <ColorSwatches
            variants={product.variants}
            selectedIndex={variantIndex}
            onSelect={onSelectVariant}
          />
        </div>
      </div>
    </article>
  );
}
