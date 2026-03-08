import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useAlertsStore } from "@/stores/alertsStore";
import { getNewIngredients, DIETARY_PROFILES } from "@/utils/dietaryProfiles";
import {
  getNewLifestyleDietIngredients,
  LIFESTYLE_DIETS,
} from "@/utils/lifestyleDiets";

export function useAlertHandlers() {
  const [isAdding, setIsAdding] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDeactivation, setPendingDeactivation] = useState(null);

  // Dietary profile state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileNewIngredients, setProfileNewIngredients] = useState([]);
  const [isApplyingProfile, setIsApplyingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(null);

  const {
    alerts,
    fetchAlerts,
    addAlert,
    deleteAlert,
    batchAddAlerts,
    deactivateAlert,
  } = useAlertsStore();

  const handleAddPreset = useCallback(
    async (ingredientName) => {
      setIsAdding(true);
      try {
        await addAlert(ingredientName, null);
      } catch (error) {
        Alert.alert("Error", "Failed to add ingredient alert");
      } finally {
        setIsAdding(false);
      }
    },
    [addAlert],
  );

  const handleDeselectPreset = useCallback(
    (ingredientName) => {
      const matchedAlert = alerts.find(
        (a) => a.ingredient_name.toLowerCase() === ingredientName.toLowerCase(),
      );
      if (matchedAlert) {
        setPendingDeactivation({ ...matchedAlert, fromPreset: true });
        setShowConfirmModal(true);
      }
    },
    [alerts],
  );

  const handleAddAlert = useCallback(
    async (ingredientName, notes) => {
      if (!ingredientName) {
        Alert.alert("Error", "Please enter an ingredient name");
        return;
      }

      setIsAdding(true);
      try {
        await addAlert(ingredientName, notes);
      } catch (error) {
        Alert.alert("Error", "Failed to add ingredient alert");
      } finally {
        setIsAdding(false);
      }
    },
    [addAlert],
  );

  const handleToggleAlert = useCallback((alertItem) => {
    setPendingDeactivation({ ...alertItem, fromPreset: false });
    setShowConfirmModal(true);
  }, []);

  const confirmDeactivation = useCallback(async () => {
    if (!pendingDeactivation) return;

    try {
      await deactivateAlert(pendingDeactivation.id);
      setShowConfirmModal(false);
      setPendingDeactivation(null);
    } catch (error) {
      Alert.alert("Error", "Failed to deactivate alert");
      setShowConfirmModal(false);
      setPendingDeactivation(null);
    }
  }, [pendingDeactivation, deactivateAlert]);

  const cancelDeactivation = useCallback(() => {
    setShowConfirmModal(false);
    setPendingDeactivation(null);
  }, []);

  const handleDeleteAlert = useCallback(
    (id, name) => {
      Alert.alert("Delete Alert", `Remove alert for "${name}"?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAlert(id);
            } catch (error) {
              Alert.alert("Error", "Failed to delete alert");
            }
          },
        },
      ]);
    },
    [deleteAlert],
  );

  const handleProfilePress = useCallback(
    (profile) => {
      // Determine which helper to use based on the profile source
      const isLifestyleDiet = LIFESTYLE_DIETS.some(
        (d) => d.key === profile.key,
      );
      const newItems = isLifestyleDiet
        ? getNewLifestyleDietIngredients(profile, alerts)
        : getNewIngredients(profile, alerts);
      setSelectedProfile(profile);
      setProfileNewIngredients(newItems);
      setProfileSuccess(null);
      setShowProfileModal(true);
    },
    [alerts],
  );

  const handleApplyProfile = useCallback(async () => {
    if (!selectedProfile || profileNewIngredients.length === 0) return;

    setIsApplyingProfile(true);
    try {
      const result = await batchAddAlerts(profileNewIngredients);
      setProfileSuccess(result);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to apply dietary profile. Please try again.",
      );
    } finally {
      setIsApplyingProfile(false);
    }
  }, [selectedProfile, profileNewIngredients, batchAddAlerts]);

  const handleCloseProfileModal = useCallback(() => {
    setShowProfileModal(false);
    setSelectedProfile(null);
    setProfileNewIngredients([]);
    setProfileSuccess(null);
  }, []);

  return {
    isAdding,
    showConfirmModal,
    pendingDeactivation,
    showProfileModal,
    selectedProfile,
    profileNewIngredients,
    isApplyingProfile,
    profileSuccess,
    handleAddPreset,
    handleDeselectPreset,
    handleAddAlert,
    handleToggleAlert,
    confirmDeactivation,
    cancelDeactivation,
    handleDeleteAlert,
    handleProfilePress,
    handleApplyProfile,
    handleCloseProfileModal,
  };
}
