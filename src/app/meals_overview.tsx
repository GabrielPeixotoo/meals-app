import MealItem from "@/components/MealItem";
import { CATEGORIES, MEALS } from "@/data/dummy_data";
import { Meal } from "@/models/meal";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function MealsOverview() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(categoryId) >= 0;
  });

  const categoryTitle = CATEGORIES.find((cat) => cat.id === categoryId)?.title;

  function renderMealItem({ item }: { item: Meal }) {
    return (
      <MealItem
        onPress={() =>
          router.push({
            pathname: "/meal_details",
            params: {
              id: item.id,
            },
          })
        }
        {...item}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: categoryTitle ?? "",
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
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
