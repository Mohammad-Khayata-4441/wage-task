import { Pressable, StyleSheet } from "react-native";
import { colors, radii } from "@/theme/tokens";
import { HeartIcon } from "./icons";

interface FavoriteButtonProps {
  isFavorite: boolean;
  productName: string;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, productName, onToggle }: FavoriteButtonProps) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={`${isFavorite ? "Remove" : "Add"} ${productName} ${isFavorite ? "from" : "to"} favourites`}
      style={styles.button}
    >
      <HeartIcon size={16} color={isFavorite ? colors.sale : colors.inkMuted} filled={isFavorite} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: radii.control,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#09090b",
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
