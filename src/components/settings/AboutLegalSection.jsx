import { View } from "react-native";
import {
  ExternalLink,
  Shield,
  FileText,
  Database,
  Info,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { SectionHeader } from "./SectionHeader";
import { SettingActionItem } from "./SettingActionItem";
import { AboutAppInfo } from "./AboutAppInfo";
import { LegalDisclaimer } from "./LegalDisclaimer";

export function AboutLegalSection({ onOpenURL }) {
  const router = useRouter();

  return (
    <View style={{ marginTop: 24 }}>
      <SectionHeader title="About & Legal" />

      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <AboutAppInfo />

        <SettingActionItem
          icon={Database}
          iconColor="#10B981"
          iconBackgroundColor="#ECFDF5"
          title="Product Data Source"
          description="Powered by OpenFoodFacts"
          onPress={() => onOpenURL("https://world.openfoodfacts.org")}
          rightIcon={ExternalLink}
        />

        <SettingActionItem
          icon={Shield}
          iconColor="#3B82F6"
          iconBackgroundColor="#EFF6FF"
          title="Privacy Policy"
          description="How we handle your data"
          onPress={() => router.push("/privacy")}
          rightIcon={ChevronRight}
        />

        <SettingActionItem
          icon={FileText}
          iconColor="#8B5CF6"
          iconBackgroundColor="#F5F3FF"
          title="Terms of Service"
          description="App usage terms and conditions"
          onPress={() => router.push("/terms")}
          rightIcon={ChevronRight}
        />

        <LegalDisclaimer />

        <SettingActionItem
          icon={Info}
          iconColor="#6B7280"
          iconBackgroundColor="#F9FAFB"
          title="App Version"
          description="Simply Food Facts 1.0.0"
          isLast={true}
        />
      </View>
    </View>
  );
}
