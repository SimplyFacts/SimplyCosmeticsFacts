import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisclaimerModal from "@/components/DisclaimerModal";
import { QueryProvider } from "@/providers/QueryProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  useEffect(() => {
    // Replace Anything.ai auth initiation with simple ready signal
    setIsReady(true);
  }, []);

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

  const hideSplash = async () => {
    let attempts = 0;
    while (attempts < 10) {
      const result = await SplashScreen.hideAsync();
      if (result !== undefined) break;
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(hideSplash, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady && disclaimerChecked) {
      hideSplash();
    }
  }, [isReady, disclaimerChecked]);

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
