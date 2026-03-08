import { View } from "react-native";
import { Type } from "lucide-react-native";
import { SectionHeader } from "./SectionHeader";
import { SettingToggleItem } from "./SettingToggleItem";

export function AccessibilitySection({ largeFontDefault, onToggleLargeFont }) {
  return (
    <View style={{ marginTop: 24 }}>
      <SectionHeader title="Accessibility" />

      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <SettingToggleItem
          icon={Type}
          iconColor="#10B981"
          iconBackgroundColor="#F3F4F6"
          title="Large Text by Default"
          description="Always show ingredients and nutrition info in larger text"
          value={largeFontDefault}
          onValueChange={onToggleLargeFont}
          trackColorTrue="#86EFAC"
          thumbColorTrue="#10B981"
          isLast={true}
        />
      </View>
    </View>
  );
}
