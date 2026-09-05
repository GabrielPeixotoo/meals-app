import { FavoritesContextProvider } from "@/store/context/favorites-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <FavoritesContextProvider>
      <Stack
        screenOptions={{
          title: "",
          headerStyle: {
            backgroundColor: "#9d19fb",
          },
        }}
      >
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FavoritesContextProvider>
  );
}
