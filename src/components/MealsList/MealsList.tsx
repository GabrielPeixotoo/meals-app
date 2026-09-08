import { Meal } from "@/models/meal";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../MealItem";

interface MealsListProps {
  meals: Meal[];
  onPress: (id: string) => void;
}

export default function MealsList({ meals, onPress }: MealsListProps) {
  const router = useRouter();

  const renderMealItem = useCallback(
    ({ item }: { item: Meal }) => {
      return <MealItem onPress={() => onPress(item.id)} {...item} />;
    },
    [onPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
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
