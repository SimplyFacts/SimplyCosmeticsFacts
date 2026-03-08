import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AlertTriangle } from "lucide-react-native";
import { memo } from "react";
import { scaleFont, scaleModerate } from "@/utils/responsiveScale";

function ErrorState({
  message = "Something went wrong",
  backgroundColor = "#fff",
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: scaleModerate(24),
      }}
    >
      <StatusBar style={backgroundColor === "#fff" ? "dark" : "light"} />
      <AlertTriangle
        size={scaleModerate(64)}
        color="#DC2626"
        style={{ marginBottom: scaleModerate(16) }}
      />
      <Text
        style={{
          fontSize: scaleFont(18),
          color: "#6B7280",
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
}

export default memo(ErrorState);
