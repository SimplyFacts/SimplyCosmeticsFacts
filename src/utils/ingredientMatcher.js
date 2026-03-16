// Match ingredients from product data against our database
import { getAllIngredients } from "./ingredientDatabase";
import {
  normalizeIngredient,
  parseIngredients,
  containsKeywords,
} from "./ingredientParser";
import {
  detectSyntheticFragrances,
  detectParabens,
  detectPFAS,
  detectSulfates,
} from "./ingredientDetection";

// OBF taxonomy IDs for each cosmetics category
const SYNTHETIC_FRAGRANCE_IDS = new Set([
  "en:parfum", "en:fragrance", "en:linalool", "en:limonene", "en:geraniol",
  "en:eugenol", "en:amyl-cinnamal", "en:cinnamal", "en:coumarin",
  "en:benzyl-alcohol", "en:benzyl-benzoate", "en:benzyl-cinnamate",
  "en:benzyl-salicylate", "en:cinnamyl-alcohol", "en:hydroxycitronellal",
  "en:isoeugenol", "en:citronellol", "en:citral", "en:farnesol",
  "en:hexyl-cinnamal", "en:alpha-isomethyl-ionone", "en:anise-alcohol",
  "en:methyl-2-octynoate", "en:lilial", "en:lyral",
]);

const PARABEN_IDS = new Set([
  "en:methylparaben", "en:ethylparaben", "en:propylparaben",
  "en:butylparaben", "en:isobutylparaben", "en:isopropylparaben",
  "en:benzylparaben", "en:heptylparaben",
]);

const PFAS_IDS = new Set([
  "en:ptfe", "en:polytetrafluoroethylene", "en:perfluorooctanoic-acid",
  "en:perfluorooctane-sulfonate", "en:fluoropolymer",
]);

const SULFATE_IDS = new Set([
  "en:sodium-lauryl-sulfate", "en:sodium-laureth-sulfate",
  "en:ammonium-lauryl-sulfate", "en:ammonium-laureth-sulfate",
  "en:sodium-myreth-sulfate", "en:sodium-coco-sulfate",
  "en:tea-lauryl-sulfate", "en:lauryl-sulfate",
  "en:sodium-cetearyl-sulfate", "en:sodium-pareth-sulfate",
]);

// Convert a taxonomy ID to a display name: 'en:sodium-lauryl-sulfate' → 'Sodium Lauryl Sulfate'
function taxonomyIdToDisplayName(id) {
  return id
    .replace(/^[a-z]+:/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Match taxonomy IDs against a set, return display names
function detectByTaxonomyIds(ingredientsTags, idSet) {
  if (!Array.isArray(ingredientsTags) || ingredientsTags.length === 0) return [];
  const seen = new Set();
  const results = [];
  for (const tag of ingredientsTags) {
    if (idSet.has(tag) && !seen.has(tag)) {
      seen.add(tag);
      results.push({ displayName: taxonomyIdToDisplayName(tag) });
    }
  }
  return results;
}

// Merge taxonomy results with regex fallback, deduplicating by normalized display name
function mergeWithFallback(taxonomyResults, regexNames) {
  const seen = new Set(
    taxonomyResults.map((r) => r.displayName.toLowerCase())
  );
  const merged = [...taxonomyResults];
  for (const name of regexNames) {
    if (!seen.has(name.toLowerCase())) {
      seen.add(name.toLowerCase());
      merged.push({ displayName: name });
    }
  }
  return merged;
}

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
    syntheticFragrances: [],
    parabens: [],
    pfas: [],
    sulfates: [],
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

  // Source 2: Check additives_tags from Open Beauty Facts
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

  // Source 4: Taxonomy ID matching (precise) with regex fallback for unrecognized ingredients
  const ingredientsTags = product.ingredients_tags || [];
  const text = product.ingredients || "";

  detected.syntheticFragrances = mergeWithFallback(
    detectByTaxonomyIds(ingredientsTags, SYNTHETIC_FRAGRANCE_IDS),
    detectSyntheticFragrances(text),
  );
  detected.parabens = mergeWithFallback(
    detectByTaxonomyIds(ingredientsTags, PARABEN_IDS),
    detectParabens(text),
  );
  detected.pfas = mergeWithFallback(
    detectByTaxonomyIds(ingredientsTags, PFAS_IDS),
    detectPFAS(text),
  );
  detected.sulfates = mergeWithFallback(
    detectByTaxonomyIds(ingredientsTags, SULFATE_IDS),
    detectSulfates(text),
  );

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
