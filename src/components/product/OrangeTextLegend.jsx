import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrangeTextLegend() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkIfDismissed();
  }, []);

  const checkIfDismissed = async () => {
    const dismissed = await AsyncStorage.getItem("orangeLegendDismissed");
    setVisible(!dismissed);
  };

  const handleDismiss = async () => {
    await AsyncStorage.setItem("orangeLegendDismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>💡</Text>
      <Text style={styles.text}>
        Tip: Orange text appears in multiple sections
      </Text>
      <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#fff7ed",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 3,
    borderLeftColor: "#ff8c00",
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: "#92400e",
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeText: {
    fontSize: 18,
    color: "#92400e",
    fontWeight: "bold",
  },
});
