import { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAlertsStore } from "@/stores/alertsStore";
import { getPresetCategories, isPresetIngredient } from "@/utils/alertPresets";
import { PresetCategory } from "@/components/alerts/PresetCategory";
import { AlertItem } from "@/components/alerts/AlertItem";
import { DietaryProfilesTile } from "@/components/alerts/DietaryProfilesTile";
import { LifestyleDietsTile } from "@/components/alerts/LifestyleDietsTile";
import { Disclaimer } from "@/components/alerts/Disclaimer";
import { ManualAddForm } from "@/components/alerts/ManualAddForm";
import { ConfirmationModal } from "@/components/alerts/ConfirmationModal";
import { DietaryProfileModal } from "@/components/alerts/DietaryProfileModal";
import { EmptyState } from "@/components/alerts/EmptyState";
import { useAlertHandlers } from "@/hooks/useAlertHandlers";

export default function AlertsScreen() {
  const insets = useSafeAreaInsets();

  // Use global alerts store
  const { alerts, isLoading, fetchAlerts, shouldRefresh } = useAlertsStore();

  // Get preset categories
  const presetCategories = getPresetCategories();

  // Filter to get only custom alerts (not from presets)
  const customAlerts = alerts.filter(
    (alert) => !isPresetIngredient(alert.ingredient_name),
  );

  // Fetch alerts on mount or when they need refreshing
  useEffect(() => {
    if (shouldRefresh()) {
      fetchAlerts();
    }
  }, [fetchAlerts, shouldRefresh]);

  // Use alert handlers hook
  const {
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
    handleProfilePress,
    handleApplyProfile,
    handleCloseProfileModal,
  } = useAlertHandlers();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Ingredient Alerts</Text>
        <Text style={styles.headerSubtitle}>
          Get notified when scanning products with these ingredients
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Add Presets Section */}
        <View style={styles.presetsSection}>
          <View style={styles.presetsSectionHeader}>
            <Text style={styles.presetsSectionTitle}>Quick Add</Text>
            <Text style={styles.presetsSectionSubtitle}>
              Tap tiles to explore categories
            </Text>
          </View>

          <View style={styles.tilesGrid}>
            {/* Dietary Profiles Expandable Tile */}
            <DietaryProfilesTile
              alerts={alerts}
              onProfilePress={handleProfilePress}
            />

            {/* Lifestyle Diets Expandable Tile */}
            <LifestyleDietsTile
              alerts={alerts}
              onProfilePress={handleProfilePress}
            />

            {presetCategories.map((category) => (
              <PresetCategory
                key={category.key}
                category={category}
                alerts={alerts}
                onAddPreset={handleAddPreset}
                onDeselectPreset={handleDeselectPreset}
              />
            ))}
          </View>
        </View>

        {/* Manual Add Toggle */}
        <ManualAddForm onAdd={handleAddAlert} isAdding={isAdding} />

        {/* Your Alerts Section - Only Custom Alerts */}
        {customAlerts.length > 0 && (
          <View style={styles.yourAlertsSection}>
            <Text style={styles.yourAlertsTitle}>
              Your Alerts ({customAlerts.length})
            </Text>
            {customAlerts.map((item) => (
              <AlertItem
                key={item.id}
                item={item}
                onToggle={handleToggleAlert}
              />
            ))}
          </View>
        )}

        {/* Disclaimer */}
        <Disclaimer />

        {/* Empty State */}
        {!isLoading && alerts.length === 0 && <EmptyState />}
      </ScrollView>

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      )}

      {/* Confirmation Modal (Deactivate Alert) */}
      <ConfirmationModal
        visible={showConfirmModal}
        ingredientName={pendingDeactivation?.ingredient_name}
        onConfirm={confirmDeactivation}
        onCancel={cancelDeactivation}
      />

      {/* Dietary Profile Confirmation Modal */}
      <DietaryProfileModal
        visible={showProfileModal}
        profile={selectedProfile}
        newIngredients={profileNewIngredients}
        success={profileSuccess}
        isApplying={isApplyingProfile}
        onApply={handleApplyProfile}
        onClose={handleCloseProfileModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  presetsSection: {
    marginTop: 8,
  },
  presetsSectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  presetsSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  presetsSectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  tilesGrid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  yourAlertsSection: {
    marginTop: 8,
  },
  yourAlertsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});
