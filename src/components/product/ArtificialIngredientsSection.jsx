import { View } from "react-native";
import { IngredientTagList } from "./IngredientTagList";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function ArtificialIngredientsSection({
  ingredients,
  fontSize = "medium",
}) {
  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="Other Artificial Ingredients"
      count={ingredients?.length || 0}
      fontSize={fontSize}
      badgeColor="#F97316"
      badgeTextColor="#fff"
      icon="⚗️"
      backgroundColor="#FFF7ED"
      color="#F97316"
    >
      {ingredients && ingredients.length > 0 && (
        <IngredientTagList
          items={ingredients}
          fontSize={fontSize}
          backgroundColor="#FEF9E7"
          borderColor="#FCD34D"
          textColor="#B45309"
        />
      )}
    </CollapsibleSection>
  );
}
