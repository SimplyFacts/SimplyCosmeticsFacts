// Categories for Open Food Facts additives_tags
// This replaces the regex-based approach with Open Food Facts' comprehensive database

// Map of E-numbers and additive names to categories
// Open Food Facts uses tags like "en:e102", "en:e621", etc.

export const ADDITIVE_CATEGORIES = {
  // ARTIFICIAL COLORS (Synthetic dyes)
  colors: new Set([
    "en:e102",
    "en:e104",
    "en:e107",
    "en:e110",
    "en:e122",
    "en:e123",
    "en:e124",
    "en:e127",
    "en:e128",
    "en:e129",
    "en:e131",
    "en:e132",
    "en:e133",
    "en:e142",
    "en:e150a",
    "en:e150b",
    "en:e150c",
    "en:e150d",
    "en:e151",
    "en:e154",
    "en:e155",
    "en:e171",
    "en:e172",
    "en:e173",
    "en:e174",
    "en:e175",
    "en:e180",
    // Common names that might appear
    "tartrazine",
    "sunset-yellow",
    "allura-red",
    "brilliant-blue",
    "indigo-carmine",
    "erythrosine",
    "ponceau-4r",
    "carmoisine",
    "azorubine",
    "amaranth",
    "patent-blue-v",
    "quinoline-yellow",
    "titanium-dioxide",
    "caramel",
  ]),

  // ARTIFICIAL SWEETENERS (Non-nutritive/synthetic)
  sweeteners: new Set([
    "en:e950",
    "en:e951",
    "en:e952",
    "en:e954",
    "en:e955",
    "en:e957",
    "en:e959",
    "en:e960",
    "en:e961",
    "en:e962",
    "en:e965",
    "en:e966",
    "en:e967",
    "en:e968",
    "en:e969",
    // Common names
    "aspartame",
    "acesulfame-k",
    "acesulfame-potassium",
    "saccharin",
    "sucralose",
    "neotame",
    "advantame",
    "cyclamate",
    "thaumatin",
    "neohesperidine",
    "maltitol",
    "sorbitol",
    "mannitol",
    "isomalt",
    "xylitol",
    "erythritol",
    "lactitol",
  ]),

  // PRESERVATIVES (Synthetic/controversial)
  preservatives: new Set([
    "en:e200",
    "en:e201",
    "en:e202",
    "en:e203",
    "en:e210",
    "en:e211",
    "en:e212",
    "en:e213",
    "en:e214",
    "en:e215",
    "en:e216",
    "en:e217",
    "en:e218",
    "en:e219",
    "en:e220",
    "en:e221",
    "en:e222",
    "en:e223",
    "en:e224",
    "en:e226",
    "en:e227",
    "en:e228",
    "en:e230",
    "en:e231",
    "en:e232",
    "en:e233",
    "en:e234",
    "en:e235",
    "en:e239",
    "en:e242",
    "en:e249",
    "en:e250",
    "en:e251",
    "en:e252",
    "en:e260",
    "en:e261",
    "en:e262",
    "en:e263",
    "en:e270",
    "en:e280",
    "en:e281",
    "en:e282",
    "en:e283",
    "en:e284",
    "en:e285",
    "en:e290",
    "en:e296",
    "en:e297",
    "en:e310",
    "en:e311",
    "en:e312",
    "en:e319",
    "en:e320",
    "en:e321",
    // Common names
    "sodium-benzoate",
    "potassium-sorbate",
    "sodium-nitrite",
    "sodium-nitrate",
    "sulfur-dioxide",
    "bha",
    "bht",
    "tbhq",
    "propyl-gallate",
    "parabens",
    "methylparaben",
    "propylparaben",
    "butylparaben",
  ]),

  // FLAVOR ENHANCERS (MSG, etc.)
  flavorEnhancers: new Set([
    "en:e620",
    "en:e621",
    "en:e622",
    "en:e623",
    "en:e624",
    "en:e625",
    "en:e626",
    "en:e627",
    "en:e628",
    "en:e629",
    "en:e630",
    "en:e631",
    "en:e632",
    "en:e633",
    "en:e634",
    "en:e635",
    "en:e636",
    "en:e637",
    "en:e640",
    "en:e641",
    // Common names
    "monosodium-glutamate",
    "msg",
    "disodium-guanylate",
    "disodium-inosinate",
    "disodium-5-ribonucleotides",
  ]),

  // EMULSIFIERS & STABILIZERS (Some synthetic/processed)
  emulsifiers: new Set([
    "en:e322",
    "en:e400",
    "en:e401",
    "en:e402",
    "en:e403",
    "en:e404",
    "en:e405",
    "en:e406",
    "en:e407",
    "en:e407a",
    "en:e410",
    "en:e412",
    "en:e413",
    "en:e414",
    "en:e415",
    "en:e416",
    "en:e417",
    "en:e418",
    "en:e420",
    "en:e421",
    "en:e422",
    "en:e430",
    "en:e431",
    "en:e432",
    "en:e433",
    "en:e434",
    "en:e435",
    "en:e436",
    "en:e440",
    "en:e441",
    "en:e442",
    "en:e443",
    "en:e444",
    "en:e445",
    "en:e450",
    "en:e451",
    "en:e452",
    "en:e460",
    "en:e461",
    "en:e462",
    "en:e463",
    "en:e464",
    "en:e465",
    "en:e466",
    "en:e470a",
    "en:e470b",
    "en:e471",
    "en:e472a",
    "en:e472b",
    "en:e472c",
    "en:e472d",
    "en:e472e",
    "en:e472f",
    "en:e473",
    "en:e474",
    "en:e475",
    "en:e476",
    "en:e477",
    "en:e479b",
    "en:e481",
    "en:e482",
    "en:e483",
    "en:e491",
    "en:e492",
    "en:e493",
    "en:e494",
    "en:e495",
    // Common names
    "polysorbate-80",
    "polysorbate-60",
    "polysorbate-20",
    "carrageenan",
    "xanthan-gum",
    "guar-gum",
    "lecithin",
    "mono-and-diglycerides",
    "propylene-glycol",
    "polyethylene-glycol",
  ]),

  // DAIRY PRODUCTS
  dairy: new Set([
    "milk",
    "whole milk",
    "skim milk",
    "nonfat milk",
    "powdered milk",
    "milk powder",
    "dried milk",
    "milk solids",
    "cream",
    "heavy cream",
    "whipping cream",
    "sour cream",
    "cheese",
    "cheddar",
    "parmesan",
    "mozzarella",
    "cream cheese",
    "butter",
    "buttermilk",
    "butter oil",
    "whey",
    "whey protein",
    "whey powder",
    "casein",
    "caseinate",
    "sodium caseinate",
    "calcium caseinate",
    "lactose",
    "yogurt",
    "yogurt powder",
    "ghee",
    "condensed milk",
    "evaporated milk",
    "half and half",
    "half-and-half",
    // Goat milk products
    "goat milk",
    "goat cheese",
    "goat butter",
    "goat cream",
    "goat yogurt",
    "chèvre",
    "chevre",
    // Sheep milk products
    "sheep milk",
    "sheep cheese",
    "feta",
    "manchego",
    "pecorino",
    "roquefort",
    "sheep yogurt",
    "ewe milk",
    "ewe's milk",
    "ewe cheese",
    // Buffalo milk products
    "buffalo milk",
    "buffalo mozzarella",
    "mozzarella di bufala",
    "buffalo cheese",
    // Camel milk products
    "camel milk",
    "camel cheese",
    // Mare milk products
    "mare milk",
    "mare's milk",
  ]),

  // TREE NUTS
  treeNuts: new Set([
    "almond",
    "almonds",
    "cashew",
    "cashews",
    "walnut",
    "walnuts",
    "pecan",
    "pecans",
    "hazelnut",
    "hazelnuts",
    "pistachio",
    "pistachios",
    "macadamia",
    "macadamia nut",
    "macadamia nuts",
    "brazil nut",
    "brazil nuts",
    "pine nut",
    "pine nuts",
    "chestnut",
    "chestnuts",
    "almond oil",
    "walnut oil",
    "hazelnut oil",
  ]),

  // PEANUTS
  peanuts: new Set([
    "peanut",
    "peanuts",
    "peanut oil",
    "peanut butter",
    "peanut flour",
    "groundnut",
    "groundnuts",
  ]),

  // GLUTEN/WHEAT
  gluten: new Set([
    "wheat",
    "wheat flour",
    "whole wheat",
    "wheat starch",
    "wheat gluten",
    "wheat protein",
    "barley",
    "barley malt",
    "malt",
    "malt extract",
    "malt syrup",
    "rye",
    "rye flour",
    "spelt",
    "spelt flour",
    "gluten",
    "vital wheat gluten",
    "wheat bran",
    "wheat germ",
    "durum",
    "semolina",
    "kamut",
    "farro",
    "triticale",
  ]),

  // SHELLFISH
  shellfish: new Set([
    "shrimp",
    "prawn",
    "prawns",
    "crab",
    "lobster",
    "crayfish",
    "crawfish",
    "clam",
    "clams",
    "oyster",
    "oysters",
    "mussel",
    "mussels",
    "scallop",
    "scallops",
    "shellfish",
    "crustacean",
    "crustaceans",
  ]),

  // FISH
  fish: new Set([
    "fish",
    "salmon",
    "tuna",
    "cod",
    "halibut",
    "tilapia",
    "trout",
    "bass",
    "anchovy",
    "anchovies",
    "sardine",
    "sardines",
    "mackerel",
    "haddock",
    "pollock",
    "fish oil",
    "fish sauce",
    "fish extract",
  ]),

  // EGGS
  eggs: new Set([
    "egg",
    "eggs",
    "egg white",
    "egg whites",
    "egg yolk",
    "egg yolks",
    "albumin",
    "egg albumin",
    "egg powder",
    "dried egg",
    "egg protein",
    "whole egg",
    "liquid egg",
  ]),

  // SOY
  soy: new Set([
    "soy",
    "soya",
    "soybean",
    "soybeans",
    "soy protein",
    "soy lecithin",
    "soy flour",
    "soy sauce",
    "tofu",
    "tempeh",
    "edamame",
    "soy oil",
    "soybean oil",
    "textured soy protein",
    "tsp",
    "tvp",
    "textured vegetable protein",
  ]),

  // CORN
  corn: new Set([
    "corn",
    "maize",
    "corn syrup",
    "high fructose corn syrup",
    "corn starch",
    "cornstarch",
    "corn flour",
    "corn oil",
    "cornmeal",
    "corn meal",
    "popcorn",
    "corn maltodextrin",
    "maltodextrin",
    "dextrose",
    "corn dextrin",
    "corn sugar",
    "hominy",
    "masa",
    "masa harina",
    "corn gluten",
    "corn protein",
    "polenta",
  ]),
};

