import { View } from "react-native";
import { FlaskConical, Droplet, Candy } from "lucide-react-native";
import { SectionHeader } from "./SectionHeader";
import { SettingToggleItem } from "./SettingToggleItem";

export function ProductInformationSection({
  showArtificialIngredients,
  showArtificialColors,
  showSweeteners,
  onToggleArtificialIngredients,
  onToggleArtificialColors,
  onToggleSweeteners,
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
          icon={FlaskConical}
          iconColor="#B45309"
          iconBackgroundColor="#FEF9E7"
          title="Show Artificial Ingredients"
          description="Display artificial additives and preservatives"
          value={showArtificialIngredients}
          onValueChange={onToggleArtificialIngredients}
          trackColorTrue="#FCD34D"
          thumbColorTrue="#B45309"
        />

        <SettingToggleItem
          icon={Droplet}
          iconColor="#7C3AED"
          iconBackgroundColor="#F3E8FF"
          title="Show Artificial Colors"
          description="Display artificial food dyes and colorings"
          value={showArtificialColors}
          onValueChange={onToggleArtificialColors}
          trackColorTrue="#C084FC"
          thumbColorTrue="#7C3AED"
        />

        <SettingToggleItem
          icon={Candy}
          iconColor="#C2410C"
          iconBackgroundColor="#FFF7ED"
          title="Show Sweeteners"
          description="Display all types of sweeteners in products"
          value={showSweeteners}
          onValueChange={onToggleSweeteners}
          trackColorTrue="#FDBA74"
          thumbColorTrue="#C2410C"
          isLast={true}
        />
      </View>
    </View>
  );
}
