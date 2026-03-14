import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function SyntheticFragrancesSection({ items = [], fontSize = "medium" }) {
  if (items.length === 0) return null;

  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="Synthetic Fragrances"
      count={items.length}
      fontSize={fontSize}
      defaultExpanded={false}
      badgeColor="#B45309"
      badgeTextColor="#fff"
      icon="✨"
      backgroundColor="#FFFBEB"
      color="#B45309"
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: "#FEF3C7",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#FCD34D",
            }}
          >
            <Text style={{ fontSize: fonts.body, color: "#92400E", fontWeight: "500" }}>
              {item.displayName}
            </Text>
          </View>
        ))}
      </View>
    </CollapsibleSection>
  );
}
