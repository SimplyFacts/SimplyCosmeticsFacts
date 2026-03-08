import { View, Text } from "react-native";

export function SettingsHeader({ insets }) {
  return (
    <View
      style={{
        paddingTop: insets.top + 16,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 8 }}>
        Settings
      </Text>
      <Text style={{ fontSize: 14, color: "#6B7280" }}>
        Customize your experience
      </Text>
    </View>
  );
}
