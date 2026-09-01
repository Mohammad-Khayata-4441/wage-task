import { StyleSheet, Text, View } from "react-native";
import { colors, radii } from "@/theme/tokens";
import { formatPrice, getDiscountPercent } from "../utils/product";

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  size?: "sm" | "lg";
}

export function PriceDisplay({ price, oldPrice, size = "sm" }: PriceDisplayProps) {
  const discount = getDiscountPercent(price, oldPrice);

  return (
    <View style={styles.row}>
      <Text style={[styles.price, size === "lg" && styles.priceLg]}>{formatPrice(price)}</Text>

      {oldPrice ? (
        <Text style={[styles.oldPrice, size === "lg" && styles.oldPriceLg]}>
          {formatPrice(oldPrice)}
        </Text>
      ) : null}

      {discount !== null ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-{discount}%</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 },
  price: { fontSize: 13, fontWeight: "600", color: colors.ink, letterSpacing: -0.2 },
  priceLg: { fontSize: 19 },
  oldPrice: { fontSize: 11, color: colors.inkSubtle, textDecorationLine: "line-through" },
  oldPriceLg: { fontSize: 13 },
  badge: {
    backgroundColor: colors.saleMuted,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.control,
  },
  badgeText: { fontSize: 10, fontWeight: "600", color: colors.sale },
});
