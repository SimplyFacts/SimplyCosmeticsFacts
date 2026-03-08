// Match ingredients from product data against our database
import { getAllIngredients } from "./ingredientDatabase";
import {
  normalizeIngredient,
  parseIngredients,
  containsKeywords,
} from "./ingredientParser";

// OPTIMIZATION: Cache ingredient database at module level
const CACHED_INGREDIENTS = getAllIngredients();

/**
 * Match a single ingredient text against the database
 * Returns match details or null
 */
export function matchIngredient(ingredientText, allIngredients = null) {
  if (!ingredientText) return null;

  const ingredients = allIngredients || CACHED_INGREDIENTS;
  const normalized = normalizeIngredient(ingredientText);

  // Try to find a match
  for (const item of ingredients) {
    if (containsKeywords(normalized, item.names)) {
      return {
        matched: true,
        original: ingredientText,
        displayName: item.displayName,
        type: item.type, // 'sweetener', 'color', or 'artificial'
        subtype: item.subtype, // 'artificial', 'natural', 'sugarAlcohol', etc.
        source: "ingredients",
      };
    }
  }

  return null;
}

/**
 * Detect all ingredients from product data
 * Combines multiple sources: ingredients text, additives_tags, etc.
 */
export function detectAllIngredients(product) {
  if (!product) return {};

  const detected = {
    sweeteners: [], // ALL sweeteners (artificial, natural, sugar alcohols)
    artificialColors: [], // Only artificial colors
    artificialIngredients: [], // Only artificial ingredients (preservatives, emulsifiers, etc.)
  };

  // Track what we've already found to avoid duplicates
  const found = new Set();

  const addMatch = (match) => {
    if (!match || !match.matched) return;

    // Create unique key
    const key = `${match.type}-${match.displayName}`;
    if (found.has(key)) return;
    found.add(key);

    // Add to appropriate category based on type
    if (match.type === "sweetener") {
      // All sweeteners go here (artificial, natural, sugar alcohols)
      detected.sweeteners.push(match);
    } else if (match.type === "color" && match.subtype !== "natural") {
      // Only artificial colors go here
      detected.artificialColors.push(match);
    } else if (match.type === "artificial") {
      // Artificial ingredients (preservatives, emulsifiers, flavor enhancers, thickeners)
      detected.artificialIngredients.push(match);
    }
    // Natural colors are not added to any category (they exist in DB for reference only)
  };

  // Source 1: Parse full ingredients text
  if (product.ingredients) {
    const parsedIngredients = parseIngredients(product.ingredients);
    parsedIngredients.forEach((ingredient) => {
      const match = matchIngredient(ingredient, CACHED_INGREDIENTS);
      if (match) {
        addMatch({ ...match, source: "ingredients" });
      }
    });
  }

  // Source 2: Check additives_tags from Open Food Facts
  if (product.additives_tags && Array.isArray(product.additives_tags)) {
    product.additives_tags.forEach((tag) => {
      const match = matchIngredient(tag, CACHED_INGREDIENTS);
      if (match) {
        addMatch({ ...match, source: "additives_tags" });
      }
    });
  }

  // Source 3: Check ingredients_analysis_tags
  if (
    product.ingredients_analysis_tags &&
    Array.isArray(product.ingredients_analysis_tags)
  ) {
    product.ingredients_analysis_tags.forEach((tag) => {
      const match = matchIngredient(tag, CACHED_INGREDIENTS);
      if (match) {
        addMatch({ ...match, source: "ingredients_analysis_tags" });
      }
    });
  }

  return detected;
}

/**
 * Get ALL sweeteners (artificial, natural, sugar alcohols) for the Sweeteners section
 */
export function getAllProductSweeteners(product) {
  const detected = detectAllIngredients(product);
  return detected.sweeteners || [];
}

/**
 * Get artificial colors for the Artificial Colors section
 */
export function getArtificialColors(product) {
  const detected = detectAllIngredients(product);
  return detected.artificialColors || [];
}

/**
 * Get artificial ingredients (preservatives, emulsifiers, etc.) for the Artificial Ingredients section
 */
export function getOtherArtificialIngredients(product) {
  const detected = detectAllIngredients(product);
  return detected.artificialIngredients || [];
}

/**
 * Check if product contains any sweeteners
 */
export function hasSweeteners(product) {
  return getAllProductSweeteners(product).length > 0;
}

/**
 * Check if product contains any artificial colors
 */
export function hasArtificialColors(product) {
  return getArtificialColors(product).length > 0;
}

/**
 * Get summary of all detected ingredients
 */
export function getIngredientsSummary(product) {
  const detected = detectAllIngredients(product);

  return {
    sweeteners: detected.sweeteners.length,
    artificialColors: detected.artificialColors.length,
    artificialIngredients: detected.artificialIngredients.length,
    total:
      detected.sweeteners.length +
      detected.artificialColors.length +
      detected.artificialIngredients.length,
  };
}
