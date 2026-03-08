import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Image } from "expo-image";
import { Package, X } from "lucide-react-native";
import { memo, useState } from "react";
import { getFontSizes } from "@/utils/productPreferences";
import { scaleFont } from "@/utils/responsiveScale";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ProductCard({ imageUrl, name, brand, barcode, fontSize = "medium" }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fonts = getFontSizes(fontSize);
  const insets = useSafeAreaInsets();

  const renderThumbnail = () => {
    if (imageUrl) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 8,
            backgroundColor: "#F3F4F6",
          }}
          contentFit="cover"
          transition={200}
        />
      );
    }

    return (
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          backgroundColor: "#F3F4F6",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Package size={40} color="#D1D5DB" />
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          gap: 12,
          backgroundColor: "#fff",
        }}
      >
        {/* Left: Photo Thumbnail */}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            borderRadius: 8,
          }}
        >
          {renderThumbnail()}
        </TouchableOpacity>

        {/* Right: Product Info */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Text
            style={{
              fontSize: fonts.productName,
              fontWeight: "700",
              color: "#111827",
              lineHeight: Math.round(fonts.productName * 1.2),
              letterSpacing: 0.2,
            }}
            numberOfLines={3}
          >
            {name}
          </Text>

          {brand && (
            <Text
              style={{
                fontSize: scaleFont(14),
                color: "#6B7280",
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {brand}
            </Text>
          )}

          <Text
            style={{
              fontSize: scaleFont(11),
              color: "#3B82F6",
              marginTop: 4,
            }}
          >
            Tap photo to enlarge ↗
          </Text>
        </View>
      </View>

      {/* Full-screen Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
          {/* Background Overlay */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={{
                position: "absolute",
                top: insets.top + 16,
                right: 16,
                zIndex: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setIsModalVisible(false)}
              activeOpacity={0.8}
            >
              <X size={24} color="#fff" />
            </TouchableOpacity>

            {/* Full-size Image */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {imageUrl ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="contain"
                  transition={200}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Package size={120} color="#D1D5DB" />
                  <Text style={{ fontSize: 16, color: "#9CA3AF" }}>
                    No image available
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

export { ProductCard };
export default memo(ProductCard);
