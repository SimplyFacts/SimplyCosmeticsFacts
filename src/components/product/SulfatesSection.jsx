import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function SulfatesSection({ items = [], fontSize = "medium" }) {
  if (items.length === 0) return null;

  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="Sulfates"
      count={items.length}
      fontSize={fontSize}
      defaultExpanded={false}
      badgeColor="#C2410C"
      badgeTextColor="#fff"
      icon="💧"
      backgroundColor="#FFF7ED"
      color="#C2410C"
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: "#FFEDD5",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#FDBA74",
            }}
          >
            <Text style={{ fontSize: fonts.body, color: "#9A3412", fontWeight: "500" }}>
              {item.displayName}
            </Text>
          </View>
        ))}
      </View>
    </CollapsibleSection>
  );
}
