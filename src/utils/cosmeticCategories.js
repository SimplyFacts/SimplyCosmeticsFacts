import { ALERT_PRESETS } from "./alertPresets";

// Build a lookup map from preset name -> variations array at module level
// Used by alert matching to resolve "Fragrance / Parfum" -> ["fragrance", "parfum", ...]
const PRESET_VARIATIONS_MAP = new Map();
for (const category of Object.values(ALERT_PRESETS)) {
  for (const item of category.items) {
    PRESET_VARIATIONS_MAP.set(item.name.toLowerCase().trim(), item.variations);
  }
}

/**
 * Resolve alert name to its list of match terms.
 * For preset alerts: returns all variations (e.g. "Fragrance / Parfum" -> ["fragrance", "parfum", ...])
 * For custom alerts: returns [alertName] so matching still works
 */
export function resolveAlertVariations(alertName) {
  const normalized = alertName.toLowerCase().trim();
  return PRESET_VARIATIONS_MAP.get(normalized) || [normalized];
}

// Cosmetics ingredient category sets — keyed by alertPresets category
// Used for category-level alert matching (e.g. "Parabens" category matches any paraben)
export const COSMETIC_CATEGORIES = {
  parabens: new Set([
    "methylparaben", "methyl paraben", "e218",
    "ethylparaben", "ethyl paraben", "e214",
    "propylparaben", "propyl paraben", "e216",
    "butylparaben", "butyl paraben",
    "isobutylparaben", "isobutyl paraben",
    "isopropylparaben", "isopropyl paraben",
    "benzylparaben", "benzyl paraben",
    "heptylparaben",
  ]),
  sulfates: new Set([
    "sodium lauryl sulfate", "sodium laureth sulfate",
    "ammonium lauryl sulfate", "ammonium laureth sulfate",
    "sodium myreth sulfate", "sodium coco sulfate",
    "tea-lauryl sulfate", "lauryl sulfate",
    "sodium cetearyl sulfate", "sodium pareth sulfate",
    "sls", "sles",
  ]),
  pfas: new Set([
    "ptfe", "polytetrafluoroethylene",
    "perfluorooctanoic acid", "pfoa",
    "perfluorooctane sulfonate", "pfos",
    "fluoropolymer", "teflon",
    "perfluoro", "polyfluoro",
  ]),
  syntheticFragrances: new Set([
    "fragrance", "parfum", "perfume", "scent", "aroma",
    "natural fragrance", "fragrance blend",
    "linalool", "limonene", "geraniol", "eugenol",
    "coumarin", "cinnamal", "citronellol", "citral",
    "farnesol", "benzyl alcohol", "benzyl benzoate",
    "benzyl salicylate", "isoeugenol", "lilial", "lyral",
  ]),
  endocrineDisruptors: new Set([
    "dibutyl phthalate", "dbp",
    "diethylhexyl phthalate", "dehp",
    "diethyl phthalate", "dep",
    "oxybenzone", "benzophenone-3",
    "triclosan", "triclocarban",
    "butylated hydroxyanisole", "bha",
    "butylated hydroxytoluene", "bht",
    "resorcinol",
  ]),
  formaldehydeReleasers: new Set([
    "dmdm hydantoin", "dimethylol dimethyl hydantoin",
    "imidazolidinyl urea", "diazolidinyl urea",
    "quaternium-15", "bronopol",
    "2-bromo-2-nitropropane-1,3-diol",
    "sodium hydroxymethylglycinate",
    "5-bromo-5-nitro-1,3-dioxane", "bronidox",
    "formaldehyde", "methylene glycol", "formalin",
  ]),
  sunscreenChemicals: new Set([
    "oxybenzone", "octinoxate", "octyl methoxycinnamate",
    "ethylhexyl methoxycinnamate", "homosalate",
    "octisalate", "ethylhexyl salicylate",
    "octocrylene", "avobenzone",
    "butyl methoxydibenzoylmethane",
    "retinyl palmitate", "vitamin a palmitate",
  ]),
  contaminants: new Set([
    "peg", "polyethylene glycol", "polyethylene",
    "polyoxyethylene", "ceteareth", "oleth",
    "lead acetate", "mercury", "thimerosal",
    "coal tar", "hydroquinone",
    "petroleum distillate", "petrolatum",
    "petroleum jelly", "carbon black",
    "toluene", "methylbenzene",
  ]),
  animalDerived: new Set([
    "carmine", "carminic acid", "cochineal", "e120",
    "lanolin", "wool wax", "wool grease",
    "collagen", "hydrolyzed collagen",
    "squalene", "shark liver oil",
    "beeswax", "cera alba", "e901",
    "honey", "mel",
    "keratin", "hydrolyzed keratin",
    "silk", "silk powder", "silk amino acids",
    "gelatin", "gelatine",
    "shellac", "e904",
    "tallow", "sodium tallowate",
    "musk", "civet", "castoreum",
  ]),
};

// Map from alert preset category title (lowercase) to COSMETIC_CATEGORIES key
// Used for category-level matching when user selects a whole category
export const COSMETIC_ALERT_CATEGORY_MAPPING = {
  "parabens": "parabens",
  "methylparaben": "parabens",
  "ethylparaben": "parabens",
  "propylparaben": "parabens",
  "butylparaben": "parabens",
  "isobutylparaben": "parabens",
  "isopropylparaben": "parabens",
  "benzylparaben": "parabens",
  "sulfates": "sulfates",
  "sodium lauryl sulfate": "sulfates",
  "sodium laureth sulfate": "sulfates",
  "pfas": "pfas",
  "ptfe": "pfas",
  "synthetic fragrances": "syntheticFragrances",
  "fragrance / parfum": "syntheticFragrances",
  "endocrine disruptors": "endocrineDisruptors",
  "oxybenzone": "endocrineDisruptors",
  "triclosan": "endocrineDisruptors",
  "formaldehyde releasers": "formaldehydeReleasers",
  "dmdm hydantoin": "formaldehydeReleasers",
  "sunscreen chemicals": "sunscreenChemicals",
  "contaminants & carcinogens": "contaminants",
  "animal derived": "animalDerived",
  "carmine": "animalDerived",
  "lanolin": "animalDerived",
};

// Category display labels
export const COSMETIC_CATEGORY_LABELS = {
  parabens: { label: "Parabens", alertName: "Parabens" },
  sulfates: { label: "Sulfates", alertName: "Sulfates" },
  pfas: { label: "PFAS", alertName: "PFAS" },
  syntheticFragrances: { label: "Synthetic Fragrances", alertName: "Fragrance / Parfum" },
  endocrineDisruptors: { label: "Endocrine Disruptors", alertName: "Endocrine Disruptors" },
  formaldehydeReleasers: { label: "Formaldehyde Releasers", alertName: "Formaldehyde Releasers" },
  sunscreenChemicals: { label: "Sunscreen Chemicals", alertName: "Sunscreen Chemicals" },
  contaminants: { label: "Contaminants & Carcinogens", alertName: "Contaminants & Carcinogens" },
  animalDerived: { label: "Animal Derived", alertName: "Animal Derived" },
};
