import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  getAreas,
  getCategories,
  getMealById,
  getMealsByArea,
  getMealsByCategory,
  searchMealsByName,
} from "./meals";

export type MealFilter = {
  type: "category" | "area";
  value: string;
};

export const mealKeys = {
  all: ["meals"] as const,
  categories: () => [...mealKeys.all, "categories"] as const,
  areas: () => [...mealKeys.all, "areas"] as const,
  filtered: ({ type, value }: MealFilter) =>
    [...mealKeys.all, "filter", type, value] as const,
  search: (query: string) => [...mealKeys.all, "search", query] as const,
  detail: (id: string) => [...mealKeys.all, "detail", id] as const,
};

export const MIN_SEARCH_LENGTH = 2;

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

export function useAreas() {
  return useQuery({
    queryKey: mealKeys.areas(),
    queryFn: getAreas,
  });
}

export function useFilteredMeals(filter: MealFilter) {
  return useQuery({
    queryKey: mealKeys.filtered(filter),
    queryFn: () =>
      filter.type === "area"
        ? getMealsByArea(filter.value)
        : getMealsByCategory(filter.value),
    enabled: !!filter.value,
  });
}

export function useSearchMeals(query: string) {
  return useQuery({
    queryKey: mealKeys.search(query),
    queryFn: () => searchMealsByName(query),
    enabled: query.length >= MIN_SEARCH_LENGTH,
    // Keep showing the previous results while the next search loads
    placeholderData: keepPreviousData,
  });
}

export function useMeal(id: string) {
  return useQuery({ ...mealQueryOptions(id), enabled: !!id });
}
