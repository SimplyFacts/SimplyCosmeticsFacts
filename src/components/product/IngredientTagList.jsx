import { View, Text } from "react-native";
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
      <Text style={{ fontSize: fonts.noneListedText, color: "#6B7280" }}>
        None listed
      </Text>
    );
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {items.map((item, index) => {
        // Handle both string items and object items with displayName
        const displayText =
          typeof item === "string" ? item : item.displayName || item;

        return (
          <View
            key={index}
            style={{
              backgroundColor,
              borderWidth: 1,
              borderColor,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: fonts.tagText,
                color: textColor,
                fontWeight: "500",
              }}
            >
              {displayText}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
