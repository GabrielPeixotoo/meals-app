import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface IconButtonProps {
  onPress: () => void;
  name: ComponentProps<typeof Ionicons>["name"];
  color: ComponentProps<typeof Ionicons>["color"];
  size?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export default function IconButton({
  name,
  onPress,
  color,
  size = 32,
  accessibilityLabel,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
