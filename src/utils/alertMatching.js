import { resolveAlertVariations, COSMETIC_CATEGORIES, COSMETIC_ALERT_CATEGORY_MAPPING } from "./cosmeticCategories";

// Cache compiled regexes to avoid recreating them on every call
const regexCache = new Map();

// Check for whole-word matches to avoid partial hits
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

export function matchAlerts(alerts, ingredientsText, product, detectedIngredients = null) {
  // Get all allergen data for matching
  const allergens = product.allergens || [];
  const traces = product.traces || [];
  const allAllergenTags = [...allergens, ...traces].map((a) => a.toLowerCase());

  // Build a flat set of all detected ingredient display names from pre-computed results
  // This allows alert matching to leverage detection already done by ingredientMatcher.js
  const detectedDisplayNames = new Set();
  if (detectedIngredients) {
    const categories = [
      "syntheticFragrances",
      "parabens",
      "pfas",
      "sulfates",
      "artificialColors",
      "artificialIngredients",
    ];
    for (const category of categories) {
      for (const item of detectedIngredients[category] || []) {
        if (item.displayName) {
          detectedDisplayNames.add(item.displayName.toLowerCase());
        }
      }
    }
  }

  return alerts.filter((alert) => {
    const alertName = alert.ingredient_name.toLowerCase().trim();

    // 1. Check against pre-computed detected ingredients
    // This covers all auto-detected categories with their full taxonomy matching
    if (detectedDisplayNames.size > 0) {
      if (detectedDisplayNames.has(alertName)) return true;
      for (const name of detectedDisplayNames) {
        if (name.includes(alertName) || alertName.includes(name)) return true;
      }
    }

    // 2. Check cosmetic category mapping
    // e.g. "Fragrance / Parfum" -> syntheticFragrances category set
    const categoryKey = COSMETIC_ALERT_CATEGORY_MAPPING[alertName];
    if (categoryKey && COSMETIC_CATEGORIES[categoryKey]) {
      const normalizedIngredients = ingredientsText.toLowerCase();
      for (const ingredient of COSMETIC_CATEGORIES[categoryKey]) {
        if (matchesWholeWord(normalizedIngredients, ingredient)) return true;
      }
    }

    // 3. Check preset variations
    // e.g. "BHA (Butylated Hydroxyanisole)" -> ["butylated hydroxyanisole", "BHA", ...]
    const variations = resolveAlertVariations(alertName);
    const normalizedIngredients = ingredientsText.toLowerCase();
    for (const variation of variations) {
      if (matchesWholeWord(normalizedIngredients, variation)) return true;
    }

    // 4. Check allergen tags from Open Beauty Facts
    const matchesAllergen = allAllergenTags.some(
      (tag) =>
        tag.includes(alertName) || alertName.includes(tag.replace("en:", "")),
    );
    if (matchesAllergen) return true;

    // 5. Direct whole-word match as final fallback (for custom alerts)
    return matchesWholeWord(normalizedIngredients, alertName);
  });
}
