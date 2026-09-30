import { useMeals } from "@/api/queries";
import MealsList from "@/components/MealsList/MealsList";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/ScreenState";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { RootState } from "@/store/redux/store";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function Favorites() {
  const router = useRouter();

  const mealIds = useSelector((state: RootState) => state.favoriteMeals.ids);
  const { data: favoriteMeals, isPending, error, refetch } = useMeals(mealIds);
  const { isRefreshing, onRefresh } = useRefreshByUser(refetch);

  function navigateToMealDetails(id: string) {
    router.push({
      pathname: "/meal_details",
      params: {
        id,
      },
    });
  }

  if (mealIds.length === 0) {
    return <EmptyState message="You have no favorite meals yet..." />;
  }
  if (isPending) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <MealsList
      meals={favoriteMeals}
      onPress={navigateToMealDetails}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
}
