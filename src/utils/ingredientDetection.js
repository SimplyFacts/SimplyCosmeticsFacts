// Pre-compiled artificial color patterns
const ARTIFICIAL_COLOR_PATTERNS = [
  // Generic Artificial Color Terms
  { pattern: /artificial\s+colou?r(?:ing)?s?/gi, name: "Artificial Color" },
  {
    pattern: /natural\s+and\s+artificial\s+colou?r(?:ing)?s?/gi,
    name: "Natural and Artificial Coloring",
  },

  // FD&C Colors (US)
  { pattern: /fd&c\s+red\s+#?\d+/gi, name: "FD&C Red" },
  { pattern: /fd&c\s+yellow\s+#?\d+/gi, name: "FD&C Yellow" },
  { pattern: /fd&c\s+blue\s+#?\d+/gi, name: "FD&C Blue" },
  { pattern: /fd&c\s+green\s+#?\d+/gi, name: "FD&C Green" },

  // Color + Number patterns
  { pattern: /red\s*#?\d+|red\s+\d+/gi, name: "Red" },
  { pattern: /yellow\s*#?\d+|yellow\s+\d+/gi, name: "Yellow" },
  { pattern: /blue\s*#?\d+|blue\s+\d+/gi, name: "Blue" },
  { pattern: /green\s*#?\d+|green\s+\d+/gi, name: "Green" },
  { pattern: /orange\s*#?\d+|orange\s+\d+/gi, name: "Orange" },
  { pattern: /violet\s*#?\d+|violet\s+\d+/gi, name: "Violet" },

  // Specific Color Names
  { pattern: /tartrazine/gi, name: "Tartrazine" },
  { pattern: /sunset\s+yellow(?:\s+fcf)?/gi, name: "Sunset Yellow" },
  { pattern: /allura\s+red(?:\s+ac)?/gi, name: "Allura Red" },
  { pattern: /brilliant\s+blue(?:\s+fcf)?/gi, name: "Brilliant Blue" },
  { pattern: /indigo\s+carmine/gi, name: "Indigo Carmine" },
  { pattern: /indigotine/gi, name: "Indigotine" },
  { pattern: /erythrosine/gi, name: "Erythrosine" },
  { pattern: /ponceau\s+4r/gi, name: "Ponceau 4R" },
  { pattern: /carmoisine/gi, name: "Carmoisine" },
  { pattern: /azorubine/gi, name: "Azorubine" },
  { pattern: /amaranth/gi, name: "Amaranth" },
  { pattern: /patent\s+blue\s+v/gi, name: "Patent Blue V" },
  { pattern: /quinoline\s+yellow/gi, name: "Quinoline Yellow" },
  { pattern: /orange\s+b/gi, name: "Orange B" },
  { pattern: /citrus\s+red/gi, name: "Citrus Red" },
  { pattern: /fast\s+green\s+fcf/gi, name: "Fast Green FCF" },
  { pattern: /green\s+s/gi, name: "Green S" },
  { pattern: /brilliant\s+black(?:\s+bn)?/gi, name: "Brilliant Black" },
  { pattern: /brown\s+fk/gi, name: "Brown FK" },
  { pattern: /brown\s+ht/gi, name: "Brown HT" },
  { pattern: /chocolate\s+brown(?:\s+ht)?/gi, name: "Chocolate Brown HT" },

  // Lake Colors (Aluminum-based)
  {
    pattern: /(?:red|yellow|blue|green|orange)\s+\d+\s+lake/gi,
    name: "Lake Color",
  },
  { pattern: /aluminum\s+lake/gi, name: "Aluminum Lake" },

  // E-Numbers for SYNTHETIC Colors Only (removed natural colors like E100, E101, E120, E140, E160a-f, E161b, E161g, E162, E163, E170)
  { pattern: /\be102\b/gi, name: "E102 (Tartrazine)" },
  { pattern: /\be104\b/gi, name: "E104 (Quinoline Yellow)" },
  { pattern: /\be107\b/gi, name: "E107 (Yellow 2G)" },
  { pattern: /\be110\b/gi, name: "E110 (Sunset Yellow)" },
  { pattern: /\be122\b/gi, name: "E122 (Carmoisine)" },
  { pattern: /\be123\b/gi, name: "E123 (Amaranth)" },
  { pattern: /\be124\b/gi, name: "E124 (Ponceau 4R)" },
  { pattern: /\be127\b/gi, name: "E127 (Erythrosine)" },
  { pattern: /\be128\b/gi, name: "E128 (Red 2G)" },
  { pattern: /\be129\b/gi, name: "E129 (Allura Red)" },
  { pattern: /\be131\b/gi, name: "E131 (Patent Blue V)" },
  { pattern: /\be132\b/gi, name: "E132 (Indigo Carmine)" },
  { pattern: /\be133\b/gi, name: "E133 (Brilliant Blue)" },
  { pattern: /\be141\b/gi, name: "E141 (Copper Chlorophyll)" },
  { pattern: /\be142\b/gi, name: "E142 (Green S)" },
  { pattern: /\be150a\b/gi, name: "E150a (Caramel I)" },
  { pattern: /\be150b\b/gi, name: "E150b (Caramel II)" },
  { pattern: /\be150c\b/gi, name: "E150c (Caramel III)" },
  { pattern: /\be150d\b/gi, name: "E150d (Caramel IV)" },
  { pattern: /\be150\b/gi, name: "E150 (Caramel)" },
  { pattern: /\be151\b/gi, name: "E151 (Brilliant Black)" },
  { pattern: /\be154\b/gi, name: "E154 (Brown FK)" },
  { pattern: /\be155\b/gi, name: "E155 (Brown HT)" },
  { pattern: /\be171\b/gi, name: "E171 (Titanium Dioxide)" },
  { pattern: /\be172\b/gi, name: "E172 (Iron Oxides)" },
  { pattern: /\be173\b/gi, name: "E173 (Aluminum)" },
  { pattern: /\be174\b/gi, name: "E174 (Silver)" },
  { pattern: /\be175\b/gi, name: "E175 (Gold)" },
  { pattern: /\be180\b/gi, name: "E180 (Litholrubine BK)" },

  // Other Synthetic Patterns Only (removed natural colors: carmine, cochineal, annatto, beta-carotene, riboflavin, turmeric, paprika extract, beetroot red)
  { pattern: /caramel\s+colou?r(?:ing)?/gi, name: "Caramel Color" },
  { pattern: /artificial\s+colou?r(?:ing)?s?/gi, name: "Artificial Color" },
  { pattern: /titanium\s+dioxide/gi, name: "Titanium Dioxide" },
  { pattern: /iron\s+oxide/gi, name: "Iron Oxide" },
];

// Whitelist of natural/commonly accepted ingredients that should NOT be flagged as artificial
const NATURAL_INGREDIENTS_WHITELIST = [
  // Natural acids
  "citric acid",
  "lactic acid",
  "malic acid",
  "tartaric acid",
  "fumaric acid",
  "adipic acid",

  // Natural gums and thickeners
  "guar gum",
  "xanthan gum",
  "cellulose gum",
  "microcrystalline cellulose",
  "carboxymethyl cellulose",
  "carboxymethylcellulose",
  "hydroxypropyl cellulose",
  "hydroxypropylcellulose",
  "methylcellulose",

  // Natural emulsifiers
  "lecithin",
  "soy lecithin",
  "sunflower lecithin",

  // Seaweed-derived
  "carrageenan",
  "sodium alginate",
  "calcium alginate",
  "agar",
  "agar-agar",

  // Natural flavor enhancers
  "yeast extract",
  "autolyzed yeast",

  // Natural sweeteners and syrups
  "maltodextrin",
  "dextrin",
  "corn syrup solids",
  "glucose syrup",
  "invert sugar",

  // Common natural preservatives
  "sodium benzoate",
  "potassium benzoate",
  "calcium benzoate",
  "benzoic acid",
  "potassium sorbate",
  "sodium sorbate",
  "calcium sorbate",
  "sorbic acid",

  // Natural phosphates
  "sodium phosphate",
  "disodium phosphate",
  "trisodium phosphate",
  "sodium acid pyrophosphate",
  "sodium tripolyphosphate",
  "tetrasodium pyrophosphate",
  "dipotassium phosphate",
  "monocalcium phosphate",
  "dicalcium phosphate",
  "tricalcium phosphate",

  // Natural anticaking agents
  "silicon dioxide",
  "calcium silicate",
  "magnesium carbonate",

  // Other natural/commonly accepted ingredients
  "calcium chloride",
  "potassium chloride",
  "sodium erythorbate",
  "mono and diglycerides",
  "monoglycerides",
  "diglycerides",
  "sodium stearoyl lactylate",
  "calcium stearoyl lactylate",
  "diacetyl tartaric acid",
  "datem",

  // Modified starches (processed but from natural sources)
  "modified corn starch",
  "modified food starch",
  "modified potato starch",
  "modified tapioca starch",
  "modified wheat starch",

  // Sulfites (can be natural or synthetic, but commonly used)
  "sodium sulfite",
  "sodium bisulfite",
  "sodium metabisulfite",
  "potassium metabisulfite",
  "sulfur dioxide",

  // Natural preservatives
  "calcium propionate",
  "sodium propionate",
  "propionic acid",

  // Natural minerals
  "phosphoric acid",
  "ammonium bicarbonate",
  "ammonium chloride",
  "sodium aluminosilicate",
];

// Pre-compiled artificial ingredient patterns (for truly synthetic/artificial chemicals only)
const ARTIFICIAL_INGREDIENT_PATTERNS = [
  // Artificial Flavors (must have "artificial" prefix)
  {
    pattern: /artificial\s+flavor(?:ing)?s?/gi,
    name: "Artificial Flavoring",
  },
  {
    pattern: /natural\s+and\s+artificial\s+flavor(?:ing)?s?/gi,
    name: "Natural and Artificial Flavoring",
  },

  // Artificial Colors (generic catch-all terms)
  {
    pattern: /artificial\s+colou?r(?:ing)?s?/gi,
    name: "Artificial Coloring",
  },
  {
    pattern: /natural\s+and\s+artificial\s+colou?r(?:ing)?s?/gi,
    name: "Natural and Artificial Coloring",
  },

  // Artificial Sweeteners (truly synthetic)
  { pattern: /aspartame/gi, name: "Aspartame" },
  { pattern: /sucralose/gi, name: "Sucralose" },
  { pattern: /acesulfame\s*(?:k|potassium)/gi, name: "Acesulfame K" },
  { pattern: /saccharin/gi, name: "Saccharin" },
  { pattern: /neotame/gi, name: "Neotame" },
  { pattern: /advantame/gi, name: "Advantame" },
  { pattern: /cyclamate/gi, name: "Cyclamate" },
  { pattern: /erythritol/gi, name: "Erythritol" },

  // Synthetic Preservatives
  { pattern: /\bbha\b/gi, name: "BHA" },
  { pattern: /\bbht\b/gi, name: "BHT" },
  { pattern: /tbhq/gi, name: "TBHQ" },
  { pattern: /propyl\s+gallate/gi, name: "Propyl Gallate" },
  { pattern: /octyl\s+gallate/gi, name: "Octyl Gallate" },
  { pattern: /dodecyl\s+gallate/gi, name: "Dodecyl Gallate" },
  { pattern: /ethoxyquin/gi, name: "Ethoxyquin" },
  { pattern: /parabens?/gi, name: "Parabens" },
  { pattern: /methylparaben/gi, name: "Methylparaben" },
  { pattern: /propylparaben/gi, name: "Propylparaben" },
  { pattern: /butylparaben/gi, name: "Butylparaben" },

  // Nitrites/Nitrates (synthetic preservatives)
  { pattern: /sodium\s+nitrite/gi, name: "Sodium Nitrite" },
  { pattern: /sodium\s+nitrate/gi, name: "Sodium Nitrate" },
  { pattern: /potassium\s+nitrite/gi, name: "Potassium Nitrite" },
  { pattern: /potassium\s+nitrate/gi, name: "Potassium Nitrate" },

  // Synthetic Emulsifiers & Stabilizers
  { pattern: /polysorbate\s+\d+/gi, name: "Polysorbate" },
  { pattern: /propylene\s+glycol/gi, name: "Propylene Glycol" },
  { pattern: /polyethylene\s+glycol/gi, name: "Polyethylene Glycol" },
  { pattern: /\bpeg\b/gi, name: "PEG" },

  // Hydrogenated Oils (synthetic/processed)
  {
    pattern: /partially\s+hydrogenated/gi,
    name: "Partially Hydrogenated Oil",
  },
  { pattern: /fully\s+hydrogenated/gi, name: "Fully Hydrogenated Oil" },
  {
    pattern: /hydrogenated\s+(?:vegetable|soybean|palm|coconut)\s+oil/gi,
    name: "Hydrogenated Oil",
  },
  { pattern: /interesterified/gi, name: "Interesterified Oil" },

  // High Fructose Corn Syrup
  {
    pattern: /high\s+fructose\s+corn\s+syrup/gi,
    name: "High Fructose Corn Syrup",
  },
  { pattern: /\bhfcs\b/gi, name: "HFCS" },

  // Synthetic Flavor Enhancers
  { pattern: /monosodium\s+glutamate/gi, name: "Monosodium Glutamate" },
  { pattern: /\bmsg\b/gi, name: "MSG" },
  { pattern: /disodium\s+guanylate/gi, name: "Disodium Guanylate" },
  { pattern: /disodium\s+inosinate/gi, name: "Disodium Inosinate" },
  {
    pattern: /disodium\s+5['\u2019-]ribonucleotides/gi,
    name: "Disodium Ribonucleotides",
  },
  {
    pattern: /hydrolyzed\s+(?:vegetable|soy|corn|wheat)\s+protein/gi,
    name: "Hydrolyzed Protein",
  },

  // Bleaching & Maturing Agents (synthetic)
  { pattern: /benzoyl\s+peroxide/gi, name: "Benzoyl Peroxide" },
  { pattern: /chlorine\s+dioxide/gi, name: "Chlorine Dioxide" },
  { pattern: /azodicarbonamide/gi, name: "Azodicarbonamide" },
  { pattern: /potassium\s+bromate/gi, name: "Potassium Bromate" },

  // Synthetic Vitamins & Additives
  { pattern: /pyridoxine\s+hydrochloride/gi, name: "Pyridoxine Hydrochloride" },
  { pattern: /l-carnitine\s+l-tartrate/gi, name: "L-Carnitine L-Tartrate" },

  // Synthetic Colors (E-Numbers)
  { pattern: /\be102\b/gi, name: "E102 (Tartrazine)" },
  { pattern: /\be104\b/gi, name: "E104 (Quinoline Yellow)" },
  { pattern: /\be110\b/gi, name: "E110 (Sunset Yellow)" },
  { pattern: /\be122\b/gi, name: "E122 (Carmoisine)" },
  { pattern: /\be123\b/gi, name: "E123 (Amaranth)" },
  { pattern: /\be124\b/gi, name: "E124 (Ponceau 4R)" },
  { pattern: /\be129\b/gi, name: "E129 (Allura Red)" },
  { pattern: /\be131\b/gi, name: "E131 (Patent Blue V)" },
  { pattern: /\be132\b/gi, name: "E132 (Indigo Carmine)" },
  { pattern: /\be133\b/gi, name: "E133 (Brilliant Blue)" },
  { pattern: /\be142\b/gi, name: "E142 (Green S)" },
  { pattern: /\be171\b/gi, name: "E171 (Titanium Dioxide)" },

  // Other Synthetic E-Numbers
  { pattern: /\be319\b/gi, name: "E319 (TBHQ)" },
  { pattern: /\be320\b/gi, name: "E320 (BHA)" },
  { pattern: /\be321\b/gi, name: "E321 (BHT)" },
  { pattern: /\be433\b/gi, name: "E433 (Polysorbate 80)" },
  { pattern: /\be621\b/gi, name: "E621 (MSG)" },
  { pattern: /\be622\b/gi, name: "E622 (Monopotassium Glutamate)" },
  { pattern: /\be627\b/gi, name: "E627 (Disodium Guanylate)" },
  { pattern: /\be631\b/gi, name: "E631 (Disodium Inosinate)" },
  { pattern: /\be951\b/gi, name: "E951 (Aspartame)" },
  { pattern: /\be952\b/gi, name: "E952 (Cyclamate)" },
  { pattern: /\be954\b/gi, name: "E954 (Saccharin)" },
  { pattern: /\be955\b/gi, name: "E955 (Sucralose)" },

  // Other Synthetic Ingredients
  { pattern: /titanium\s+dioxide/gi, name: "Titanium Dioxide" },
  { pattern: /aluminum\s+(?:sulfate|lake)/gi, name: "Aluminum Compounds" },
];

// Pre-compiled sweetener patterns
const SWEETENER_PATTERNS = [
  { pattern: /aspartame/gi, name: "Aspartame" },
  { pattern: /sucralose/gi, name: "Sucralose" },
  { pattern: /acesulfame\s*(?:k|potassium)/gi, name: "Acesulfame K" },
  { pattern: /saccharin/gi, name: "Saccharin" },
  { pattern: /neotame/gi, name: "Neotame" },
  { pattern: /advantame/gi, name: "Advantame" },
  { pattern: /stevia/gi, name: "Stevia" },
  { pattern: /monk\s+fruit/gi, name: "Monk Fruit" },
  { pattern: /erythritol/gi, name: "Erythritol" },
  { pattern: /xylitol/gi, name: "Xylitol" },
  { pattern: /sorbitol/gi, name: "Sorbitol" },
  { pattern: /mannitol/gi, name: "Mannitol" },
  { pattern: /maltitol/gi, name: "Maltitol" },
  { pattern: /isomalt/gi, name: "Isomalt" },
  { pattern: /lactitol/gi, name: "Lactitol" },
  { pattern: /allulose/gi, name: "Allulose" },
  { pattern: /corn\s+syrup/gi, name: "Corn Syrup" },
  {
    pattern: /high\s+fructose\s+corn\s+syrup|hfcs/gi,
    name: "High Fructose Corn Syrup",
  },
  { pattern: /tapioca\s+syrup/gi, name: "Tapioca Syrup" },
  { pattern: /rice\s+syrup/gi, name: "Rice Syrup" },
  { pattern: /brown\s+rice\s+syrup/gi, name: "Brown Rice Syrup" },
  { pattern: /agave/gi, name: "Agave" },
  { pattern: /honey/gi, name: "Honey" },
  { pattern: /maple\s+syrup/gi, name: "Maple Syrup" },
  { pattern: /molasses/gi, name: "Molasses" },
  { pattern: /maltodextrin/gi, name: "Maltodextrin" },
  { pattern: /dextrose/gi, name: "Dextrose" },
  { pattern: /fructose/gi, name: "Fructose" },
  { pattern: /glucose/gi, name: "Glucose" },
  { pattern: /maltose/gi, name: "Maltose" },
  { pattern: /sucrose/gi, name: "Sucrose" },
  { pattern: /coconut\s+sugar/gi, name: "Coconut Sugar" },
  { pattern: /date\s+sugar/gi, name: "Date Sugar" },
  { pattern: /cane\s+sugar/gi, name: "Cane Sugar" },
  { pattern: /\bsugar\b/gi, name: "Sugar" },

  // Fruit concentrates and syrups (hidden sugars)
  {
    pattern: /pomegranate\s+(?:juice\s+)?concentrate/gi,
    name: "Pomegranate Concentrate",
  },
  { pattern: /grape\s+(?:juice\s+)?concentrate/gi, name: "Grape Concentrate" },
  {
    pattern: /white\s+grape\s+(?:juice\s+)?concentrate/gi,
    name: "White Grape Concentrate",
  },
  { pattern: /apple\s+(?:juice\s+)?concentrate/gi, name: "Apple Concentrate" },
  { pattern: /pear\s+(?:juice\s+)?concentrate/gi, name: "Pear Concentrate" },
  {
    pattern: /orange\s+(?:juice\s+)?concentrate/gi,
    name: "Orange Concentrate",
  },
  {
    pattern: /cherry\s+(?:juice\s+)?concentrate/gi,
    name: "Cherry Concentrate",
  },
  {
    pattern: /pineapple\s+(?:juice\s+)?concentrate/gi,
    name: "Pineapple Concentrate",
  },
  { pattern: /peach\s+(?:juice\s+)?concentrate/gi, name: "Peach Concentrate" },
  { pattern: /mango\s+(?:juice\s+)?concentrate/gi, name: "Mango Concentrate" },
  { pattern: /date\s+(?:paste|syrup)/gi, name: "Date Paste/Syrup" },
  { pattern: /fruit\s+(?:juice\s+)?concentrate/gi, name: "Fruit Concentrate" },
];

// Helper function to check if an ingredient is whitelisted
function isWhitelisted(ingredient) {
  if (!ingredient) return false;
  const normalized = ingredient.toLowerCase().trim();
  return NATURAL_INGREDIENTS_WHITELIST.some((whitelisted) =>
    normalized.includes(whitelisted),
  );
}

// Helper function to detect matches from pre-compiled patterns
function findMatches(ingredientsText, patterns, useWhitelist = false) {
  if (!ingredientsText) return [];

  const results = [];
  const seen = new Set();

  for (const { pattern } of patterns) {
    const matches = ingredientsText.match(pattern);
    if (matches) {
      for (const match of matches) {
        const normalized = match.toLowerCase();

        // Skip if this ingredient is whitelisted (only for artificial ingredients)
        if (useWhitelist && isWhitelisted(match)) {
          continue;
        }

        if (!seen.has(normalized)) {
          seen.add(normalized);
          results.push(match);
        }
      }
    }
  }

  return results;
}

// Helper function to detect artificial colors
export function detectArtificialColors(ingredientsText) {
  return findMatches(ingredientsText, ARTIFICIAL_COLOR_PATTERNS);
}

// Helper function to detect artificial ingredients
export function detectArtificialIngredients(ingredientsText) {
  return findMatches(ingredientsText, ARTIFICIAL_INGREDIENT_PATTERNS, true); // Enable whitelist
}

// Helper function to detect sweeteners
export function detectSweeteners(ingredientsText) {
  return findMatches(ingredientsText, SWEETENER_PATTERNS);
}

// Helper function to detect artificial sweeteners specifically
export function detectArtificialSweeteners(ingredientsText) {
  if (!ingredientsText) return [];

  const artificialSweetenerPatterns = [
    { pattern: /aspartame/gi, name: "Aspartame" },
    { pattern: /sucralose/gi, name: "Sucralose" },
    { pattern: /acesulfame\s*k/gi, name: "Acesulfame K" },
    { pattern: /saccharin/gi, name: "Saccharin" },
    { pattern: /neotame/gi, name: "Neotame" },
    { pattern: /advantame/gi, name: "Advantame" },
  ];

  return findMatches(ingredientsText, artificialSweetenerPatterns);
}

// Helper function to check if an ingredient is an artificial sweetener
export function isArtificialSweetener(ingredient) {
  if (!ingredient) return false;

  const artificialSweeteners = [
    "aspartame",
    "sucralose",
    "acesulfame k",
    "acesulfame potassium",
    "saccharin",
    "neotame",
    "advantame",
    "cyclamate",
    "xylitol",
    "erythritol",
    "sorbitol",
    "mannitol",
    "maltitol",
    "isomalt",
    "lactitol",
    "e951", // aspartame
    "e955", // sucralose
    "e950", // acesulfame k
    "e954", // saccharin
    "e952", // cyclamate
    "e967", // xylitol
    "e968", // erythritol
    "e420", // sorbitol
    "e421", // mannitol
    "e965", // maltitol
  ];

  const lowerIngredient = ingredient.toLowerCase();
  return artificialSweeteners.some((sweet) => lowerIngredient.includes(sweet));
}
