// Ingredient database for detection - comprehensive list
export const INGREDIENT_DATABASE = {
  // ALL SWEETENERS (for the Sweeteners section)
  sweeteners: {
    // Artificial sweeteners
    artificial: [
      { names: ["aspartame", "e951"], displayName: "Aspartame" },
      {
        names: [
          "acesulfame k",
          "acesulfame potassium",
          "acesulfame-k",
          "ace-k",
          "e950",
        ],
        displayName: "Acesulfame K",
      },
      { names: ["sucralose", "e955"], displayName: "Sucralose" },
      { names: ["saccharin", "e954"], displayName: "Saccharin" },
      { names: ["neotame", "e961"], displayName: "Neotame" },
      { names: ["advantame", "e969"], displayName: "Advantame" },
      { names: ["cyclamate", "e952"], displayName: "Cyclamate" },
    ],

    // Natural sweeteners
    natural: [
      {
        names: ["sugar", "sucrose", "cane sugar", "beet sugar"],
        displayName: "Sugar",
      },
      {
        names: ["brown sugar", "light brown sugar", "dark brown sugar"],
        displayName: "Brown Sugar",
      },
      {
        names: ["raw sugar", "turbinado sugar", "demerara sugar"],
        displayName: "Raw Sugar",
      },
      {
        names: ["muscovado sugar", "muscovado"],
        displayName: "Muscovado Sugar",
      },
      {
        names: ["glucose", "dextrose", "glucose syrup"],
        displayName: "Glucose",
      },
      { names: ["fructose"], displayName: "Fructose" },
      {
        names: ["invert sugar", "invert syrup", "inverted sugar syrup"],
        displayName: "Invert Sugar",
      },
      { names: ["trehalose"], displayName: "Trehalose" },
      { names: ["allulose", "d-psicose"], displayName: "Allulose" },
      { names: ["tagatose", "d-tagatose"], displayName: "Tagatose" },
      { names: ["honey"], displayName: "Honey" },
      { names: ["maple syrup"], displayName: "Maple Syrup" },
      { names: ["agave", "agave nectar", "agave syrup"], displayName: "Agave" },
      { names: ["molasses"], displayName: "Molasses" },
      {
        names: ["corn syrup", "high fructose corn syrup", "hfcs"],
        displayName: "Corn Syrup",
      },
      {
        names: [
          "malt syrup",
          "barley malt syrup",
          "malted barley syrup",
          "rice malt syrup",
          "malt extract",
          "barley malt extract",
        ],
        displayName: "Malt Syrup",
      },
      {
        names: ["rice syrup", "organic rice syrup"],
        displayName: "Rice Syrup",
      },
      { names: ["brown rice syrup"], displayName: "Brown Rice Syrup" },
      {
        names: ["tapioca syrup", "tapioca sweetener"],
        displayName: "Tapioca Syrup",
      },
      {
        names: ["yacon syrup", "yacon root syrup"],
        displayName: "Yacon Syrup",
      },
      {
        names: ["stevia", "steviol glycosides", "e960"],
        displayName: "Stevia",
      },
      { names: ["monk fruit", "luo han guo"], displayName: "Monk Fruit" },
      { names: ["coconut sugar"], displayName: "Coconut Sugar" },
      {
        names: ["coconut nectar", "coconut syrup"],
        displayName: "Coconut Nectar",
      },
      { names: ["date sugar"], displayName: "Date Sugar" },
      {
        names: ["evaporated cane juice", "dried cane syrup"],
        displayName: "Evaporated Cane Juice",
      },

      // Fruit concentrates and syrups (hidden sugars)
      {
        names: ["pomegranate concentrate", "pomegranate juice concentrate"],
        displayName: "Pomegranate Concentrate",
      },
      {
        names: ["grape concentrate", "grape juice concentrate"],
        displayName: "Grape Concentrate",
      },
      {
        names: ["white grape concentrate", "white grape juice concentrate"],
        displayName: "White Grape Concentrate",
      },
      {
        names: ["apple concentrate", "apple juice concentrate"],
        displayName: "Apple Concentrate",
      },
      {
        names: ["pear concentrate", "pear juice concentrate"],
        displayName: "Pear Concentrate",
      },
      {
        names: ["orange concentrate", "orange juice concentrate"],
        displayName: "Orange Concentrate",
      },
      {
        names: ["cherry concentrate", "cherry juice concentrate"],
        displayName: "Cherry Concentrate",
      },
      {
        names: ["pineapple concentrate", "pineapple juice concentrate"],
        displayName: "Pineapple Concentrate",
      },
      {
        names: ["peach concentrate", "peach juice concentrate"],
        displayName: "Peach Concentrate",
      },
      {
        names: ["mango concentrate", "mango juice concentrate"],
        displayName: "Mango Concentrate",
      },
      {
        names: ["date paste", "date syrup"],
        displayName: "Date Paste/Syrup",
      },
      {
        names: ["fruit concentrate", "fruit juice concentrate"],
        displayName: "Fruit Concentrate",
      },
    ],

    // Sugar alcohols
    sugarAlcohols: [
      { names: ["erythritol", "e968"], displayName: "Erythritol" },
      { names: ["xylitol", "e967"], displayName: "Xylitol" },
      { names: ["sorbitol", "e420"], displayName: "Sorbitol" },
      { names: ["mannitol", "e421"], displayName: "Mannitol" },
      { names: ["maltitol", "e965"], displayName: "Maltitol" },
      { names: ["isomalt", "e953"], displayName: "Isomalt" },
      { names: ["lactitol", "e966"], displayName: "Lactitol" },
    ],
  },

  // ALL COLORS (artificial for display, natural for reference)
  colors: {
    // Artificial colors (for the Artificial Colors section)
    artificial: [
      {
        names: [
          "red 40",
          "red no 40",
          "red#40",
          "red no. 40",
          "allura red",
          "e129",
        ],
        displayName: "Red 40",
      },
      {
        names: [
          "yellow 5",
          "yellow no 5",
          "yellow#5",
          "yellow no. 5",
          "tartrazine",
          "e102",
        ],
        displayName: "Yellow 5",
      },
      {
        names: [
          "yellow 6",
          "yellow no 6",
          "yellow#6",
          "yellow no. 6",
          "sunset yellow",
          "e110",
        ],
        displayName: "Yellow 6",
      },
      {
        names: [
          "blue 1",
          "blue no 1",
          "blue#1",
          "blue no. 1",
          "brilliant blue",
          "e133",
        ],
        displayName: "Blue 1",
      },
      {
        names: [
          "blue 2",
          "blue no 2",
          "blue#2",
          "blue no. 2",
          "indigo carmine",
          "e132",
        ],
        displayName: "Blue 2",
      },
      {
        names: [
          "green 3",
          "green no 3",
          "green#3",
          "green no. 3",
          "fast green",
          "e143",
        ],
        displayName: "Green 3",
      },
      {
        names: [
          "red 3",
          "red no 3",
          "red#3",
          "red no. 3",
          "erythrosine",
          "e127",
        ],
        displayName: "Red 3",
      },
      { names: ["orange b"], displayName: "Orange B" },
      { names: ["citrus red 2"], displayName: "Citrus Red 2" },
    ],

    // Natural colors (for reference, not displayed in any section)
    natural: [
      { names: ["beta carotene", "e160a"], displayName: "Beta Carotene" },
      { names: ["turmeric", "curcumin", "e100"], displayName: "Turmeric" },
      { names: ["beet juice", "beetroot"], displayName: "Beet Juice" },
      { names: ["annatto", "e160b"], displayName: "Annatto" },
      { names: ["paprika extract", "e160c"], displayName: "Paprika Extract" },
      { names: ["carmine", "cochineal", "e120"], displayName: "Carmine" },
    ],
  },

  // ARTIFICIAL INGREDIENTS (for the Artificial Ingredients section)
  artificialIngredients: {
    // Preservatives
    preservatives: [
      {
        names: ["sodium benzoate", "benzoate of soda", "e211"],
        displayName: "Sodium Benzoate",
      },
      {
        names: ["potassium benzoate", "e212"],
        displayName: "Potassium Benzoate",
      },
      { names: ["sodium nitrite", "e250"], displayName: "Sodium Nitrite" },
      { names: ["sodium nitrate", "e251"], displayName: "Sodium Nitrate" },
      {
        names: ["bha", "butylated hydroxyanisole", "e320"],
        displayName: "BHA",
      },
      {
        names: ["bht", "butylated hydroxytoluene", "e321"],
        displayName: "BHT",
      },
      {
        names: ["tbhq", "tert-butylhydroquinone", "e319"],
        displayName: "TBHQ",
      },
      {
        names: ["potassium sorbate", "e202"],
        displayName: "Potassium Sorbate",
      },
      {
        names: ["calcium propionate", "e282"],
        displayName: "Calcium Propionate",
      },
      {
        names: ["sodium propionate", "e281"],
        displayName: "Sodium Propionate",
      },
      { names: ["propionic acid", "e280"], displayName: "Propionic Acid" },
      { names: ["sorbic acid", "e200"], displayName: "Sorbic Acid" },
      { names: ["benzoic acid", "e210"], displayName: "Benzoic Acid" },
      {
        names: ["tetrasodium pyrophosphate", "tspp", "e450"],
        displayName: "Tetrasodium Pyrophosphate",
      },
    ],

    // Flavor enhancers
    flavorEnhancers: [
      { names: ["msg", "monosodium glutamate", "e621"], displayName: "MSG" },
      {
        names: ["disodium guanylate", "e627"],
        displayName: "Disodium Guanylate",
      },
      {
        names: ["disodium inosinate", "e631"],
        displayName: "Disodium Inosinate",
      },
      {
        names: ["disodium 5-ribonucleotides", "e635"],
        displayName: "Disodium 5-Ribonucleotides",
      },
    ],

    // Synthetic emulsifiers
    emulsifiers: [
      { names: ["polysorbate 80", "e433"], displayName: "Polysorbate 80" },
      { names: ["polysorbate 60", "e435"], displayName: "Polysorbate 60" },
      { names: ["polysorbate 20", "e432"], displayName: "Polysorbate 20" },
      {
        names: ["sorbitan monostearate", "e491"],
        displayName: "Sorbitan Monostearate",
      },
      { names: ["pgpr", "e476"], displayName: "PGPR" },
    ],

    // Thickeners and stabilizers
    thickeners: [
      { names: ["carrageenan", "e407"], displayName: "Carrageenan" },
      { names: ["cellulose gum", "cmc", "e466"], displayName: "Cellulose Gum" },
    ],
  },
};

