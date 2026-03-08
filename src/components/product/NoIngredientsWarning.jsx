import { View, Text, TouchableOpacity, Linking } from "react-native";
import { AlertTriangle, ExternalLink } from "lucide-react-native";
import { formatDate } from "@/utils/ingredientUtils";

export function NoIngredientsWarning({ barcode, updatedAt, fontSize }) {
  const handleOpenFoodFacts = () => {
    if (barcode) {
      Linking.openURL(`https://world.openfoodfacts.org/product/${barcode}`);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#FEF3C7",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F59E0B",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <AlertTriangle size={20} color="#D97706" />
        <Text
          style={{
            fontSize: fontSize,
            fontWeight: "600",
            color: "#92400E",
            marginLeft: 8,
          }}
        >
          Ingredients Not Available
        </Text>
      </View>

      {updatedAt && (
        <Text
          style={{
            fontSize: fontSize - 2,
            color: "#78350F",
            fontStyle: "italic",
            marginBottom: 12,
          }}
        >
          Last updated: {formatDate(updatedAt)}
        </Text>
      )}

      <Text
        style={{
          fontSize: fontSize - 1,
          color: "#78350F",
          lineHeight: (fontSize - 1) * 1.5,
          marginBottom: 12,
        }}
      >
        This product's ingredients list is missing or incomplete in the
        database. This may happen when:
      </Text>

      <Text
        style={{
          fontSize: fontSize - 1,
          color: "#78350F",
          lineHeight: (fontSize - 1) * 1.5,
          marginLeft: 12,
          marginBottom: 4,
        }}
      >
        • The product is new or recently updated
      </Text>
      <Text
        style={{
          fontSize: fontSize - 1,
          color: "#78350F",
          lineHeight: (fontSize - 1) * 1.5,
          marginLeft: 12,
          marginBottom: 4,
        }}
      >
        • Regional variations aren't cataloged yet
      </Text>
      <Text
        style={{
          fontSize: fontSize - 1,
          color: "#78350F",
          lineHeight: (fontSize - 1) * 1.5,
          marginLeft: 12,
          marginBottom: 12,
        }}
      >
        • Data quality issues were detected
      </Text>

      <Text
        style={{
          fontSize: fontSize - 1,
          fontWeight: "600",
          color: "#92400E",
          marginBottom: 8,
        }}
      >
        What to do:
      </Text>
      <Text
        style={{
          fontSize: fontSize - 1,
          color: "#78350F",
          lineHeight: (fontSize - 1) * 1.5,
          marginBottom: 12,
        }}
      >
        ✓ Always verify ingredients by reading the physical package
        {"\n"}✓ Check for allergens manually if you have dietary restrictions
      </Text>

      <TouchableOpacity
        onPress={handleOpenFoodFacts}
        style={{
          backgroundColor: "#FBBF24",
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ExternalLink size={16} color="#78350F" />
        <Text
          style={{
            fontSize: fontSize - 1,
            fontWeight: "600",
            color: "#78350F",
            marginLeft: 6,
          }}
        >
          Help Add Missing Data
        </Text>
      </TouchableOpacity>
    </View>
  );
}
