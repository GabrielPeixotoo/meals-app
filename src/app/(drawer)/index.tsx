import { useCategories } from "@/api/queries";
import CategoryGridTile from "@/components/CategoryGridTile";
import IconButton from "@/components/IconButton";
import { ErrorState, LoadingState } from "@/components/ui/ScreenState";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useSurpriseMeal } from "@/hooks/useSurpriseMeal";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  const colors = useThemeColors();
  const { data: categories, isPending, error, refetch } = useCategories();
  const { isRefreshing, onRefresh } = useRefreshByUser(refetch);
  const { surprise, isLoading: isSurpriseLoading } = useSurpriseMeal();

  function onPressCategory(category: string) {
    router.push({
      pathname: "/meals_overview",
      params: {
        category,
      },
    });
  }

  function renderContent() {
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

  return (
    <>
      <Drawer.Screen
        options={{
          headerRight: () =>
            isSurpriseLoading ? (
              <ActivityIndicator
                color={colors.onPrimary}
                style={styles.headerRight}
              />
            ) : (
              <IconButton
                name="shuffle"
                onPress={surprise}
                color={colors.onPrimary}
                size={26}
                accessibilityLabel="Surprise me with a random meal"
                style={styles.headerRight}
              />
            ),
        }}
      />
      {renderContent()}
    </>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
});
