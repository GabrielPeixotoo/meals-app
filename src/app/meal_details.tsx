import MealDetailsInfo from "@/components/MealDetailsInfo";
import { MEALS } from "@/data/dummy_data";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

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

  const { imageUrl, title, duration, complexity, affordability, ingredients } =
    meal;

  return (
    <View>
      <Image source={{ uri: imageUrl }} />
      <Text>{title}</Text>
      <MealDetailsInfo
        duration={duration}
        complexity={complexity}
        affordability={affordability}
      />
      <Text>Ingredients</Text>
      {ingredients.map((ingredient) => (
        <Text key={ingredient}>{ingredient}</Text>
      ))}
      <Text>Steps</Text>
    </View>
  );
}
