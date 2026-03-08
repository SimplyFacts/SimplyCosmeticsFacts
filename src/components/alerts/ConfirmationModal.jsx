import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

export function ConfirmationModal({
  visible,
  ingredientName,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Remove Alert?</Text>
          <Text style={styles.modalMessage}>
            Remove the alert for "{ingredientName}"?
            {"\n\n"}
            You can add it back anytime by tapping it again.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.modalButton, styles.modalButtonCancel]}
            >
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.modalButton, styles.modalButtonConfirm]}
            >
              <Text style={styles.modalButtonTextConfirm}>Remove</Text>
            </TouchableOpacity>
          </View>
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
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#F3F4F6",
  },
  modalButtonConfirm: {
    backgroundColor: "#DC2626",
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  modalButtonTextConfirm: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
