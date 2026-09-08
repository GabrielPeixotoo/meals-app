import MealsList from "@/components/MealsList/MealsList";
import { MEALS } from "@/data/dummy_data";
import { FavoritesContext } from "@/store/context/favorites-context";
import { useRouter } from "expo-router";
import { useContext } from "react";

export default function Favorites() {
  const router = useRouter();

  const favoriteMealCtx = useContext(FavoritesContext);

  const favoriteMeals = favoriteMealCtx.ids.flatMap((id) => {
    const found = MEALS.find((meal) => meal.id === id);
    return found ? [found] : [];
  });

  function navigateToMealDetails(id: string) {
    router.push({
      pathname: "/meal_details",
      params: {
        id,
      },
    });
  }

  return <MealsList meals={favoriteMeals} onPress={navigateToMealDetails} />;
}
