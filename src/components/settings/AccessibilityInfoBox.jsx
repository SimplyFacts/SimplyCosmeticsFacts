import { View, Text } from "react-native";

export function AccessibilityInfoBox() {
  return (
    <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
      <View
        style={{
          backgroundColor: "#EFF6FF",
          borderWidth: 1,
          borderColor: "#BFDBFE",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 14, color: "#1E40AF", lineHeight: 20 }}>
          When enabled, product details will automatically display in a larger,
          easier-to-read font. You can still toggle the text size on individual
          product pages.
        </Text>
      </View>
    </View>
  );
}
