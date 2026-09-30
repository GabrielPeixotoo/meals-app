import { MealFilter, useFilteredMeals } from "@/api/queries";
import MealsList from "@/components/MealsList/MealsList";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/ScreenState";
import { useOpenMeal } from "@/hooks/useOpenMeal";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { Stack, useLocalSearchParams } from "expo-router";

export default function MealsOverview() {
  // Opened from a category (All Categories) or a country (Cuisines)
  const { category, country, title } = useLocalSearchParams<{
    category?: string;
    country?: string;
    title?: string;
  }>();
  const filter: MealFilter = country
    ? { type: "area", value: country }
    : { type: "category", value: category ?? "" };
  const screenTitle = title ?? filter.value;

  const openMeal = useOpenMeal();
  const { data: meals, isPending, error, refetch } = useFilteredMeals(filter);
  const { isRefreshing, onRefresh } = useRefreshByUser(refetch);

  function renderContent() {
    if (isPending) return <LoadingState />;
    if (error) return <ErrorState message={error.message} onRetry={refetch} />;
    if (meals.length === 0) {
      return <EmptyState message={`No ${screenTitle} meals found.`} />;
    }

    return (
      <MealsList
        meals={meals}
        onPress={openMeal}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: screenTitle }} />
      {renderContent()}
    </>
  );
}
