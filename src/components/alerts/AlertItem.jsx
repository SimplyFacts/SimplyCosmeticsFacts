import { memo } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { AlertTriangle } from "lucide-react-native";

export const AlertItem = memo(({ item, onToggle }) => (
  <View style={styles.alertItem}>
    <View style={styles.alertIconContainer}>
      <AlertTriangle size={24} color="#DC2626" />
    </View>

    <View style={styles.alertContent}>
      <Text style={styles.alertName}>{item.ingredient_name}</Text>
      {item.notes && <Text style={styles.alertNotes}>{item.notes}</Text>}
    </View>

    <Switch
      value={true}
      onValueChange={() => onToggle(item)}
      trackColor={{ false: "#D1D5DB", true: "#10B981" }}
      thumbColor="#fff"
      style={styles.toggleSwitch}
    />
  </View>
));

AlertItem.displayName = "AlertItem";

const styles = StyleSheet.create({
  alertItem: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
  },
  alertIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  alertNotes: {
    fontSize: 14,
    color: "#6B7280",
  },
  toggleSwitch: {
    marginLeft: 8,
  },
});
