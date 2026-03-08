import { View, Text, TouchableOpacity } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { useRouter } from "expo-router";

export function DisclaimerFooter({ fontSize = "medium" }) {
  const router = useRouter();

  const fontSizeMap = {
    small: { text: 12, title: 13 },
    medium: { text: 13, title: 14 },
    large: { text: 14, title: 15 },
  };

  const sizes = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: "#FEF3C7",
        borderTopWidth: 1,
        borderTopColor: "#F59E0B",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <AlertTriangle
          size={16}
          color="#D97706"
          style={{ marginRight: 8, marginTop: 2 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: sizes.text, color: "#92400E", lineHeight: 18 }}
          >
            <Text style={{ fontWeight: "600" }}>Always verify on package.</Text>{" "}
            Data may be incomplete. Not medical advice.{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/settings")}>
            <Text
              style={{
                fontSize: sizes.text,
                color: "#D97706",
                textDecorationLine: "underline",
                marginTop: 4,
              }}
            >
              See full disclaimer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
