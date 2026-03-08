import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { DIETARY_PROFILES, getNewIngredients } from "@/utils/dietaryProfiles";
import { DietaryProfileCard } from "./DietaryProfileCard";

export function DietaryProfilesTile({ alerts, onProfilePress }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={[styles.presetCategory, isExpanded && { width: "100%" }]}>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={[styles.presetCategoryTile, { backgroundColor: "#F0F9FF" }]}
      >
        <Text style={styles.presetCategoryIcon}>🍽️</Text>
        <Text
          style={[styles.presetCategoryTitle, { color: "#0284C7" }]}
          numberOfLines={1}
        >
          Dietary Profiles
        </Text>
        <View style={[styles.expandIndicator, { backgroundColor: "#0284C7" }]}>
          {isExpanded ? (
            <ChevronUp size={14} color="#fff" />
          ) : (
            <ChevronDown size={14} color="#fff" />
          )}
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.profilesList}>
          {DIETARY_PROFILES.map((profile) => {
            const newCount = getNewIngredients(profile, alerts).length;
            return (
              <DietaryProfileCard
                key={profile.key}
                profile={profile}
                newCount={newCount}
                onPress={onProfilePress}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

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
  expandIndicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  profilesList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
  },
});
