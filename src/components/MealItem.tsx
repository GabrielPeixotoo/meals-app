import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface MealItemProps {
  name: string;
  thumbnail: string | null;
  onPress?: () => void;
}

export default function MealItem({ name, thumbnail, onPress }: MealItemProps) {
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={thumbnail}
            transition={200}
            accessibilityIgnoresInvertColors
          />
          <Text style={styles.title}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: 200,
    // Placeholder while loading or when the meal has no photo
    backgroundColor: "#e5e5e5",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});
