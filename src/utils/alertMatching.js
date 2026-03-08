import {
  getArtificialSweeteners,
  ADDITIVE_CATEGORIES,
} from "./additiveCategories";

// Check for whole-word matches to avoid partial hits
// e.g. "corn" should NOT match "acorn" or "unicorn"
function matchesWholeWord(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `(?:^|[\\s,;()\\[\\]/\\-])${escaped}(?:$|[\\s,;()\\[\\]/\\-])`,
    "i",
  );
  return regex.test(text);
}

export function matchAlerts(alerts, ingredientsText, product) {
  // Use Open Food Facts additives_tags for more comprehensive sweetener detection
  const artificialSweetenersFound = getArtificialSweeteners(
    product.additives_tags || [],
  );

  // Get all allergen data for matching
  const allergens = product.allergens || [];
  const traces = product.traces || [];
  const allAllergenTags = [...allergens, ...traces].map((a) => a.toLowerCase());

  return alerts.filter((alert) => {
    const alertName = alert.ingredient_name.toLowerCase();

    // Special case: if user has an alert for "artificial sweeteners"
    if (
      alertName === "artificial sweeteners" ||
      alertName === "artificial sweetener"
    ) {
      return artificialSweetenersFound.length > 0;
    }

    // Special case: category-wide alerts (e.g., "dairy products", "tree nuts", etc.)
    const categoryMapping = {
      "dairy products": "dairy",
      dairy: "dairy",
      "tree nuts": "treeNuts",
      peanuts: "peanuts",
      peanut: "peanuts",
      gluten: "gluten",
      "gluten/wheat": "gluten",
      shellfish: "shellfish",
      fish: "fish",
      eggs: "eggs",
      egg: "eggs",
      soy: "soy",
      corn: "corn",
      "artificial colors": "colors",
      "artificial color": "colors",
      preservatives: "preservatives",
      preservative: "preservatives",
      "flavor enhancers": "flavorEnhancers",
      "flavor enhancer": "flavorEnhancers",
    };

    const categoryKey = categoryMapping[alertName];

    if (categoryKey && ADDITIVE_CATEGORIES[categoryKey]) {
      // Check if any ingredient in the category is present
      const normalizedIngredients = ingredientsText.toLowerCase();
      // ADDITIVE_CATEGORIES values are Sets, so we need to iterate properly
      for (const ingredient of Array.from(ADDITIVE_CATEGORIES[categoryKey])) {
        if (matchesWholeWord(normalizedIngredients, ingredient)) {
          return true;
        }
      }
    }

    // Check if alert matches any allergen or trace (both direct and cross-contamination)
    const matchesAllergen = allAllergenTags.some(
      (tag) =>
        tag.includes(alertName) || alertName.includes(tag.replace("en:", "")),
    );

    if (matchesAllergen) {
      return true;
    }

    // Regular ingredient text matching (whole-word only)
    return matchesWholeWord(ingredientsText, alertName);
  });
}
