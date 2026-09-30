import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";

/**
 * React Native has no window focus event, so tell TanStack Query when the app
 * returns to the foreground to refetch stale data.
 * https://tanstack.com/query/latest/docs/framework/react/react-native
 */
export function useAppStateFocus() {
  useEffect(() => {
    if (Platform.OS === "web") return;

    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });

    return () => subscription.remove();
  }, []);
}
