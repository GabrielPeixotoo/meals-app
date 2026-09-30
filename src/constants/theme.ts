import { DarkTheme, DefaultTheme } from "expo-router";

const palette = {
  light: {
    primary: "#9d19fb",
    onPrimary: "#ffffff",
    background: "#f2f2f2",
    card: "#ffffff",
    text: "#111111",
    textMuted: "#666666",
    accent: "#f3c9c1",
    placeholder: "#e5e5e5",
    ripple: "#cccccc",
  },
  dark: {
    primary: "#9d19fb",
    onPrimary: "#ffffff",
    background: "#121212",
    card: "#1e1e1e",
    text: "#f2f2f2",
    textMuted: "#a3a3a3",
    accent: "#5a3a36",
    placeholder: "#2a2a2a",
    ripple: "#444444",
  },
};

export type ThemeColors = typeof palette.light;
export type ColorScheme = keyof typeof palette;

export function getThemeColors(scheme: ColorScheme): ThemeColors {
  return palette[scheme];
}

// Navigation themes color the headers, drawer and screen backgrounds
export const navigationThemes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: palette.light.primary,
      background: palette.light.background,
      card: palette.light.card,
      text: palette.light.text,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: palette.dark.primary,
      background: palette.dark.background,
      card: palette.dark.card,
      text: palette.dark.text,
    },
  },
};
