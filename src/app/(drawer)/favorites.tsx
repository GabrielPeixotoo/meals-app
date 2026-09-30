import MealsList from "@/components/MealsList/MealsList";
import { EmptyState, LoadingState } from "@/components/ui/ScreenState";
import { useFavoritesHydrated, useFavoritesStore } from "@/store/favorites";
import { useRouter } from "expo-router";

export default function Favorites() {
  const router = useRouter();

  const favoriteMeals = useFavoritesStore((state) => state.meals);
  const hydrated = useFavoritesHydrated();

  function navigateToMealDetails(id: string) {
    router.push({
      pathname: "/meal_details",
      params: {
        id,
      },
    });
  }

  if (!hydrated) return <LoadingState />;
  if (favoriteMeals.length === 0) {
    return <EmptyState message="You have no favorite meals yet..." />;
  }

  return <MealsList meals={favoriteMeals} onPress={navigateToMealDetails} />;
}
