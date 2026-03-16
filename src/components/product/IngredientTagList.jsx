import { View, Text, StyleSheet } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";

export function IngredientTagList({
  items,
  fontSize = "medium",
  backgroundColor,
  borderColor,
  textColor,
}) {
  const fonts = getFontSizes(fontSize);

  if (items.length === 0) {
    return (
      <Text style={[styles.noneText, { fontSize: fonts.noneListedText }]}>
        None listed
      </Text>
    );
  }

  return (
    <View style={styles.row}>
      {items.map((item, index) => {
        const displayText =
          typeof item === "string" ? item : item.displayName || item;

        return (
          <View
            key={index}
            style={[styles.chip, { backgroundColor, borderColor }]}
          >
            <Text style={[styles.chipText, { fontSize: fonts.tagText, color: textColor }]}>
              {displayText}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  noneText: {
    color: "#6B7280",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chipText: {
    fontWeight: "500",
  },
});
