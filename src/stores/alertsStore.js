import { create } from "zustand";

// Global alerts store using Zustand
export const useAlertsStore = create((set, get) => ({
  alerts: [],
  isLoading: false,
  lastFetched: null,
  error: null,

  // Fetch alerts from API
  fetchAlerts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("/api/alerts");
      if (!response.ok) throw new Error("Failed to fetch alerts");

      const alerts = await response.json();
      set({
        alerts,
        isLoading: false,
        lastFetched: Date.now(),
        error: null,
      });
    } catch (error) {
      console.error("Error fetching alerts:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  // Add a new alert
  addAlert: async (ingredient_name, notes) => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredient_name, notes }),
      });

      if (!response.ok) throw new Error("Failed to add alert");

      const newAlert = await response.json();

      // Optimistically update the store
      set((state) => ({
        alerts: [...state.alerts, newAlert],
      }));

      return newAlert;
    } catch (error) {
      console.error("Error adding alert:", error);
      throw error;
    }
  },

  // Batch add multiple alerts at once
  batchAddAlerts: async (ingredientNames) => {
    try {
      const response = await fetch("/api/alerts/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientNames }),
      });

      if (!response.ok) throw new Error("Failed to batch add alerts");

      const result = await response.json();

      // Refresh the full alerts list to stay in sync
      await get().fetchAlerts();

      return result;
    } catch (error) {
      console.error("Error batch adding alerts:", error);
      throw error;
    }
  },

  // Delete an alert
  deleteAlert: async (id) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete alert");

      // Optimistically update the store
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting alert:", error);
      throw error;
    }
  },

  // Deactivate an alert (set active to false)
  deactivateAlert: async (id) => {
    const previousAlerts = get().alerts;
    // Optimistically remove from active alerts list
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));

    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: false }),
      });

      if (!response.ok) {
        set({ alerts: previousAlerts });
        throw new Error("Failed to deactivate alert");
      }
    } catch (error) {
      console.error("Error deactivating alert:", error);
      set({ alerts: previousAlerts });
      throw error;
    }
  },

  // Clear all alerts (for logout or reset)
  clearAlerts: () => {
    set({ alerts: [], lastFetched: null });
  },

  // Check if alerts need refreshing (older than 5 minutes)
  shouldRefresh: () => {
    const state = get();
    if (!state.lastFetched) return true;
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - state.lastFetched > fiveMinutes;
  },
}));
