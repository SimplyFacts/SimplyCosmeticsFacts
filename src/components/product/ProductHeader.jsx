import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ArrowLeft, Type } from "lucide-react-native";
import { memo } from "react";
import { scaleFont, scaleModerate } from "@/utils/responsiveScale";

function ProductHeader({ onBack, fontSize, onCycleFontSize, insets }) {
  const getFontSizeLabel = (size) => {
    return size.charAt(0).toUpperCase() + size.slice(1);
  };

  return (
    <View
      style={[styles.container, { paddingTop: insets.top + scaleModerate(12) }]}
    >
      <TouchableOpacity
        onPress={onBack}
        style={[styles.fontButton, styles.fontButtonActive]}
      >
        <ArrowLeft size={scaleModerate(18)} color="#fff" />
        <Text style={styles.fontText}>Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCycleFontSize}
        style={[styles.fontButton, styles.fontButtonActive]}
      >
        <Type size={scaleModerate(18)} color="#fff" />
        <Text style={styles.fontText}>{getFontSizeLabel(fontSize)} Text</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: scaleModerate(12),
    paddingHorizontal: scaleModerate(16),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fontButton: {
    paddingHorizontal: scaleModerate(16),
    paddingVertical: scaleModerate(10),
    borderRadius: scaleModerate(8),
    flexDirection: "row",
    alignItems: "center",
    gap: scaleModerate(6),
  },
  fontButtonActive: {
    backgroundColor: "#10B981",
  },
  fontText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#fff",
  },
});

export { ProductHeader };
export default memo(ProductHeader);
