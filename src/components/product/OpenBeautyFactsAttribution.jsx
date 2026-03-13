import { View, Text, TouchableOpacity, Linking } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { ExternalLink, Flag } from "lucide-react-native";
import { getFontSizes } from "@/utils/productPreferences";

function SoapDispenserIcon({ size = 36 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Pump head */}
      <Rect x="15" y="3" width="6" height="3" rx="1.5" fill="#0D9488" />
      {/* Pump neck */}
      <Rect x="17" y="6" width="2" height="6" rx="1" fill="#0D9488" />
      {/* Pump nozzle */}
      <Rect x="11" y="11" width="8" height="2" rx="1" fill="#0D9488" />
      {/* Bottle body */}
      <Path
        d="M11 14 C9 14 8 15.5 8 17 L8 29 C8 31 9.5 32 11 32 L25 32 C26.5 32 28 31 28 29 L28 17 C28 15.5 27 14 25 14 Z"
        fill="#0D9488"
      />
      {/* Highlight */}
      <Rect x="11" y="17" width="3" height="8" rx="1.5" fill="#5EEAD4" opacity="0.5" />
      {/* Label area */}
      <Rect x="12" y="22" width="12" height="6" rx="2" fill="#F0FDFA" opacity="0.6" />
    </Svg>
  );
}

export function OpenBeautyFactsAttribution({ barcode, fontSize = "medium" }) {
  const fonts = getFontSizes(fontSize);

  const handleOpenBeautyFacts = () => {
    if (barcode) {
      Linking.openURL(`https://world.openbeautyfacts.org/product/${barcode}`);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: "#F9FAFB",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
      }}
    >
      {/* Open Beauty Facts Logo and Attribution */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: fonts.bodyText - 2,
            color: "#6B7280",
            marginRight: 4,
          }}
        >
          Data provided by
        </Text>

        {/* Open Beauty Facts Icon */}
        <SoapDispenserIcon size={36} />
        <Text
          style={{
            fontSize: fonts.bodyText,
            fontWeight: "700",
            color: "#0D9488",
            marginLeft: 8,
          }}
        >
          Open Beauty Facts
        </Text>
      </View>

      {/* Attribution Description */}
      <Text
        style={{
          fontSize: fonts.bodyText - 3,
          color: "#9CA3AF",
          lineHeight: (fonts.bodyText - 3) * 1.4,
          marginBottom: 14,
        }}
      >
        A collaborative, free and open database of cosmetic products from around the
        world.
      </Text>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        {/* Report Incorrect Data */}
        <TouchableOpacity
          onPress={handleOpenBeautyFacts}
          style={{
            flex: 1,
            backgroundColor: "#FEF3C7",
            borderWidth: 1,
            borderColor: "#F59E0B",
            borderRadius: 6,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Flag size={14} color="#D97706" />
          <Text
            style={{
              fontSize: fonts.bodyText - 2,
              fontWeight: "600",
              color: "#92400E",
              marginLeft: 6,
            }}
          >
            Report Issue
          </Text>
        </TouchableOpacity>

        {/* View on Open Beauty Facts */}
        <TouchableOpacity
          onPress={handleOpenBeautyFacts}
          style={{
            flex: 1,
            backgroundColor: "#EFF6FF",
            borderWidth: 1,
            borderColor: "#3B82F6",
            borderRadius: 6,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExternalLink size={14} color="#2563EB" />
          <Text
            style={{
              fontSize: fonts.bodyText - 2,
              fontWeight: "600",
              color: "#1E40AF",
              marginLeft: 6,
            }}
          >
            View Source
          </Text>
        </TouchableOpacity>
      </View>

      {/* Help Improve Notice */}
      <Text
        style={{
          fontSize: fonts.bodyText - 4,
          color: "#9CA3AF",
          textAlign: "center",
          marginTop: 12,
          fontStyle: "italic",
        }}
      >
        See incorrect data? Tap "Report Issue" to help improve the database
      </Text>
    </View>
  );
}
