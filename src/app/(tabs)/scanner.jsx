import { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, CheckCircle2, XCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import {
  scaleFont,
  scaleModerate,
  scaleWidth,
  scaleHeight,
} from "@/utils/responsiveScale";

// Scan line component that animates when shown
function ScanLine() {
  const scanLineY = useSharedValue(0);

  useEffect(() => {
    scanLineY.value = withRepeat(
      withTiming(scaleHeight(160), {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scanLineY.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          height: scaleModerate(3),
          backgroundColor: "#10B981",
          shadowColor: "#10B981",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: scaleModerate(8),
        },
        scanLineStyle,
      ]}
    />
  );
}

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingState, setProcessingState] = useState(null); // 'success' | 'error' | null
  const cameraRef = useRef(null);
  const hasNavigatedRef = useRef(false);

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Scanning frame dimensions - now responsive
  const frameWidth = scaleWidth(280);
  const frameHeight = scaleHeight(180);
  const frameTop = screenHeight / 2 - frameHeight / 2;
  const frameLeft = screenWidth / 2 - frameWidth / 2;

  const handleBarcodeScanned = useCallback(
    async ({ data }) => {
      // Use ref for immediate check (no state delay)
      if (hasNavigatedRef.current || isProcessing) return;

      hasNavigatedRef.current = true;
      setScannedBarcode(data);
      setIsProcessing(true);

      // Haptic feedback on scan
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Show success state briefly before navigating
      setProcessingState("success");

      setTimeout(() => {
        router.replace(`/(tabs)/product/${data}`);
      }, 600);
    },
    [isProcessing, router],
  );

  // Reset scanner state when tab becomes focused
  useEffect(() => {
    if (isFocused) {
      setIsProcessing(false);
      setScannedBarcode(null);
      setProcessingState(null);
      hasNavigatedRef.current = false; // Reset the ref
    }
  }, [isFocused]);

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: scaleModerate(24),
        }}
      >
        <StatusBar style="dark" />
        <Camera
          size={scaleModerate(64)}
          color="#10B981"
          style={{ marginBottom: scaleModerate(16) }}
        />
        <Text
          style={{
            fontSize: scaleFont(20),
            fontWeight: "600",
            marginBottom: scaleModerate(8),
            textAlign: "center",
          }}
        >
          Camera Permission Required
        </Text>
        <Text
          style={{
            fontSize: scaleFont(16),
            color: "#6B7280",
            marginBottom: scaleModerate(24),
            textAlign: "center",
          }}
        >
          We need access to your camera to scan barcodes
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#10B981",
            paddingHorizontal: scaleModerate(32),
            paddingVertical: scaleModerate(16),
            borderRadius: scaleModerate(12),
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: scaleFont(16),
              fontWeight: "600",
            }}
          >
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="dark" />

      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8",
              "upc_a",
              "upc_e",
              "code128",
              "code39",
            ],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        >
          {/* White overlay masks - cover everything except scanning frame */}
          {/* Top mask */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: frameTop,
              backgroundColor: "#FFFFFF",
              opacity: 0.7,
            }}
          />

          {/* Left mask */}
          <View
            style={{
              position: "absolute",
              top: frameTop,
              left: 0,
              width: frameLeft,
              height: frameHeight,
              backgroundColor: "#FFFFFF",
              opacity: 0.7,
            }}
          />

          {/* Right mask */}
          <View
            style={{
              position: "absolute",
              top: frameTop,
              right: 0,
              width: frameLeft,
              height: frameHeight,
              backgroundColor: "#FFFFFF",
              opacity: 0.7,
            }}
          />

          {/* Bottom mask */}
          <View
            style={{
              position: "absolute",
              top: frameTop + frameHeight,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#FFFFFF",
              opacity: 0.7,
            }}
          />

          {/* Header with branding - positioned over top mask */}
          <View
            style={{
              position: "absolute",
              top: insets.top + scaleModerate(16),
              left: scaleModerate(20),
              right: scaleModerate(20),
              zIndex: 10,
            }}
          >
            <Text
              style={{
                fontSize: scaleFont(32),
                fontWeight: "800",
                color: "#111827",
                marginBottom: scaleModerate(2),
              }}
            >
              Simply Food Facts
            </Text>
            <Text
              style={{
                fontSize: scaleFont(26),
                color: "#6B7280",
                marginBottom: scaleModerate(20),
              }}
            >
              Know what's in your food
            </Text>
          </View>

          {/* Scanning frame - positioned absolutely in center */}
          <View
            style={{
              position: "absolute",
              top: frameTop,
              left: frameLeft,
              width: frameWidth,
              height: frameHeight,
              borderWidth: scaleModerate(3),
              borderColor: "#10B981",
              borderRadius: scaleModerate(16),
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
          >
            {/* Animated scanning line - only when processing */}
            {isProcessing && <ScanLine />}

            {/* Corner decorations - enhanced */}
            <View
              style={{
                position: "absolute",
                top: -scaleModerate(3),
                left: -scaleModerate(3),
                width: scaleModerate(50),
                height: scaleModerate(50),
                borderTopWidth: scaleModerate(8),
                borderLeftWidth: scaleModerate(8),
                borderColor: "#10B981",
                borderTopLeftRadius: scaleModerate(16),
              }}
            />
            <View
              style={{
                position: "absolute",
                top: -scaleModerate(3),
                right: -scaleModerate(3),
                width: scaleModerate(50),
                height: scaleModerate(50),
                borderTopWidth: scaleModerate(8),
                borderRightWidth: scaleModerate(8),
                borderColor: "#10B981",
                borderTopRightRadius: scaleModerate(16),
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: -scaleModerate(3),
                left: -scaleModerate(3),
                width: scaleModerate(50),
                height: scaleModerate(50),
                borderBottomWidth: scaleModerate(8),
                borderLeftWidth: scaleModerate(8),
                borderColor: "#10B981",
                borderBottomLeftRadius: scaleModerate(16),
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: -scaleModerate(3),
                right: -scaleModerate(3),
                width: scaleModerate(50),
                height: scaleModerate(50),
                borderBottomWidth: scaleModerate(8),
                borderRightWidth: scaleModerate(8),
                borderColor: "#10B981",
                borderBottomRightRadius: scaleModerate(16),
              }}
            />
          </View>

          {/* Point camera instruction - just above frame */}
          <View
            style={{
              position: "absolute",
              top: frameTop - scaleModerate(40),
              left: scaleModerate(20),
              right: scaleModerate(20),
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Text
              style={{
                fontSize: scaleFont(15),
                color: "#111827",
                textAlign: "center",
              }}
            >
              Access more than 2M+ products. Point camera at product barcode.
            </Text>
          </View>

          {/* Processing state overlay - centered on screen */}
          {isProcessing && (
            <View
              style={{
                position: "absolute",
                top: screenHeight / 2 - scaleModerate(30),
                left: 0,
                right: 0,
                alignItems: "center",
                zIndex: 20,
              }}
            >
              <View
                style={{
                  paddingHorizontal: scaleModerate(28),
                  paddingVertical: scaleModerate(18),
                  borderRadius: scaleModerate(16),
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scaleModerate(14),
                }}
              >
                {processingState === "success" ? (
                  <>
                    <CheckCircle2 color="#10B981" size={scaleModerate(24)} />
                    <Text
                      style={{
                        color: "#111827",
                        fontSize: scaleFont(17),
                        fontWeight: "600",
                      }}
                    >
                      Found!
                    </Text>
                  </>
                ) : processingState === "error" ? (
                  <>
                    <XCircle color="#DC2626" size={scaleModerate(24)} />
                    <Text
                      style={{
                        color: "#111827",
                        fontSize: scaleFont(17),
                        fontWeight: "600",
                      }}
                    >
                      Product not found
                    </Text>
                  </>
                ) : (
                  <>
                    <ActivityIndicator color="#10B981" size="small" />
                    <Text style={{ color: "#111827", fontSize: scaleFont(17) }}>
                      Looking up product...
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}

          {/* Trust signal - Powered by Open Food Facts - Now Clickable */}
          <View
            style={{
              position: "absolute",
              bottom: insets.bottom + scaleModerate(86),
              left: 0,
              right: 0,
              alignItems: "center",
              zIndex: 100, // Above all masks
            }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL("https://world.openfoodfacts.org")}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: scaleModerate(24),
                paddingVertical: scaleModerate(16),
                borderRadius: scaleModerate(10),
                flexDirection: "column",
                alignItems: "center",
                gap: scaleModerate(1.5),
              }}
            >
              <Text
                style={{
                  color: "#374151",
                  fontSize: scaleFont(21),
                }}
              >
                Powered by
              </Text>
              <Image
                source={{
                  uri: "https://world.openfoodfacts.org/images/logos/logo-variants/RVB_HORIZONTAL_WHITE_BG_OFF.svg",
                }}
                style={{
                  width: scaleWidth(315),
                  height: scaleHeight(75),
                }}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      {!isFocused && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Camera size={scaleModerate(64)} color="#6B7280" />
          <Text
            style={{
              color: "#9CA3AF",
              fontSize: scaleFont(16),
              marginTop: scaleModerate(16),
            }}
          >
            Camera paused
          </Text>
        </View>
      )}
    </View>
  );
}
