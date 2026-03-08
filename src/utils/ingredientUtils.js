// Parse ingredients text into individual items
export function parseIngredients(ingredientsText) {
  if (!ingredientsText || typeof ingredientsText !== "string") return [];

  // Split by comma and clean up
  return ingredientsText
    .split(",")
    .map((ingredient) => {
      // Remove parenthetical content for cleaner display but keep the full text
      const cleaned = ingredient.trim();
      return cleaned;
    })
    .filter((ingredient) => ingredient.length > 0);
}

// Clean ingredient name for alert creation (remove percentage, parentheses, etc)
export function cleanIngredientForAlert(ingredient) {
  // Remove percentage indicators like "20%"
  let cleaned = ingredient.replace(/\d+\.?\d*\s*%/g, "").trim();

  // Remove content in parentheses
  cleaned = cleaned.replace(/\([^)]*\)/g, "").trim();

  // Remove trailing punctuation
  cleaned = cleaned.replace(/[.,;:]$/, "").trim();

  return cleaned;
}

// Format date string
export function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
