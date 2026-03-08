import { View } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  parseIngredients,
  cleanIngredientForAlert,
} from "@/utils/ingredientUtils";
import {
  detectIngredientCategory,
  hasAlert,
  matchesProductAllergen,
} from "@/utils/ingredientCategoryDetection";
import { IngredientItem } from "./IngredientItem";
import { IngredientsInstructionBox } from "./IngredientsInstructionBox";
import { NoIngredientsWarning } from "./NoIngredientsWarning";
import { AddAlertModal } from "./AddAlertModal";
import { RemoveAlertModal } from "./RemoveAlertModal";

const FIRST_EXPAND_KEY = "ingredients_first_expand_done";

export function FullIngredientsSection({
  ingredients,
  parsedIngredients = [], // Pre-parsed ingredients from useProduct hook
  fontSize = "medium",
  barcode,
  updatedAt,
  alerts = [],
  allergens = [],
  onAddAlert,
  onRemoveAlert,
}) {
  const fonts = getFontSizes(fontSize);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [detectedCategory, setDetectedCategory] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoExpand, setAutoExpand] = useState(undefined);

  // Check if this is the user's first time viewing ingredients
  useEffect(() => {
    checkFirstExpand();
  }, []);

  const checkFirstExpand = async () => {
    try {
      const done = await AsyncStorage.getItem(FIRST_EXPAND_KEY);
      if (!done) {
        setAutoExpand(true);
        await AsyncStorage.setItem(FIRST_EXPAND_KEY, "true");
      }
    } catch {
      // Ignore storage errors
    }
  };

  const handleIngredientPress = (ingredient) => {
    const alert = hasAlert(ingredient, alerts);

    if (alert) {
      // Ingredient already has an alert, show remove confirmation
      setSelectedIngredient(ingredient);
      setSelectedAlert(alert);
      setShowRemoveModal(true);
    } else {
      // No alert, detect category and show add confirmation
      const cleanedIngredient = cleanIngredientForAlert(ingredient);
      const category = detectIngredientCategory(cleanedIngredient);

      setSelectedIngredient(ingredient);
      setDetectedCategory(category);
      setShowAddModal(true);
    }
  };

  const confirmAddSpecificAlert = async () => {
    if (!selectedIngredient) return;

    setIsProcessing(true);
    try {
      const cleanedName = cleanIngredientForAlert(selectedIngredient);
      await onAddAlert(cleanedName);
      setShowAddModal(false);
      setSelectedIngredient(null);
      setDetectedCategory(null);
    } catch (error) {
      console.error("Failed to add alert:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmAddCategoryAlert = async () => {
    if (!detectedCategory) return;

    setIsProcessing(true);
    try {
      await onAddAlert(detectedCategory.alertName);
      setShowAddModal(false);
      setSelectedIngredient(null);
      setDetectedCategory(null);
    } catch (error) {
      console.error("Failed to add category alert:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmRemoveAlert = async () => {
    if (!selectedAlert) return;

    setIsProcessing(true);
    try {
      await onRemoveAlert(selectedAlert.id);
      setShowRemoveModal(false);
      setSelectedAlert(null);
      setSelectedIngredient(null);
    } catch (error) {
      console.error("Failed to remove alert:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelAddAlert = () => {
    setShowAddModal(false);
    setSelectedIngredient(null);
    setDetectedCategory(null);
  };

  const cancelRemoveAlert = () => {
    setShowRemoveModal(false);
    setSelectedAlert(null);
    setSelectedIngredient(null);
  };

  const hasIngredients = ingredients && ingredients.trim().length > 0;

  // Check if there are any flagged ingredients
  const hasAnyAlerts = parsedIngredients.some((ing) => hasAlert(ing, alerts));
  const hasAnyAllergens = parsedIngredients.some((ing) =>
    matchesProductAllergen(ing, allergens),
  );

  return (
    <View style={{ marginBottom: 4, paddingHorizontal: 24 }}>
      <View
        style={{
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        }}
      >
        <CollapsibleSection
          title="Full Ingredients List"
          fontSize={fontSize}
          defaultExpanded={false}
          expandedOverride={autoExpand}
          badgeColor="#14B8A6"
          badgeTextColor="#fff"
        >
          {hasIngredients ? (
            <>
              <IngredientsInstructionBox
                hasAnyAlerts={hasAnyAlerts}
                hasAnyAllergens={hasAnyAllergens}
                fontSize={fonts.bodyText}
              />

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {parsedIngredients.map((ingredient, index) => {
                  const alert = hasAlert(ingredient, alerts);
                  const isAllergen = matchesProductAllergen(
                    ingredient,
                    allergens,
                  );

                  return (
                    <IngredientItem
                      key={index}
                      ingredient={ingredient}
                      alert={alert}
                      isAllergen={isAllergen}
                      fontSize={fonts.ingredientsText}
                      onPress={() => handleIngredientPress(ingredient)}
                    />
                  );
                })}
              </View>
            </>
          ) : (
            <NoIngredientsWarning
              barcode={barcode}
              updatedAt={updatedAt}
              fontSize={fonts.bodyText}
            />
          )}
        </CollapsibleSection>
      </View>

      <AddAlertModal
        visible={showAddModal}
        selectedIngredient={selectedIngredient}
        detectedCategory={detectedCategory}
        isProcessing={isProcessing}
        onConfirmSpecific={confirmAddSpecificAlert}
        onConfirmCategory={confirmAddCategoryAlert}
        onCancel={cancelAddAlert}
      />

      <RemoveAlertModal
        visible={showRemoveModal}
        selectedAlert={selectedAlert}
        isProcessing={isProcessing}
        onConfirm={confirmRemoveAlert}
        onCancel={cancelRemoveAlert}
      />
    </View>
  );
}
