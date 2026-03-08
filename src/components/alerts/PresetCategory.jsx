import { memo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { isPresetAlreadyAdded } from "@/utils/alertPresets";
import { PresetChip } from "./PresetChip";

export const PresetCategory = memo(
  ({ category, alerts, onAddPreset, onDeselectPreset }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Count selected items in this category
    const selectedCount = category.items.filter((preset) =>
      isPresetAlreadyAdded(preset.name, alerts),
    ).length;

    return (
      <View style={[styles.presetCategory, isExpanded && { width: "100%" }]}>
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={[
            styles.presetCategoryTile,
            { backgroundColor: category.backgroundColor },
          ]}
        >
          <Text style={styles.presetCategoryIcon}>{category.icon}</Text>
          <Text
            style={[styles.presetCategoryTitle, { color: category.color }]}
            numberOfLines={1}
          >
            {category.title}
          </Text>
          {selectedCount > 0 && (
            <View
              style={[
                styles.selectedBadge,
                { backgroundColor: category.color },
              ]}
            >
              <Text style={styles.selectedBadgeText}>{selectedCount}</Text>
            </View>
          )}
          <View
            style={[
              styles.expandIndicator,
              { backgroundColor: category.color },
            ]}
          >
            {isExpanded ? (
              <ChevronUp size={14} color="#fff" />
            ) : (
              <ChevronDown size={14} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.presetChipsContainer}>
            {category.items.map((preset, index) => (
              <PresetChip
                key={index}
                preset={preset}
                isAdded={isPresetAlreadyAdded(preset.name, alerts)}
                onPress={onAddPreset}
                onDeselect={onDeselectPreset}
                categoryColor={category.color}
              />
            ))}
          </View>
        )}
      </View>
    );
  },
);

PresetCategory.displayName = "PresetCategory";

const styles = StyleSheet.create({
  presetCategory: {
    width: "100%",
  },
  presetCategoryTile: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  presetCategoryIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  presetCategoryTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    flex: 1,
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  selectedBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  expandIndicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  presetChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
});
