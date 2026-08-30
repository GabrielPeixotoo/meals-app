import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9d19fb",
        },
        title: "",
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "All Categories",
          headerTitle: "All Categories",
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          drawerLabel: "Favorites",
        }}
      />
    </Drawer>
  );
}
