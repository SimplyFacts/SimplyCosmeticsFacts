import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect, useMemo } from "react";
import { parseIngredients } from "@/utils/ingredientUtils";
import { detectAllIngredients } from "@/utils/ingredientMatcher";
import { useScanHistory } from "@/hooks/useScanHistory";

// Fetch product from local DB or OpenBeautyFacts
async function fetchProduct(barcode) {
  // First try local database
  let response = await fetch(`/api/products?barcode=${barcode}`);

  if (!response.ok) {
    // If not found locally, try OpenBeautyFacts
    response = await fetch(`/api/products/lookup?barcode=${barcode}`);

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const productData = await response.json();

    // Save to local database for future use (fire and forget)
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    }).catch((error) =>
      console.error("Failed to save product to database:", error),
    );

    return productData;
  }

  return response.json();
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
