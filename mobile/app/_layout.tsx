import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Header from "@/lib/components/Header";
import { ScheduleProvider } from "@/lib/context";

export default function Layout() {
  return (
    <ScheduleProvider>
      <Tabs
        screenOptions={({ route }) => ({
          header: () => (
            <Header
              title={route.name === "index" ? "Ekran glowny" : "Ustawienia"}
            />
          ),
          tabBarIcon: ({ color, size }) => {
            let iconName: "home" | "settings" =
              route.name === "index" ? "home" : "settings";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "lightgray",
          tabBarStyle: { height: 60 },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Ekran glowny" }} />
        <Tabs.Screen name="settings" options={{ title: "Ustawienia" }} />
      </Tabs>
    </ScheduleProvider>
  );
}
