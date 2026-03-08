import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Image } from "expo-image";
import { ExternalLink, Flag } from "lucide-react-native";
import { getFontSizes } from "@/utils/productPreferences";

export function OpenFoodFactsAttribution({ barcode, fontSize = "medium" }) {
  const fonts = getFontSizes(fontSize);

  const handleOpenFoodFacts = () => {
    if (barcode) {
      Linking.openURL(`https://world.openfoodfacts.org/product/${barcode}`);
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
      {/* Open Food Facts Logo and Attribution */}
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

        {/* Open Food Facts Logo */}
        <Image
          source={{
            uri: "https://world.openfoodfacts.org/images/logos/logo-variants/RVB_HORIZONTAL_WHITE_BG_OFF.svg",
          }}
          style={{
            width: 237,
            height: 55,
          }}
          contentFit="contain"
        />
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
        A collaborative, free and open database of food products from around the
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
          onPress={handleOpenFoodFacts}
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

        {/* View on Open Food Facts */}
        <TouchableOpacity
          onPress={handleOpenFoodFacts}
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
