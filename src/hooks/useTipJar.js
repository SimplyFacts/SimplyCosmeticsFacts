import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform, Alert } from "react-native";
import { create } from "zustand";
import { useCallback, useState } from "react";

const useTipJarStore = create((set) => ({
  isReady: false,
  offerings: null,
  setOfferings: (offerings) => set({ offerings }),
  setIsReady: (isReady) => set({ isReady }),
}));

function useTipJar() {
  const { isReady, offerings, setOfferings, setIsReady } = useTipJarStore();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const initializePurchases = useCallback(async () => {
    try {
      Purchases.setLogLevel(LOG_LEVEL.INFO);

      const apiKey =
        process.env.EXPO_PUBLIC_CREATE_ENV === "DEVELOPMENT"
          ? process.env.EXPO_PUBLIC_REVENUE_CAT_TEST_STORE_API_KEY
          : Platform.select({
              ios: process.env.EXPO_PUBLIC_REVENUE_CAT_APP_STORE_API_KEY,
              android: process.env.EXPO_PUBLIC_REVENUE_CAT_PLAY_STORE_API_KEY,
              web: process.env.EXPO_PUBLIC_REVENUE_CAT_TEST_STORE_API_KEY,
            });

      if (apiKey) {
        Purchases.configure({ apiKey });
        const fetchedOfferings = await Purchases.getOfferings();
        setOfferings(fetchedOfferings);
      }
    } catch (error) {
      console.warn("Failed to initialize RevenueCat for tips:", error);
    } finally {
      setIsReady(true);
    }
  }, [setOfferings, setIsReady]);

  const getTipPackages = useCallback(() => {
    const offering = offerings?.all?.["tip_jar"];
    if (!offering) {
      return [];
    }
    return offering.availablePackages;
  }, [offerings]);

  const purchaseTip = useCallback(async (tipPackage) => {
    try {
      setIsPurchasing(true);
      const purchaseResult = await Purchases.purchasePackage(tipPackage);
      Alert.alert(
        "Thank You! 🎉",
        "Your support means the world to us! It helps keep Simply Food Facts running and improving.",
        [{ text: "You're Welcome!", style: "default" }],
      );
      return true;
    } catch (error) {
      if (error.userCancelled) {
        return false;
      }
      console.error("Failed to purchase tip:", error);
      Alert.alert(
        "Purchase Failed",
        "Something went wrong with your purchase. Please try again.",
        [{ text: "OK" }],
      );
      return false;
    } finally {
      setIsPurchasing(false);
    }
  }, []);

  return {
    isReady,
    initializePurchases,
    getTipPackages,
    purchaseTip,
    isPurchasing,
  };
}

export default useTipJar;
