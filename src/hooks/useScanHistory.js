import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "simplycosmeticsfacts_scan_history";
const MAX_HISTORY = 50;

async function fetchScanHistory() {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function addToScanHistory({ barcode, product_name }) {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];

    // Remove existing entry for this barcode (dedup)
    const filtered = history.filter((item) => item.barcode !== barcode);

    // Add new entry at the front
    const newEntry = {
      barcode,
      product_name: product_name || null,
      scanned_at: new Date().toISOString(),
    };

    const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (error) {
    console.error("Error saving scan history:", error);
    throw error;
  }
}

async function clearScanHistory() {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Error clearing scan history:", error);
    throw error;
  }
}

export function useScanHistory() {
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["scanHistory"],
    queryFn: fetchScanHistory,
    staleTime: 1000 * 60,
  });

  const clearMutation = useMutation({
    mutationFn: clearScanHistory,
    onSuccess: () => {
      queryClient.setQueryData(["scanHistory"], []);
    },
  });

  return {
    history: historyQuery.data || [],
    isLoading: historyQuery.isLoading,
    error: historyQuery.error,
    clearHistory: clearMutation.mutate,
    isClearing: clearMutation.isPending,
    addToHistory: async (barcode, productName) => {
      await addToScanHistory({ barcode, product_name: productName });
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    },
  };
}
