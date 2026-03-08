import {
  ADDITIVE_CATEGORIES,
  CATEGORY_LABELS,
  ALLERGEN_TO_CATEGORY_MAP,
  ALERT_CATEGORY_MAPPING,
} from "./ingredientCategories";

// Detect which category an ingredient belongs to
export function detectIngredientCategory(ingredientName) {
  if (!ingredientName) return null;

  const normalized = ingredientName.toLowerCase().trim();

  // Check if it matches any category
  for (const [categoryKey, categorySet] of Object.entries(
    ADDITIVE_CATEGORIES,
  )) {
    // Check direct match or with "en:" prefix
    if (categorySet.has(normalized) || categorySet.has(`en:${normalized}`)) {
      return CATEGORY_LABELS[categoryKey];
    }
  }

  return null;
}

// Map allergen tags (from product data) to category keys
export function getAllergenCategory(allergenTag) {
  if (!allergenTag) return null;

  const normalized = allergenTag.toLowerCase().replace("en:", "").trim();
  return ALLERGEN_TO_CATEGORY_MAP[normalized] || null;
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

  // Check each allergen from the product
  for (const allergen of allergens) {
    const categoryKey = getAllergenCategory(allergen);
    if (!categoryKey) continue;

    const categorySet = ADDITIVE_CATEGORIES[categoryKey];
    if (!categorySet) continue;

    // Check if ingredient matches this category
    if (
      categorySet.has(normalizedIngredient) ||
      categorySet.has(`en:${normalizedIngredient}`)
    ) {
      return true;
    }

    // Check individual words in the ingredient
    const words = normalizedIngredient.split(/\s+/);
    for (const word of words) {
      if (categorySet.has(word) || categorySet.has(`en:${word}`)) {
        return true;
      }
    }
  }

  return false;
}

// Check if an ingredient has an alert
export function hasAlert(ingredient, alerts) {
  if (!alerts || !ingredient) return null;

  const normalizedIngredient = ingredient.toLowerCase().trim();

  return alerts.find((alert) => {
    const alertName = alert.ingredient_name.toLowerCase().trim();

    // Only match if the ingredient contains the alert name (not bidirectional)
    if (normalizedIngredient.includes(alertName)) {
      return true;
    }

    // Check if this alert is for a category
    const categoryKey = ALERT_CATEGORY_MAPPING[alertName];
    if (categoryKey && ADDITIVE_CATEGORIES[categoryKey]) {
      // Check if this ingredient is in the category
      const category = ADDITIVE_CATEGORIES[categoryKey];

      // Remove content in parentheses and percentages for better matching
      const cleanedIngredient = normalizedIngredient
        .replace(/\([^)]*\)/g, "")
        .replace(/\d+\.?\d*\s*%/g, "")
        .trim();

      // Check if ingredient or any part of it matches category
      if (
        category.has(cleanedIngredient) ||
        category.has(`en:${cleanedIngredient}`)
      ) {
        return true;
      }

      // Also check individual words in case of multi-word ingredients
      const words = cleanedIngredient.split(/\s+/);
      for (const word of words) {
        if (category.has(word) || category.has(`en:${word}`)) {
          return true;
        }
      }
    }

    return false;
  });
}
