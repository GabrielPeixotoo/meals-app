import MealsList from "@/components/MealsList/MealsList";
import { MEALS } from "@/data/dummy_data";
import { RootState } from "@/store/redux/store";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Favorites() {
  const router = useRouter();

  const mealIds = useSelector((state: RootState) => state.favoriteMeals.ids);

  const favoriteMeals = MEALS.filter((meal) => mealIds.includes(meal.id));

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
