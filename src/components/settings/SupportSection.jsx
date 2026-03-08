import { Share, View } from "react-native";
import { Heart, Share2, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SectionHeader } from "./SectionHeader";
import { SettingActionItem } from "./SettingActionItem";

export function SupportSection() {
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Check out Simply Food Facts--No opinions. No ads. No tracking. Just the facts.",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={{ marginTop: 24 }}>
      <SectionHeader title="Support the App" />

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
          icon={Heart}
          iconColor="#EF4444"
          iconBackgroundColor="#FEE2E2"
          title="Tip Jar"
          description="Help keep Simply Food Facts free"
          onPress={() => router.push("/tip-jar")}
          rightIcon={ChevronRight}
        />
        <SettingActionItem
          icon={Share2}
          iconColor="#3B82F6"
          iconBackgroundColor="#DBEAFE"
          title="Share with Friends"
          description="Spread the word about Simply Food Facts"
          onPress={handleShare}
          rightIcon={ChevronRight}
          isLast={true}
        />
      </View>
    </View>
  );
}
