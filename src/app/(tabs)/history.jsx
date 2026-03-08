import { memo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Clock, ChevronRight, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useScanHistory } from "@/hooks/useScanHistory";

// Memoized list item component
const HistoryItem = memo(({ item, onPress }) => {
  const date = new Date(item.scanned_at);
  const timeAgo = getTimeAgo(date);

  return (
    <TouchableOpacity onPress={onPress} style={styles.historyItem}>
      <View style={styles.iconContainer}>
        <Clock size={24} color="#6B7280" />
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.productName}>
          {item.product_name || "Unknown Product"}
        </Text>
        <Text style={styles.timeText}>{timeAgo}</Text>
      </View>

      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
});

HistoryItem.displayName = "HistoryItem";

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { history, isLoading, clearHistory, isClearing } = useScanHistory();

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all scan history? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => clearHistory(),
        },
      ],
    );
  };

  const renderHistoryItem = ({ item }) => (
    <HistoryItem
      item={item}
      onPress={() => router.push(`/(tabs)/product/${item.barcode}`)}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Scan History</Text>
        {history.length > 0 && (
          <TouchableOpacity
            onPress={handleClearHistory}
            style={styles.clearButton}
            disabled={isClearing}
          >
            <Trash2 size={20} color="#DC2626" />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : history.length === 0 ? (
        <View style={styles.emptyState}>
          <Clock size={64} color="#D1D5DB" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No Scan History</Text>
          <Text style={styles.emptySubtitle}>
            Your scanned products will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 80 },
          ]}
          showsVerticalScrollIndicator={false}
          windowSize={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
          initialNumToRender={15}
        />
      )}
    </View>
  );
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FEE2E2",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 16,
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
  listContent: {
    paddingTop: 16,
  },
  historyItem: {
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
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
