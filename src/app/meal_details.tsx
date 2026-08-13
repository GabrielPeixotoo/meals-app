import MealItem from "@/components/MealItem";
import { MEALS } from "@/data/dummy_data";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MealDetails() {
  const params = useLocalSearchParams();

  const mealId = Array.isArray(params.id) ? params.id[0] : params.id;

  const meal = MEALS.find((meal) => meal.id === mealId);

  return <View style={styles.screen}>{meal && <MealItem {...meal} />}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
