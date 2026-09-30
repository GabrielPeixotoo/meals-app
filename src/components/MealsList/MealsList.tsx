import { MealSummary } from "@/api/schemas";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "../MealItem";

interface MealsListProps {
  meals: MealSummary[];
  onPress: (id: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function MealsList({
  meals,
  onPress,
  refreshing,
  onRefresh,
}: MealsListProps) {
  const renderMealItem = useCallback(
    ({ item }: { item: MealSummary }) => {
      return (
        <MealItem
          name={item.name}
          thumbnail={item.thumbnail}
          onPress={() => onPress(item.id)}
        />
      );
    },
    [onPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
