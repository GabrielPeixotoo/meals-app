import { useMealsByCategory } from "@/api/queries";
import MealsList from "@/components/MealsList/MealsList";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/ScreenState";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function MealsOverview() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const {
    data: meals,
    isPending,
    error,
    refetch,
  } = useMealsByCategory(category);
  const { isRefreshing, onRefresh } = useRefreshByUser(refetch);

  function navigateToMealDetails(id: string) {
    router.push({
      pathname: "/meal_details",
      params: {
        id,
      },
    });
  }

  function renderContent() {
    if (isPending) return <LoadingState />;
    if (error) return <ErrorState message={error.message} onRetry={refetch} />;
    if (meals.length === 0) {
      return <EmptyState message="No meals found in this category." />;
    }

    return (
      <MealsList
        meals={meals}
        onPress={navigateToMealDetails}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: category ?? "",
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      {renderContent()}
    </>
  );
}
