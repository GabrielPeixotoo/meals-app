import IconButton from "@/components/IconButton";
import List from "@/components/MealDetails/List";
import MealDetailsInfo from "@/components/MealDetails/MealDetailsInfo";
import Subtitle from "@/components/MealDetails/Subtitle";
import { MEALS } from "@/data/dummy_data";
import { FavoritesContext } from "@/store/context/favorites-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MealDetails() {
  const params = useLocalSearchParams<{ id: string }>();

  const favoriteMealCtx = useContext(FavoritesContext);

  const mealId = params.id;

  const mealIsFavorite = favoriteMealCtx.ids.includes(mealId);

  const meal = MEALS.find((meal) => meal.id === mealId);

  if (!meal) {
    return (
      <View>
        <Text>Refeição não encontrada...</Text>
      </View>
    );
  }

  const {
    imageUrl,
    title,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
  } = meal;

  function onTapFavorite() {
    if (mealIsFavorite) {
      return favoriteMealCtx.removeFavorite(mealId);
    }

    favoriteMealCtx.addFavorite(mealId);
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

      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>
      <MealDetailsInfo
        duration={duration}
        complexity={complexity}
        affordability={affordability}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List items={ingredients} />
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
