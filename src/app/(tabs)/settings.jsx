import { View, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useSettings } from "@/hooks/useSettings";
import { useScanHistory } from "@/hooks/useScanHistory";
import {
  handleClearAlerts,
  openURL,
} from "@/utils/settingsActions";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { AccessibilitySection } from "@/components/settings/AccessibilitySection";
import { ProductInformationSection } from "@/components/settings/ProductInformationSection";
import { DataManagementSection } from "@/components/settings/DataManagementSection";
import { AboutLegalSection } from "@/components/settings/AboutLegalSection";
import { PrivacyInfoBox } from "@/components/settings/PrivacyInfoBox";
import { AccessibilityInfoBox } from "@/components/settings/AccessibilityInfoBox";
import { SupportSection } from "@/components/settings/SupportSection";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const {
    largeFontDefault,
    showSyntheticFragrances,
    showParabens,
    showPFAS,
    showSulfates,
    handleToggleLargeFont,
    handleToggleSyntheticFragrances,
    handleToggleParabens,
    handleTogglePFAS,
    handleToggleSulfates,
  } = useSettings();

  const { clearHistory } = useScanHistory();

  const handleClearScanHistory = () => {
    Alert.alert(
      "Clear Scan History",
      "This will permanently delete all your scanned cosmetics. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearHistory();
            Alert.alert("Success", "Scan history cleared");
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      <SettingsHeader insets={insets} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        <SupportSection />

        <AccessibilitySection
          largeFontDefault={largeFontDefault}
          onToggleLargeFont={handleToggleLargeFont}
        />

        <ProductInformationSection
          showSyntheticFragrances={showSyntheticFragrances}
          showParabens={showParabens}
          showPFAS={showPFAS}
          showSulfates={showSulfates}
          onToggleSyntheticFragrances={handleToggleSyntheticFragrances}
          onToggleParabens={handleToggleParabens}
          onTogglePFAS={handleTogglePFAS}
          onToggleSulfates={handleToggleSulfates}
        />

        <DataManagementSection
          onClearScanHistory={handleClearScanHistory}
          onClearAlerts={handleClearAlerts}
        />

        <AboutLegalSection onOpenURL={openURL} />

        <PrivacyInfoBox />

        <AccessibilityInfoBox />
      </ScrollView>
    </View>
  );
}
