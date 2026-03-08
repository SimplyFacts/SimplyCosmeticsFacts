import { memo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";

export const PresetChip = memo(
  ({ preset, isAdded, onPress, onDeselect, categoryColor }) => (
    <TouchableOpacity
      onPress={() => (isAdded ? onDeselect(preset.name) : onPress(preset.name))}
      style={[
        styles.presetChip,
        isAdded && styles.presetChipAdded,
        { borderColor: isAdded ? "#D1D5DB" : categoryColor },
      ]}
    >
      <Text
        style={[
          styles.presetChipText,
          isAdded && styles.presetChipTextAdded,
          { color: isAdded ? "#9CA3AF" : categoryColor },
        ]}
      >
        {preset.name}
      </Text>
      {isAdded && (
        <Check size={14} color="#9CA3AF" style={styles.presetChipCheck} />
      )}
    </TouchableOpacity>
  ),
);

PresetChip.displayName = "PresetChip";

const styles = StyleSheet.create({
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
  presetChipAdded: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },
  presetChipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  presetChipTextAdded: {
    color: "#9CA3AF",
  },
  presetChipCheck: {
    marginLeft: 6,
  },
});
