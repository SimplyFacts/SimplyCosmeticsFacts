import { View, Text } from "react-native";
import { AlertTriangle, ChevronDown } from "lucide-react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function AlertsSection({
  matchedAlerts,
  fontSize = "medium",
  hasAlerts = false,
  hasIngredients = true,
  noCategoriesFound = true,
  showSyntheticFragrances = true,
  showParabens = true,
  showPFAS = true,
  showSulfates = true,
}) {
  const fonts = getFontSizes(fontSize);
  const hasMatches = matchedAlerts && matchedAlerts.length > 0;

  if (!hasIngredients) {
    return (
      <View
        style={{
          backgroundColor: "#F3F4F6",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#D1D5DB",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>❓</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: fonts.bodyText,
              fontWeight: "600",
              color: "#374151",
              marginBottom: 4,
            }}
          >
            Could not check for concerns
          </Text>
          <Text
            style={{
              fontSize: fonts.bodyText - 1,
              color: "#6B7280",
            }}
          >
            Ingredients are unavailable for this product.
          </Text>
        </View>
      </View>
    );
  }

  if (!hasMatches && !noCategoriesFound) return null;

  if (!hasMatches && noCategoriesFound) {
    // Build dynamic list of what was actually checked
    const checkedCategories = [
      showSyntheticFragrances && "synthetic fragrances",
      showParabens && "parabens",
      showPFAS && "PFAS",
      showSulfates && "sulfates",
      "artificial colors",
      "artificial ingredients",
    ].filter(Boolean);

    const checkedText = `Checked for ${checkedCategories.join(", ")}.`;

    return (
      <View
        style={{
          backgroundColor: "#F0FDF4",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#BBF7D0",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>✅</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: fonts.bodyText,
              fontWeight: "600",
              color: "#15803D",
              marginBottom: 4,
            }}
          >
            No concerns found
          </Text>
          <Text
            style={{
              fontSize: fonts.bodyText - 1,
              color: "#16A34A",
              marginBottom: hasAlerts ? 4 : 0,
            }}
          >
            {checkedText}
          </Text>
          {hasAlerts && (
            <Text
              style={{
                fontSize: fonts.bodyText - 1,
                color: "#16A34A",
                marginBottom: 4,
              }}
            >
              Your alerts were checked — none triggered.
            </Text>
          )}
          {!hasAlerts && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <Text
                style={{
                  fontSize: fonts.bodyText - 1,
                  color: "#16A34A",
                }}
              >
                Scroll down to the ingredients list to add alerts
              </Text>
              <ChevronDown size={14} color="#16A34A" />
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <CollapsibleSection
      title="Your Alerts"
      count={matchedAlerts.length}
      fontSize={fontSize}
      badgeColor="#DC2626"
      badgeTextColor="#fff"
      icon="🚨"
      backgroundColor="#FEF2F2"
      color="#DC2626"
    >
      <View
        style={{
          backgroundColor: "#FEF2F2",
          borderWidth: 1,
          borderColor: "#FCA5A5",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <AlertTriangle size={20} color="#DC2626" />
          <Text
            style={{
              fontSize: fonts.alertTitle,
              fontWeight: "600",
              color: "#DC2626",
              marginLeft: 8,
            }}
          >
            Ingredient Alert
          </Text>
        </View>
        <Text style={{ fontSize: fonts.alertBody, color: "#991B1B" }}>
          Contains: {matchedAlerts.map((a) => a.ingredient_name).join(", ")}
        </Text>
      </View>
    </CollapsibleSection>
  );
}