/**
 * Categorize Open Food Facts additives into user-friendly categories
 * @param {Array<string>} additives_tags - Array like ["en:e102", "en:e621", "en:aspartame"]
 * @returns {Object} - Object with categorized additives
 */
export function categorizeAdditives(additives_tags) {
  if (
    !additives_tags ||
    !Array.isArray(additives_tags) ||
    additives_tags.length === 0
  ) {
    return {
      colors: [],
      sweeteners: [],
      preservatives: [],
      flavorEnhancers: [],
      emulsifiers: [],
      other: [],
    };
  }

  const result = {
    colors: [],
    sweeteners: [],
    preservatives: [],
    flavorEnhancers: [],
    emulsifiers: [],
    other: [],
  };

  for (const tag of additives_tags) {
    const normalizedTag = tag.toLowerCase().trim();

    // Remove "en:" prefix for name extraction but keep for matching
    const nameWithoutPrefix = normalizedTag.replace(/^en:/, "");

    let categorized = false;

    // Check each category
    if (
      ADDITIVE_CATEGORIES.colors.has(normalizedTag) ||
      ADDITIVE_CATEGORIES.colors.has(nameWithoutPrefix)
    ) {
      result.colors.push(formatAdditiveName(tag));
      categorized = true;
    }

    if (
      ADDITIVE_CATEGORIES.sweeteners.has(normalizedTag) ||
      ADDITIVE_CATEGORIES.sweeteners.has(nameWithoutPrefix)
    ) {
      result.sweeteners.push(formatAdditiveName(tag));
      categorized = true;
    }

    if (
      ADDITIVE_CATEGORIES.preservatives.has(normalizedTag) ||
      ADDITIVE_CATEGORIES.preservatives.has(nameWithoutPrefix)
    ) {
      result.preservatives.push(formatAdditiveName(tag));
      categorized = true;
    }

    if (
      ADDITIVE_CATEGORIES.flavorEnhancers.has(normalizedTag) ||
      ADDITIVE_CATEGORIES.flavorEnhancers.has(nameWithoutPrefix)
    ) {
      result.flavorEnhancers.push(formatAdditiveName(tag));
      categorized = true;
    }

    if (
      ADDITIVE_CATEGORIES.emulsifiers.has(normalizedTag) ||
      ADDITIVE_CATEGORIES.emulsifiers.has(nameWithoutPrefix)
    ) {
      result.emulsifiers.push(formatAdditiveName(tag));
      categorized = true;
    }

    // If not categorized, add to "other"
    if (!categorized) {
      result.other.push(formatAdditiveName(tag));
    }
  }

  return result;
}

