import { useThemeColors } from "@/hooks/useThemeColors";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SubtitleProps {
  children: ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.subtitleContainer, { borderColor: colors.accent }]}>
      <Text style={[styles.subtitle, { color: colors.text }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleContainer: {
    marginVertical: 4,
    padding: 6,
    marginHorizontal: 12,
    borderBottomWidth: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
