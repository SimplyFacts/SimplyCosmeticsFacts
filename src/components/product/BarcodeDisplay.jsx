import { View, Text } from "react-native";
import { scaleFont, scaleModerate } from "@/utils/responsiveScale";

export function BarcodeDisplay({ barcode }) {
  return (
    <View style={{ marginBottom: scaleModerate(24) }}>
      <Text style={{ fontSize: scaleFont(14), color: "#9CA3AF" }}>
        Barcode: {barcode}
      </Text>
    </View>
  );
}
