import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const ALERTS_KEY = "simplycosmeticsfacts_alerts";

async function loadAlerts() {
  try {
    const stored = await AsyncStorage.getItem(ALERTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function saveAlerts(alerts) {
  try {
    await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
  } catch (error) {
    console.error("Error saving alerts:", error);
  }
}

export const useAlertsStore = create((set, get) => ({
  alerts: [],
  isLoading: false,
  lastFetched: null,
  error: null,

  fetchAlerts: async () => {
    set({ isLoading: true, error: null });
    try {
      const alerts = await loadAlerts();
      set({ alerts, isLoading: false, lastFetched: Date.now(), error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addAlert: async (ingredient_name, notes) => {
    try {
      const newAlert = {
        id: Crypto.randomUUID(),
        ingredient_name,
        notes: notes || null,
        created_at: new Date().toISOString(),
      };
      const updatedAlerts = [...get().alerts, newAlert];
      await saveAlerts(updatedAlerts);
      set({ alerts: updatedAlerts });
      return newAlert;
    } catch (error) {
      console.error("Error adding alert:", error);
      throw error;
    }
  },

  batchAddAlerts: async (ingredientNames) => {
    try {
      const existing = get().alerts;
      const existingNames = new Set(
        existing.map((a) => a.ingredient_name.toLowerCase())
      );
      const newAlerts = ingredientNames
        .filter((name) => !existingNames.has(name.toLowerCase()))
        .map((name) => ({
          id: Crypto.randomUUID(),
          ingredient_name: name,
          notes: null,
          created_at: new Date().toISOString(),
        }));
      const updatedAlerts = [...existing, ...newAlerts];
      await saveAlerts(updatedAlerts);
      set({ alerts: updatedAlerts });
      return { added: newAlerts.length };
    } catch (error) {
      console.error("Error batch adding alerts:", error);
      throw error;
    }
  },

  deleteAlert: async (id) => {
    try {
      const updatedAlerts = get().alerts.filter((alert) => alert.id !== id);
      await saveAlerts(updatedAlerts);
      set({ alerts: updatedAlerts });
    } catch (error) {
      console.error("Error deleting alert:", error);
      throw error;
    }
  },

  deactivateAlert: async (id) => {
    await get().deleteAlert(id);
  },

  batchRemoveAlerts: async (ingredientNames) => {
    const normalizedNames = ingredientNames.map((n) => n.toLowerCase());
    const updatedAlerts = get().alerts.filter(
      (a) =>
        !a.ingredient_name ||
        !normalizedNames.includes(a.ingredient_name.toLowerCase()),
    );
    await saveAlerts(updatedAlerts);
    set({ alerts: updatedAlerts });
  },

  clearAlerts: async () => {
    await saveAlerts([]);
    set({ alerts: [], lastFetched: null });
  },

  shouldRefresh: () => {
    const state = get();
    if (!state.lastFetched) return true;
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - state.lastFetched > fiveMinutes;
  },
}));
