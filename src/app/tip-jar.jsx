import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Heart,
  Coffee,
  Star,
  Sparkles,
} from "lucide-react-native";
import useTipJar from "@/hooks/useTipJar";

const TIP_DISPLAY = [
  {
    emoji: "☕",
    icon: Coffee,
    label: "Small Tip",
    tagline: "Buy us a coffee",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
  },
  {
    emoji: "⭐",
    icon: Star,
    label: "Medium Tip",
    tagline: "You're a star",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
  },
  {
    emoji: "✨",
    icon: Sparkles,
    label: "Large Tip",
    tagline: "Above and beyond",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
  },
];

function TipCard({ display, tipPackage, onPress, isPurchasing }) {
  const IconComponent = display.icon;
  const priceLabel = tipPackage ? tipPackage.product.priceString : "—";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isPurchasing || !tipPackage}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: display.bgColor,
        opacity: isPurchasing ? 0.6 : 1,
      }}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: display.bgColor,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <IconComponent size={28} color={display.color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 2,
            }}
          >
            {display.label}
          </Text>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>
            {display.tagline}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: display.color,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>
            {priceLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function TipJarScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    isReady,
    initializePurchases,
    getTipPackages,
    purchaseTip,
    isPurchasing,
  } = useTipJar();
  const [tipPackages, setTipPackages] = useState([]);

  useEffect(() => {
    initializePurchases();
  }, [initializePurchases]);

  useEffect(() => {
    if (isReady) {
      const packages = getTipPackages();
      setTipPackages(packages);
    }
  }, [isReady, getTipPackages]);

  const handleTip = async (tipPackage) => {
    await purchaseTip(tipPackage);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#F3F4F6",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <ChevronLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}>
          Tip Jar
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero section */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#FEE2E2",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Heart size={40} color="#EF4444" />
          </View>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: "#111827",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Support Simply Food Facts
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#6B7280",
              textAlign: "center",
              lineHeight: 22,
              paddingHorizontal: 16,
            }}
          >
            Simply Food Facts is free to use with no ads. If you find it
            helpful, a tip helps us keep it running and improving!
          </Text>
        </View>

        {/* Tip options */}
        {!isReady ? (
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={{ fontSize: 14, color: "#9CA3AF", marginTop: 12 }}>
              Loading tip options...
            </Text>
          </View>
        ) : tipPackages.length > 0 ? (
          <View>
            {tipPackages.map((pkg, index) => {
              const display = TIP_DISPLAY[index] || TIP_DISPLAY[0];
              return (
                <TipCard
                  key={pkg.identifier}
                  display={display}
                  tipPackage={pkg}
                  onPress={() => handleTip(pkg)}
                  isPurchasing={isPurchasing}
                />
              );
            })}
          </View>
        ) : (
          <View>
            {TIP_DISPLAY.map((display, index) => (
              <TipCard
                key={index}
                display={display}
                tipPackage={null}
                onPress={() => {}}
                isPurchasing={false}
              />
            ))}
            <View
              style={{
                backgroundColor: "#FEF3C7",
                borderRadius: 12,
                padding: 16,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#92400E",
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Tip options are not available right now. Please check back
                later!
              </Text>
            </View>
          </View>
        )}

        {/* Loading indicator during purchase */}
        {isPurchasing && (
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <ActivityIndicator size="small" color="#10B981" />
            <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 8 }}>
              Processing your tip...
            </Text>
          </View>
        )}

        {/* Fine print */}
        <View
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Tips are one-time, non-refundable purchases processed through{" "}
            {Platform.OS === "ios" ? "the App Store" : "your app store"}. Tips
            do not unlock any additional features.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
