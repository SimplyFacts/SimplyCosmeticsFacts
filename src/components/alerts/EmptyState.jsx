import { View, Text, StyleSheet } from "react-native";
import { AlertTriangle } from "lucide-react-native";

export function EmptyState() {
  return (
    <View style={styles.emptyStateInline}>
      <AlertTriangle size={48} color="#D1D5DB" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No Alerts Set</Text>
      <Text style={styles.emptySubtitle}>
        Tap any ingredient above to start tracking it
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateInline: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
