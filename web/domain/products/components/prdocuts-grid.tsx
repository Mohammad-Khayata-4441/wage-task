"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
  favorites: number[];
  onOpenGallery: (product: Product, variantIndex: number) => void;
  onToggleFavorite: (productId: number) => void;
}

export function ProductsGrid({
  products,
  favorites,
  onOpenGallery,
  onToggleFavorite,
}: ProductsGridProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onOpenGallery={onOpenGallery}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}