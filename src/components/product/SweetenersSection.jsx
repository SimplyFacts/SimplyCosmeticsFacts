import { View, Text, StyleSheet } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { CollapsibleSection } from "./CollapsibleSection";

const SWEETENER_THEME = {
  artificial: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
    textColor: "#DC2626",
  },
  natural: {
    backgroundColor: "#DBEAFE",
    borderColor: "#93C5FD",
    textColor: "#1D4ED8",
  },
  sugarAlcohol: {
    backgroundColor: "#E0E7FF",
    borderColor: "#A5B4FC",
    textColor: "#4338CA",
  },
};

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
        <View style={styles.row}>
          {sweeteners.map((item, idx) => {
            const theme = SWEETENER_THEME[item.subtype] ?? SWEETENER_THEME.artificial;

            return (
              <View
                key={idx}
                style={[
                  styles.chip,
                  { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor },
                ]}
              >
                <Text style={[styles.chipText, { fontSize: fonts.body, color: theme.textColor }]}>
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  chipText: {
    fontWeight: "500",
  },
});
