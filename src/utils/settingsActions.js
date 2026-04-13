import { Alert } from "react-native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlertsStore } from "@/stores/alertsStore";

const HISTORY_KEY = "simplycosmeticsfacts_scan_history";

export const handleClearScanHistory = () => {
  Alert.alert(
    "Clear Scan History",
    "This will permanently delete all your scanned cosmetics. This cannot be undone.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(HISTORY_KEY);
            Alert.alert("Success", "Scan history cleared");
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
            await useAlertsStore.getState().clearAlerts();
            Alert.alert("Success", "All alerts cleared");
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
