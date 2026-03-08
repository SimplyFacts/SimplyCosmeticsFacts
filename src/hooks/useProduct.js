import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect, useMemo } from "react";
import { parseIngredients } from "@/utils/ingredientUtils";
import { detectAllIngredients } from "@/utils/ingredientMatcher";

// Fetch product from local DB or OpenFoodFacts
async function fetchProduct(barcode) {
  // First try local database
  let response = await fetch(`/api/products?barcode=${barcode}`);

  if (!response.ok) {
    // If not found locally, try OpenFoodFacts
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

// Save scan to history
async function saveScanHistory(barcode, productName) {
  const response = await fetch("/api/scan-history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      barcode,
      product_name: productName,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save scan history");
  }

  return response.json();
}

export function useProduct(barcode) {
  const queryClient = useQueryClient();
  const savedBarcodeRef = useRef(null);

  // Query for product data
  const productQuery = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => fetchProduct(barcode),
    enabled: !!barcode,
    staleTime: 1000 * 60 * 30, // 30 minutes - products don't change often
  });

  // Mutation for saving scan history
  const scanHistoryMutation = useMutation({
    mutationFn: ({ barcode, productName }) =>
      saveScanHistory(barcode, productName),
    onSuccess: () => {
      // Invalidate scan history to refresh the history tab
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    },
  });

  const { mutate: saveToHistory } = scanHistoryMutation;

  // Auto-save to scan history when product is loaded (only once per barcode)
  const product = productQuery.data;
  useEffect(() => {
    if (product && savedBarcodeRef.current !== product.barcode) {
      savedBarcodeRef.current = product.barcode;
      saveToHistory({
        barcode: product.barcode,
        productName: product.name,
      });
    }
  }, [product, saveToHistory]);

  // OPTIMIZATION 1: Cache parsed ingredients (runs once per product load)
  const parsedIngredients = useMemo(() => {
    if (!product?.ingredients) return [];
    return parseIngredients(product.ingredients);
  }, [product?.ingredients]);

  // OPTIMIZATION 2: Cache detection results (runs once per product load)
  const detectedIngredients = useMemo(() => {
    if (!product)
      return {
        sweeteners: [],
        artificialColors: [],
        artificialIngredients: [],
      };
    return detectAllIngredients(product);
  }, [product]);

  return {
    product: productQuery.data,
    isLoading: productQuery.isLoading,
    error: productQuery.error?.message || null, // Convert Error object to string
    refetch: productQuery.refetch,
    // Cached, pre-computed data for better performance
    parsedIngredients,
    detectedIngredients,
  };
}
