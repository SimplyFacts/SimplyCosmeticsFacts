import { View, Text, Switch } from "react-native";

export function SettingToggleItem({
  icon: Icon,
  iconColor,
  iconBackgroundColor,
  title,
  description,
  value,
  onValueChange,
  trackColorTrue,
  thumbColorTrue,
  isLast = false,
}) {
  return (
    <View
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

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: trackColorTrue }}
        thumbColor={value ? thumbColorTrue : "#f4f3f4"}
      />
    </View>
  );
}
