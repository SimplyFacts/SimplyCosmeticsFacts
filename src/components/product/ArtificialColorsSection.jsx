import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function ArtificialColorsSection({ colors = [], fontSize = "medium" }) {
  if (colors.length === 0) return null;

  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="Artificial Colors"
      count={colors.length}
      fontSize={fontSize}
      defaultExpanded={false}
      badgeColor={colors.length > 0 ? "#7C3AED" : undefined}
      badgeTextColor={colors.length > 0 ? "#fff" : undefined}
      icon="🎨"
      backgroundColor={colors.length > 0 ? "#F5F3FF" : "#F9FAFB"}
      color={colors.length > 0 ? "#7C3AED" : "#6B7280"}
    >
      {colors.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
          {colors.map((item, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor: "#FEE2E2",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#FCA5A5",
              }}
            >
              <Text
                style={{
                  fontSize: fonts.body,
                  color: "#DC2626",
                  fontWeight: "500",
                }}
              >
                {item.displayName}
              </Text>
            </View>
          ))}
        </View>
      )}
    </CollapsibleSection>
  );
}
