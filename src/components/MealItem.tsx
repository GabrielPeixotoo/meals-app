import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface MealItemProps {
  title: string;
  imageUrl: string;
}

export default function MealItem({ title, imageUrl }: MealItemProps) {
  return (
    <View>
      <Pressable>
        <View>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
