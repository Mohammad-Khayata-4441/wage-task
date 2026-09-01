import { useCallback, useState } from "react";
import type { VariantSelection } from "@/types/product";

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
