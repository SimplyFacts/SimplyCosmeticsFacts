import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { cleanIngredientForAlert } from "@/utils/ingredientUtils";

export function AddAlertModal({
  visible,
  selectedIngredient,
  detectedCategory,
  isProcessing,
  onConfirmSpecific,
  onConfirmCategory,
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
            Add Ingredient Alert
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#6B7280",
              lineHeight: 22,
              marginBottom: 8,
            }}
          >
            Create an alert for:
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#DC2626",
              marginBottom: detectedCategory ? 8 : 16,
            }}
          >
            "
            {selectedIngredient
              ? cleanIngredientForAlert(selectedIngredient)
              : ""}
            "
          </Text>

          {detectedCategory && (
            <View
              style={{
                backgroundColor: "#FEF3C7",
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "#FCD34D",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#92400E",
                  lineHeight: 18,
                }}
              >
                💡 This is an{" "}
                <Text style={{ fontWeight: "600" }}>
                  {detectedCategory.name}
                </Text>
              </Text>
            </View>
          )}

          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              lineHeight: 20,
              marginBottom: 20,
            }}
          >
            {detectedCategory
              ? "Would you like to alert on just this ingredient, or all ingredients in this category?"
              : "You'll be notified when scanning products that contain this ingredient."}
          </Text>

          {/* Action Buttons */}
          <View style={{ gap: 10 }}>
            {detectedCategory && (
              <TouchableOpacity
                onPress={onConfirmCategory}
                disabled={isProcessing}
                style={{
                  backgroundColor: "#7C3AED",
                  borderRadius: 8,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                {isProcessing ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      Alert on All {detectedCategory.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#EDE9FE",
                        marginTop: 2,
                      }}
                    >
                      Recommended - catch all similar ingredients
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onConfirmSpecific}
              disabled={isProcessing}
              style={{
                backgroundColor: detectedCategory ? "#fff" : "#DC2626",
                borderWidth: detectedCategory ? 1 : 0,
                borderColor: detectedCategory ? "#D1D5DB" : "transparent",
                borderRadius: 8,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              {isProcessing ? (
                <ActivityIndicator
                  color={detectedCategory ? "#6B7280" : "#fff"}
                  size="small"
                />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: detectedCategory ? "#374151" : "#fff",
                  }}
                >
                  {detectedCategory
                    ? "Alert on This Ingredient Only"
                    : "Add Alert"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onCancel}
              disabled={isProcessing}
              style={{
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
          </View>
        </View>
      </View>
    </Modal>
  );
}
