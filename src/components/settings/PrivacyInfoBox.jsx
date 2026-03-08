import { View, Text } from "react-native";

export function PrivacyInfoBox() {
  return (
    <View style={{ marginTop: 24, marginBottom: 32, paddingHorizontal: 20 }}>
      <View
        style={{
          backgroundColor: "#F0F9FF",
          borderWidth: 1,
          borderColor: "#BAE6FD",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#0369A1",
            marginBottom: 8,
          }}
        >
          Your Privacy Matters
        </Text>
        <Text style={{ fontSize: 13, color: "#0C4A6E", lineHeight: 20 }}>
          We store your scan history and ingredient alerts locally on your
          device and in our secure database. We never share your data with third
          parties. Product information comes from OpenFoodFacts, a free and open
          database.
        </Text>
      </View>
    </View>
  );
}
