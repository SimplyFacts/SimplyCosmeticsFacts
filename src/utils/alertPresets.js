// Comprehensive list of preset alerts organized by category
// Categories and ingredients sourced from EWG Skin Deep® database
// https://www.ewg.org/skindeep/learn_more/top-tips/
// https://www.ewg.org/the-toxic-twelve-chemicals-and-contaminants-in-cosmetics

export const ALERT_PRESETS = {
  allergens: {
    title: "Common Allergens",
    icon: "🌸",
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    items: [
      {
        name: "Fragrance / Parfum",
        variations: [
          "fragrance",
          "parfum",
          "perfume",
          "scent",
          "aroma",
          "natural fragrance",
          "fragrance blend",
        ],
      },
      {
        name: "Lanolin",
        variations: [
          "lanolin",
          "wool wax",
          "wool grease",
          "lanolin alcohol",
          "acetylated lanolin",
        ],
      },
      {
        name: "Nickel",
        variations: ["nickel sulfate", "nickel chloride"],
      },
      {
        name: "Balsam of Peru",
        variations: ["myroxylon pereirae", "balsam peru", "peruvian balsam"],
      },
      {
        name: "Formaldehyde",
        variations: [
          "formaldehyde",
          "methylene glycol",
          "formalin",
          "methanal",
        ],
      },
      {
        name: "Methylisothiazolinone",
        variations: ["methylisothiazolinone", "MI", "MIT"],
      },
      {
        name: "Methylchloroisothiazolinone",
        variations: ["methylchloroisothiazolinone", "MCI", "Kathon CG"],
      },
      {
        name: "Propylene Glycol",
        variations: ["propylene glycol", "1,2-propanediol"],
      },
      {
        name: "Cocamidopropyl Betaine",
        variations: ["cocamidopropyl betaine", "CAPB"],
      },
    ],
  },

  parabens: {
    title: "Parabens",
    icon: "⚗️",
    color: "#9333EA",
    backgroundColor: "#FAF5FF",
    items: [
      {
        name: "Methylparaben",
        variations: ["methylparaben", "methyl paraben", "E218"],
      },
      {
        name: "Ethylparaben",
        variations: ["ethylparaben", "ethyl paraben", "E214"],
      },
      {
        name: "Propylparaben",
        variations: ["propylparaben", "propyl paraben", "E216"],
      },
      {
        name: "Butylparaben",
        variations: ["butylparaben", "butyl paraben"],
      },
      {
        name: "Isobutylparaben",
        variations: ["isobutylparaben", "isobutyl paraben"],
      },
      {
        name: "Isopropylparaben",
        variations: ["isopropylparaben", "isopropyl paraben"],
      },
      {
        name: "Benzylparaben",
        variations: ["benzylparaben", "benzyl paraben"],
      },
    ],
  },

  endocrineDisruptors: {
    title: "Endocrine Disruptors",
    icon: "🔬",
    color: "#EA580C",
    backgroundColor: "#FFF7ED",
    items: [
      {
        name: "Phthalates (DBP)",
        variations: ["dibutyl phthalate", "DBP", "di-n-butyl phthalate"],
      },
      {
        name: "Phthalates (DEHP)",
        variations: [
          "diethylhexyl phthalate",
          "DEHP",
          "di-2-ethylhexyl phthalate",
        ],
      },
      {
        name: "Phthalates (DEP)",
        variations: ["diethyl phthalate", "DEP"],
      },
      {
        name: "Oxybenzone",
        variations: ["oxybenzone", "benzophenone-3", "BP-3"],
      },
      {
        name: "Triclosan",
        variations: ["triclosan", "Irgasan", "5-chloro-2-(2,4-dichlorophenoxy)phenol"],
      },
      {
        name: "Triclocarban",
        variations: ["triclocarban", "TCC", "3,4,4-trichlorocarbanilide"],
      },
      {
        name: "BHA (Butylated Hydroxyanisole)",
        variations: ["butylated hydroxyanisole", "BHA", "tert-butyl-4-methoxyphenol"],
      },
      {
        name: "BHT (Butylated Hydroxytoluene)",
        variations: ["butylated hydroxytoluene", "BHT"],
      },
      {
        name: "Resorcinol",
        variations: ["resorcinol", "1,3-benzenediol", "resorcin"],
      },
    ],
  },

  formaldehydeReleasers: {
    title: "Formaldehyde Releasers",
    icon: "☠️",
    color: "#991B1B",
    backgroundColor: "#FEF2F2",
    items: [
      {
        name: "DMDM Hydantoin",
        variations: ["DMDM hydantoin", "dimethylol dimethyl hydantoin"],
      },
      {
        name: "Imidazolidinyl Urea",
        variations: ["imidazolidinyl urea", "Germall 115"],
      },
      {
        name: "Diazolidinyl Urea",
        variations: ["diazolidinyl urea", "Germall II"],
      },
      {
        name: "Quaternium-15",
        variations: ["quaternium-15", "dowicil 200"],
      },
      {
        name: "Bronopol",
        variations: [
          "bronopol",
          "2-bromo-2-nitropropane-1,3-diol",
          "2-bromo-2-nitro-1,3-propanediol",
        ],
      },
      {
        name: "Sodium Hydroxymethylglycinate",
        variations: ["sodium hydroxymethylglycinate"],
      },
      {
        name: "5-Bromo-5-Nitro-1,3-Dioxane",
        variations: ["5-bromo-5-nitro-1,3-dioxane", "bronidox"],
      },
    ],
  },

  sunscreenChemicals: {
    title: "Sunscreen Chemicals",
    icon: "☀️",
    color: "#D97706",
    backgroundColor: "#FFFBEB",
    items: [
      {
        name: "Oxybenzone",
        variations: ["oxybenzone", "benzophenone-3", "BP-3"],
      },
      {
        name: "Octinoxate",
        variations: [
          "octinoxate",
          "octyl methoxycinnamate",
          "ethylhexyl methoxycinnamate",
          "OMC",
        ],
      },
      {
        name: "Homosalate",
        variations: ["homosalate", "homomethyl salicylate", "HMS"],
      },
      {
        name: "Octisalate",
        variations: ["octisalate", "ethylhexyl salicylate", "octyl salicylate"],
      },
      {
        name: "Octocrylene",
        variations: ["octocrylene", "ethylhexyl methoxycinnamate"],
      },
      {
        name: "Avobenzone",
        variations: ["avobenzone", "butyl methoxydibenzoylmethane", "Parsol 1789"],
      },
      {
        name: "Retinyl Palmitate",
        variations: ["retinyl palmitate", "vitamin A palmitate", "retinol palmitate"],
      },
    ],
  },

  contaminants: {
    title: "Contaminants & Carcinogens",
    icon: "🧪",
    color: "#0F766E",
    backgroundColor: "#F0FDFA",
    items: [
      {
        name: "PEGs (1,4-Dioxane)",
        variations: [
          "PEG",
          "polyethylene glycol",
          "polyethylene",
          "polyoxyethylene",
          "ceteareth",
          "oleth",
          "sodium laureth sulfate",
        ],
      },
      {
        name: "Lead Acetate",
        variations: ["lead acetate", "plumbous acetate"],
      },
      {
        name: "Mercury / Thimerosal",
        variations: ["mercury", "thimerosal", "thiomersal", "mercuric chloride"],
      },
      {
        name: "Coal Tar",
        variations: [
          "coal tar",
          "coal tar extract",
          "coal tar solution",
          "crude coal tar",
        ],
      },
      {
        name: "Hydroquinone",
        variations: ["hydroquinone", "quinol", "1,4-benzenediol"],
      },
      {
        name: "Petroleum Distillates",
        variations: [
          "petroleum distillate",
          "mineral spirits",
          "petrolatum",
          "white petrolatum",
          "petroleum jelly",
        ],
      },
      {
        name: "Carbon Black",
        variations: [
          "carbon black",
          "D&C Black No. 2",
          "CI 77266",
          "acetylene black",
          "channel black",
          "lamp black",
        ],
      },
      {
        name: "Toluene",
        variations: ["toluene", "methylbenzene", "phenylmethane"],
      },
    ],
  },

  animalDerived: {
    title: "Animal Derived",
    icon: "🐰",
    color: "#65A30D",
    backgroundColor: "#F7FEE7",
    items: [
      {
        name: "Carmine",
        variations: [
          "carmine",
          "carminic acid",
          "cochineal",
          "CI 75470",
          "E120",
          "natural red 4",
        ],
      },
      {
        name: "Lanolin",
        variations: [
          "lanolin",
          "wool wax",
          "wool grease",
          "lanolin alcohol",
          "acetylated lanolin",
        ],
      },
      {
        name: "Collagen",
        variations: ["collagen", "hydrolyzed collagen", "soluble collagen"],
      },
      {
        name: "Squalene (Animal)",
        variations: ["squalene", "shark liver oil"],
      },
      {
        name: "Beeswax",
        variations: ["beeswax", "cera alba", "E901", "white beeswax", "yellow beeswax"],
      },
      {
        name: "Honey",
        variations: ["honey", "mel", "hydromel"],
      },
      {
        name: "Keratin",
        variations: ["keratin", "hydrolyzed keratin"],
      },
      {
        name: "Silk",
        variations: ["silk", "silk powder", "silk amino acids", "hydrolyzed silk"],
      },
      {
        name: "Gelatin",
        variations: ["gelatin", "gelatine", "hydrolyzed gelatin"],
      },
      {
        name: "Shellac",
        variations: ["shellac", "E904", "lac resin"],
      },
      {
        name: "Tallow",
        variations: ["tallow", "beef tallow", "suet", "sodium tallowate"],
      },
      {
        name: "Musk (Animal)",
        variations: ["musk", "musk ambrette", "civet", "castoreum"],
      },
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