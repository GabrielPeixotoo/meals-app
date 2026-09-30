import { getRandomMeal } from "@/api/meals";
import { mealKeys } from "@/api/queries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

/** Fetches a random meal and opens its details. */
export function useSurpriseMeal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function surprise() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const meal = await getRandomMeal();
      if (!meal) throw new Error("No meal returned");

      // Seed the cache so the details screen opens without another request
      queryClient.setQueryData(mealKeys.detail(meal.id), meal);
      router.push({ pathname: "/meal_details", params: { id: meal.id } });
    } catch {
      Alert.alert("Couldn't find a meal", "Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return { surprise, isLoading };
}
