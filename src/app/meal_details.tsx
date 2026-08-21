import List from "@/components/MealDetails/List";
import MealDetailsInfo from "@/components/MealDetails/MealDetailsInfo";
import Subtitle from "@/components/MealDetails/Subtitle";
import { MEALS } from "@/data/dummy_data";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MealDetails() {
  const params = useLocalSearchParams();

  const mealId = Array.isArray(params.id) ? params.id[0] : params.id;

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

  return (
    <ScrollView style={styles.root}>
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
