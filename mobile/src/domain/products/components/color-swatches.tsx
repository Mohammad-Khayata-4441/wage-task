import { Pressable, StyleSheet, View } from "react-native";
import type { ProductVariant } from "@/types/product";
import { colors, radii } from "@/theme/tokens";

interface ColorSwatchesProps {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  size?: "sm" | "lg";
  tone?: "light" | "dark";
}

export function ColorSwatches({
  variants,
  selectedIndex,
  onSelect,
  size = "sm",
  tone = "light",
}: ColorSwatchesProps) {
  const dimension = size === "lg" ? 26 : 18;

  return (
    <View style={styles.row}>
      {variants.map((variant, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Pressable
            key={variant.color}
            hitSlop={6}
            onPress={() => onSelect(index)}
            accessibilityRole="button"
            accessibilityLabel={variant.color}
            accessibilityState={{ selected: isSelected }}
            style={[
              styles.ring,
              {
                borderColor: isSelected
                  ? tone === "dark"
                    ? colors.white
                    : colors.accent
                  : "transparent",
              },
            ]}
          >
            <View
              style={[
                styles.dot,
                {
                  width: dimension,
                  height: dimension,
                  backgroundColor: variant.colorCode,
                  borderColor: tone === "dark" ? "rgba(255,255,255,0.3)" : colors.lineStrong,
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  ring: {
    borderWidth: 2,
    borderRadius: radii.control,
    padding: 2,
  },
  dot: {
    borderRadius: radii.control,
    borderWidth: 1,
  },
});
