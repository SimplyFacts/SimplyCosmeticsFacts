import { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Check, ChevronRight } from "lucide-react-native";

export const DietaryProfileCard = memo(({ profile, newCount, onPress }) => {
  const allAdded = newCount === 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(profile)}
      disabled={allAdded}
      style={[
        styles.profileCard,
        { backgroundColor: allAdded ? "#F9FAFB" : profile.backgroundColor },
        allAdded && { borderColor: "#E5E7EB" },
      ]}
      activeOpacity={0.7}
    >
      <Text style={styles.profileIcon}>{profile.icon}</Text>
      <View style={styles.profileCardContent}>
        <Text
          style={[
            styles.profileName,
            { color: allAdded ? "#9CA3AF" : profile.color },
          ]}
        >
          {profile.name}
        </Text>
        <Text style={styles.profileDescription}>
          {allAdded
            ? "All alerts active"
            : `${profile.ingredients.length} ingredients`}
        </Text>
      </View>
      {allAdded ? (
        <View style={styles.profileCheckContainer}>
          <Check size={18} color="#10B981" />
        </View>
      ) : (
        <ChevronRight size={18} color={profile.color} />
      )}
    </TouchableOpacity>
  );
});

DietaryProfileCard.displayName = "DietaryProfileCard";

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
  },
  profileIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  profileCardContent: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  profileDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
  profileCheckContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
  },
});
