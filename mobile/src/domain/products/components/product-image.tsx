import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";
import { ImageOffIcon } from "./icons";

interface ProductImageProps {
  source?: string;
}

export function ProductImage({ source }: ProductImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!source || failedSrc === source) {
    return (
      <View style={styles.fallback}>
        <ImageOffIcon size={26} color={colors.inkSubtle} />
        <Text style={styles.fallbackText}>Image unavailable</Text>
      </View>
    );
  }

  const isReady = loadedSrc === source;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Image
        source={source}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        onLoad={() => setLoadedSrc(source)}
        onError={() => setFailedSrc(source)}
      />
      {!isReady && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator color={colors.inkSubtle} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted,
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.surfaceMuted,
  },
  fallbackText: {
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.inkSubtle,
  },
});
