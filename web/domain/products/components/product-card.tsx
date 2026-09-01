"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onOpenGallery: (product: Product, selectedVariantIndex: number) => void;
  onToggleFavorite: (productId: number) => void;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  onOpenGallery,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const primaryImage = currentVariant.images[0] || "/placeholder.webp";

  return (
    <div className="flex flex-col group bg-white rounded-xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
      
      {/* 
      
      
      
      
      Product Image Container: Fixed 3.5:6 Aspect Ratio to prevent layout shifts
      
      
      
      
      
      */}

      <div
        className="relative w-full aspect-[3.5/6] bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => onOpenGallery(product, selectedVariantIndex)}
      >
        <Image
          src={imageError ? "/placeholder.webp" : primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {/* Favorite Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors shadow-sm"
          aria-label="Save to favorites"
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        {/* Image Count Indicator */}
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-medium rounded">
          {currentVariant.images.length} imgs
        </span>
      </div>

       <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-xs font-semibold text-gray-900 truncate" title={product.name}>
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">${product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>

        {/* Color Swatches (Immediate change without page reload) */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          {product.variants.map((variant, idx) => (
            <button
              key={variant.color}
              aria-label={variant.color}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVariantIndex(idx);
                setImageError(false);
              }}
              style={{ backgroundColor: variant.colorCode }}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedVariantIndex === idx
                  ? "ring-2 ring-black ring-offset-1 border-white"
                  : "border-gray-300 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}