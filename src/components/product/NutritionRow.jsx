import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";

export function NutritionRow({ label, value, fontSize = "medium" }) {
  const fonts = getFontSizes(fontSize);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <Text style={{ fontSize: fonts.nutritionText, color: "#374151" }}>
        {label}
      </Text>
      <Text
        style={{
          fontSize: fonts.nutritionText,
          fontWeight: "600",
          color: "#111827",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
