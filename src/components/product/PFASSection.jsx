import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

export function PFASSection({ items = [], fontSize = "medium" }) {
  if (items.length === 0) return null;

  const fonts = getFontSizes(fontSize);

  return (
    <CollapsibleSection
      title="PFAS"
      count={items.length}
      fontSize={fontSize}
      defaultExpanded={false}
      badgeColor="#2563EB"
      badgeTextColor="#fff"
      icon="⚗️"
      backgroundColor="#EFF6FF"
      color="#2563EB"
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: "#DBEAFE",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#93C5FD",
            }}
          >
            <Text style={{ fontSize: fonts.body, color: "#1E40AF", fontWeight: "500" }}>
              {item.displayName}
            </Text>
          </View>
        ))}
      </View>
    </CollapsibleSection>
  );
}
