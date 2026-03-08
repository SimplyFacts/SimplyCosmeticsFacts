import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlertTriangle } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function DisclaimerModal({ visible, onAccept }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const openFullDisclaimer = () => {
    onAccept(); // Close the modal first
    router.push("/(tabs)/settings"); // Navigate to settings
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ alignItems: "center", marginBottom: 24, marginTop: 20 }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#FEF3C7",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <AlertTriangle size={40} color="#F59E0B" />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                color: "#111827",
              }}
            >
              IMPORTANT HEALTH & SAFETY NOTICE
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: "#374151",
              marginBottom: 24,
            }}
          >
            This app provides ingredient information for reference only.
          </Text>

          <View
            style={{
              backgroundColor: "#FEE2E2",
              padding: 16,
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <AlertTriangle
                size={20}
                color="#DC2626"
                style={{ marginRight: 8, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#DC2626",
                    marginBottom: 8,
                  }}
                >
                  ALLERGY WARNING
                </Text>
                <Text
                  style={{ fontSize: 14, lineHeight: 20, color: "#991B1B" }}
                >
                  Do not rely solely on this app for allergy information. Always
                  read the actual product label.
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#EFF6FF",
              padding: 16,
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#1E40AF",
                marginBottom: 8,
              }}
            >
              Data Collection & Privacy
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: "#1E3A8A",
                marginBottom: 8,
              }}
            >
              By using this app, you consent to the collection and storage of:
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 6 }}>
              <Text style={{ color: "#3B82F6", marginRight: 8 }}>•</Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#1E3A8A",
                }}
              >
                Barcode scans and product names (to provide your scan history)
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Text style={{ color: "#3B82F6", marginRight: 8 }}>•</Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: 20,
                  color: "#1E3A8A",
                }}
              >
                Ingredient alerts you create (to flag ingredients in future
                scans)
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,
                color: "#3B82F6",
                fontStyle: "italic",
              }}
            >
              You can delete this data anytime in Settings. Scan history older
              than 30 days is automatically deleted.
            </Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 12,
              }}
            >
              Important Limitations:
            </Text>

            {[
              "Data may be incomplete, outdated, or incorrect",
              "Product formulas change frequently without notice",
              "Regional and country variations exist",
              "Information is sourced from Open Food Facts (crowdsourced)",
              "Not intended as medical or nutritional advice",
              "Not a substitute for reading product packaging",
            ].map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", marginBottom: 8 }}
              >
                <Text style={{ color: "#6B7280", marginRight: 8 }}>•</Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    lineHeight: 20,
                    color: "#4B5563",
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              backgroundColor: "#F3F4F6",
              padding: 16,
              borderRadius: 12,
              marginBottom: 32,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: "#374151",
                textAlign: "center",
              }}
            >
              For serious allergies or dietary restrictions, always consult your
              healthcare provider and verify all ingredients on the physical
              product package.
            </Text>
          </View>

          <TouchableOpacity
            onPress={onAccept}
            style={{
              backgroundColor: "#111827",
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 12,
              alignItems: "center",
              marginBottom: 16,
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              I Understand & Accept
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openFullDisclaimer}
            style={{
              paddingVertical: 12,
              alignItems: "center",
            }}
            activeOpacity={0.6}
          >
            <Text style={{ color: "#6B7280", fontSize: 14 }}>
              View Privacy Policy & Terms
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
