import {
  getArtificialSweeteners,
  ADDITIVE_CATEGORIES,
} from "./additiveCategories";

// Cache compiled regexes to avoid recreating them on every call
const regexCache = new Map();

// Check for whole-word matches to avoid partial hits
// e.g. "corn" should NOT match "acorn" or "unicorn"
function matchesWholeWord(text, term) {
  let regex = regexCache.get(term);
  if (!regex) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    regex = new RegExp(
      `(?:^|[\\s,;()\\[\\]/\\-])${escaped}(?:$|[\\s,;()\\[\\]/\\-])`,
      "i",
    );
    regexCache.set(term, regex);
  }
  return regex.test(text);
}

// Module-level constant — not recreated on every matchAlerts call
const CATEGORY_MAPPING = {
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

export function matchAlerts(alerts, ingredientsText, product) {
  // Use Open Beauty Facts additives_tags for more comprehensive sweetener detection
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

    const categoryKey = CATEGORY_MAPPING[alertName];

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
