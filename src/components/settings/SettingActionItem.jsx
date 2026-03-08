import { View, Text, TouchableOpacity } from "react-native";

export function SettingActionItem({
  icon: Icon,
  iconColor,
  iconBackgroundColor,
  title,
  description,
  onPress,
  rightIcon: RightIcon,
  isLast = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          backgroundColor: iconBackgroundColor,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 12,
        }}
      >
        <Icon size={24} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#6B7280" }}>{description}</Text>
      </View>

      {RightIcon && <RightIcon size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );
}
