import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Product } from "@/types/product";
import { PRODUCT_ASPECT_RATIO, colors, radii, shadows } from "@/theme/tokens";
import { getVariantImages } from "../utils/product";
import { ColorSwatches } from "./color-swatches";
import { FavoriteButton } from "./favorite-button";
import { PriceDisplay } from "./price-display";
import { ProductImage } from "./product-image";

interface ProductCardProps {
  product: Product;
  variantIndex: number;
  isFavorite: boolean;
  onSelectVariant: (index: number) => void;
  onToggleFavorite: () => void;
  onOpenViewer: () => void;
}

export function ProductCard({
  product,
  variantIndex,
  isFavorite,
  onSelectVariant,
  onToggleFavorite,
  onOpenViewer,
}: ProductCardProps) {
  const images = getVariantImages(product, variantIndex);

  return (
    <View style={styles.shadowWrap}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Pressable
            onPress={onOpenViewer}
            accessibilityRole="button"
            accessibilityLabel={`Open image viewer for ${product.name}`}
            style={StyleSheet.absoluteFill}
          >
            <ProductImage source={images[0]} />
          </Pressable>

          {images.length > 1 && (
            <View style={styles.countBadge} pointerEvents="none">
              <Text style={styles.countBadgeText}>{images.length}</Text>
            </View>
          )}

          <FavoriteButton isFavorite={isFavorite} productName={product.name} onToggle={onToggleFavorite} />
        </View>

        <View style={styles.body}>
          <Text numberOfLines={1} style={styles.name}>
            {product.name}
          </Text>
          <PriceDisplay price={product.price} oldPrice={product.oldPrice} />
          <ColorSwatches variants={product.variants} selectedIndex={variantIndex} onSelect={onSelectVariant} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    flex: 1,
    borderRadius: radii.card,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  card: {
    flex: 1,
    borderRadius: radii.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: PRODUCT_ASPECT_RATIO,
    backgroundColor: colors.surfaceMuted,
  },
  countBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "rgba(24,24,27,0.7)",
    borderRadius: radii.control,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countBadgeText: { color: colors.white, fontSize: 10, fontWeight: "600" },
  body: { padding: 10, gap: 6 },
  name: { fontSize: 12, fontWeight: "500", color: colors.ink },
});
