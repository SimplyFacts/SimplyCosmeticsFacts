import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Shield } from "lucide-react-native";

export function LegalDisclaimer() {
  const dataAccuracyItems = [
    "Product information may be incomplete, outdated, or incorrect",
    "Manufacturers frequently change product formulations without notice",
    "Regional and country-specific variations exist for the same products",
    "Ingredient lists may not reflect the most current version",
    "Data is sourced from Open Beauty Facts, a crowdsourced database",
    "We cannot guarantee the accuracy, completeness, or timeliness of any information",
    "Alert preset categories and ingredients are based on research from EWG Skin Deep®",
  ];

  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#FEF3C7",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Shield size={24} color="#F59E0B" />
        </View>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
          Legal Disclaimer
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#FEF3C7",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#92400E",
            marginBottom: 8,
          }}
        >
          ⚠️ IMPORTANT HEALTH & SAFETY NOTICE
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#92400E",
            lineHeight: 19,
            marginBottom: 8,
          }}
        >
          This app is provided for informational and reference purposes only. It
          is NOT intended to be a substitute for professional medical advice,
          diagnosis, or treatment.
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Skin & Allergy Warning:
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 19,
          marginBottom: 12,
        }}
      >
        Do not rely solely on this app for skin safety or allergy information.
        Reactions to cosmetic ingredients can range from mild irritation to
        severe allergic responses. ALWAYS read the actual product label and
        consult with your dermatologist or healthcare provider before using any
        product if you have skin sensitivities or known allergies.
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Data Accuracy & Limitations:
      </Text>
      <View style={{ marginBottom: 12 }}>
        {dataAccuracyItems.map((item, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 6 }}>
            <Text style={{ color: "#6B7280", marginRight: 6 }}>•</Text>
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                color: "#4B5563",
                lineHeight: 19,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12, gap: 8 }}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://world.openbeautyfacts.org")}
        >
          <Text style={{ fontSize: 13, color: "#2563EB", textDecorationLine: "underline" }}>
            Open Beauty Facts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.ewg.org/skindeep")}
        >
          <Text style={{ fontSize: 13, color: "#2563EB", textDecorationLine: "underline" }}>
            EWG Skin Deep®
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Not Medical or Dermatological Advice:
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 19,
          marginBottom: 12,
        }}
      >
        This app does not provide medical or dermatological advice. The
        information displayed should not be used for diagnosing or treating skin
        conditions or diseases. Alert categories are based on EWG Skin Deep®, an
        independent nonprofit research database — not a medical authority. Always
        consult with a qualified dermatologist or healthcare provider for
        personalized guidance.
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        User Responsibility:
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 19,
          marginBottom: 12,
        }}
      >
        You are solely responsible for verifying all product information on the
        physical product packaging before use. This app is a supplementary tool
        only and should never replace reading the actual product label.
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 8,
        }}
      >
        Limitation of Liability:
      </Text>
      <Text
        style={{
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 19,
          marginBottom: 12,
        }}
      >
        We disclaim all liability for any injury, loss, or damage arising from
        the use of this app or reliance on the information provided. Use of this
        app constitutes acceptance of these terms.
      </Text>

      <View
        style={{
          backgroundColor: "#FEE2E2",
          borderRadius: 8,
          padding: 12,
          marginTop: 4,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: "#991B1B",
            textAlign: "center",
          }}
        >
          When in doubt, always verify with the product packaging and consult
          your healthcare provider.
        </Text>
      </View>
    </View>
  );
}
