import { useMeal } from "@/api/queries";
import IconButton from "@/components/IconButton";
import List from "@/components/MealDetails/List";
import MealDetailsInfo from "@/components/MealDetails/MealDetailsInfo";
import Subtitle from "@/components/MealDetails/Subtitle";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/ScreenState";
import { addFavorite, removeFavorite } from "@/store/redux/favorites";
import { RootState } from "@/store/redux/store";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MealDetails() {
  const { id: mealId } = useLocalSearchParams<{ id: string }>();
  const { data: meal, isPending, error, refetch } = useMeal(mealId);

  const favoriteMealIds = useSelector(
    (state: RootState) => state.favoriteMeals.ids,
  );
  const dispatch = useDispatch();
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;
  if (!meal) return <EmptyState message="Meal not found..." />;

  const { thumbnail, name, category, area, ingredients, steps } = meal;

  function onTapFavorite() {
    if (mealIsFavorite) {
      return dispatch(removeFavorite({ id: mealId }));
    }

    return dispatch(addFavorite({ id: mealId }));
  }

  return (
    <ScrollView style={styles.root}>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <IconButton
                name={mealIsFavorite ? "star" : "star-outline"}
                onPress={onTapFavorite}
                color="black"
              />
            );
          },
        }}
      />

      <Image
        style={styles.image}
        source={thumbnail}
        transition={200}
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.title}>{name}</Text>
      <MealDetailsInfo category={category} area={area} />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List
            items={ingredients.map((ingredient) =>
              `${ingredient.measure} ${ingredient.name}`.trim(),
            )}
          />
          <Subtitle>Steps</Subtitle>
          <List items={steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
    backgroundColor: "#e5e5e5",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
