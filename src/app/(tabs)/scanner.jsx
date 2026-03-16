import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking,
  InteractionManager,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, CheckCircle2, XCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
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


// Static barcode types — module-level constant so CameraView never gets a new array reference
const BARCODE_TYPES = ["ean13", "ean8", "upc_a", "upc_e", "code128", "code39"];

// Static scan-line base style computed once
const scanLineBaseStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  height: scaleModerate(3),
  backgroundColor: "#10B981",
  shadowColor: "#10B981",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: scaleModerate(8),
};

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

  return <Animated.View style={[scanLineBaseStyle, scanLineStyle]} />;
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

  // Memoized frame geometry — screen dimensions don't change between renders
  const { screenWidth, screenHeight, frameWidth, frameHeight, frameTop, frameLeft } = useMemo(() => {
    const { width, height } = Dimensions.get("window");
    const fw = scaleWidth(280);
    const fh = scaleHeight(180);
    return {
      screenWidth: width,
      screenHeight: height,
      frameWidth: fw,
      frameHeight: fh,
      frameTop: height / 2 - fh / 2,
      frameLeft: width / 2 - fw / 2,
    };
  }, []);

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
        InteractionManager.runAfterInteractions(() => {
          router.replace(`/(tabs)/product/${data}`);
        });
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
          barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES }}
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
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                fontSize: scaleFont(32),
                fontWeight: "800",
                color: "#111827",
                marginBottom: scaleModerate(2),
              }}
            >
              Simply Cosmetics Facts
            </Text>
            <Text
              style={{
                fontSize: scaleFont(26),
                color: "#6B7280",
                marginBottom: scaleModerate(20),
              }}
            >
              Know what's in your cosmetics
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
              Access 200K+ cosmetic products. Point camera at product barcode.
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
                      Not in database
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

          {/* Trust signal - Powered by Open Beauty Facts - Now Clickable */}
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
              onPress={() => Linking.openURL("https://world.openbeautyfacts.org")}
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
                source={{ uri: `data:image/png;base64,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kAFkacB0mtFKIA2LBytdSFoXDdDny2UolJ8kv7zuF/aiiy4qB/IgG+6lL30pr3/967HW0mw2iaKIa6+9lq997Wv84Ac/IMsyOp0OlUqF9evX87nPfY6nPvWp9uijjy599izLSNMU77l2u13ATcbJyUne9KY38eIXvxilFJ488J3vfIdPfvKT3H///eViIYTg+uuv5/Of/zxr1661ixYtKkJoOV/84he5//77S+UXT5D4+Mc/zjOf+UyWLFkifHhn165d9qSTTuJv/uZv2LlzJwDj4+Ncc801XHjhhaxcudI2m01RrVYJw7DckUspS4bi4sWLecc73sHpp/8+o2NN4jDiZz/5Kf/0mX/imut+SS/tY41BBAHbt+3gxz/+MU994qm2ObGofC5BENCo1ecnpBAQRQQmJ2136e2dAmNpSkElM2XZTa4UmZrvAFMwZ20TRCQFUkNFwYljdVF50lPt1l27uPaB++gkGTKwdPo9Znsdclz5V88mbG917Rd/+hOu27yFKRUx3cuJbIhJMoQ29HXKVL+DrcfYWkwqFKoSuwNYiTWZC4HqjEPGJjh08RI085y4+/fuspc/cCdrjl7L6OQqIlwY9+gVh3D8YYezeW6WaZNiw7jokCNJtGG21SHT89FdGQriWhWhik46uSl6kFpsINFCkCrJXJrQyjI0UCtyqJEMacRV8tZeiEIyKyAOnJh+QXtKrPMKc8CYlK4xjFarREbQF2CUdX+HotRHSI1SkswU4SwhScMYG+Tcu2eKy677JUsff6I9YdGIUEqU2i2bdu7kunvuYS6I0MJJPmItKgic3rFx0ovGuNCztoLEWOa6PUytWSxSCowmy1POPPNMfvCDH5Ss1Y9//ON861vfKhf/MAw599xzeeMb31hGauI4Zvny5Xz729+m1+vR7/cZZPB+5jOf4YUvfCG1Wk0EQUCr1bLXX389H/3oR7n00kvLjWulUuHiiy/mbW97W3mubdu22fPPP5+77roLgGq1Spo6xa3jjjuOd7zjHZx22mnlfJ2bm+MLX/gCn/zkJ9Fa02w26XQ6SCl5+ctfzu23324/9alP0W63EUJw5ZVX8p73vIfp6eky1Lty5Ur+4R/+gaOOOoper0eSJCxevLiMgP3qV78qWcDgcsjvfve7Oe2004TffO/YscOuXbuWv/mbv+G+++4rveEHHniA7du328WLF4sgCMo5+0h3StsfHnkPdYCE5OD7U87XaOa4bg8da8ikopdrMq0cwbGIIHhG72/z1RZNOXIgQ9O1mo5xIbu4UHvzbVT318jaAu95z3totVqlqLQfgG95y1t485vfXNatebz4xS/maU97ml2+fDnnn39+GdYVQnDDDTfwjW98gz//8z+34+PjIsuyBaUoHmEYcsQRR3DhhRdy4oknil6vRxzH5YLwxje+kdNPP92++c1v5sorryzp9ABXXHEF3/ve93jlK18JwL/927/Zq6++eoGMWrPZ5O/+7u/44z/+Y+HDylJK+v0+S5YsEW94wxt44IEH7Be+8AXSNGV6eppKpcK//Mu/cO6553LsscfS6XRI07Sc3FmWlWG0Cy64gOc973nCGB9aM7zwf57NyuUr7Qf/9u/43iU/BCRWa1Qg+dWvfsXU1BTNiUVuVy1dS7CR0SZxWHQMyp00ViCUy4+lOaGBuNS/NbSSHhtbLbt+epbNcx2m0y7tvEtvei/HLlthzzj+8axs1EWgoSLgkIrkCUesYf3WzWzszCCYz8lZIEEjghrtOOHe1gw37t5Jd2SCPJeERhFqicxBxjXSSoiOhAt5Jl3ywCKsAqWwRhJYQWgkh9bHWDUyQbXwKvvA+j17uebeuzGTExw3ucpKi6gKOCiKxeNWLLe/WHcnnbRPqlyDbqQi0Tntbo80zbBRWBJ6o0qIKvR6hRZIJcmFdvNCWBJp6ZicvnYGVRcOZWQlY7UGgVWlihNRDHlKmua08g6z/Y5j8grXGH1cIkbCiq0KSUe6vqamEK8gyzHKklgnjYQ20GySzaRkmWF8bBH/ds0veFxzhLWLTqSh3JrSzTI27d7Fvbt2YsbGyLPUdedTCiUEaZaBNahi3FosRrruU70sAZouz6yc9x1GEZOTk2JychJwYc7R0VHrx7wPX46Pj3PkkUcKHxXxEaSzzz6bww8/3H7nO9/hs5/9LFprvve973HmmWcKn7aRUjI6OirOPPNM1q9fb2+66SZ2795dztepqSnWr19vjzjiCGGt5Uc/+hHXXHMN4Eg+vV4PIQSvfvWr+d//+3+zZs0akaYpk5OTpVH64Ac/yDHHHGP/+q//mg0bNpTz9X/8j/+BlJJDDz201PPtdDrW190mSYJSLtd93HHHld1zBsv2du7cya5du8pzhWHIYx/7WB7/+MeX5XPGGJYtWyb+5E/+hMnJSfuHf/iHnHHGGbzpTW/i8Y9/PJOTkyIIggeRrg40PPL+chFD810lfTtlwBnTQsmoZ2CqNUsv71MdUaioYNwJsGlEYGOkjiGLCYlRJsYkIVLH/6V/gXXHDGxMLGOStjtfrdjNqxDavZxKvUJqc9qpa0LdLWr1vYi2thllfWKaYQ38y7/8q123bl0Z4vXG79xzz+XP//zPaTQaBEGwwBhqrZmcnBR/9Vd/xamnnuoeYTF4pZT8+Mc/Ltm1g3mcQSileN/73scxxxwj/O/94PfhlKOOOkp87GMfY9GiRW6gFAZ148aN+BIBYwyXXHJJObnBkZ7OOOMMnv/855f1pUqpBTV2AOeccw4rVqwoa+KyLGNmZoYNGzaUoeharbYgnNbv9znrrLM46aSTytpYwLFTgZOf8ATx5Cc/mWazWbYV0rlhamqPM6TGEEiJBJq1GoEVmDQjVtKp3CMxGuK4zq6pWfpG0MVV8yeR5PJ777Jvu+if+ctvfom/v+7HfPxX1/D/3Xk7F952G5++8nIu/PlV3D01Y7Vy7NJxiVhz0EEsqdSoGhD9DN03kMsiDxujkWQyZmzZCogqLvRYqZFZsCIkjmOyJEMYjdLaGf4goCIsKs2xqSaUVVQ/Z8KGHDWyhMNkJOq5q5fMLGyamWXT7By3btrEtixxPAUDY8AJKw5jzeLFVIxFp24DliNIjaWfZPTaPUI5LyoxPj6OEqB7CZFUaGuQUYzOU2jWizy0C5EmYIOidV1VOYNqsxxyAzJ0QvxWEqiIHOh0+5hiQRA4SdClzTFkkiO1RQnXLC9WATJyikYo5VxxqaDdAwRBXGWm06MjFHdv28q0zq2WFoTGhgpVqyCqLgdNEJQuuMm1Y7gFETr3a5AgN4ZMWKbmZl3UuQxqiHL++YXeG5rBzizdrtNE9nPE13oaY6hWqzz1qU8VH/3oR8XPf/5z3vve9/KsZz2rJBn54/kI1mmnncaSJUvK/KOv5fZh5tnZWXvrrbeWG1yfm1y9ejVvetObWLNmjfCKRx4+TPuSl7xEnHnmmQRBwLnnnssNN9zA+eefL/ZVdPJrjYcnTQ3yMAZr4Ot1FwnyOdAsy7j22mv56U9/Ws7rwet50pOexA033MDFF1/MWWedJQ466CARhiHdbrc8rt+oH2h45D1UKPV1vUpK+adwQjRFc2VLEEhUniFz7coBjHKEQyFcz2Y7v/mVEioVyX/1mfv+5kliqVQEo6MxeQ69HqRaE1cVKhYIk6CTLsY00UREVWdoo2pQaPsKF4ZEQRgiLNzyq5votNrlBMvznMWLF/OKV7yC8fHx8jEMFnv78MjExIR4xzveYV/wghfQ6XTKybtp0ybuv/9+jj32WKffWuyShRDlIHzuc5/L6aefXtZ7DhpUn7+J45jDDjtMPPOZzyxD0n4R2LhxI9u3b7dBEHD77beXC4pvoGyt5dJLL6Xf71sppctLFXlVn8OZm5ujWq1SrVbp9XporZmZmeGuu+7i6U9/eulV+wXDs49XrVpFs9nE64WCQamiFi1QTCxazOjYBHP9ruuKwsCCZ52En8Q1NKhEAWGRD0e6Wg1rBblxa31e1K0mFOL5lYB2LWZXnjBlc6x2IcjGosXs7Xa4acMDnHzYag6bGCvzqvU4oBbHVCquLKObpHS6CV7p0gKhiKgTUs8F3TQjkAkqN0Q6QemMhtVYJdBC0sNgLUgsURSjjcs3hwaWj45zxNhimrgIiRXQ1titrQ5b5lrkGzZx4z33sHTNsbYuEDKD1eMjnLjqCO7cu5tOv49UihSLCGPmkl6R03P2LwYxMTJiIysIhUUoiZaSji4C31JA4LzbqdkZF9kIAooUL2ONJpEoRPotRQf1Im9oIdEanRtEqBCu+peaVDTDiBks890SdSHa4vrRlhtV3OQXVpFJSaICOgjawpIiCHE6wSoKEWFU5GRd7a0wPAjCgpVODCTThnbadwEmXyf/G6oBxXH8oLzfoDCL9zSPPfZYcdxxx7mhPMAU3rp1q7377ru5/vrr+eUvf8l99923IH/p1w9rLTt37mTdunVo7chUnrF/zjnnsHz58jJN46/HrwvgNrDvfve7ede73sXKlStLLsb+egr/puHWPM8ZHx/njDPO4Ctf+UpZK79161bOPvtsTj75ZHv22Wfz/Oc/n8nJSRGGIYsWLRITExMLhCH89fn/P1B7rT7yBrWs+Rocn/NxYJ+nIs+JdEqdEKG7SCsRKiIzbhIb4XIkJs/p56akVJuHlH34zeCYtgHGZKQmcCSPLCUMQ5oVhcgTTN5FmYxIGbJum9nuhG3UEJVqUJKRpHfFhQChEALuXreO6enpBTqgy5cv58QTTywHvs+TAKUxzbIMYwwnnXQSk5OTC0hM27dvZ9OmTeWg8xPH73K11jzlKU9hYmJCeKbfvr0N/aRvNBo85znP4Vvf+hadTqcc2Fu3bmVqaoput0uv1yvZjSMjI8zNzfHd734Xr6biz+3zQ9641+v1B3XbUEqxcePGcpL74nRfh6u1ZsWKFURRVIaVEDiyiXFjptFouIlnTGmxXC5Ml5EQgWMF1ypVlHKF+25j5qTmjLakiSYzZV9xLBBUqkSVKrRbWCshjKFvyDNLa65HNjpKUHfelnaOKDZUaCVIFSRW0M4yOmlWkpsUUNcBy9KAFR2D6rUJ+hlSWEIBMk8ZG2lSrddR9SpzKmDT9Aw7231sNcQK4wTu04zlE5OsXDJZ6lCnIezJNVu6LfoqYk+3x707tjO35jHkSjlPHcTvHXWU/dn997Jj02bS0GC0a+W2a2aKbr+PVPP1l+NRhYqBwAp6aYqNAxDaeYjGEY4Ehna77RZ1FZSqSWPNEdeD2AqMKZ5ssQHOjKWbJm58hKr8OzVUxES1wdZ+C2ENws7PFby4hJfxNIbYSoQ1aKlIpWDOaGbznCRSKAQKRa0SEamg1DAGcHKC+1ufnH5zKgzT7TkXcbK+Wu/XG1QvpuKNk59rPnLj57M3ajt27LA/+tGP2Lp1K9dccw333HMPDzzwQDmXB1MfgwpCfo5NTU2VuVP/fhzHPPvZzy7bxQ2qnA3Wn0dRxCGHHPIgb3Sw3+l/NG8ZBAErVqwQp5xyiv3yl79clgn5Y/3sZz/jhhtu4C1veQtPfOIT7cte9jJOPfVUli9fXqq1+e41QgjSNF2g8nag4ZE3qDBgVOdDvV531VJIp/W6dHdsI26MkbbbZL2M5ug49TAmjqvzO5bIhRCEFUj9X9eUFEogyTChATJsamnYjFpQY/eunRjTJ1ZQVYogTenmPUYOmwCgn2iqsULnGUGgCs69wGYJIozpd3ulFJefMKtWraLb7VKtVgmCAJ838BNmsIWSUkpMTEzYzZs3l1TyNE1JkqTcsfb7/XLi5XlOvV7nyCOPBHiQmLUvmPZGTCnF2rVrywnsd8VebGLXrl2lUQzDkLm5uQdNPp8XHtw0FAouJbHCEzF8fVmapnaw1gwoywgKw2q11mJB2CkrdtJKIpScH0sUvbKLQmcvGBKCqFYqNgilE5uXnmku0VbTT3Oy3CCRZWnMeBgzGUSMZWCtQdViwkBSs5qVKw7l9088ltUrVrh+MIWc5UynRSvr0zUaHSgSLF1rHKsWNwEXKylOW/0Ye0h9BNGs01w0SnW0QqNRZYyKk7zECcPf2prhqz/5CVfccRdJ4NqlWMDohInROuNjTVRBZc6ALVN72bx3D7mFVrvPugceYMOa7Ry8YgWxyYlUwFGLF3P8IYdy16Zt7CrCb12TMdXvMdNvYeUy94yx1BGMqpC9kaGdG7IsgTCAOIY8cWH1SJEnadE31dm9QLnQn85TTCZcizQlSw/TCOinCf0sReA2kF5MYrzexHamMcZ9z5TiC2o+/oolsJbA6CI/LcmEZS7PaOUaE0VOyB6ox1XiQEE/cQlesY80acnpKDaEOPLjdMsZ1NKGDyxdD7l+FBvUfevK/XzzBvLGG2+0b33rW7n88ssZHR1ldna2nDt+g+k3rv59z53QWpc8hzzPFwhMaK1ZtWoV9Xq9zDv6+eyvzRsufy2+BVscx/ttLPEf8VA9o/dFL3oR99xzD5/61KcAynv0nwHHz7jiiiuoVCr80R/9kX3961/PiSeeKAZTP96YDpIlDyQ8sgZ1UJTB7vM6UGrWyTL7/Ysu5AMf/FAhpiahUuHo4x7Hty78IuPNmCxz5XwhiMRUrJIPT3WqBHopNgxBFW1OJZBb7MXX3cSbX/saqDcg1TA3x9EnPp5LvvttxibqRLEqyEhiwQFz6UJgfpc6OFEKg2a11mKwAPyhOqbsT4h68LODoSHgQYXl/ruDO+bB73nGsX/fX8u+dWeD3qgvD/DHHwwXD6oq5XlebgJ8PmTp0qUEQSAKir4dzDcN3LPwIWTrdbKUxOyTuyFQkOv58JoQ80ECoBqFhGGATvogwmITJzBIuqmr1dM6hlxTjxUrgoCnLj+UFZVxOkGVSmOMRlxnyXiDNYcsZtWiBpMIEWPQQrI3zexd997Hnrk2XSCohCR9w0zWoQ22CqIG1AVMHLJMnLB8GSL2vVlzGxAISGxEJCyCKtglKibsGZJOgqiNYgOBFIZKHDAyUiOuSBcVUdDXmt3taTppn8hIbK7ZsXMn92/byLHLJm01jERuMsZlKJ60eq299uY7mJ6eRYxX6Zku/RA65GXLshDDIhmxOK6yPm2hajF5mrrwq9/A6BzTS8n6PWzuxzWEAhHEkRWqEN22wkUEEFhcOLubZiTZfA20ACKpGK03in6z0rVF9H9EJUEXY9OAIC/+xAFWSlKglbuIgKg1UBgUhpEwoK6KqIaaNwxivzbCYqXCSMuUZ7GreW7Erws6DtacDnqGfjMrpeRLX/qSfdOb3lSWvHhD4+eE98yiKGJiYoJdu3aV68W+Idn9Gbt9o1Dl/Q4oDvnrG8zz7rve/GfgtYUPOugg8Vd/9Vc2yzK+9a1vMT097aZosakOw7DkWnS7XS688EKuv/56PvShD9lnP/vZYvA6fJpq31ztgYBHXMvXh9RKMQePAXWhehiKhsCyew9eaB4JszXFpO2zWIRCK4swFikDtM2EKjIm810W//OvmUhEKGKcGo0Xk5Bi5t5bLa3d0G+7or8ko5pnjMZRoSZkXN5XBoVcmvOEZMEsVcpJFHr0+302b95cqhF54s8gm83nKYsibzs1NVX+zqv/DJKBvMHyRAJ/DqDUyNyXpDAYKvafBRYI3ltrWbx4cRlGGuybeNxxx3HQQQeVE9YPel+T5zcR/pw+TxoEAaeeeqoXl7C+dtbD77pL8WwgNTmBDFCBwBYVk8aHewfq74qHVw48KSAKFVEUQFJUQQswUmEEdLKEbp6iVEysFMLmrD1omVix9CBSqUgLDrp1egwiwokoSN0lUiGJVsxOzbJp4xa6vQyt3A4x05p2u03faEKpsKlT2JVCUQ3n54MkEG5eOPWooqmCqEZVW61UiFSEtmCMRdqcxc06SydGcCbKZRtNru09966jP9emqSWVIKZqYXbPFHumdjO5ZCkBBkXIY5YdxOOWr+L+1h3s1ZpMaDrSkMfKaQDbjJoIWCQjljVG6OzYTl9CtVKllyTQTxCV0IXCs5RYBSjhlJeQRZeoPCGIClF/vymTriE6StLLU3pJf0Hf40AKmvUamhwjI5SUWFOo6grcwa1BSOsaThSsXKQit07xqZckhXyiLcLIQaHVPC8kJey/z9A0hYfq9WYG65F/HXzJ1+BY95GpL3/5y/Yv//IvSyWxQcGFlStX0mg0aDabjIyMcMopp9BsNvnEJz7Btm3bFtSj+jkvpWRsbIzt27eXBnL79u1lWHlQmH+wuQbMczV8ucq/Z7B+U0PmPdSCVSz+8R//kf/1v/6Xvfjii7n66qvZtm0bO3fuZHCux3FMlmXccccdvP3tb6dWq9nTTjutVFEDSonVAw2PqEF1SjALdXsfNEqNpioVy0fGGQ9jumkbqw2Zhvb2jbT27mXx6KgrCyu9GItSkOcGpQallP7jr9ZCGPowg1sdnKxXl+nde8Dm0GkRAxLF6mVLMd2uDeqjQobSES8GQtg5rl+l1TmrVx9OvV4nmUnLEO22bdtYt26dXbt2rdiXnesNkg973HHHHezevbvcpVprWbJkCcuXLy/fK5tLF56sUopf/vKXnHPOOaUx9B6ku8d8gRd56aWXlkxcb5iWLVvG2NgYjUaDKIrKCVOUDPBHf/RHvOlNbxL+GH7xGDSGML97H+ys45mASimfutyvwkwZhrbWtwFFikKdxQ8ia8scKsaWq6BX5IpUQC2KkcLnci1GCVf6oVPmdI+EJugODWWQxtCQFSyKQnwHZRF5npHrDlEsnN6szYlVyNJFkxy9+jFsFgFTO7fS7SeITGOTBJv2kJUaQeTblQnaWpPasFTVEkBqsEmu6SYZc1Kxfm6OtrYEtQoGg9IQpQmHrphk1ZJJ6liBTsBGVK0Rq5eusGc9aYRYVBlrNKnKlEMXjbC46YxvIJ1HuyREPHHtsfaW6Wl27d4CdctU0mGq20bjurQJoxlXgXjsqiNtvHUjLZ2Sa0WkFGmSI3ODVJKlI4tYfegq6tWaEMKFSxOwO/fuIcc6UQarivHkdsdGGfp5Ri/Li65M7m8YBMqpBAFIiVAC7x8y8H0o+tMqg/YCEMLS7vfp91KXk3U7EKdJHCoqUtKxrjxvgEXw4IVKuOuZbc1RCIoKU264fz0GCUg+KgNw55132s9+9rPs3r27TMsopTjiiCM4/vjjed7znsfSpUs59thjWbx4sQD46U9/ai+66CJmZmbKmnK/WdZaMz4+zpo1a0otYGNcPvvyyy9n7dq1DJae+Pk5yL7fvHmzBR6US93f/Qymdx4KlUqlDB/7mvjjjz9eHH/88XS7Xa6++mp74403cuutt7JhwwZuv/32kriYpim33XYb11xzDU95ylPKDftgNOxAM6qPeA514eOQxUQQ/v+QhbrN0kUTLB4fYetOt5MLJHRmWmzbspXlyw8p1UgApHS3JQryz3/FoA4iyzTVqjv2jh077Pr77kdptxkIgFgEHLnqUOq1WEig1+1Tq1Qc3dJalAyLHa4LyzzucY8jjKMFuZJdu3bxjW98g3e9613ljtOHgjwpwe9G//Ef/7EsFPcGecWKFaxatWrBxPFMWm+MfvSjH3H22WfbpzzlKQIo3y/F44uJMjU1ZS+77LJyB+vJCytXrmTZsmU0Gg2xZs0ae+ONN5bhp6mpKS677DJe/OIX22XLlpWbAr8r9ucr9H1tvV4vlZF8rsTncvzi4//fq7V4w5wbTaRcezxjNQKFtjlCWChJJ6aQypvXfRbWEiCooKiqkMgIUjHf5l4LmCNjzmbkYJsqFJLUeVM4GcysYNGmwuWPVThCQk6ERQpIs5RGWBFnP+XxlkaVbT+fY+NUl0gqhJKYLMXEAbnNEDJip+7Ze3dPsbWd0NXQ7qa0ZmZJO236/T67Z6eZyTUzUnDf7AzdviPGVaUg1ikHj45w2KLFREUrcoShHin+8MQTRdt50/g4hwLRwCBxhgaTE8mAY1av5IgNB3HDjgdIrRt3W/bspg+2SShkklKL4UlHH80xd9/M9Xt20pubYnx8gn4/R7W7NJXg+MNWcfzqo6iHgSt5A/aksH3vXudhyMjlXS3ONVQGiyU3Of08IwPX5QWIAqjGAQGFkVVFd3co2EH5QL5cooXBCgOFxlOWpaTaFKpNERKBlIKqsFSldQZVuBpX4d1OL9IGpcyhtjmdpE8X6As35+UC/ayHhm+dOBj27fV63HTTTaxfvx6YL28ZHR3l3e9+Ny996UtLKcHB+bl9+/aSEOjh55MQgiVLlrBmzRquvPLKciNarVb5yle+wotf/GJ78MEHi0Fv1keLfFvHr3/961x++eU897nPtc985jPLutL/LDzvodPpcOWVV9q9e/fyB3/wB4yPjwvf+epZz3oWWmvuvfde+773vY+LL764NJy+v+yWLVvsqlWrxGAK6EBk+j6iBnV+b0kR51qomiSY73u37NDljK9Yxpa9u0jzzHWgAX5wyQ957OOOtXE8JmC+tGSwfvG/gsENULUal7mMLVs2cccddzivUzgHKLEJx/3e4wt/w33ewe2kRUHdt1hyq/mDP3yO+KfPfdZeffXVZfim3+/z5S9/mdWrV9uzzz5b7FvT5rV9P//5z9tvfvOb5eDy7dSOPfZYTjrppJIF6z1On6vQWrNjxw7e97738U//9E921apVCyaMD8Vu377dvvOd7+T2229foPU7OTnJ2rVrieNYCCE444wz+OUvf8ldd91VesA///nP+fSnP83f/M3flMSIQcZeHMfcd9999vzzz6ff79tTTz2Vs846i5GREeGbFe/atcv61nBAqZJUPAsLCCXmow9plhPEikAJhNVOrk4bqpUqaaZdM24pSZOEsBIjgYkooiFCIiOJZECWQRyFaJOSVAN29luFOLx0DXSlYkOrY+/fPUdfNtnVbzHLLJ1+h0oaEOdwzOGHcuxBi0U9TFF5m2VBQ5x15Ap727oxenNT9DTsnevQTTVSRATClXbc3+7wj5dfyb/ddR+mPkqvnxEAFWNBp6AMIgzQcUgqFFGlQp5mJEnCwSMNDp2YZCysE2AQKqTfbdlKbVSM4pi84OyE57W6Hqeuc4tNE6gELKnB0YeuYMW9I6xv70aEio0797Buz24mJhejCMHA0ZMN8YYzT7eX3HkLP77jZpLeFI0k55Bag6cdezzPPukUjmzUBUDLQl9g79q1lXVbN0FuUARoW2yeQwvCoNMUGcbs6XbcdWpBqJzdHamH1GyOtIJ2LwMZorTzVnObgDRIbRFIchGW7REDIO93mGt1SIF+4ARNe5lkxeJFRLs2uxIeGZIqUFYSGLdR0kK69ngmA+2Uxnp5zn3tNqONBqOA0qCtS+vAvGHzG98gCEoZPb9p9JvWarXKpk2b6HQ6pXdaCDjw/Oc/f4Eur99YJknCT3/6U7Zt21bOiUEx/iAIWLRokTjppJPsBRdcUEaG+v0+t9xyC//0T//EG9/4Rjs+Pi68eppfJwAuvfRS+4//+I/cd999XH/99Xz961/nKU95iv2Lv/gLfC2qF3NoNBplLjeOYzZu3MjMzMyClmpee/j73/++veyyy7jiiitKveKzzz67NOh+o3HEEUeIv/3bv7X/9m//xtTUVJli8sIug2u6F9Q/0PAId5vZ3xsLMxlhGLpQ5rKlnHDySVx34w2uJEa5h/21r32ND3/4w8ILyFcqFaanp+34+Lh4OEICgwPEGwNjDLt27So6nrhdVKXQyD101WFUq9UFNaODjEBPt/cD4+Uvfzk33XRTyczL85z169fzl3/5l2zZssWee+65LFmypLyJ7du3209+8pN8+tOfLskLYRjSbrdZvXo1r3/96xn0CgfLU7w0Wbfb5brrruNVr3oVb3rTm+wZZ5whBif65Zdfbs8//3x++MMflsbce4rHHHMMZ5xxBlEU0e/3Oeecc8THPvYx67V//aD/7Gc/C2Df8Y53CM8w9P0N77jjDvt3f/d3fPWrXyVJEi655BK++93vcu6559ozzjhDhGHIyMiI6Ha71u/ofe6k2KGWf1u/0/bPWmuNybXLTVvnCURRpQgDQlSJS0m5UCgqYYQSAoUgtxaRG4SxpFbTyxKXisidQkIWCW7fup2Lr/wp90312WNSklriFtFuQCWTnHDkEbzw959gf/+wZSwKlAjyLitrdXHcoYfZmzdtYbrXpWsgLchPAElumE1yZoxgLoyx9Tp5qMFaEpMTEWNEjkGTorEFIUcisVlOPQw5aGSCBhKFxGKRtVHRLYq1vFpXIZdoLdBHihhJbHoEQViO0xOOOpy1ty9mdtMMmdbctnEj1z2wniMnF9ulVSFkHyIJv3/YEeLwQw6yp510Ajv27KWRaB6z7BCOXnwwTYXwEp2pgBngunvv4fYN9yGbIzRqdWZbXYgKpq0ApS1p3mem3aUNNlRCpEAqIZMGUYTznZCwi8bYPJ1v/I7E4MrkdLF9sMIiGhW2ddvc0cJGvZRMarZ0ptk4O+WUqghcJkBIrBVIXz5T7NVktYpJOogMAiHYM7sX22igcM51oOQCvV7P3AXKDWy9Xn9Qq0M/H5MkKRXBWq2Wj8RYXxoGznDmec53v/td+/Wvf700QH5O+DXSR25OOukkzjrrLC655BKAUpf7k5/8JJs3b+bNb36zPeaYY0qjvWfPHvvd736XT37ykzzwwAP+Pa644gq2bt3K6173ugUlNytWrGB0dLTcCDjynuaDH/wgb3vb2+xxxx0nvG74li1b7Pvf/37WrVtX3veb3/xmJicn7TOf+cwyQuY3HGmaLigz8jwM/xnP/D8QjSkcACHfXwe/cC5dulSsWLHC+t2fNwAbN27kqquusqeddprw5RleFOHhMKi+RZlP/APs3r3bfulLX1qg1JEkCatXr+bQQw8tw6//HrzgwQte8AJx9dVX23/+539eQN7ZunUrH/3oR/nCF77A6tWrba1WY+/evezevZtNmzYxOztbTuI8z6lWq/zpn/4pRx11lGi329RqNWq1GjMzMwuO6yd7kiRcfvnl3HLLLZx00km22WwCzgD96le/Ytu2bQv6FGqtOeSQQ3jNa17DYx/7WGGLtlX9fp/3vve9vO1tb+Oee+4pj50kCRdccAE/+MEP7LHHHsuKFSuw1rJjxw5uvPFG7r777tLr3rlzJ9///vc54ogjOP30020cx8LnUQYLuaEMR1uttdgfbX4wXzwodebVXPzPQRBQq1eI6jE6cO3AjHV/N2khyCzJbJeAQg5LQl+G7I0s9+Qd7rE98nqNXt4lVAEyjlFo0h2bGbmjzrKRgOMmJmgYSRBIVhxyBFH8K7L2HO00YzbJnEQlknogmag2WFSpMyIDerlGW401mkwniEgiAydsYIV0CU0pMbnBppLRRpNDli6nAsIa0DJkBrhnepvdNtellwvavZyZbpeZbptOv0Ou+7aa9XnJk5/MMZMrfEUnh1VDjjt0BXfveIApbdjQmeFf77uTg5YexFNXrrTjEaIhYRRYq2riiCWrsEtWEeMIs540mwoX6t0L9rs3Xs+Vt9xIL1LYMKSfZoXQsCQOm0R5TpBqQiyWgAzXWSfFedRq0SSVyUW0hC3EIEQhQVik2W1R5S1AS09aNGhh2JqkfP+mG7n5jntIZ1roADoR3DO7kzSKgBh0WKRcXRmPFrgwsjWYbg8hJBVjifKciTCmAqhuUVwreZBX5sOcg0x3b/w8TyBNUxYvXsyyZcvYtGlT2RFmw4YNvOpVr+K8886zJ598MsYYrrzySn784x9z0UUXlV6uL5/Lsox2u13WphelbuKlL32pvfXWW9m8eXN5fVNTU3z+85/npz/9KUceeaQdHx+n3++zceNGtm7dWuZdPTNXCMHrX/96JicnhZ97xhgmJyd5ylOewk033cTgevztb3+b++67j5UrV9rR0VHPYBZnnXWWvfvuu12LwDSl0+lw3nnncdZZZ9lnPetZHH300WitueOOO/jrv/5rtm/fXs5TrTWPecxjWLp0aRkBKxXSHqYo5MOJA+tq9oPB3NtjHvMYDjnkkDLv4PHhD3+YJzzhCaVuJrhmtP7n/woG8x5ePu/KK6/k6quvLj/jDcuLXvQims2m8J6yx0Ml74VwQgTvfOc72bRpE//2b/+2QGpsx44dzM3NcddddxHH8QJN3sGuNEop/uf//J+ce+655U4SXBPtsbGxMnTixRJ8Y+A4jpmbm+Oyyy570HX53aevhc2yjJe+9KW86EUvEn6D4Z/Hc57zHLF+/Xr7kY98ZAEreHp6mqmpKe6///4F7GS/KARBQL1eZ3Z2lqc//em87GUvKxnOg7v9wR2r3w370h2/WA3KoQ2W2fjwv8/BDubafccPa61r3ybAGksoJNJAb65Lt5NaKpFAhk6wIY7IaiGtXhdsH0KFkSGGiCCUzCRttk5NoUWAIiYInZ6ujCJMGKIqEZ2kz0zb/e0yYxFSUBeSUQvVTouk16MaRYSRQpoc0clIkx5JlkAlRow0sdJC0qMehEw06xw0Nk4MkEMawYb2jP3eDTfyk1/dQk9G5DYkNYYMgxYWqQyjOuOwZQezenIFIa53qAKeeszj7C/uvo2tmzZgG3V+ctcdKBtSf85zOaXZtDkI1U8ZjSPCrNDFcElFENA20FbYDvC9G3/J9675Geun9hCNL6JrJVm/jwgrCCtJ230wOTrL6cURmzsdbtgzi8oy+nnG5tlZfrnpfnZ1eiRx0R1WuHCvUl6UoCC5LShiKXTAlWBDu83evEvW6yPikKwSkMZVGBmFubxokg4a4ZLNcp5ISJoxVq+hZmaoBxGrlixzi6bP21pRGlOf64+iqJQa9N7U4OYOnNd58sknlwbVG6Y8z/nmN7/Jtddey9KlS2m1WszMzJSCCL6HsZ8bXvCkVquVx65UKjzzmc9ky5Yt/OVf/uWCzlKNRoOtW7dy7733liFjH3b119fpdAiCgKc//em85jWvEd5r9HNsZGREvPjFL7bf/va32bJly4K16NZbby17uq5atYosy3jrW9/KunXr+OEPf1hGtrZv384///M/873vfY/JyUl6vV75b3AjX61WecITnlCGnL0xPVC1fA94gzqYv3vWs54lvvSlL9ktW7aURkdKyaWXXspHP/pR+7a3vU34XU2j0XhY2vv4BdvXV+7atct+8IMfLEkEQRCU3RZe9KIXMSgG7w2Px/48Zq01S5cuFT/4wQ94zWteY7/whS+UA90rDwElA9Ab706ng1KKRqPBn/3Zn/Ge97yn7Bfod8H1ep1+v18OTj8pjzrqKO69994Fnr43cN7L93mSbrdLv9/n/PPP5+Uvf3nZr9S3ewKX933jG98oFi1aZN/5zneycePGsk2cx2CXG3/f4Iz+M57xDP7qr/6K4447Tgwyjge7U/gxAFCtVsWgKMXgxNrXa02ShJmZmfLZDY6JWAY045hAF0FRGWKtE9QPtKA/1yayvsOBRYaCShBSr1SJog6pVJDkBFKj8xSJoiYkY3GV2IgyeZEDHePCjVoY+mmPfr9bZDicwpPtthjVGSuAcauJA0k1ilg+voRFtTpLR0eZGJ+kNrmYtjHceO/93HDXLbTzNovrFcYjSVwIFiXA+t17uOauu9mUZ/QCVTCTHaHKWAO5pZfl3LN5BzuP6drlYU2ERTe5Y8bH+L0jj+GO7TvYIwOipcv42aYNbPznC/ijU57EC574BLu8Eok5XI4zKuRBZ/vGRhUpumBv3LWLb119Bb+47x46cUzeqDPX7xNVGkRRSJ5qJ6wfKnIVkGvJ5n6Xb974Cy676Xp0r4dSIXkUMqs1SWagHjshB2MhyTAWAjnPxPCN2BeQb3ONIaIVB4gwRgdBUUjeh5ajP3kGfknq8Cxha4lrFUSWkLbbnPiUp9L0h6+4ch1rDGHoxt+ghKift8aYcg7BQjGVNWvWiNe97nW21Wot6AyTZRmbNm1i06ZND1oLH/vYxzI9Pc309DTdbndBDffgPJmYmBDnnXeerVar/PVf/zU7duwoU0P+Wr2R9RtNT1CKoohXvepVfOADH6Df71OtVkuxB78hfeITnyje+ta32je84Q3lWujXJl/S4o87OTkp3v/+99uZmRmuv/56N/dix0fZvXs3u3fvflBEyW/k/+Iv/oJnPOMZJXfEK+AdiJ1m4FFgUMEZAt+H7xWveAXXXHNNmRD3+OhHP8pznvMce8wxx5SL7cP10P3uzBjDpz71KW655ZYFXhzAc5/7XNasWVN2iICFtVqDVO9B+Ka/AJ/4xCc45ZRTeOc730mn0ykn5djYGO12u8zJ+Gs6+OCD+dSnPsVTn/rUkpRUrVZLQ9fr9UpP2Q/CWq3Gu971Ln72s59xwQUXAPMLwaCEYKvVot1uc9hhh3HBBRdwxhlniEER68H8pTdUL3vZy8TatWvtG97wBq6//vrSSPuyG79R8NejlOI1r3kN73jHO5icnBR+t1x44rZWq5ULlP9OkiTMzc3ZQelEHxHo9XrMzc2Vz9h7CSMjIwt6QoJb6GIpxUilZhXCMUNDSWI1oQjILcx22oi40N3LNWEYMB7GNHJN1O6hgoCRUBDkOb1WH9XPOWLZUp6w6nCOWDRJjGMM98Hu7czQtwmZSUgz0JkbN0WxEkcsWSz++NnPtM8+8wzi0VEakWO2+lZrkUZgnVD/ppa1M+s3c+fcHHFTcNDECIEqOswVcp1bp2bY0e4wZwQJTj1KEIK0SGERMsQGijt37OT2XbtZesShJDhb0gcOX30kKx64n23btyBqITa23D/X4qIrLueaG3/BqUevsb9/0slMVEcIZIAMFDOmz6233m+vufUW7ti8md15n71WY4KAPKpAbknTDCdnHWC0RcgAI8HKABnWaRnDbJqglKBajWn3E4icmL0MA3Seg9auEXr5BF3PVQPzhIXCxoig4jrGWIFrtFd0sQqroC3CGKSlzLGXXW6tdp3ru310r8OKep0/PPOMQhTVOsKSBSHnhRE8B2Kw3aCvwxxUHxqsL3/5y18udu/ebT/0oQ8xPT1Nv98v56mfK36+HX744XzsYx/jIx/5CD/5yU9KIzQyMkKv1ysV1vwaMT4+Ll73utcxNjZmP/vZz5ZRtVqtVqo3DXIfrLUcfPDBvPnNb+a8886jUqmIwVzlYNRKKcW5555LGIb8xV/8xYKOVIPX7bFmzRrx/e9/3773ve/l/PPPL9dNmDfEgznZkZERXvva1/KOd7xD+DVsUC3qQPRO4VFgUAfDp0mScNZZZ4lnPOMZ9itf+Uq5C6rX6+zZs4dzzjmHr33ta3b16tWi1+stCH/+Z+EHXZ7nfPjDH7Yf/vCHS6PiB8WaNWt4wQteUBrGQdHrfbGvhyqEYG5uzo6MjIhmsynOO+88zjnnHK666ip74YUX8rOf/YydO3eWedKjjjqKU089lec973k87WlPEz6v4I3poAdWqVQeJIyQZRmHHHIIH/vYx8T/+T//x1588cV85zvf4Z577il3rWEY8rKXvYyXvvSlnH766cKTJ/zzHFw0YN5w53nOCSecIK655hpuvvlme9FFF3H55Zezbt26ksXYaDR40pOexDnnnMPJJ59ctrTyz9n/zeM4Fqeccor9v//3/5b3EIYhp512GqOjo2Iwl+JRrVY5/vjjedWrXlXuerMsWyBAMRjeksBotel0XWXu5avoBIbU5OxM22zvzDHZGCGUATEwaRWHiYhdBvpJhpxts2xsgtVHrmHVkoN5/OrVnHLkcjHm7oQekm39Nrc8cCdzWQspDTrt0e/20ECW94mVIrKGVaNNsVLIUr86BxtiRB1JXNxqAixqCBpVQSByJkbGWHHQEoSATlGLuy23dv2unaRAGEYY4brcG5NjstzJJtqcBM0tnRY/WL+O8OCltklA0umxfsd27u+3aWlAVLC9zF1MXKcdSO7p9rjr6qv5zI8vo1p3URGtXd9QFVQgjOkKaCOoLFpKd2YaZIRsNjDtjgvxhgFGa0IrsIkh1ykmAB0qTBRibcxcriGMXbs7K9CtHqAhDFAViZKSLPUyhPO1Lso4x19ayLMeWgKBIohCMBaRZ1SsRKcZgXAykXnhnZtCLzgwhthkVLKMxx16OL//2GM4Kh4lwKKwjvBUKhzPp6aMMTz1qU8tewJ7Ld1TTz21nPuDeT9jDK95zWvEK17xCvulL32JL3/5y6xfv57p6WmiKKJarfKMZzyDl770pZxxxhmi0WgwNzdnjznmmDLCNDExwdKlS8uN/6D6kRCCl73sZeL5z38+N998s/3Rj37El770JbZs2VIKvSxbtoyTTjqJs88+m2c/+9k0m82yusDPb2MM9Xq9DF8X66549atfzRlnnGHvuusuvvKVr7BhwwbiOKZarXLSSSeVEa9qtUoUReLDH/4wb3nLW+zFF1/MJZdcwk033cTMzEzZQOO0007jOc95DmeffTYHH3xwWbnhORuDqm0HIsSB6jrvC7/gaq358Y9/bF/1qlexZcuWBTJ5SilOOeUUvv3tb7N06VLxcMXZ2+02l156qf3jP/7jMn83mJN73etex3vf+15GRkYKhaSsZN7Bv//H99foSQV+RzioYuTDOoM0c+99DZ5j0PgHQcDWrVvti170Im644YbSyxsfH+erX/0qz3jGM0qmrFdGabVaNoqiMnTsjfOglrC/3gUs5oFQtv/94LO31jI7O2t9/mXwczAv/uBDzfOdZFhwHYPnHAyn+93xoLTboKqSf8/ngDxxpKMU37xrvf37H/6Au4MMUw1cGzcloTPH8c1R/vGcP+XE5ogINCAsu7PM3je1h7wxSqNZZwRXgtIAUcXpTgcWet0uYb3CDJLLdzxg3/edb7Ch1yVAUWv1eO2TTue8M89kQiAiTKHt70KyCQv76DrZP8isJReCnWB/eMP1/ODqy1lyyDJe8tzncWw05gw0cN/cLOf/8LvcsGEjWRCTyagQdbeu1yeWCAikITM5obVU+5rICGyaY2SAGakzk+eYepUsz4iiCgHQnZ1CCajWIjLTx0iBtjmSECUCbG5Ic1BBRFit0e91C2nOHhiNbDQxeQadLiKIsD1NJa5gpCEXBmMdD1mpwAm0CIU1zkikSRcCSRgKct3HZhmoCvM91QzCQGAgLtrXBWFIX2f0hSPx2DRHJSkTqoLSFmMyrHRSkbpoOSMxhNpQ1ZojFi/m7GefxdOOXI2whgZC1IXF5AlREBbKaQ+WwRvc2A6O20EizeDPg3Msy7Jys95oNBZ8f39zwa8VfrwP8g4GN/X+fP79PXv22GazKQZVhwbvYzAyBNDpdKjX6/td1/Y99uC593c9g3NzamrKCiHwPZz9Z/0x9/edYQ71P4l9GbZKKU499VTxgQ98wL7yla8svSVvGK655hrOPPNMPvShD9mzzjprv2zfwVi8x/4GKMDMzIx9z3vew2c+85kFC7e/rhe/+MW8/vWvLw0FPLg90r8HPygGcytAeX4fWn4oDJ7L74j9wPYevIf//331e/1zGBsbW3Cxg3qeg30IgQXXNHiP/vf7yiXue+zB3/tJIqV8kDEdvI7Bcw56p/vr97rvZwZ/9scLgDETsbwyypb+XlpJ7lxDawisIOv2mZ6aheaIax9jDYvDSIwsORhd5CpTsBGIOhDmOJnaEES9xh6w109v5RvX/JRNU7OkUYzJoSZjdvdz9hqoKCfI72WhvFFsYW2fDFX4QXmSuz6lccyWXof1us9UNcRqwxcv+1eaMqLT6bG9NcuufofdxtCJQ9ff0921C1Mi0VgSbUiNU4ZKLaRxBWUkouL6g2ZCYuIQk+YEUkGSYixElQaZgLZQEFZwD8xgclUQcEVRlynJewYhKthuVjRpB9PpOjGGUGBNiqzFJDbDol04Vjr5SG1yhJDoNCWUCpUZalJiTIZOc4TIHDHLJsWxXXTBaoMylooIiKXA5H2iQFGPBNr2iSKoKsGY0TRCSWAUcVyh1mjSaNQYHR1l2cQkh0wsYUljhBOWLxYVoAoEpSq+ABU/aI7sb8zuO24Hx+rgz4NzzJe37e/7+5sLA+pi5ff3vYbB8/n3PXt3EIP3se+88lGe/a1p+x578Nz7u57B+TgxMSH299l9Debgdw5EYwqPAoM6uDjmeU6327UjIyPiBS94gbjiiivs1772tQWdHMbGxrj99ts577zzePvb327POussli5dKvxgGNTG1VqTpmmpQuRRq9WYmpqyt9xyC//wD//AD3/4w7KNmmfZKaU46qijOOecczj88MMXGO5BCv3/ayUPP0j3l5v1xn9w9+kN7IFIOf9tQwEjQUzdKGRu3BtWIDUEViJlQIIznEEkMf0cjEZYSaCEK+lw9BU6uct3BrHLQd6X9uxde7fz+Usv4a69U/RkRBg1MSYnwbCll3P9jml2jTWt7fXJOz1HNku7zKZdZrIO3Txl165d9Pspe/dMsX3vXqb6Cd04pFuPQAXcv/1+RiquEX1P58xajfaKCCJ01t068QT0vLKQybTrHRoprFCkQQhWYXHKU9gctEEGEmE1yhYsa6Qr3bFFY++gAvhnJ0EKpClUh4RBWosVrocrWKxxtGBrXYcZk2sQTt1JFKlJaZ1CmjKaSEaFXGMXk6dYckQEQTVw5BWrCGWIiEPCQFGxkhqCEaGoIGiO1FHViHCkTmOkzqJakyW1BssrIzTDiGXjEwxsOYCitR+ICq6vrPDhAvBCy2X/3IenBccQ/13wqFhRfRzeF/x7BupHPvIR+v0+3/zmN0tDMTMzQxzH7Nixgze84Q1cdNFF/OEf/qF97nOfy6pVq0QQBAuKsL1H5PMJ27dvtzfffDPf+c53uPDCCxewzwYp6ytXruQDH/gAZ555pvCf8Qw5b6h+G7JYg63VBne5/mcfovYGNgzDMrf6u25QAUbqNaphiNA5ECKQKG0IjERbye5unz2FH6QqUSmOroE5sDPWIIQkEJCmmj3Tc9y+dQNXrbuV6x+4n1mh6IsAGdUxtoIVhi4512zayr1zlzEztQubpWRJH6M1xmi00GQ2J8MQhjGBVERhBdkYIalLWlZjAokQimZURZiIJIceBh1Yp9enQtAW2U2RSPJAuFh04MZLpCSxtXR7M67pvXTyjFqqwrIoQGN0H4PGCKfTqxAYFYCqugbj/Q6OxOPmiKZg2loQBQnIVXfmBdEndZsSYQikxKqAUCpiIYitJLCuw0woAyKlGAkb1GVIIwxpxDG1epVqPSJsRtRUyOGNJTSiCpXRGo1Gg9FqxIiAkaIvFTgfOh1Q/o1ANHC2sFv8vrSTOIMaGlCeWO4lCcXCf0N7OsS+OOBX1FK3daBI2huCRYsWiQ996EO2Vqtx0UUXlUbV5x+iKOKXv/wlt912GxdddBHHHXecPeGEEzj88MNLAk+WZbRaLbrdLlu3buXaa6/l1ltvLVWIvLH06kfGGE488URe8YpX8IIXvKCcT4PXBTwsJTv/UQwaVF+36ct4vHfqG4UfqCGT3zaqjSpBVZEp4yootOvgkkpJG7hl1w5sJaQSYtO0W9YC5rlhqt0lMZIk08xNz7Bzz252zM0yZVNmQ0E3rmJUDDbApJI0NygVEDQq7E577Ny8mbBZx0RglTu5EtIpcEpXdmOlpJ1kmDSDvoFYOYaqEtjcYIKQxLren6k0zhpICVkGSUYURqiiG0tmDWQ5GEuaWjSWOIqwAowVaDSQznuywhCFFmGclKMwAqs1NnUumxKSENe83W003Pxz4hgGaZ38XzUMaFSq1KKAahhQrURU4wphHEEQUg0DxqMKo3FMM65Qr9ao1erEcZWaqtAIYyYqFZpVF3oFypZyo84PJx/4m8rMGcNAW1BgA0EeWGGEY/RGpujDKCBSedn71OWrBaH1fRqFq1EdNKSKQiy/OBdDozrEPA54g7pvzmCQDdrpdDjssMPE3//939vly5fzyU9+ktnZ2VJQ2tO3e70ed999Nw888ADf+MY3SmM3MjKCUoq9e/cC8+3BPHyHBK8jC/DEJz6RD37wg5x22mnCU8gHSUIePlf522Kj7XsuT7zxjbkHSTs+FzyYN/5dhAbSiiBtSDphDoHEyBisQCvJLgnfvuVGLrvjJnpZlzRzNb15miERGC3QqUWJAKHABhIRh+RxRE8WS60RLo8ZSsgsWuf0pIFKCPEI5CCtwEhnxAxFnWhmsQUzV8VVwkqDzLt+vuAyN7Rtj3KVF8KJx6uij5PVpLqDwqJ9fzIJCEUYSkIk3WSuaHWXunZ3RVceJS2htORzHUIBgXCfj2xEBUssFbGVLKlViZQkimOqtQrVeo1aJaYSh0RSsHLxMqphwEhUoR5XqEUh9ahCrVolCgVR4HoYV3B7AXInhqTDecfQE7OKuyy7VClc3lriJHm1v73QPYbSjZQghcAUncOtsi5OLwWSgBAKIUjH4C1lo7DzbbAKWVRf5vrooHIO8dvGAW9QB+sdYb5myavsFDVL4v3vfz/HHHOM/exnP8tVV12F1po4jksC0SBzzsOLLnvSk8/FejEJ/3kvsvCGN7yBP/7jP2b16tUCeJAx8mzjweLj/9cGdX/nGMzlegq73yh4VZNfR3b6XUGoIIolUmgMxnWosQJURN9apjTs6LcxZG6VjkIIIRYhoVSEuE1YZjK0NC4MKnCeTV6EXxFFA1YDaeb+BRJkQJZqpFWYwBk8ISxSyKJlqMAUTMvMGsgTVxsZRlSlxAaCrGCTB7kzhlmaYTOn3KuMppIbIjRGu9aBmXEiuxUbECBRVhOEkkoQUIli6lFIM3KCF9UwZPH4BKEKqMYVanGVZlylEdVohDVqUlK1llhJokqFWr1CvV6nphzbWRW9JaLiX6EIWHp1RhSPCBAZ8xZUutdczIdjQ1M0ovJW069cxdCX1mKwTo3QWASi0MwoSEO2WEtwTeTnJcNtcTjBfBM3Ux7XulFRfKqoL0cutLNDDFHgUVM20+v16Pf71uv0DpJqBks57r33XvumN72JH//4x/s9jjeeXkx/X1lArxjS7/dLGbEzzzyTP/3TP+UP/uAPhDfUsNBb3l8z8N8G9hWJH3yv3W6zbt0622q1SgOvteaUU04RtVptwfX/LiIBpsB+8l//lc/deR27hUCmCqsDorhGlmrCQJLkGVSdeZCZE3JXfYO2OSYSaKld6xGjQbtOQ6GoIMKIRFv3vrAQKaS0YHKMdu3mQhNihSQLvFiAhtwgjQQjCIKIXLpaSbDu+HlKmGSgNanIENYymgeu7MVqrDCI0EWHm0jqYUCzWqNWaxDX64xURxmLm1SjGosXLyUOAxrVgNFY0ogko1FIM6pQDSKMkSgZIEK3J3CNul1+cjDcactXl2F23h5EhfEpTVDRj9aI+dIgidtruHC0BmlIQkgkWGIEkpjC8Hr30NeeFqUuCM83nldNUgy0ZCveHGwWIHB/Nvmgm8jRRds/GaiSj1TcO8LKeZKSlEOrOkSJA95DBcrC4Gq1KjyZxsvk5XleGrg4jovWalsW1EINNsP17cSA8hhAWW/p+3EuX76cl7zkJZx++umccMIJLF26VAzmSVutlm02m6Wu7WBe8jepP3248FDeqX8evpUbLBTxzrLsd9qYglsc6yAOqo3a5bKCyRL6uUFrg4wtic3J8sLDtAFkOSa1REFMGIHVKXqwKkUpohCksY5Mm2Y04pjUgCFD2AylDTbXCAwhBpM4HWKVO9YrOFGByCqUVZAnpHnmGtNLCP7/9u6nN4rkDAP481Z3T/eMZ8b2YG+WgJAiJVIwOUQmIogLWkA+k1zJB8iV78IVxI1vQLjAaTdSRCIhpAgiBSkcAClSwMJe2+Dpqhzqz1Q3PTYkvbbH+/wOGGZ6qseSmcf17y2tUUDwk14fo/k+BosDDIseThZDLM8N0SsKdHs5uv0uet0cXQEKpVAkObI0hagUWZKhl6TIxfX+XED6/a6J0Ui1Ox3WjbP6IAL8qLCx4a0mS3PE9v3cVKOuzi9q7SoFfxpAYTlTYkLB+UTsNpVdd5i4LZ1okBoz2aALuBXMBhoCCQPC7jg12EFamXQ34UZ93fvF5PxTid6sSpEo+/7LqCU7aKw43ktTzUSgNu1pAhBOHohLaD19+hTPnz+vHDu2s7OD69ev4927d3jx4kUo8eU3LrvVwzh9+jRWV1dx5coVXLx4EWfOnJFpPU5fxL1pz+NhVPFo2g9X39sa/7v+3I+VAPjtr36Nv//7Df7z179Aig50P8f6x01b+N4YW4x9bOs5IzX4oL/HLgTIxM53KgDaHh32UZcQbZAau8hl5/26XV3teqbYLQE9dgt6gHw8RkcJssyOhvQ6GRYGcxj1h+gXXXx9YhlzvQKj4QAnFkcYDQcYFl30kgSpKKQwyIwgNYJMlPhepM+HuDxtrP6YRI8pUTb7onMHJZpOTMQ/6A6MD63o0DaQVO9pV1iFQPPvK8SfJL5hQBIkQOiVwu3TVX7oPF7rJ1Hz4d6TC0Sk8o3G9wbct9AYkCqsQUoqbapq+BJFZiJQ9+ODsSxL3LlzJ5Sc89WDVldXcfPmTZw/f16SJMHGxobZ2toKBRCKovBlrSTe9jIrw+H0vxEAKIGfL+Tyh6trZmtzA3/+5z+wub2JQaeDD2WJLC3sCtcxYPQYxgigbKUsJQoKAmU0oDX0eAxTlsB4F1IaKGj89Ktl9PMuFgYDjIYDLA7nsTA/wPxgiEHewVK/bxfqdAv07BHeYWjRLpYxbg5SJIPvMBoYraHKEkWauUJBP8AnfC1xp90hKpnx2e1J/bW1s5Cl0u6U94RPX/Ol39Z+L5TKPdSX3Yh+dI5FoPb7fezs7ODx48fm0aNHldKAAHDt2jWsrKyESh9FUYivlhQfD+cXFXlHtV4ktSMBMCe2MtEv5nv44+9/h5/97TH+9N23+NebN+j3Bih33yMThVx1kCUKRVYgTTPknRx5kmCp08Egz7G4sIDl0SK+WlrG8okRRvMLmCtS9DBZoeo7fVHvUbQtkSAJar1EIFosg3CgdajUYxJ7tMyUzZAHOe1ARNbMB2pc7/HWrVthZa7/QDl16hSuXr2KpaUl8XOoaZqG+c5472i9EMNh7CWlA+TWAaUfNeYLJb/s9/H15W/MNxd/g3eb23i/tY0i6aDIOhjmXfSKLoqO2IpIsMORXbcPEpj0Y/zQo1/hWg9KRPPcZZSTegx7TJwSZP5H0f+O54+YM8qPkYav9XGUg9yuRUQTMx+ofvXq+vq6efDgQeiZ+rJ/a2trOHfuHACEkoF+C43v2fp6tk0LfOg4s0d1JantAY5NiXxcYiUfiM4HZmNk0BNBDkgcjP6Vbk01FMqw5cJeoyvXViLPmMn2EAgSk7rNJe4Ffug2mr+0pf3cPlMjCMuDjLi+LXuiREfBzAcqYD9Mbt++ja2trfDB4reFXL58GSdPnrQfS67HGRefjle6xueY+vClY8zArj7d+R7odjGXpciyjny0cSkDkUpRAZSTghn2QHKDJHXncLqQs4tjjFvSgkkdXSQIMSyTOIafZhD/vHuNS1RdljBK7O4MEVfgPixHBSZrWInokM18oGqt8fbtW3Pv3r0wJwrYBUorKys4e/bs1GHbjY0N0+12xVcRiq+Lj1OiY0pge379nisAYADsogN3QD008tpexiQMt05mQlVDs2FqM+RqvKXDbegwJVTqH9ewxQBtRPqRXpPY9xLXZzfuTwWDdHKLyohKOPOVP79EB2bmAxUAXr9+jcFgEM7h9FWPbty4gQsXLnxSCMJvs/FbX4DJB1C8mIMfRsec34jo67YCSJFBh+IEAl2WdjeHiXqQKEPAagOIqDBqa6Lm4gkDA0AkbDxxX1OUZgwRA4F2A8V+RFjBuH2d8WaUepuVbyca9uUQMNHBm5lKSft5+fKluX//Pp48eYKHDx9CKYW7d+/i0qVL/GShPdi4sptcalOXcNEXnzYC2OPH/F/NlF+6aqtv6//LtMRzrLqhAdX4Wv4wEx1dxyZQAfjTVMyzZ8/w6tUrrK2tSb/fP+y3RUdc/D8gLjMHIJxKEl8bx19Sb6CpfTcGrO0WVlcRaXIfiZY4NbY1rVsan4JCRIdu5gNVa43t7W10u91QPlBrXSlJSDSVafi3NHyFC0ZUA7WpCpFvUu/RtFdf9iZxA/Wv9b/H+3GI6NDNfKDW+TlUziHRZ2kKrVgtTJuf1o3PVZtUmFakr36VxA2YKY3Gm135o050JMx8oPri9P5rbHNzExzypX3FwVWvPOQCqz63Ogk6jWmBWr2H3y4Tt63cuSzV28VU03OcVCU6kmY+UL3xeMy9o/TFKkFZCSpdu0Y1Xwdg30A1U64VBSNqj1drtykwMLIgAAABf0lEQVRn+hWyX/1cIjowMx+oTeUBd3d3obXmHCrtyUC7/Z26WhowPAvEdY5swXZfkAEuED+dU62T6k0b6Ck9zXjfav29+7bjs1OI6DDN/D5UpRQ+fPhQCc8sy1g2kD5TtSdaX+VbH+o1/kzMKVti9t4AM2mocfFRHYdziWbKzPdQif4fZspwan01bvw4/CHTtbK70+yZi3u9WKb3UCfYOyU6KhioRERELeCvt0RERC1goBIREbWAgUpERNQCBioREVELGKhEREQtYKASERG1gIFKRETUAgYqERFRCxioRERELWCgEhERtYCBSkRE1AIGKhERUQsYqERERC1goBIREbWAgUpERNQCBioREVELGKhEREQtYKASERG1gIFKRETUAgYqERFRCxioRERELWCgEhERtYCBSkRE1AIGKhERUQsYqERERC1goBIREbWAgUpERNQCBioREVELGKhEREQtYKASERG1gIFKRETUAgYqERFRCxioRERELWCgEhERteC/9w1sSM5g0xkAAAAedEVYdGljYzpjb3B5cmlnaHQAR29vZ2xlIEluYy4gMjAxNqwLMzgAAAAUdEVYdGljYzpkZXNjcmlwdGlvbgBzUkdCupBzBwAAAABJRU5ErkJggg==` }}
                style={{ width: scaleWidth(270), aspectRatio: 270 / 83 }}
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
