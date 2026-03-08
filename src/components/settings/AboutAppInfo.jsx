import { View, Text } from "react-native";
import { Info } from "lucide-react-native";

export function AboutAppInfo() {
  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#DBEAFE",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Info size={24} color="#2563EB" />
        </View>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}>
          Simply Food Facts
        </Text>
      </View>
      <Text style={{ fontSize: 14, color: "#6B7280", lineHeight: 20 }}>
        Your trusted companion for understanding what's in your food. Scan
        barcodes to instantly access ingredient information, nutritional facts,
        and personalized alerts.
      </Text>
    </View>
  );
}
