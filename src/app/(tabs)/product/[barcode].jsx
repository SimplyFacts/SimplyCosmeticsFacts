import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useMemo } from "react";
import { AlertTriangle, CircleCheck } from "lucide-react-native";
import {
  loadFontSizePreference,
  saveFontSizePreference,
  getNextFontSize,
  getFontSizes,
} from "@/utils/productPreferences";
import { matchAlerts } from "@/utils/alertMatching";
import { useAlertsStore } from "@/stores/alertsStore";
import { useProduct } from "@/hooks/useProduct";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { AlertsSection } from "@/components/product/AlertsSection";
import { AllergensSection } from "@/components/product/AllergensSection";
import { ArtificialColorsSection } from "@/components/product/ArtificialColorsSection";
import { SweetenersSection } from "@/components/product/SweetenersSection";
import { NutritionalInfoSection } from "@/components/product/NutritionalInfoSection";
import { FullIngredientsSection } from "@/components/product/FullIngredientsSection";
import { OpenFoodFactsAttribution } from "@/components/product/OpenFoodFactsAttribution";
import { DisclaimerFooter } from "@/components/product/DisclaimerFooter";
import { SectionErrorBoundary } from "@/components/product/SectionErrorBoundary";

// Product detail screen - no React Query used
export default function ProductDetailScreen() {
  const { barcode } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fontSize, setFontSize] = useState("medium");

  // Use React Query hook for product data WITH CACHED OPTIMIZATIONS
  const { product, isLoading, error, parsedIngredients, detectedIngredients } =
    useProduct(barcode);

  // Use global alerts store
  const { alerts, fetchAlerts, shouldRefresh, addAlert, deleteAlert } =
    useAlertsStore();

  // Fetch alerts if needed
  useEffect(() => {
    if (shouldRefresh()) {
      fetchAlerts();
    }
  }, [fetchAlerts, shouldRefresh]);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  // Memoize alert matching - only depends on alerts and product data
  const ingredientsText = useMemo(
    () => product?.ingredients?.toLowerCase() || "",
    [product?.ingredients],
  );

  const matchedAlerts = useMemo(() => {
    if (!product) return [];
    return matchAlerts(alerts, ingredientsText, product);
  }, [alerts, ingredientsText, product]);

  const nutritionalInfo = product?.nutritional_info || {};

  const loadPreferences = async () => {
    const fontSizePref = await loadFontSizePreference();
    setFontSize(fontSizePref);
  };

  const handleCycleFontSize = async () => {
    const nextSize = getNextFontSize(fontSize);
    setFontSize(nextSize);
    await saveFontSizePreference(nextSize);
  };

  // Handler for adding alert from ingredients list
  const handleAddAlert = async (ingredientName) => {
    try {
      await addAlert(ingredientName, null);
    } catch (error) {
      console.error("Failed to add alert:", error);
      Alert.alert("Error", "Failed to add ingredient alert. Please try again.");
      throw error;
    }
  };

  // Handler for removing alert from ingredients list
  const handleRemoveAlert = async (alertId) => {
    try {
      await deleteAlert(alertId);
    } catch (error) {
      console.error("Failed to remove alert:", error);
      Alert.alert(
        "Error",
        "Failed to remove ingredient alert. Please try again.",
      );
      throw error;
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="dark" />
        <ActivityIndicator
          size="large"
          color="#10B981"
          testID="activity-indicator"
        />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <StatusBar style="dark" />
        <Text style={{ fontSize: 18, color: "#6B7280" }}>
          {error || "Product not found"}
        </Text>
      </View>
    );
  }

  const hasNoIngredients =
    !product.ingredients || product.ingredients.trim() === "";

  const hasAllergens = product.allergens && product.allergens.length > 0;
  const hasTraces = product.traces && product.traces.length > 0;
  const hasNoAlerts = matchedAlerts.length === 0;
  const hasNoAllergens = !hasAllergens && !hasTraces;
  const fonts = getFontSizes(fontSize);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />

      <ProductHeader
        onBack={() => router.back()}
        fontSize={fontSize}
        onCycleFontSize={handleCycleFontSize}
        insets={insets}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 64 }}
        showsVerticalScrollIndicator={false}
      >
        <ProductCard
          imageUrl={product.image_url}
          name={product.name}
          brand={product.brand}
          barcode={product.barcode}
          fontSize={fontSize}
        />

        {/* Clear status note below product info */}
        {hasNoAllergens && !hasNoIngredients && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 4,
            }}
          >
            {hasNoAllergens && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#F0FDF4",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#BBF7D0",
                }}
              >
                <CircleCheck size={16} color="#16A34A" />
                <Text
                  style={{
                    fontSize: fonts.tagText,
                    color: "#15803D",
                    fontWeight: "600",
                    marginLeft: 6,
                  }}
                >
                  No allergens detected
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          {hasNoIngredients && (
            <View
              style={{
                backgroundColor: "#FEF3C7",
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#F59E0B",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AlertTriangle size={20} color="#D97706" />
              <Text
                style={{
                  fontSize: 14,
                  color: "#92400E",
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                <Text style={{ fontWeight: "600" }}>
                  Limited data available.
                </Text>{" "}
                Ingredients are missing. Always verify by reading the package.
              </Text>
            </View>
          )}

          {/* Reordered sections: Alerts and Allergens first */}
          <SectionErrorBoundary sectionName="Alerts">
            <AlertsSection matchedAlerts={matchedAlerts} fontSize={fontSize} />
          </SectionErrorBoundary>

          <SectionErrorBoundary sectionName="Allergens">
            <AllergensSection
              allergens={product.allergens}
              traces={product.traces}
              crossContaminationWarnings={product.crossContaminationWarnings}
              fontSize={fontSize}
            />
          </SectionErrorBoundary>

          {!hasNoIngredients && (
            <>
              <SectionErrorBoundary sectionName="Sweeteners">
                <SweetenersSection
                  sweeteners={detectedIngredients.sweeteners}
                  fontSize={fontSize}
                />
              </SectionErrorBoundary>

              <SectionErrorBoundary sectionName="Artificial colors">
                <ArtificialColorsSection
                  colors={detectedIngredients.artificialColors}
                  fontSize={fontSize}
                />
              </SectionErrorBoundary>
            </>
          )}
        </View>

        <SectionErrorBoundary sectionName="Full ingredients list">
          <FullIngredientsSection
            ingredients={product.ingredients}
            parsedIngredients={parsedIngredients}
            fontSize={fontSize}
            barcode={product.barcode}
            updatedAt={product.updated_at}
            alerts={alerts}
            allergens={product.allergens}
            onAddAlert={handleAddAlert}
            onRemoveAlert={handleRemoveAlert}
          />
        </SectionErrorBoundary>

        <View style={{ paddingHorizontal: 24 }}>
          <SectionErrorBoundary sectionName="Nutritional info">
            <NutritionalInfoSection
              nutritionalInfo={nutritionalInfo}
              fontSize={fontSize}
            />
          </SectionErrorBoundary>
        </View>

        <OpenFoodFactsAttribution
          barcode={product.barcode}
          fontSize={fontSize}
        />

        <DisclaimerFooter fontSize={fontSize} />
      </ScrollView>
    </View>
  );
}