// Get all sweeteners (artificial + natural + sugar alcohols) for the Sweeteners section
export function getAllSweeteners() {
  return [
    ...INGREDIENT_DATABASE.sweeteners.artificial.map((item) => ({
      ...item,
      type: "sweetener",
      subtype: "artificial",
    })),
    ...INGREDIENT_DATABASE.sweeteners.natural.map((item) => ({
      ...item,
      type: "sweetener",
      subtype: "natural",
    })),
    ...INGREDIENT_DATABASE.sweeteners.sugarAlcohols.map((item) => ({
      ...item,
      type: "sweetener",
      subtype: "sugarAlcohol",
    })),
  ];
}

// Get artificial colors for the Artificial Colors section
export function getArtificialColors() {
  return INGREDIENT_DATABASE.colors.artificial.map((item) => ({
    ...item,
    type: "color",
  }));
}

// Get all artificial ingredients for the Artificial Ingredients section
export function getArtificialIngredients() {
  return [
    ...INGREDIENT_DATABASE.artificialIngredients.preservatives.map((item) => ({
      ...item,
      type: "artificial",
      subtype: "preservative",
    })),
    ...INGREDIENT_DATABASE.artificialIngredients.flavorEnhancers.map(
      (item) => ({
        ...item,
        type: "artificial",
        subtype: "flavorEnhancer",
      }),
    ),
    ...INGREDIENT_DATABASE.artificialIngredients.emulsifiers.map((item) => ({
      ...item,
      type: "artificial",
      subtype: "emulsifier",
    })),
    ...INGREDIENT_DATABASE.artificialIngredients.thickeners.map((item) => ({
      ...item,
      type: "artificial",
      subtype: "thickener",
    })),
  ];
}

// Get all ingredients flattened for search/matching
export function getAllIngredients() {
  return [
    ...getAllSweeteners(),
    ...getArtificialColors(),
    ...getArtificialIngredients(),
    // Include natural colors for reference but they won't be displayed
    ...INGREDIENT_DATABASE.colors.natural.map((item) => ({
      ...item,
      type: "color",
      subtype: "natural",
    })),
  ];
}
