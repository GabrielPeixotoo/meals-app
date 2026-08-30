import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}
