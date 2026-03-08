// Ingredient parsing and normalization utilities

/**
 * Normalize ingredient text for matching
 * Handles variations, punctuation, E-numbers, etc.
 */
export function normalizeIngredient(text) {
  if (!text || typeof text !== "string") return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ") // Multiple spaces → single space
    .replace(/[,;.()[\]]/g, "") // Remove punctuation
    .replace(/\be\s*(\d+[a-z]*)/gi, "e$1") // "E 950" or "E950a" → "e950" or "e950a"
    .replace(/\s*#\s*/g, "#") // "Red # 40" → "red#40"
    .replace(/\bno\.?\s*/gi, "no") // "No. 5" or "No 5" → "no5"
    .replace(/^en:/, "") // Remove "en:" prefix from Open Food Facts tags
    .replace(/-/g, " "); // "acesulfame-k" → "acesulfame k"
}

/**
 * Parse ingredients text into individual items
 * Handles nested ingredients like "Sugar (Glucose, Fructose)"
 */
export function parseIngredients(ingredientsText) {
  if (!ingredientsText || typeof ingredientsText !== "string") {
    return [];
  }

  // First, handle nested ingredients by extracting and flattening them
  let processedText = ingredientsText;
  const nestedMatches = ingredientsText.matchAll(/([^,()]+)\s*\(([^)]+)\)/g);

  for (const match of nestedMatches) {
    const parent = match[1].trim();
    const nested = match[2];
    // Replace "Parent (child1, child2)" with "Parent, child1, child2"
    processedText = processedText.replace(match[0], `${parent}, ${nested}`);
  }

  // Split on common separators
  let items = processedText
    .split(/[,;]|\band\b/gi)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  // Clean up each item
  items = items.map((item) => {
    // Remove remaining parentheses
    item = item.replace(/[()[\]]/g, "").trim();

    // Remove percentage indicators like "2%" or "less than 2% of"
    item = item.replace(/\d+\.?\d*\s*%/g, "").trim();
    item = item.replace(/less than\s+/gi, "").trim();
    item = item.replace(/\bof\s*$/gi, "").trim();

    // Remove "contains" or "may contain" prefixes
    item = item.replace(/^(contains|may contain)\s+/gi, "").trim();

    return item;
  });

  // Filter out empty items and common non-ingredient phrases
  items = items.filter((item) => {
    if (item.length < 2) return false;
    const lower = item.toLowerCase();
    if (lower === "and" || lower === "or") return false;
    if (lower.startsWith("contains") && lower.length < 15) return false;
    return true;
  });

  return items;
}

/**
 * Extract E-numbers from text
 * Returns normalized E-numbers like ["e950", "e955"]
 */
export function extractENumbers(text) {
  if (!text || typeof text !== "string") return [];

  const matches = text.matchAll(/\be\s*(\d+[a-z]*)/gi);
  const eNumbers = [];

  for (const match of matches) {
    eNumbers.push(`e${match[1].toLowerCase()}`);
  }

  return [...new Set(eNumbers)]; // Remove duplicates
}

/**
 * Check if an ingredient contains specific keywords
 * Used for fuzzy matching
 */
export function containsKeywords(ingredient, keywords) {
  if (!ingredient || !keywords || keywords.length === 0) return false;

  const normalized = normalizeIngredient(ingredient);

  return keywords.some((keyword) => {
    const normalizedKeyword = normalizeIngredient(keyword);

    // Exact match
    if (normalized === normalizedKeyword) return true;

    // Contains match for multi-word keywords
    if (normalizedKeyword.includes(" ")) {
      return normalized.includes(normalizedKeyword);
    }

    // Word boundary match for single words
    const regex = new RegExp(`\\b${normalizedKeyword}\\b`, "i");
    return regex.test(normalized);
  });
}

/**
 * Split ingredient into main component and modifiers
 * e.g., "Modified Corn Starch" → { main: "corn starch", modifiers: ["modified"] }
 */
export function splitIngredient(ingredient) {
  const normalized = normalizeIngredient(ingredient);
  const words = normalized.split(" ");

  const modifiers = [];
  const commonModifiers = [
    "modified",
    "enriched",
    "bleached",
    "unbleached",
    "organic",
    "natural",
    "artificial",
    "synthetic",
    "raw",
    "refined",
    "hydrogenated",
    "partially",
    "fully",
  ];

  const mainParts = words.filter((word) => {
    if (commonModifiers.includes(word)) {
      modifiers.push(word);
      return false;
    }
    return true;
  });

  return {
    main: mainParts.join(" "),
    modifiers,
    isModified: modifiers.length > 0,
  };
}

/**
 * Check if a string might be an ingredient vs other text
 * Filters out nutritional facts, headers, etc.
 */
export function looksLikeIngredient(text) {
  if (!text || typeof text !== "string") return false;

  const normalized = text.toLowerCase().trim();

  // Too short
  if (normalized.length < 2) return false;

  // Common non-ingredients
  const nonIngredients = [
    "ingredients",
    "contains",
    "allergens",
    "nutrition facts",
    "serving size",
    "servings per container",
    "amount per serving",
    "calories",
    "total fat",
    "saturated fat",
    "trans fat",
    "cholesterol",
    "sodium",
    "total carbohydrate",
    "dietary fiber",
    "sugars",
    "protein",
    "vitamin",
    "calcium",
    "iron",
    "may contain",
    "manufactured in",
    "produced in",
  ];

  for (const nonIng of nonIngredients) {
    if (normalized.includes(nonIng)) return false;
  }

  // Probably an ingredient
  return true;
}
