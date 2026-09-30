import { useThemeColors } from "@/hooks/useThemeColors";
import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface MealItemProps {
  name: string;
  thumbnail: string | null;
  onPress?: () => void;
}

export default function MealItem({ name, thumbnail, onPress }: MealItemProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.mealItem, { backgroundColor: colors.card }]}>
      <Pressable
        android_ripple={{ color: colors.ripple }}
        style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image
            // Background doubles as a placeholder while loading or when the
            // meal has no photo
            style={[styles.image, { backgroundColor: colors.placeholder }]}
            source={thumbnail}
            transition={200}
            accessibilityIgnoresInvertColors
          />
          <Text style={[styles.title, { color: colors.text }]}>{name}</Text>
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
