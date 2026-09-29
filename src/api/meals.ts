import { get } from "./client";
import {
  areasResponseSchema,
  categoriesResponseSchema,
  mealDetailsResponseSchema,
  MealDetail,
  mealSummariesResponseSchema,
} from "./schemas";

export function getCategories() {
  return get("categories.php", categoriesResponseSchema);
}

export function getMealsByCategory(category: string) {
  return get("filter.php", mealSummariesResponseSchema, { c: category });
}

export function getAreas() {
  return get("list.php", areasResponseSchema, { a: "list" });
}

export function getMealsByArea(area: string) {
  return get("filter.php", mealSummariesResponseSchema, { a: area });
}

export function searchMealsByName(query: string) {
  return get("search.php", mealDetailsResponseSchema, { s: query });
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const meals = await get("lookup.php", mealDetailsResponseSchema, { i: id });
  return meals[0] ?? null;
}
