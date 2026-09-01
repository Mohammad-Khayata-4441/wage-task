"use client";

import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
  getVariantIndex: (productId: number) => number;
  isFavorite: (productId: number) => boolean;
  onSelectVariant: (productId: number, variantIndex: number) => void;
  onToggleFavorite: (productId: number) => void;
  onOpenViewer: (product: Product) => void;
}

export function ProductsGrid({
  products,
  getVariantIndex,
  isFavorite,
  onSelectVariant,
  onToggleFavorite,
  onOpenViewer,
}: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          variantIndex={getVariantIndex(product.id)}
          isFavorite={isFavorite(product.id)}
          priority={index < 6}
          onSelectVariant={(variantIndex) => onSelectVariant(product.id, variantIndex)}
          onToggleFavorite={() => onToggleFavorite(product.id)}
          onOpenViewer={() => onOpenViewer(product)}
        />
      ))}
    </div>
  );
}
