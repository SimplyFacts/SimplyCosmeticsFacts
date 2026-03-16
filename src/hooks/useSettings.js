import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_SETTINGS = {
  largeFontDefault: false,
  showSyntheticFragrances: true,
  showParabens: true,
  showPFAS: true,
  showSulfates: true,
};

const SETTING_KEYS = Object.keys(DEFAULT_SETTINGS);

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const values = await AsyncStorage.multiGet(SETTING_KEYS);

      const loaded = { ...DEFAULT_SETTINGS };
      values.forEach(([key, value]) => {
        if (value !== null) {
          loaded[key] = value === "true";
        }
      });

      setSettings(loaded);
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const handleToggle = useCallback(async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
      setSettings((prev) => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  }, []);

  return {
    largeFontDefault: settings.largeFontDefault,
    showSyntheticFragrances: settings.showSyntheticFragrances,
    showParabens: settings.showParabens,
    showPFAS: settings.showPFAS,
    showSulfates: settings.showSulfates,
    handleToggleLargeFont: (value) => handleToggle("largeFontDefault", value),
    handleToggleSyntheticFragrances: (value) =>
      handleToggle("showSyntheticFragrances", value),
    handleToggleParabens: (value) => handleToggle("showParabens", value),
    handleTogglePFAS: (value) => handleToggle("showPFAS", value),
    handleToggleSulfates: (value) => handleToggle("showSulfates", value),
  };
}
