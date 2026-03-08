import { useRef, useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import { AlertCircle, AlertTriangle, Plus } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FIRST_VIEW_KEY = "ingredients_instruction_seen";

export function IngredientsInstructionBox({
  hasAnyAlerts,
  hasAnyAllergens,
  fontSize,
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isFirstView, setIsFirstView] = useState(false);

  useEffect(() => {
    checkFirstView();
  }, []);

  useEffect(() => {
    if (isFirstView) {
      // Gentle pulse animation for first-time viewers
      const pulse = Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(pulse, { iterations: 3 }).start();
    }
  }, [isFirstView]);

  const checkFirstView = async () => {
    try {
      const seen = await AsyncStorage.getItem(FIRST_VIEW_KEY);
      if (!seen) {
        setIsFirstView(true);
        await AsyncStorage.setItem(FIRST_VIEW_KEY, "true");
      }
    } catch {
      // Ignore storage errors
    }
  };

  // Contextual instruction message
  const getInstructionText = () => {
    if (hasAnyAlerts && hasAnyAllergens) {
      return "⚠️🚨 Flagged ingredients found!";
    }
    if (hasAnyAlerts) {
      return "🚨 Alert matches found.";
    }
    if (hasAnyAllergens) {
      return "⚠️ Allergens detected.";
    }
    return "👆 Tap any ingredient to add a custom alert";
  };

  // Whether to show the separate "tap any ingredient" row
  const showTapHint = hasAnyAlerts || hasAnyAllergens;

  const tapHintText =
    hasAnyAlerts && hasAnyAllergens
      ? "Tap any ingredient to manage alerts."
      : hasAnyAlerts
        ? "Tap any ingredient to add or remove alerts."
        : "Tap any ingredient to add a custom alert for it.";

  return (
    <Animated.View
      style={{
        transform: [{ scale: pulseAnim }],
        backgroundColor: "#EFF6FF",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#BFDBFE",
      }}
    >
      <Text
        style={{
          fontSize: fontSize,
          fontWeight: "600",
          color: "#1E40AF",
          marginBottom: hasAnyAlerts || hasAnyAllergens || showTapHint ? 8 : 0,
          lineHeight: fontSize * 1.4,
        }}
      >
        {getInstructionText()}
      </Text>

      {showTapHint && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <Plus size={16} color="#10B981" strokeWidth={2.5} />
          <Text
            style={{
              fontSize: fontSize,
              fontWeight: "600",
              color: "#1E40AF",
              lineHeight: fontSize * 1.4,
            }}
          >
            {tapHintText}
          </Text>
        </View>
      )}

      {/* Color key - always show if there are flagged ingredients */}
      {(hasAnyAlerts || hasAnyAllergens) && (
        <View style={{ gap: 6, marginTop: 4 }}>
          {hasAnyAlerts && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AlertCircle size={16} color="#DC2626" />
              <Text
                style={{
                  fontSize: fontSize - 1,
                  color: "#1E40AF",
                }}
              >
                Red = Your custom alerts
              </Text>
            </View>
          )}
          {hasAnyAllergens && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AlertTriangle size={16} color="#F97316" />
              <Text
                style={{
                  fontSize: fontSize - 1,
                  color: "#1E40AF",
                }}
              >
                Orange = Product allergens
              </Text>
            </View>
          )}
        </View>
      )}
    </Animated.View>
  );
}
