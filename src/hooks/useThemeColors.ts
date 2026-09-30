import { ColorScheme, getThemeColors } from "@/constants/theme";
import { useColorScheme } from "react-native";

/** The current light/dark color scheme, defaulting to light. */
export function useAppColorScheme(): ColorScheme {
  return useColorScheme() === "dark" ? "dark" : "light";
}

export function useThemeColors() {
  return getThemeColors(useAppColorScheme());
}
