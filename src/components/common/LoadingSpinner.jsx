import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { memo } from "react";

function LoadingSpinner({ backgroundColor = "#fff", color = "#10B981" }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style={backgroundColor === "#fff" ? "dark" : "light"} />
      <ActivityIndicator
        size="large"
        color={color}
        testID="activity-indicator"
      />
    </View>
  );
}

export default memo(LoadingSpinner);
