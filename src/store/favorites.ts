import { MealSummary } from "@/api/schemas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoritesState = {
  meals: MealSummary[];
  toggleFavorite: (meal: MealSummary) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      meals: [],
      toggleFavorite: ({ id, name, thumbnail }) =>
        set((state) => {
          const isFavorite = state.meals.some((meal) => meal.id === id);

          return {
            meals: isFavorite
              ? state.meals.filter((meal) => meal.id !== id)
              : [...state.meals, { id, name, thumbnail }],
          };
        }),
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);

export function useIsFavorite(id: string) {
  return useFavoritesStore((state) =>
    state.meals.some((meal) => meal.id === id),
  );
}

/**
 * AsyncStorage is async, so the persisted favorites load after the first
 * render. Use this to avoid flashing the empty state before they arrive.
 */
export function useFavoritesHydrated() {
  return useSyncExternalStore(
    (onChange) => useFavoritesStore.persist.onFinishHydration(onChange),
    () => useFavoritesStore.persist.hasHydrated(),
  );
}
