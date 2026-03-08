import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

export function RemoveAlertModal({
  visible,
  selectedAlert,
  isProcessing,
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
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 24,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            Remove Ingredient Alert?
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#6B7280",
              lineHeight: 22,
              marginBottom: 8,
            }}
          >
            Remove alert for:
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#DC2626",
              marginBottom: 16,
            }}
          >
            "{selectedAlert?.ingredient_name}"
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              lineHeight: 20,
              marginBottom: 24,
            }}
          >
            You can add it back anytime by tapping it again.
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={onCancel}
              disabled={isProcessing}
              style={{
                flex: 1,
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#6B7280",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={isProcessing}
              style={{
                flex: 1,
                backgroundColor: "#DC2626",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  Remove
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
