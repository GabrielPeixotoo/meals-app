import { Category } from "@/api/schemas";
import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface CategoryGridTileProps {
  category: Category;
  onPress: (name: string) => void;
}

export default function CategoryGridTile({
  category,
  onPress,
}: CategoryGridTileProps) {
  const handlePress = () => onPress(category.name);

  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={handlePress}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={category.thumbnail}
            contentFit="contain"
            transition={200}
            accessibilityIgnoresInvertColors
          />
          <Text style={styles.title}>{category.name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: "100%",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
