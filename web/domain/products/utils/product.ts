import type { Product, ProductVariant } from "@/types/product";

export function getVariant(product: Product, index: number): ProductVariant | undefined {
  return product.variants[index] ?? product.variants[0];
}

export function getVariantImages(product: Product, index: number): string[] {
  return getVariant(product, index)?.images ?? [];
}

export function getImageAt(product: Product, variantIndex: number, imageIndex: number): string | undefined {
  return getVariantImages(product, variantIndex)[imageIndex];
}

export function wrapIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return (index + total) % total;
}

export function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function getDiscountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
