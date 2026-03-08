import { Alert } from "react-native";
import * as Linking from "expo-linking";

export const handleClearScanHistory = () => {
  Alert.alert(
    "Clear Scan History",
    "This will permanently delete all your scanned products. This cannot be undone.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch("/api/scan-history", {
              method: "DELETE",
            });
            if (response.ok) {
              Alert.alert("Success", "Scan history cleared");
            } else {
              Alert.alert("Error", "Failed to clear scan history");
            }
          } catch (error) {
            console.error("Failed to clear scan history:", error);
            Alert.alert("Error", "Failed to clear scan history");
          }
        },
      },
    ],
  );
};

export const handleClearAlerts = () => {
  Alert.alert(
    "Clear All Alerts",
    "This will permanently delete all your ingredient alerts. This cannot be undone.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch("/api/alerts", {
              method: "DELETE",
            });
            if (response.ok) {
              Alert.alert("Success", "All alerts cleared");
            } else {
              Alert.alert("Error", "Failed to clear alerts");
            }
          } catch (error) {
            console.error("Failed to clear alerts:", error);
            Alert.alert("Error", "Failed to clear alerts");
          }
        },
      },
    ],
  );
};

export const openURL = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open this URL");
    }
  } catch (error) {
    console.error("Failed to open URL:", error);
    Alert.alert("Error", "Failed to open link");
  }
};
