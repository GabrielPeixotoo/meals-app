import { useRouter } from "expo-router";

/** Returns a function that opens the details screen of a meal. */
export function useOpenMeal() {
  const router = useRouter();

  return (id: string) =>
    router.push({
      pathname: "/meal_details",
      params: { id },
    });
}
