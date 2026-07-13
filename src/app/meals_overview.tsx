import MealItem from "@/components/MealItem";
import { MEALS } from "@/data/dummy_data";
import { Meal } from "@/models/meal";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function MealsOverview() {
  const params = useLocalSearchParams();

  const categoryId = Array.isArray(params.id) ? params.id[0] : params.id;

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  function renderMealItem({ item }: { item: Meal }) {
    return <MealItem title={item.title} imageUrl={item.imageUrl} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
