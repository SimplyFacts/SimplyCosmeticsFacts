import { Tabs } from "expo-router";
import { Camera, History, Bell, Settings } from "lucide-react-native";
import { scaleFont, scaleModerate } from "@/utils/responsiveScale";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: scaleModerate(4),
        },
        tabBarActiveTintColor: "#10B981",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: scaleFont(12),
        },
      }}
    >
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color, size }) => (
            <Camera color={color} size={scaleModerate(24)} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <History color={color} size={scaleModerate(24)} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Bell color={color} size={scaleModerate(24)} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={scaleModerate(24)} />
          ),
        }}
      />
      <Tabs.Screen
        name="product/[barcode]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
