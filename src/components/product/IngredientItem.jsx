import { useRef } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { AlertCircle, AlertTriangle, Plus } from "lucide-react-native";
import * as Haptics from "expo-haptics";

export function IngredientItem({
  ingredient,
  alert,
  isAllergen,
  fontSize,
  onPress,
}) {
  const isFlagged = !!alert || isAllergen;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Determine colors based on type
  let backgroundColor, borderColor, textColor, iconColor;

  if (alert) {
    backgroundColor = "#FEF2F2";
    borderColor = "#FCA5A5";
    textColor = "#991B1B";
    iconColor = "#DC2626";
  } else if (isAllergen) {
    backgroundColor = "#FFF7ED";
    borderColor = "#FDBA74";
    textColor = "#9A3412";
    iconColor = "#F97316";
  } else {
    backgroundColor = "#F9FAFB";
    borderColor = "#E5E7EB";
    textColor = "#374151";
    iconColor = "#10B981"; // Green instead of gray for the Plus icon
  }

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePress = () => {
    Haptics.selectionAsync();
    if (onPress) onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        style={{
          backgroundColor,
          borderWidth: 1,
          borderColor,
          borderRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Text
          style={{
            fontSize: fontSize,
            color: textColor,
            fontWeight: isFlagged ? "600" : "400",
          }}
        >
          {ingredient}
        </Text>

        {alert ? (
          <AlertCircle size={16} color={iconColor} />
        ) : isAllergen ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <AlertTriangle size={16} color={iconColor} />
            <Plus size={18} color="#10B981" strokeWidth={2.5} />
          </View>
        ) : (
          <Plus size={18} color={iconColor} strokeWidth={2.5} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
