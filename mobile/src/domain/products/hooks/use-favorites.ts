import { useCallback, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<ReadonlySet<number>>(new Set());

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (!next.delete(productId)) next.add(productId);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.has(productId),
    [favorites]
  );

  return { isFavorite, toggleFavorite };
}
