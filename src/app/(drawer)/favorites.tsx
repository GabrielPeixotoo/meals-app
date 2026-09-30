import MealsList from "@/components/MealsList/MealsList";
import { EmptyState, LoadingState } from "@/components/ui/ScreenState";
import { useOpenMeal } from "@/hooks/useOpenMeal";
import { useFavoritesHydrated, useFavoritesStore } from "@/store/favorites";

export default function Favorites() {
  const openMeal = useOpenMeal();

  const favoriteMeals = useFavoritesStore((state) => state.meals);
  const hydrated = useFavoritesHydrated();

  if (!hydrated) return <LoadingState />;
  if (favoriteMeals.length === 0) {
    return <EmptyState message="You have no favorite meals yet..." />;
  }

  return <MealsList meals={favoriteMeals} onPress={openMeal} />;
}
