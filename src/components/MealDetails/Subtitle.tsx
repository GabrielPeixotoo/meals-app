import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SubtitleProps {
  children: ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleContainer: {
    marginVertical: 4,
    padding: 6,
    marginHorizontal: 12,
    borderBottomWidth: 2,
    borderColor: "#f3c9c1",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
