import { View, Text } from "react-native";
import { AlertTriangle, ChevronDown } from "lucide-react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function AlertsSection({ matchedAlerts, fontSize = "medium" }) {
  const fonts = getFontSizes(fontSize);
  const hasMatches = matchedAlerts && matchedAlerts.length > 0;

  // If no alerts matched, show a helpful empty state hint
  if (!hasMatches) {
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
              marginBottom: 2,
            }}
          >
            No ingredient alerts triggered
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
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
