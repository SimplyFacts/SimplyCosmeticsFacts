import AsyncStorage from "@react-native-async-storage/async-storage";
import { scaleFont } from "./responsiveScale";

export async function loadFontSizePreference() {
  try {
    const fontSizeValue = await AsyncStorage.getItem("fontSizePreference");
    // Default to medium if no preference stored
    return fontSizeValue || "medium";
  } catch (error) {
    console.error("Failed to load font size preference:", error);
    return "medium";
  }
}

export async function saveFontSizePreference(value) {
  try {
    await AsyncStorage.setItem("fontSizePreference", value);
  } catch (error) {
    console.error("Failed to save font size preference:", error);
  }
}

// Helper function to get the next font size in cycle
export function getNextFontSize(currentSize) {
  const sizes = ["small", "medium", "large"];
  const currentIndex = sizes.indexOf(currentSize);
  const nextIndex = (currentIndex + 1) % sizes.length;
  return sizes[nextIndex];
}

// Helper function to get font sizes for different elements
export function getFontSizes(fontSize) {
  const fontConfig = {
    small: {
      productName: scaleFont(28),
      sectionHeader: scaleFont(18),
      alertTitle: scaleFont(18),
      alertBody: scaleFont(14),
      tagText: scaleFont(12),
      bodyText: scaleFont(14),
      nutritionText: scaleFont(14),
      ingredientsText: scaleFont(14),
      noneListedText: scaleFont(14),
    },
    medium: {
      productName: scaleFont(32),
      sectionHeader: scaleFont(20),
      alertTitle: scaleFont(20),
      alertBody: scaleFont(16),
      tagText: scaleFont(14),
      bodyText: scaleFont(16),
      nutritionText: scaleFont(16),
      ingredientsText: scaleFont(16),
      noneListedText: scaleFont(16),
    },
    large: {
      productName: scaleFont(36),
      sectionHeader: scaleFont(22),
      alertTitle: scaleFont(22),
      alertBody: scaleFont(18),
      tagText: scaleFont(16),
      bodyText: scaleFont(18),
      nutritionText: scaleFont(18),
      ingredientsText: scaleFont(18),
      noneListedText: scaleFont(18),
    },
  };

  return fontConfig[fontSize] || fontConfig.medium;
}
