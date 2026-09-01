"use client";

import { useCallback, useState } from "react";
import type { VariantSelection } from "@/types/product";

/**
 * Selected colour lives here rather than inside ProductCard because both the
 * card and the image viewer read and write it, and the choice has to survive
 * the viewer opening and closing.
 */
export function useVariantSelection() {
  const [selection, setSelection] = useState<VariantSelection>({});

  const getVariantIndex = useCallback(
    (productId: number) => selection[productId] ?? 0,
    [selection]
  );

  const selectVariant = useCallback((productId: number, variantIndex: number) => {
    setSelection((prev) => ({ ...prev, [productId]: variantIndex }));
  }, []);

  return { getVariantIndex, selectVariant };
}
