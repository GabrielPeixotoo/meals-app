import { useCategories } from "@/api/queries";
import CategoryGridTile from "@/components/CategoryGridTile";
import { ErrorState, LoadingState } from "@/components/ui/ScreenState";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function Index() {
  const router = useRouter();
  const { data: categories, isPending, error, refetch } = useCategories();
  const { isRefreshing, onRefresh } = useRefreshByUser(refetch);

  function onPressCategory(category: string) {
    router.push({
      pathname: "/meals_overview",
      params: {
        category,
      },
    });
  }

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryGridTile category={item} onPress={onPressCategory} />
      )}
      numColumns={2}
      keyExtractor={(item) => item.id}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
}
