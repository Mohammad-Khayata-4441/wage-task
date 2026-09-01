import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTS_MOCK_DATA } from "@/data/mock";
import { colors } from "@/theme/tokens";
import { useFavorites } from "../hooks/use-favorites";
import { useImageViewer } from "../hooks/use-image-viewer";
import { useVariantSelection } from "../hooks/use-variant-selection";
import { ImageViewer } from "./image-viewer";
import { ProductsGrid } from "./products-grid";

export function ProductsGallery() {
  const { getVariantIndex, selectVariant } = useVariantSelection();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { product, imageIndex, open, close, setImageIndex } = useImageViewer();

  const handleSelectVariant = (productId: number, variantIndex: number) => {
    selectVariant(productId, variantIndex);
    if (product?.id === productId) setImageIndex(0);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ProductsGrid
        products={PRODUCTS_MOCK_DATA}
        getVariantIndex={getVariantIndex}
        isFavorite={isFavorite}
        onSelectVariant={handleSelectVariant}
        onToggleFavorite={toggleFavorite}
        onOpenViewer={open}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Collection</Text>
            <Text style={styles.title}>Product Gallery</Text>
            <Text style={styles.subtitle}>
              {PRODUCTS_MOCK_DATA.length} products · tap an image to open the viewer
            </Text>
          </View>
        }
      />

      {product && (
        <ImageViewer
          visible
          product={product}
          variantIndex={getVariantIndex(product.id)}
          imageIndex={imageIndex}
          onSelectVariant={(variantIndex) => handleSelectVariant(product.id, variantIndex)}
          onImageIndexChange={setImageIndex}
          onClose={close}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  header: { paddingHorizontal: 4, paddingTop: 8, paddingBottom: 12 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, color: colors.inkMuted, textTransform: "uppercase" },
  title: { fontSize: 24, fontWeight: "700", color: colors.ink, marginTop: 4 },
  subtitle: { fontSize: 13, color: colors.inkMuted, marginTop: 4 },
});
