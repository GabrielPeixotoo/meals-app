import { Category } from "@/api/schemas";
import { useThemeColors } from "@/hooks/useThemeColors";
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
  const colors = useThemeColors();
  const handlePress = () => onPress(category.name);

  return (
    <View style={[styles.gridItem, { backgroundColor: colors.card }]}>
      <Pressable
        android_ripple={{ color: colors.ripple }}
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
          <Text style={[styles.title, { color: colors.text }]}>
            {category.name}
          </Text>
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
