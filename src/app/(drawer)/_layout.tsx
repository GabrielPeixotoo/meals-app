import { useThemeColors } from "@/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  const colors = useThemeColors();

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.onPrimary,
        drawerActiveTintColor: colors.primary,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "All Categories",
          headerTitle: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="search"
        options={{
          drawerLabel: "Search",
          headerTitle: "Search",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="cuisines"
        options={{
          drawerLabel: "Cuisines",
          headerTitle: "Cuisines",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="earth" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          drawerLabel: "Favorites",
          headerTitle: "Favorites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
