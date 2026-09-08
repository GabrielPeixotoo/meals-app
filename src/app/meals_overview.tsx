import MealsList from "@/components/MealsList/MealsList";
import { CATEGORIES, MEALS } from "@/data/dummy_data";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function MealsOverview() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  const categoryTitle = CATEGORIES.find((cat) => cat.id === categoryId)?.title;

  function navigateToMealDetails(id: string) {
    router.push({
      pathname: "/meal_details",
      params: {
        id,
      },
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: categoryTitle ?? "",
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <MealsList meals={displayedMeals} onPress={navigateToMealDetails} />
    </>
  );
}
