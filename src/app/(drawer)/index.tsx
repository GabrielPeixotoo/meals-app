import CategoryGridTile from "@/components/CategoryGridTile";
import { CATEGORIES } from "@/data/dummy_data";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function Index() {
  const router = useRouter();

  function onPressCategory(id: string) {
    router.push({
      pathname: "/meals_overview",
      params: {
        id,
      },
    });
  }

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={({ item }) => (
        <CategoryGridTile category={item} onPress={onPressCategory} />
      )}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
}
