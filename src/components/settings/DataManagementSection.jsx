import { View } from "react-native";
import { Trash2 } from "lucide-react-native";
import { SectionHeader } from "./SectionHeader";
import { SettingActionItem } from "./SettingActionItem";

export function DataManagementSection({ onClearScanHistory, onClearAlerts }) {
  return (
    <View style={{ marginTop: 24 }}>
      <SectionHeader title="Data Management" />

      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <SettingActionItem
          icon={Trash2}
          iconColor="#DC2626"
          iconBackgroundColor="#FEF2F2"
          title="Clear Scan History"
          description="Delete all scanned products from history"
          onPress={onClearScanHistory}
        />

        <SettingActionItem
          icon={Trash2}
          iconColor="#DC2626"
          iconBackgroundColor="#FEF2F2"
          title="Clear All Alerts"
          description="Delete all ingredient alerts"
          onPress={onClearAlerts}
          isLast={true}
        />
      </View>
    </View>
  );
}
