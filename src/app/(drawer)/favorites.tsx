import MealsList from "@/components/MealsList/MealsList";
import { MEALS } from "@/data/dummy_data";
import { FavoritesContext } from "@/store/context/favorites-context";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Favorites() {
  const router = useRouter();

  const favoriteMealCtx = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealCtx.ids.includes(meal.id),
  );

  function navigateToMealDetails(id: string) {
    router.push({
      pathname: "/meal_details",
      params: {
        id,
      },
    });
  }

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>You have no favorite meals yet...</Text>
      </View>
    );
  }

  return <MealsList meals={favoriteMeals} onPress={navigateToMealDetails} />;
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 18, fontWeight: "bold", color: "black" },
});
