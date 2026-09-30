import { StyleSheet, Text, View } from "react-native";

interface MealDetailsInfoProps {
  category: string | null;
  area: string | null;
}

export default function MealDetailsInfo({
  category,
  area,
}: MealDetailsInfoProps) {
  const details = [category, area].filter(Boolean);

  if (details.length === 0) return null;

  return (
    <View style={styles.details}>
      {details.map((detail) => (
        <Text key={detail} style={styles.detailItem}>
          {detail?.toUpperCase()}
        </Text>
      ))}
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
