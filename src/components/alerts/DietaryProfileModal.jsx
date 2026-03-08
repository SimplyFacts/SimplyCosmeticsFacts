import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { X, Info, Check } from "lucide-react-native";

export function DietaryProfileModal({
  visible,
  profile,
  newIngredients,
  success,
  isApplying,
  onApply,
  onClose,
}) {
  if (!profile) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.profileModalContent}>
          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.profileModalClose}>
            <X size={20} color="#6B7280" />
          </TouchableOpacity>

          {success ? (
            // Success state
            <View style={styles.profileSuccessContainer}>
              <View style={styles.profileSuccessIcon}>
                <Check size={32} color="#fff" />
              </View>
              <Text style={styles.profileSuccessTitle}>All Set!</Text>
              <Text style={styles.profileSuccessMessage}>
                Added {success.added?.length || 0} new alert
                {(success.added?.length || 0) !== 1 ? "s" : ""} for{" "}
                {profile.name}.
                {success.skipped > 0
                  ? ` ${success.skipped} already active.`
                  : ""}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={[
                  styles.profileApplyButton,
                  { backgroundColor: "#10B981" },
                ]}
              >
                <Text style={styles.profileApplyButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Confirmation state
            <>
              {/* Header */}
              <View style={styles.profileModalHeader}>
                <Text style={styles.profileModalIconText}>{profile.icon}</Text>
                <Text style={styles.profileModalTitle}>{profile.name}</Text>
                <Text style={styles.profileModalDescription}>
                  {profile.description}
                </Text>
              </View>

              {/* Disclaimer */}
              <View style={styles.profileDisclaimerBox}>
                <Info size={14} color="#92400E" />
                <Text style={styles.profileDisclaimerText}>
                  {profile.disclaimer}
                </Text>
              </View>

              {/* Ingredients list */}
              <Text style={styles.profileIngredientsLabel}>
                {newIngredients.length === profile.ingredients.length
                  ? `Will add ${newIngredients.length} ingredient alerts:`
                  : `Will add ${newIngredients.length} new alert${newIngredients.length !== 1 ? "s" : ""} (${profile.ingredients.length - newIngredients.length} already active):`}
              </Text>

              <ScrollView
                style={styles.profileIngredientsScroll}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.profileIngredientsChips}>
                  {profile.ingredients.map((name) => {
                    const isNew = newIngredients.includes(name);
                    return (
                      <View
                        key={name}
                        style={[
                          styles.profileIngredientChip,
                          {
                            backgroundColor: isNew
                              ? profile.backgroundColor
                              : "#F3F4F6",
                            borderColor: isNew ? profile.color : "#E5E7EB",
                          },
                        ]}
                      >
                        {!isNew && (
                          <Check
                            size={12}
                            color="#9CA3AF"
                            style={{ marginRight: 4 }}
                          />
                        )}
                        <Text
                          style={[
                            styles.profileIngredientText,
                            {
                              color: isNew ? profile.color : "#9CA3AF",
                            },
                          ]}
                        >
                          {name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>

              {/* Apply button */}
              <TouchableOpacity
                onPress={onApply}
                disabled={isApplying || newIngredients.length === 0}
                style={[
                  styles.profileApplyButton,
                  {
                    backgroundColor:
                      newIngredients.length === 0
                        ? "#D1D5DB"
                        : profile.color || "#10B981",
                  },
                ]}
              >
                {isApplying ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.profileApplyButtonText}>
                    {newIngredients.length === 0
                      ? "All Already Active"
                      : `Add ${newIngredients.length} Alert${newIngredients.length !== 1 ? "s" : ""}`}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={styles.profileCancelButton}
              >
                <Text style={styles.profileCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 380,
    maxHeight: "80%",
  },
  profileModalClose: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  profileModalHeader: {
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 4,
  },
  profileModalIconText: {
    fontSize: 40,
    marginBottom: 8,
  },
  profileModalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  profileModalDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  profileDisclaimerBox: {
    backgroundColor: "#FFFBEB",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  profileDisclaimerText: {
    fontSize: 12,
    color: "#92400E",
    lineHeight: 17,
    flex: 1,
  },
  profileIngredientsLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  profileIngredientsScroll: {
    maxHeight: 200,
    marginBottom: 16,
  },
  profileIngredientsChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  profileIngredientChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profileIngredientText: {
    fontSize: 13,
    fontWeight: "500",
  },
  profileApplyButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  profileApplyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  profileCancelButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  profileCancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  profileSuccessContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileSuccessIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileSuccessTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  profileSuccessMessage: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
});
