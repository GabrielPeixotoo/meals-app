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
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFavoritesStore, useIsFavorite } from "@/store/favorites";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const YOUTUBE_RED = "#ff0033";

export default function MealDetails() {
  const { id: mealId } = useLocalSearchParams<{ id: string }>();
  const { data: meal, isPending, error, refetch } = useMeal(mealId);
  const colors = useThemeColors();

  const mealIsFavorite = useIsFavorite(mealId);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;
  if (!meal) return <EmptyState message="Meal not found..." />;

  const { thumbnail, name, category, area, ingredients, steps, youtubeUrl } =
    meal;

  function onTapFavorite() {
    if (meal) toggleFavorite(meal);
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <IconButton
                name={mealIsFavorite ? "star" : "star-outline"}
                onPress={onTapFavorite}
                color={colors.text}
                accessibilityLabel={
                  mealIsFavorite ? "Remove from favorites" : "Add to favorites"
                }
              />
            );
          },
        }}
      />

      <Image
        style={[styles.image, { backgroundColor: colors.placeholder }]}
        source={thumbnail}
        transition={200}
        accessibilityIgnoresInvertColors
      />
      <Text style={[styles.title, { color: colors.text }]}>{name}</Text>
      <MealDetailsInfo category={category} area={area} />
      {youtubeUrl ? (
        <Pressable
          onPress={() => Linking.openURL(youtubeUrl)}
          style={({ pressed }) => [
            styles.youtubeButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="link"
        >
          <Ionicons name="logo-youtube" size={20} color="white" />
          <Text style={styles.youtubeText}>Watch on YouTube</Text>
        </Pressable>
      ) : null}
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
  content: {
    paddingBottom: 32,
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
  youtubeButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: YOUTUBE_RED,
  },
  youtubeText: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
