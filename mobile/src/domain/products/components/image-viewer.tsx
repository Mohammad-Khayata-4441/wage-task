import { useCallback, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Product } from "@/types/product";
import { PRODUCT_ASPECT_RATIO, colors, radii } from "@/theme/tokens";
import { getVariant, getVariantImages, wrapIndex } from "../utils/product";
import { ColorSwatches } from "./color-swatches";
import { ChevronIcon, CloseIcon } from "./icons";
import { ImagePager } from "./image-pager";

const CHROME_HEIGHT = 210;
const STAGE_HORIZONTAL_PADDING = 32;

interface ImageViewerProps {
  visible: boolean;
  product: Product;
  variantIndex: number;
  imageIndex: number;
  onSelectVariant: (index: number) => void;
  onImageIndexChange: (index: number) => void;
  onClose: () => void;
}

export function ImageViewer({
  visible,
  product,
  variantIndex,
  imageIndex,
  onSelectVariant,
  onImageIndexChange,
  onClose,
}: ImageViewerProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [isZoomed, setIsZoomed] = useState(false);

  const variant = getVariant(product, variantIndex);
  const images = getVariantImages(product, variantIndex);
  const total = images.length;
  const activeIndex = Math.min(imageIndex, Math.max(total - 1, 0));

  const frameHeight = screenHeight - CHROME_HEIGHT;
  const frameWidth = Math.min(screenWidth - STAGE_HORIZONTAL_PADDING, frameHeight * PRODUCT_ASPECT_RATIO);

  const go = useCallback(
    (direction: 1 | -1) => {
      if (total <= 1) return;
      onImageIndexChange(wrapIndex(activeIndex + direction, total));
    },
    [activeIndex, total, onImageIndexChange]
  );

  const slides = total > 0 ? images : [undefined];

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text numberOfLines={1} style={styles.title}>
                {product.name}
              </Text>
              <Text numberOfLines={1} style={styles.subtitle}>
                {variant?.color}
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Close image viewer"
              style={styles.iconButton}
            >
              <CloseIcon size={20} />
            </Pressable>
          </View>

          <View style={styles.stage}>
            <View style={[styles.frame, { width: frameWidth, height: frameHeight }]}>
              <ImagePager
                images={slides}
                index={activeIndex}
                onIndexChange={onImageIndexChange}
                onZoomChange={setIsZoomed}
                frameWidth={frameWidth}
                frameHeight={frameHeight}
                resetKey={`${product.id}:${variantIndex}`}
              />

              <View pointerEvents="none" style={styles.counterPill}>
                <Text style={styles.counterText}>
                  {total > 0 ? activeIndex + 1 : 0} / {total}
                </Text>
              </View>

              {total > 1 && !isZoomed && (
                <>
                  <Pressable
                    onPress={() => go(-1)}
                    accessibilityRole="button"
                    accessibilityLabel="Previous image"
                    style={[styles.arrow, styles.arrowLeft]}
                  >
                    <ChevronIcon direction="left" />
                  </Pressable>
                  <Pressable
                    onPress={() => go(1)}
                    accessibilityRole="button"
                    accessibilityLabel="Next image"
                    style={[styles.arrow, styles.arrowRight]}
                  >
                    <ChevronIcon direction="right" />
                  </Pressable>

                  <View pointerEvents="none" style={styles.dotsRow}>
                    {images.map((_, index) => (
                      <View key={index} style={[styles.dot, index === activeIndex && styles.dotActive]} />
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <ColorSwatches
              variants={product.variants}
              selectedIndex={variantIndex}
              onSelect={onSelectVariant}
              size="lg"
              tone="dark"
            />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.viewerBackdrop },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: { flex: 1 },
  title: { color: colors.white, fontSize: 14, fontWeight: "500" },
  subtitle: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 1 },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.control,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  stage: { flex: 1, alignItems: "center", justifyContent: "center" },
  frame: {
    borderRadius: radii.card,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  counterPill: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: radii.control,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  counterText: { color: "rgba(255,255,255,0.9)", fontSize: 11, fontVariant: ["tabular-nums"] },
  arrow: {
    position: "absolute",
    top: "50%",
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: radii.control,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  arrowLeft: { left: 8 },
  arrowRight: { right: 8 },
  dotsRow: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: radii.control, backgroundColor: "rgba(255,255,255,0.4)" },
  dotActive: { width: 18, backgroundColor: colors.white },
  footer: { alignItems: "center", paddingVertical: 14 },
});
