import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Info } from "lucide-react-native";

export function Disclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <View style={styles.disclaimer}>
      <TouchableOpacity
        onPress={() => setShowDisclaimer(!showDisclaimer)}
        style={[
          styles.disclaimerHeader,
          !showDisclaimer && styles.disclaimerHeaderCollapsed,
        ]}
      >
        <Info size={20} color="#B45309" style={styles.disclaimerIcon} />
        <Text style={styles.disclaimerTitle}>
          Legal Disclaimer & Important Information
        </Text>
        <Text style={styles.disclaimerToggle}>
          {showDisclaimer ? "−" : "+"}
        </Text>
      </TouchableOpacity>

      {showDisclaimer && (
        <View style={styles.disclaimerContent}>
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Accuracy Limitations:</Text>
            {"\n"}
            This app provides product information from public databases. While
            we strive for accuracy, nutritional data and ingredient lists may be
            incomplete, outdated, or contain errors. Always verify information
            on product packaging for the most current and accurate details.
          </Text>

          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Not Medical Advice:</Text>
            {"\n"}
            This app is for informational purposes only and does not constitute
            medical, dietary, or professional advice. Do not rely solely on this
            app for allergy or dietary decisions. Consult a healthcare provider
            or allergist for medical concerns.
          </Text>

          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Intended Use:</Text>
            {"\n"}
            This tool is designed to help track ingredient alerts you've set. It
            is not a substitute for reading product labels carefully or
            consulting with medical professionals about allergies and dietary
            restrictions.
          </Text>

          <Text style={[styles.disclaimerText, styles.disclaimerTextLast]}>
            <Text style={styles.disclaimerBold}>Liability:</Text>
            {"\n"}
            We are not liable for any adverse reactions, allergic reactions, or
            health issues resulting from product consumption or reliance on
            information provided by this app.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  disclaimer: {
    backgroundColor: "#FEF3C7",
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  disclaimerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  disclaimerHeaderCollapsed: {
    marginBottom: 0,
  },
  disclaimerIcon: {
    marginRight: 10,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B45309",
    flex: 1,
  },
  disclaimerToggle: {
    fontSize: 16,
    color: "#B45309",
  },
  disclaimerContent: {
    marginTop: 12,
  },
  disclaimerText: {
    fontSize: 13,
    color: "#92400E",
    lineHeight: 20,
    marginBottom: 10,
  },
  disclaimerTextLast: {
    marginBottom: 0,
  },
  disclaimerBold: {
    fontWeight: "600",
  },
});
