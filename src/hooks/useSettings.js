import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSettings() {
  const [largeFontDefault, setLargeFontDefault] = useState(false);
  const [showArtificialIngredients, setShowArtificialIngredients] =
    useState(true);
  const [showArtificialColors, setShowArtificialColors] = useState(true);
  const [showSweeteners, setShowSweeteners] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const keys = [
        "largeFontDefault",
        "showArtificialIngredients",
        "showArtificialColors",
        "showSweeteners",
      ];

      const values = await AsyncStorage.multiGet(keys);

      const settings = {};
      values.forEach(([key, value]) => {
        settings[key] = value;
      });

      if (settings.largeFontDefault !== null) {
        setLargeFontDefault(settings.largeFontDefault === "true");
      }
      if (settings.showArtificialIngredients !== null) {
        setShowArtificialIngredients(
          settings.showArtificialIngredients === "true",
        );
      } else {
        setShowArtificialIngredients(true);
      }
      if (settings.showArtificialColors !== null) {
        setShowArtificialColors(settings.showArtificialColors === "true");
      } else {
        setShowArtificialColors(true);
      }
      if (settings.showSweeteners !== null) {
        setShowSweeteners(settings.showSweeteners === "true");
      } else {
        setShowSweeteners(true);
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

  const handleToggleArtificialIngredients = async (value) => {
    try {
      await AsyncStorage.setItem("showArtificialIngredients", value.toString());
      setShowArtificialIngredients(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  const handleToggleArtificialColors = async (value) => {
    try {
      await AsyncStorage.setItem("showArtificialColors", value.toString());
      setShowArtificialColors(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  const handleToggleSweeteners = async (value) => {
    try {
      await AsyncStorage.setItem("showSweeteners", value.toString());
      setShowSweeteners(value);
    } catch (error) {
      console.error("Failed to save setting:", error);
    }
  };

  return {
    largeFontDefault,
    showArtificialIngredients,
    showArtificialColors,
    showSweeteners,
    handleToggleLargeFont,
    handleToggleArtificialIngredients,
    handleToggleArtificialColors,
    handleToggleSweeteners,
  };
}
