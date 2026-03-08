import { View, Text } from "react-native";
import { getFontSizes } from "@/utils/productPreferences";
import { memo } from "react";
import { scaleFont, scaleModerate } from "@/utils/responsiveScale";

function ProductInfo({ name, brand, fontSize = "medium" }) {
  const fonts = getFontSizes(fontSize);

  return (
    <View>
      <Text
        style={{
          fontSize: fonts.productName,
          fontWeight: "700",
          marginBottom: scaleModerate(8),
        }}
      >
        {name}
      </Text>
      {brand && (
        <Text
          style={{
            fontSize: scaleFont(16),
            color: "#6B7280",
            marginBottom: scaleModerate(16),
          }}
        >
          {brand}
        </Text>
      )}
    </View>
  );
}

export { ProductInfo };
export default memo(ProductInfo);
