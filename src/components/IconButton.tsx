import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";

interface IconButtonProps {
  onPress: () => void;
  name: ComponentProps<typeof Ionicons>["name"];
  color: ComponentProps<typeof Ionicons>["color"];
}

export default function IconButton({ name, onPress, color }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={name} size={32} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
