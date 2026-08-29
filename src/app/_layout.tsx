import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#3c0a6b",
        },
      }}
    />
  );
}
