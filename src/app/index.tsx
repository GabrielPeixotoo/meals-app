import CategoryGridTile from "@/components/CategoryGridTile";
import { CATEGORIES } from "@/data/dummy_data";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => (
          <CategoryGridTile title={item.title} color={item.color} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
