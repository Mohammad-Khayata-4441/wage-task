import type { ReactElement } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
  getVariantIndex: (productId: number) => number;
  isFavorite: (productId: number) => boolean;
  onSelectVariant: (productId: number, variantIndex: number) => void;
  onToggleFavorite: (productId: number) => void;
  onOpenViewer: (product: Product) => void;
  ListHeaderComponent?: ReactElement;
}

export function ProductsGrid({
  products,
  getVariantIndex,
  isFavorite,
  onSelectVariant,
  onToggleFavorite,
  onOpenViewer,
  ListHeaderComponent,
}: ProductsGridProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <View style={styles.cell}>
          <ProductCard
            product={item}
            variantIndex={getVariantIndex(item.id)}
            isFavorite={isFavorite(item.id)}
            onSelectVariant={(variantIndex) => onSelectVariant(item.id, variantIndex)}
            onToggleFavorite={() => onToggleFavorite(item.id)}
            onOpenViewer={() => onOpenViewer(item)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 12, paddingBottom: 32, gap: 12 },
  row: { gap: 12 },
  cell: { flex: 1 },
});
