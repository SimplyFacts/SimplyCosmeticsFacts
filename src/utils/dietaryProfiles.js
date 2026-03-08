// Dietary profile presets for religious and cultural dietary needs
// Each profile maps to specific ingredient alerts from the existing alertPresets

export const DIETARY_PROFILES = [
  {
    key: "halal",
    name: "Halal",
    icon: "☪️",
    color: "#047857",
    backgroundColor: "#ECFDF5",
    description: "Islamic dietary guidelines",
    disclaimer:
      "This is a general guide — please adjust based on your personal practice and scholarly guidance.",
    ingredients: [
      "Pork",
      "Alcohol",
      "Gelatin (Animal)",
      "L-Cysteine",
      "Animal Shortening",
      "Mono & Diglycerides",
      "Glycerin (Animal)",
      "Pepsin",
      "Lipase",
      "Animal Rennet",
      "Carmine",
      "Vanilla Extract (Alcohol-based)",
      "Stearic Acid (Animal)",
    ],
  },
  {
    key: "kosher",
    name: "Kosher",
    icon: "✡️",
    color: "#1D4ED8",
    backgroundColor: "#EFF6FF",
    description: "Jewish dietary laws",
    disclaimer:
      "This is a general guide — consult your rabbi for specific rulings on individual ingredients.",
    ingredients: [
      "Pork",
      "Shellfish",
      "Gelatin (Animal)",
      "Animal Rennet",
      "Carmine",
      "L-Cysteine",
      "Glycerin (Animal)",
      "Mono & Diglycerides",
      "Stearic Acid (Animal)",
      "Lard",
      "Tallow",
      "Isinglass",
    ],
  },
  {
    key: "hindu",
    name: "Hindu Vegetarian",
    icon: "🙏",
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    description: "Hindu vegetarian dietary practice",
    disclaimer:
      "This is a general guide — dietary practices vary by tradition and personal observance.",
    ingredients: [
      "Beef",
      "Pork",
      "Gelatin (Animal)",
      "Animal Rennet",
      "Animal Shortening",
      "Lard",
      "Tallow",
      "L-Cysteine",
      "Pepsin",
      "Lipase",
      "Carmine",
      "Glycerin (Animal)",
      "Mono & Diglycerides",
      "Stearic Acid (Animal)",
      "Isinglass",
    ],
  },
  {
    key: "jain",
    name: "Jain",
    icon: "☸️",
    color: "#B45309",
    backgroundColor: "#FFFBEB",
    description: "Jain dietary principles",
    disclaimer:
      "This is a general guide — Jain dietary rules also restrict root vegetables and fermented foods, which are less common as processed additives.",
    ingredients: [
      "Beef",
      "Pork",
      "Gelatin (Animal)",
      "Animal Rennet",
      "Animal Shortening",
      "Lard",
      "Tallow",
      "L-Cysteine",
      "Pepsin",
      "Lipase",
      "Carmine",
      "Glycerin (Animal)",
      "Mono & Diglycerides",
      "Stearic Acid (Animal)",
      "Isinglass",
      "Honey",
      "Alcohol",
      "Eggs",
    ],
  },
  {
    key: "buddhist",
    name: "Buddhist Vegetarian",
    icon: "🪷",
    color: "#7C3AED",
    backgroundColor: "#F5F3FF",
    description: "Buddhist vegetarian dietary practice",
    disclaimer:
      "This is a general guide — practices vary across Buddhist traditions.",
    ingredients: [
      "Pork",
      "Beef",
      "Gelatin (Animal)",
      "Animal Rennet",
      "Animal Shortening",
      "Lard",
      "Tallow",
      "L-Cysteine",
      "Carmine",
      "Pepsin",
      "Lipase",
      "Glycerin (Animal)",
      "Isinglass",
    ],
  },
];

// Get a profile by key
export function getProfileByKey(key) {
  return DIETARY_PROFILES.find((p) => p.key === key) || null;
}

// Get ingredients that still need to be added (not already in alerts)
export function getNewIngredients(profile, existingAlerts) {
  const existingNames = new Set(
    existingAlerts.map((a) => a.ingredient_name.toLowerCase().trim()),
  );
  return profile.ingredients.filter(
    (name) => !existingNames.has(name.toLowerCase().trim()),
  );
}
