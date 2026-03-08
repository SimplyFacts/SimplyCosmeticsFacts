import { View, Text } from "react-native";
import { NutritionRow } from "./NutritionRow";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function NutritionalInfoSection({
  nutritionalInfo,
  fontSize = "medium",
}) {
  const fonts = getFontSizes(fontSize);

  // Check if we have any nutrition data
  const hasNutritionData = Object.keys(nutritionalInfo).some(
    (key) =>
      nutritionalInfo[key] !== null && nutritionalInfo[key] !== undefined,
  );

  if (!hasNutritionData) {
    return null;
  }

  return (
    <CollapsibleSection
      title="Nutritional Information"
      fontSize={fontSize}
      defaultExpanded={false}
      icon="🥗"
      backgroundColor="#F0FDF4"
      color="#10B981"
    >
      <View
        style={{
          backgroundColor: "#F9FAFB",
          borderRadius: 12,
          padding: 16,
        }}
      >
        {nutritionalInfo.energy_kcal && (
          <NutritionRow
            label="Energy"
            value={`${Math.round(nutritionalInfo.energy_kcal)} kcal`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.fat && (
          <NutritionRow
            label="Fat"
            value={`${Math.round(nutritionalInfo.fat)}g`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.saturated_fat && (
          <NutritionRow
            label="Saturated Fat"
            value={`${Math.round(nutritionalInfo.saturated_fat)}g`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.carbohydrates && (
          <NutritionRow
            label="Carbohydrates"
            value={`${Math.round(nutritionalInfo.carbohydrates)}g`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.sugars && (
          <NutritionRow
            label="Sugars"
            value={`${Math.round(nutritionalInfo.sugars)}g`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.fiber && (
          <NutritionRow
            label="Fiber"
            value={`${Math.round(nutritionalInfo.fiber)}g`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.proteins && (
          <NutritionRow
            label="Proteins"
            value={`${Math.round(nutritionalInfo.proteins)}g`}
            fontSize={fontSize}
          />
        )}
        {nutritionalInfo.salt && (
          <NutritionRow
            label="Salt"
            value={`${Math.round(nutritionalInfo.salt)}g`}
            fontSize={fontSize}
          />
        )}
      </View>
    </CollapsibleSection>
  );
}
