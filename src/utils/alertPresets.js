// Comprehensive list of preset alerts organized by category
export const ALERT_PRESETS = {
  allergens: {
    title: "Common Allergens",
    icon: "🥜",
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    items: [
      {
        name: "Peanuts",
        variations: ["peanut", "peanut oil", "peanut butter", "peanut flour"],
      },
      {
        name: "Tree Nuts",
        variations: [
          "almond",
          "cashew",
          "walnut",
          "pecan",
          "hazelnut",
          "pistachio",
          "macadamia",
        ],
      },
      {
        name: "Milk",
        variations: [
          "dairy",
          "lactose",
          "whey",
          "casein",
          "butter",
          "cream",
          "cheese",
        ],
      },
      { name: "Eggs", variations: ["egg", "albumin", "egg white", "egg yolk"] },
      {
        name: "Soy",
        variations: [
          "soybean",
          "soy protein",
          "soy lecithin",
          "tofu",
          "edamame",
        ],
      },
      {
        name: "Wheat",
        variations: ["wheat flour", "wheat gluten", "wheat starch"],
      },
      {
        name: "Gluten",
        variations: ["wheat", "barley", "rye", "malt", "spelt"],
      },
      {
        name: "Fish",
        variations: ["salmon", "tuna", "cod", "halibut", "fish oil"],
      },
      {
        name: "Shellfish",
        variations: ["shrimp", "crab", "lobster", "clam", "oyster", "mussel"],
      },
      { name: "Sesame", variations: ["sesame seed", "sesame oil", "tahini"] },
      { name: "Mustard", variations: ["mustard seed", "mustard powder"] },
      { name: "Celery", variations: ["celery seed", "celeriac"] },
      { name: "Lupin", variations: ["lupin flour", "lupin protein"] },
      {
        name: "Sulfites",
        variations: ["sulfur dioxide", "sodium sulfite", "potassium bisulfite"],
      },
    ],
  },

  sweeteners: {
    title: "Sweeteners",
    icon: "🍬",
    color: "#9333EA",
    backgroundColor: "#FAF5FF",
    items: [
      { name: "Aspartame", variations: ["E951"] },
      { name: "Sucralose", variations: ["E955", "splenda"] },
      { name: "Saccharin", variations: ["E954"] },
      { name: "Acesulfame K", variations: ["E950", "acesulfame potassium"] },
      { name: "Neotame", variations: ["E961"] },
      { name: "Advantame", variations: ["E969"] },
      {
        name: "High Fructose Corn Syrup",
        variations: ["HFCS", "corn syrup", "glucose-fructose"],
      },
      {
        name: "Sugar Alcohols",
        variations: [
          "sorbitol",
          "xylitol",
          "erythritol",
          "maltitol",
          "mannitol",
        ],
      },
      { name: "Stevia", variations: ["E960", "steviol glycosides"] },
      { name: "Monk Fruit", variations: ["luo han guo"] },
    ],
  },

  colors: {
    title: "Artificial Colors",
    icon: "🎨",
    color: "#DB2777",
    backgroundColor: "#FDF2F8",
    items: [
      { name: "Red 40", variations: ["E129", "allura red", "red dye 40"] },
      { name: "Yellow 5", variations: ["E102", "tartrazine", "yellow dye 5"] },
      {
        name: "Yellow 6",
        variations: ["E110", "sunset yellow", "yellow dye 6"],
      },
      { name: "Blue 1", variations: ["E133", "brilliant blue", "blue dye 1"] },
      { name: "Blue 2", variations: ["E132", "indigo carmine", "blue dye 2"] },
      { name: "Green 3", variations: ["E143", "fast green", "green dye 3"] },
      { name: "Caramel Coloring", variations: ["E150", "caramel color"] },
    ],
  },

  preservatives: {
    title: "Preservatives",
    icon: "🧪",
    color: "#EA580C",
    backgroundColor: "#FFF7ED",
    items: [
      { name: "BHA", variations: ["E320", "butylated hydroxyanisole"] },
      { name: "BHT", variations: ["E321", "butylated hydroxytoluene"] },
      { name: "TBHQ", variations: ["E319", "tertiary butylhydroquinone"] },
      { name: "Sodium Benzoate", variations: ["E211", "benzoic acid"] },
      { name: "Potassium Sorbate", variations: ["E202"] },
      { name: "Sodium Nitrite", variations: ["E250"] },
      { name: "Sodium Nitrate", variations: ["E251"] },
      { name: "Propyl Gallate", variations: ["E310"] },
    ],
  },

  additives: {
    title: "Other Additives",
    icon: "⚗️",
    color: "#0891B2",
    backgroundColor: "#ECFEFF",
    items: [
      {
        name: "MSG",
        variations: ["monosodium glutamate", "E621", "glutamic acid"],
      },
      { name: "Carrageenan", variations: ["E407"] },
      { name: "Xanthan Gum", variations: ["E415"] },
      { name: "Polysorbate 80", variations: ["E433"] },
      { name: "Sodium Phosphate", variations: ["E339", "phosphate"] },
      { name: "Propylene Glycol", variations: ["E1520"] },
      { name: "Titanium Dioxide", variations: ["E171"] },
    ],
  },

  dietary: {
    title: "Dietary Restrictions",
    icon: "🌱",
    color: "#16A34A",
    backgroundColor: "#F0FDF4",
    items: [
      { name: "Gelatin", variations: ["gelatine", "animal gelatin"] },
      { name: "Palm Oil", variations: ["palm kernel oil", "palmitate"] },
      { name: "Carmine", variations: ["E120", "cochineal", "carminic acid"] },
      { name: "Lard", variations: ["pork fat"] },
      { name: "Tallow", variations: ["beef fat"] },
      { name: "Rennet", variations: ["animal rennet"] },
      { name: "Isinglass", variations: ["fish bladder"] },
      { name: "Honey", variations: [] },
      { name: "Beeswax", variations: ["E901"] },
      { name: "Shellac", variations: ["E904", "confectioner's glaze"] },
    ],
  },
};

// Get all preset categories
export function getPresetCategories() {
  return Object.entries(ALERT_PRESETS).map(([key, category]) => ({
    key,
    ...category,
  }));
}

// Get all items from a specific category
export function getPresetItems(categoryKey) {
  return ALERT_PRESETS[categoryKey]?.items || [];
}

// Check if an ingredient name matches any existing alerts
export function isPresetAlreadyAdded(presetName, existingAlerts) {
  const normalizedPreset = presetName.toLowerCase().trim();
  return existingAlerts.some(
    (alert) => alert.ingredient_name.toLowerCase().trim() === normalizedPreset,
  );
}

// Get category info for a specific category
export function getCategoryInfo(categoryKey) {
  return ALERT_PRESETS[categoryKey] || null;
}

// Check if an alert is a preset ingredient (exists in any category)
export function isPresetIngredient(ingredientName) {
  const normalized = ingredientName.toLowerCase().trim();

  for (const category of Object.values(ALERT_PRESETS)) {
    for (const preset of category.items) {
      if (preset.name.toLowerCase().trim() === normalized) {
        return true;
      }
    }
  }

  return false;
}
