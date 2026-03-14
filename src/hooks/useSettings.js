import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSettings() {
  const [largeFontDefault, setLargeFontDefault] = useState(false);
  const [showSyntheticFragrances, setShowSyntheticFragrances] = useState(true);
  const [showParabens, setShowParabens] = useState(true);
  const [showPFAS, setShowPFAS] = useState(true);
  const [showSulfates, setShowSulfates] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const keys = [
        "largeFontDefault",
        "showSyntheticFragrances",
        "showParabens",
        "showPFAS",
        "showSulfates",
      ];

      const values = await AsyncStorage.multiGet(keys);

      const settings = {};
      values.forEach(([key, value]) => {
        settings[key] = value;
      });

      if (settings.largeFontDefault !== null) {
        setLargeFontDefault(settings.largeFontDefault === "true");
      }
      if (settings.showSyntheticFragrances !== null) {
        setShowSyntheticFragrances(settings.showSyntheticFragrances === "true");
      } else {
        setShowSyntheticFragrances(true);
      }
      if (settings.showParabens !== null) {
        setShowParabens(settings.showParabens === "true");
      } else {
        setShowParabens(true);
      }
      if (settings.showPFAS !== null) {
        setShowPFAS(settings.showPFAS === "true");
      } else {
        setShowPFAS(true);
      }
      if (settings.showSulfates !== null) {
        setShowSulfates(settings.showSulfates === "true");
      } else {
        setShowSulfates(true);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const handleToggleLargeFont = async (value) => {
    try {
      await AsyncStorage.setItem("largeFontDefault", value.toString());
      setLargeFontDefault(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  const handleToggleSyntheticFragrances = async (value) => {
    try {
      await AsyncStorage.setItem("showSyntheticFragrances", value.toString());
      setShowSyntheticFragrances(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  const handleToggleParabens = async (value) => {
    try {
      await AsyncStorage.setItem("showParabens", value.toString());
      setShowParabens(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  const handleTogglePFAS = async (value) => {
    try {
      await AsyncStorage.setItem("showPFAS", value.toString());
      setShowPFAS(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  const handleToggleSulfates = async (value) => {
    try {
      await AsyncStorage.setItem("showSulfates", value.toString());
      setShowSulfates(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  return {
    largeFontDefault,
    showSyntheticFragrances,
    showParabens,
    showPFAS,
    showSulfates,
    handleToggleLargeFont,
    handleToggleSyntheticFragrances,
    handleToggleParabens,
    handleTogglePFAS,
    handleToggleSulfates,
  };
}
