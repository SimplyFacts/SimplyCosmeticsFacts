import { useAuth } from "@/utils/auth/useAuth";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisclaimerModal from "@/components/DisclaimerModal";
import { QueryProvider } from "@/providers/QueryProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initiate, isReady } = useAuth();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  useEffect(() => {
    initiate();
  }, [initiate]);

  useEffect(() => {
    checkDisclaimerStatus();
  }, []);

  const checkDisclaimerStatus = async () => {
    try {
      const accepted = await AsyncStorage.getItem("disclaimer_accepted");
      if (!accepted) {
        setShowDisclaimer(true);
      }
      setDisclaimerChecked(true);
    } catch (error) {
      console.error("Error checking disclaimer status:", error);
      setDisclaimerChecked(true);
    }
  };

  const handleAcceptDisclaimer = async () => {
    try {
      await AsyncStorage.setItem("disclaimer_accepted", "true");
      setShowDisclaimer(false);
    } catch (error) {
      console.error("Error saving disclaimer acceptance:", error);
      setShowDisclaimer(false);
    }
  };

  useEffect(() => {
    if (isReady && disclaimerChecked) {
      SplashScreen.hideAsync();
    }
  }, [isReady, disclaimerChecked]);

  if (!isReady || !disclaimerChecked) {
    return null;
  }

  return (
    <QueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DisclaimerModal
          visible={showDisclaimer}
          onAccept={handleAcceptDisclaimer}
        />
        <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="privacy" options={{ headerShown: false }} />
          <Stack.Screen name="terms" options={{ headerShown: false }} />
          <Stack.Screen name="tip-jar" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </QueryProvider>
  );
}
