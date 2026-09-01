"use client";

import { PRODUCTS_MOCK_DATA } from "@/data/mock";
import { useFavorites } from "../hooks/use-favorites";
import { useImageViewer } from "../hooks/use-image-viewer";
import { useVariantSelection } from "../hooks/use-variant-selection";
import { ImageViewer } from "./image-viewer";
import { ProductsGrid } from "./products-grid";

export default function ProductsGallery() {
  const { getVariantIndex, selectVariant } = useVariantSelection();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { product, imageIndex, open, close, setImageIndex } = useImageViewer();

  // A colour change always lands on image 1 of the new variant; the viewer
  // derives zoom/pan resets from that same index change.
  const handleSelectVariant = (productId: number, variantIndex: number) => {
    selectVariant(productId, variantIndex);
    if (product?.id === productId) setImageIndex(0);
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6">
      <header className="pb-6 pt-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">Collection</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Product Gallery
        </h1>
        <p className="mt-1.5 text-sm text-ink-muted">
          {PRODUCTS_MOCK_DATA.length} products · tap an image to open the viewer
        </p>
      </header>

      <ProductsGrid
        products={PRODUCTS_MOCK_DATA}
        getVariantIndex={getVariantIndex}
        isFavorite={isFavorite}
        onSelectVariant={handleSelectVariant}
        onToggleFavorite={toggleFavorite}
        onOpenViewer={open}
      />

      {product && (
        <ImageViewer
          product={product}
          variantIndex={getVariantIndex(product.id)}
          imageIndex={imageIndex}
          onSelectVariant={(variantIndex) => handleSelectVariant(product.id, variantIndex)}
          onImageIndexChange={setImageIndex}
          onClose={close}
        />
      )}
    </main>
  );
}
