import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCategories, getMealById, getMealsByCategory } from "./meals";

export const mealKeys = {
  all: ["meals"] as const,
  categories: () => [...mealKeys.all, "categories"] as const,
  byCategory: (category: string) =>
    [...mealKeys.all, "category", category] as const,
  detail: (id: string) => [...mealKeys.all, "detail", id] as const,
};

function mealQueryOptions(id: string) {
  return queryOptions({
    queryKey: mealKeys.detail(id),
    queryFn: () => getMealById(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: mealKeys.categories(),
    queryFn: getCategories,
  });
}

export function useMealsByCategory(category: string) {
  return useQuery({
    queryKey: mealKeys.byCategory(category),
    queryFn: () => getMealsByCategory(category),
    enabled: !!category,
  });
}

export function useMeal(id: string) {
  return useQuery({ ...mealQueryOptions(id), enabled: !!id });
}