/**
 * Format additive tag into readable name
 * @param {string} tag - Tag like "en:e102" or "en:aspartame"
 * @returns {string} - Formatted name like "E102" or "Aspartame"
 */
function formatAdditiveName(tag) {
  if (!tag) return "";

  // Remove "en:" prefix
  let name = tag.replace(/^en:/, "");

  // Convert E-numbers to uppercase (e102 -> E102)
  if (name.match(/^e\d+/)) {
    name = name.toUpperCase();
  } else {
    // Convert dashes to spaces and title case (aspartame -> Aspartame)
    name = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return name;
}

/**
 * Get all artificial colors from categorized additives
 */
export function getArtificialColors(additives_tags) {
  const categorized = categorizeAdditives(additives_tags);
  return categorized.colors;
}

/**
 * Get all artificial sweeteners from categorized additives
 */
export function getArtificialSweeteners(additives_tags) {
  const categorized = categorizeAdditives(additives_tags);
  return categorized.sweeteners;
}

/**
 * Get all artificial ingredients (everything except natural emulsifiers)
 * This replaces the old detectArtificialIngredients function
 */
export function getArtificialIngredients(additives_tags) {
  const categorized = categorizeAdditives(additives_tags);

  // Combine all categories except emulsifiers (many are natural like lecithin, xanthan gum)
  return [
    ...categorized.colors,
    ...categorized.sweeteners,
    ...categorized.preservatives,
    ...categorized.flavorEnhancers,
    ...categorized.other,
  ];
}

/**
 * Check if an ingredient name matches an artificial sweetener
 * Used for matching user alerts
 */
export function isArtificialSweetener(ingredientName) {
  if (!ingredientName) return false;

  const normalized = ingredientName.toLowerCase().trim();

  // Check against sweetener set
  return (
    ADDITIVE_CATEGORIES.sweeteners.has(`en:${normalized}`) ||
    ADDITIVE_CATEGORIES.sweeteners.has(normalized)
  );
}
