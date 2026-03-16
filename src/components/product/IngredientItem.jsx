import { useRef } from "react";
import { Text, View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { AlertCircle, AlertTriangle, Plus } from "lucide-react-native";
import * as Haptics from "expo-haptics";

const STYLES = {
  alert: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    textColor: "#991B1B",
    iconColor: "#DC2626",
  },
  allergen: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
    textColor: "#9A3412",
    iconColor: "#F97316",
  },
  normal: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    textColor: "#374151",
    iconColor: "#10B981",
  },
};

export function IngredientItem({
  ingredient,
  alert,
  isAllergen,
  fontSize,
  onPress,
}) {
  const isFlagged = !!alert || isAllergen;
  const scaleAnimRef = useRef(null);
  if (!scaleAnimRef.current) {
    scaleAnimRef.current = new Animated.Value(1);
  }
  const scaleAnim = scaleAnimRef.current;

  const theme = alert ? STYLES.alert : isAllergen ? STYLES.allergen : STYLES.normal;

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
        style={[
          styles.chip,
          { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor },
        ]}
      >
        <Text
          style={[
            styles.label,
            { fontSize, color: theme.textColor, fontWeight: isFlagged ? "600" : "400" },
          ]}
        >
          {ingredient}
        </Text>

        {alert ? (
          <AlertCircle size={16} color={theme.iconColor} />
        ) : isAllergen ? (
          <View style={styles.allergenIcons}>
            <AlertTriangle size={16} color={theme.iconColor} />
            <Plus size={18} color="#10B981" strokeWidth={2.5} />
          </View>
        ) : (
          <Plus size={18} color={theme.iconColor} strokeWidth={2.5} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    // fontSize and color applied dynamically
  },
  allergenIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
