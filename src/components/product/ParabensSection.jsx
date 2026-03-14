import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function ParabensSection({ items = [], fontSize = "medium" }) {
  if (items.length === 0) return null;

  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="Parabens"
      count={items.length}
      fontSize={fontSize}
      defaultExpanded={false}
      badgeColor="#7C3AED"
      badgeTextColor="#fff"
      icon="🛡️"
      backgroundColor="#F5F3FF"
      color="#7C3AED"
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: "#EDE9FE",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#C4B5FD",
            }}
          >
            <Text style={{ fontSize: fonts.body, color: "#5B21B6", fontWeight: "500" }}>
              {item.displayName}
            </Text>
          </View>
        ))}
      </View>
    </CollapsibleSection>
  );
}
