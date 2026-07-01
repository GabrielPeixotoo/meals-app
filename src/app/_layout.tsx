import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#24180f" },
        title: "",
        headerStyle: { backgroundColor: "#24180f" },
      }}
    />
  );
}
