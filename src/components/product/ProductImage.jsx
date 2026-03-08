import { View } from "react-native";
import { Image } from "expo-image";
import { Package } from "lucide-react-native";
import { memo } from "react";

function ProductImage({ imageUrl }) {
  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 240 }}
        contentFit="contain"
        transition={200}
      />
    );
  }

  return (
    <View
      style={{
        width: "100%",
        height: 240,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Package size={64} color="#D1D5DB" />
    </View>
  );
}

export { ProductImage };
export default memo(ProductImage);
