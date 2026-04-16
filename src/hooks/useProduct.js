import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect, useMemo } from "react";
import { parseIngredients } from "@/utils/ingredientUtils";
import { detectAllIngredients } from "@/utils/ingredientMatcher";
import { useScanHistory } from "@/hooks/useScanHistory";

const MOCK_BARCODE = "0000000000000";
const MOCK_PRODUCT = {
  barcode: "0000000000000",
  name: "Calm Skin Balm",
  brand: "Verdana",
  ingredients: "Organic Aloe Barbadensis Leaf Juice, Organic Butyrospermum Parkii (Shea) Butter, Vegetable Glycerin, Simmondsia Chinensis (Jojoba) Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Squalane (Olive Derived), Leuconostoc/Radish Root Ferment Filtrate, Euphorbia Cerifera (Candelilla) Wax, Lactobacillus Ferment, Cocos Nucifera (Coconut) Fruit Extract, Avena Sativa (Colloidal Oatmeal) Kernel Flour, Sodium Hyaluronate (Plant-Derived), Calendula Officinalis Flower Extract, Tocopherol (Non-GMO Vitamin E), Amorphophallus Konjac Root Powder, Rosmarinus Officinalis (Rosemary) Leaf Extract",
  allergens: [],
  traces: [],
  crossContaminationWarnings: [],
  additives_tags: [],
  ingredients_analysis_tags: [],
  ingredients_tags: [],
  nutritional_info: {},
  image_url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
};

// Fetch product directly from Open Beauty Facts
async function fetchProduct(barcode) {
  // Uncomment to test "No concerns found" green card — scan barcode 0000000000000
  // if (barcode === MOCK_BARCODE) return MOCK_PRODUCT;

  const response = await fetch(
    `https://world.openbeautyfacts.org/api/v0/product/${barcode}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to lookup product");
  }

  const data = await response.json();

  if (data.status === 0) {
    throw new Error("Product not found in database");
  }

  const product = data.product;

  return {
    barcode,
    name: product.product_name || "Unknown Product",
    brand: product.brands || null,
    ingredients: product.ingredients_text || null,
    allergens: product.allergens_tags || [],
    traces: product.traces_tags || [],
    crossContaminationWarnings: [],
    additives_tags: product.additives_tags || [],
    ingredients_analysis_tags: product.ingredients_analysis_tags || [],
    ingredients_tags: product.ingredients_tags || [],
    nutritional_info: {
      energy_kcal: product.nutriments?.["energy-kcal"] || null,
      fat: product.nutriments?.fat || null,
      saturated_fat: product.nutriments?.["saturated-fat"] || null,
      carbohydrates: product.nutriments?.carbohydrates || null,
      sugars: product.nutriments?.sugars || null,
      fiber: product.nutriments?.fiber || null,
      proteins: product.nutriments?.proteins || null,
      salt: product.nutriments?.salt || null,
      sodium: product.nutriments?.sodium || null,
    },
    image_url: product.image_url || product.image_front_url || null,
  };
}

export function useProduct(barcode) {
  const queryClient = useQueryClient();
  const { addToHistory } = useScanHistory();
  const savedBarcodeRef = useRef(null);

  // Query for product data
  const productQuery = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => fetchProduct(barcode),
    enabled: !!barcode,
    staleTime: 1000 * 60 * 30, // 30 minutes - products don't change often
  });

  // Auto-save to scan history when product is loaded (only once per barcode)
  const product = productQuery.data;
  useEffect(() => {
    if (product && savedBarcodeRef.current !== product.barcode) {
      savedBarcodeRef.current = product.barcode;
      addToHistory(product.barcode, product.name);
    }
  }, [product, addToHistory]);

  // OPTIMIZATION 1: Cache parsed ingredients (runs once per product load)
  const parsedIngredients = useMemo(() => {
    if (!product?.ingredients) return [];
    return parseIngredients(product.ingredients);
  }, [product?.ingredients]);

  // OPTIMIZATION 2: Cache detection results (runs once per product load)
  const detectedIngredients = useMemo(() => {
    if (!product)
      return {
        artificialColors: [],
        artificialIngredients: [],
        syntheticFragrances: [],
        parabens: [],
        pfas: [],
        sulfates: [],
      };
    return detectAllIngredients(product);
  }, [product]);

  return {
    product: productQuery.data,
    isLoading: productQuery.isPending && !productQuery.isError,
    error: productQuery.error?.message || null, // Convert Error object to string
    refetch: productQuery.refetch,
    // Cached, pre-computed data for better performance
    parsedIngredients,
    detectedIngredients,
  };
}
