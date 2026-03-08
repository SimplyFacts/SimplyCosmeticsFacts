import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function SweetenersSection({ sweeteners = [], fontSize = "medium" }) {
  if (sweeteners.length === 0) return null;

  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="Sweeteners"
      count={sweeteners.length}
      fontSize={fontSize}
      defaultExpanded={false}
      badgeColor={sweeteners.length > 0 ? "#EC4899" : undefined}
      badgeTextColor={sweeteners.length > 0 ? "#fff" : undefined}
      icon="🍬"
      backgroundColor={sweeteners.length > 0 ? "#FDF2F8" : "#F9FAFB"}
      color={sweeteners.length > 0 ? "#EC4899" : "#6B7280"}
    >
      {sweeteners.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {sweeteners.map((item, idx) => {
            // Different colors for different types of sweeteners
            let bgColor = "#FEE2E2"; // red for artificial
            let borderColor = "#FCA5A5";
            let textColor = "#DC2626";

            if (item.subtype === "natural") {
              bgColor = "#DBEAFE"; // blue for natural
              borderColor = "#93C5FD";
              textColor = "#1D4ED8";
            } else if (item.subtype === "sugarAlcohol") {
              bgColor = "#E0E7FF"; // indigo for sugar alcohols
              borderColor = "#A5B4FC";
              textColor = "#4338CA";
            }

            return (
              <View
                key={idx}
                style={{
                  backgroundColor: bgColor,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: borderColor,
                }}
              >
                <Text
                  style={{
                    fontSize: fonts.body,
                    color: textColor,
                    fontWeight: "500",
                  }}
                >
                  {item.displayName}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </CollapsibleSection>
  );
}
