import { View } from "react-native";
import { Sparkles, ShieldAlert, FlaskConical, Droplets } from "lucide-react-native";
import { SectionHeader } from "./SectionHeader";
import { SettingToggleItem } from "./SettingToggleItem";

export function ProductInformationSection({
  showSyntheticFragrances,
  showParabens,
  showPFAS,
  showSulfates,
  onToggleSyntheticFragrances,
  onToggleParabens,
  onTogglePFAS,
  onToggleSulfates,
}) {
  return (
    <View style={{ marginTop: 24 }}>
      <SectionHeader title="Product Information" />

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
          icon={Sparkles}
          iconColor="#B45309"
          iconBackgroundColor="#FFFBEB"
          title="Show Synthetic Fragrances"
          description="Display synthetic fragrance ingredients in products"
          value={showSyntheticFragrances}
          onValueChange={onToggleSyntheticFragrances}
          trackColorTrue="#FCD34D"
          thumbColorTrue="#B45309"
        />

        <SettingToggleItem
          icon={ShieldAlert}
          iconColor="#7C3AED"
          iconBackgroundColor="#F3E8FF"
          title="Show Parabens"
          description="Display paraben preservatives in products"
          value={showParabens}
          onValueChange={onToggleParabens}
          trackColorTrue="#C084FC"
          thumbColorTrue="#7C3AED"
        />

        <SettingToggleItem
          icon={FlaskConical}
          iconColor="#2563EB"
          iconBackgroundColor="#EFF6FF"
          title="Show PFAS"
          description="Display per- and polyfluoroalkyl substances in products"
          value={showPFAS}
          onValueChange={onTogglePFAS}
          trackColorTrue="#93C5FD"
          thumbColorTrue="#2563EB"
        />

        <SettingToggleItem
          icon={Droplets}
          iconColor="#C2410C"
          iconBackgroundColor="#FFF7ED"
          title="Show Sulfates"
          description="Display sulfate cleansing agents in products"
          value={showSulfates}
          onValueChange={onToggleSulfates}
          trackColorTrue="#FDBA74"
          thumbColorTrue="#C2410C"
          isLast={true}
        />
      </View>
    </View>
  );
}
