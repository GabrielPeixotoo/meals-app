import { queryClient } from "@/api/queryClient";
import { navigationThemes } from "@/constants/theme";
import { useAppStateFocus } from "@/hooks/useAppStateFocus";
import { useAppColorScheme, useThemeColors } from "@/hooks/useThemeColors";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  anchor: "(drawer)",
};

export default function RootLayout() {
  useAppStateFocus();
  const colorScheme = useAppColorScheme();
  const colors = useThemeColors();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={navigationThemes[colorScheme]}>
        {/* Headers are purple in both themes, so the status bar stays light */}
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            title: "",
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTitleStyle: {
              color: colors.onPrimary,
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}
