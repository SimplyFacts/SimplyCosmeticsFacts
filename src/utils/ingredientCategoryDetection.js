import { resolveAlertVariations, COSMETIC_CATEGORIES, COSMETIC_ALERT_CATEGORY_MAPPING, COSMETIC_CATEGORY_LABELS } from "./cosmeticCategories";

// Detect which cosmetic category an ingredient belongs to
export function detectIngredientCategory(ingredientName) {
  if (!ingredientName) return null;

  const normalized = ingredientName.toLowerCase().trim();

  for (const [categoryKey, categorySet] of Object.entries(COSMETIC_CATEGORIES)) {
    if (categorySet.has(normalized)) {
      return COSMETIC_CATEGORY_LABELS[categoryKey] || null;
    }
  }

  return null;
}

// Check if ingredient matches any of the product's allergens
export function matchesProductAllergen(ingredient, allergens) {
  if (!allergens || allergens.length === 0 || !ingredient) return false;

  const normalizedIngredient = ingredient
    .toLowerCase()
    .trim()
    .replace(/\([^)]*\)/g, "")
    .replace(/\d+\.?\d*\s*%/g, "")
    .trim();

  for (const allergen of allergens) {
    const normalized = allergen.toLowerCase().replace("en:", "").trim();
    if (
      normalizedIngredient.includes(normalized) ||
      normalized.includes(normalizedIngredient)
    ) {
      return true;
    }
  }

  return false;
}

// Check if an ingredient has a matching alert
// Uses resolveAlertVariations so preset names like "Fragrance / Parfum"
// correctly match "fragrance" or "parfum" in the ingredients list
export function hasAlert(ingredient, alerts) {
  if (!alerts || !ingredient) return null;

  const normalizedIngredient = ingredient
    .toLowerCase()
    .trim()
    .replace(/\([^)]*\)/g, "")
    .replace(/\d+\.?\d*\s*%/g, "")
    .trim();

  return alerts.find((alert) => {
    const alertName = alert.ingredient_name.toLowerCase().trim();

    // Resolve all variations for this alert name
    const variations = resolveAlertVariations(alertName);
    for (const variation of variations) {
      const normalizedVariation = variation.toLowerCase().trim();
      const escapedVariation = normalizedVariation.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const escapedIngredient = normalizedIngredient.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const variationInIngredient = new RegExp(`\\b${escapedVariation}\\b`).test(normalizedIngredient);
      const ingredientInVariation = new RegExp(`\\b${escapedIngredient}\\b`).test(normalizedVariation);
      if (variationInIngredient || ingredientInVariation) {
        return true;
      }
    }

    // Check cosmetic category mapping
    // e.g. alert for "Parabens" category matches any paraben ingredient
    const categoryKey = COSMETIC_ALERT_CATEGORY_MAPPING[alertName];
    if (categoryKey && COSMETIC_CATEGORIES[categoryKey]) {
      const category = COSMETIC_CATEGORIES[categoryKey];
      const cleanedIngredient = normalizedIngredient
        .replace(/\([^)]*\)/g, "")
        .replace(/\d+\.?\d*\s*%/g, "")
        .trim();

      if (category.has(cleanedIngredient)) return true;

      const words = cleanedIngredient.split(/\s+/);
      for (const word of words) {
        if (category.has(word)) return true;
      }
    }

    return false;
  });
}
