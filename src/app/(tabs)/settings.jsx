import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useSettings } from "@/hooks/useSettings";
import {
  handleClearScanHistory,
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
    showArtificialIngredients,
    showArtificialColors,
    showSweeteners,
    handleToggleLargeFont,
    handleToggleArtificialIngredients,
    handleToggleArtificialColors,
    handleToggleSweeteners,
  } = useSettings();

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
          showArtificialIngredients={showArtificialIngredients}
          showArtificialColors={showArtificialColors}
          showSweeteners={showSweeteners}
          onToggleArtificialIngredients={handleToggleArtificialIngredients}
          onToggleArtificialColors={handleToggleArtificialColors}
          onToggleSweeteners={handleToggleSweeteners}
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
