import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function AllergensSection({
  allergens,
  traces,
  crossContaminationWarnings,
  fontSize = "medium",
}) {
  const fonts = getFontSizes(fontSize);

  // Helper function to format allergen text
  const formatAllergenText = (allergen) => {
    // Remove the "en:" prefix
    const text = allergen.replace("en:", "");

    // Replace hyphens with spaces and title case each word
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Helper function to deduplicate allergens
  const deduplicateAllergens = (allergenList) => {
    if (!allergenList || allergenList.length === 0) return [];

    // Map to track canonical forms
    const canonicalMap = new Map();

    allergenList.forEach((allergen) => {
      const formatted = formatAllergenText(allergen);
      const lower = formatted.toLowerCase();

      // Define canonical forms - map variations to a single name
      let canonical = lower;

      // Eggs variations
      if (lower === "egg" || lower === "eggs") {
        canonical = "eggs";
      }
      // Soy variations
      else if (
        lower === "soy" ||
        lower === "soybean" ||
        lower === "soybeans" ||
        lower === "soya"
      ) {
        canonical = "soybeans";
      }
      // Milk variations
      else if (lower === "milk" || lower === "dairy") {
        canonical = "milk";
      }
      // Wheat/gluten variations
      else if (lower === "wheat" || lower === "gluten") {
        canonical = "gluten";
      }
      // Peanut variations
      else if (lower === "peanut" || lower === "peanuts") {
        canonical = "peanuts";
      }
      // Tree nut variations
      else if (
        lower === "tree nut" ||
        lower === "tree nuts" ||
        lower === "nuts"
      ) {
        canonical = "tree nuts";
      }
      // Fish variations
      else if (lower === "fish" || lower === "fishes") {
        canonical = "fish";
      }
      // Shellfish variations
      else if (
        lower === "shellfish" ||
        lower === "crustacean" ||
        lower === "crustaceans"
      ) {
        canonical = "shellfish";
      }
      // Sesame variations
      else if (
        lower === "sesame" ||
        lower === "sesame seed" ||
        lower === "sesame seeds"
      ) {
        canonical = "sesame";
      }
      // Sulfite variations
      else if (
        lower === "sulfite" ||
        lower === "sulfites" ||
        lower === "sulphite" ||
        lower === "sulphites"
      ) {
        canonical = "sulfites";
      }
      // Mollusc variations
      else if (
        lower === "mollusc" ||
        lower === "molluscs" ||
        lower === "mollusk" ||
        lower === "mollusks"
      ) {
        canonical = "molluscs";
      }

      // Use the first occurrence's formatted text for display
      if (!canonicalMap.has(canonical)) {
        canonicalMap.set(canonical, formatted);
      }
    });

    return Array.from(canonicalMap.values());
  };

  // Deduplicate allergens and traces
  const uniqueAllergens = deduplicateAllergens(allergens);
  const uniqueTraces = deduplicateAllergens(traces);

  const hasAllergens = uniqueAllergens && uniqueAllergens.length > 0;
  const hasTraces = uniqueTraces && uniqueTraces.length > 0;
  const hasWarnings =
    crossContaminationWarnings && crossContaminationWarnings.length > 0;
  const hasAnyAllergenInfo = hasAllergens || hasTraces || hasWarnings;

  if (!hasAnyAllergenInfo) return null;

  // Calculate total count for badge
  const totalCount =
    (uniqueAllergens?.length || 0) +
    (uniqueTraces?.length || 0) +
    (crossContaminationWarnings?.length || 0);

  return (
    <CollapsibleSection
      title="Allergens"
      count={totalCount}
      fontSize={fontSize}
      badgeColor={
        hasAllergens ? "#DC2626" : hasAnyAllergenInfo ? "#D97706" : undefined
      }
      badgeTextColor={hasAnyAllergenInfo ? "#fff" : undefined}
      icon="⚠️"
      backgroundColor={hasAnyAllergenInfo ? "#FEF2F2" : "#F9FAFB"}
      color={hasAnyAllergenInfo ? "#DC2626" : "#6B7280"}
    >
      {hasAnyAllergenInfo ? (
        <View style={{ gap: 16 }}>
          {/* Direct Allergens - High Priority */}
          {hasAllergens && (
            <View>
              <Text
                style={{
                  fontSize: fonts.body,
                  fontWeight: "600",
                  color: "#DC2626",
                  marginBottom: 8,
                }}
              >
                Contains:
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {uniqueAllergens.map((allergen, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#FEF2F2",
                      borderWidth: 1,
                      borderColor: "#FCA5A5",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fonts.tagText,
                        color: "#DC2626",
                        fontWeight: "600",
                      }}
                    >
                      {allergen}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Cross-Contamination Warnings - Lower Priority */}
          {hasTraces && (
            <View>
              <Text
                style={{
                  fontSize: fonts.body,
                  fontWeight: "600",
                  color: "#D97706",
                  marginBottom: 8,
                }}
              >
                ⚠️ May Contain:
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {uniqueTraces.map((trace, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#FEF3C7",
                      borderWidth: 1,
                      borderColor: "#FCD34D",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fonts.tagText,
                        color: "#D97706",
                        fontWeight: "500",
                      }}
                    >
                      {trace}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Full Warning Text */}
          {hasWarnings && (
            <View
              style={{
                backgroundColor: "#FFFBEB",
                borderWidth: 1,
                borderColor: "#FCD34D",
                borderRadius: 8,
                padding: 12,
              }}
            >
              {crossContaminationWarnings.map((warning, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: fonts.body,
                    color: "#92400E",
                    lineHeight: fonts.body * 1.5,
                    marginBottom:
                      index < crossContaminationWarnings.length - 1 ? 8 : 0,
                  }}
                >
                  {warning.charAt(0).toUpperCase() + warning.slice(1)}
                </Text>
              ))}
            </View>
          )}
        </View>
      ) : null}
    </CollapsibleSection>
  );
}
