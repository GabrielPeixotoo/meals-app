import { StyleSheet, Text, View } from "react-native";

interface MealDetailsInfoProps {
  duration: number;
  complexity: string;
  affordability: string;
}

export default function MealDetailsInfo({
  duration,
  complexity,
  affordability,
}: MealDetailsInfoProps) {
  return (
    <View style={styles.details}>
      <Text style={styles.detailItem}>{duration}m</Text>
      <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
      <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
