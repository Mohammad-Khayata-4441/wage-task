import { useCallback, useState } from "react";
import type { Product } from "@/types/product";

export function useImageViewer() {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const open = useCallback((next: Product) => {
    setProduct(next);
    setImageIndex(0);
  }, []);

  const close = useCallback(() => setProduct(null), []);

  return { product, imageIndex, open, close, setImageIndex };
}
