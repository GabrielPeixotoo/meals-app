import { queryOptions, useQueries, useQuery } from "@tanstack/react-query";
import { getCategories, getMealById, getMealsByCategory } from "./meals";
import { MealDetail } from "./schemas";

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

/** Fetches several meals in parallel, sharing the cache with useMeal. */
export function useMeals(ids: string[]) {
  return useQueries({
    queries: ids.map(mealQueryOptions),
    combine: (results) => ({
      data: results
        .map((result) => result.data)
        .filter((meal): meal is MealDetail => !!meal),
      isPending: results.some((result) => result.isPending),
      error: results.find((result) => result.error)?.error ?? null,
      refetch: () => Promise.all(results.map((result) => result.refetch())),
    }),
  });
}
