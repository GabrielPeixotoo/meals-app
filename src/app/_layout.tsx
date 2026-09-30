import { queryClient } from "@/api/queryClient";
import { useAppStateFocus } from "@/hooks/useAppStateFocus";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  useAppStateFocus();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
