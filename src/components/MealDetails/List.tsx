import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, View } from "react-native";

interface ListProps {
  items: string[];
}

export default function List({ items }: ListProps) {
  const colors = useThemeColors();

  return items.map((item, index) => (
    <View
      key={index}
      style={[styles.listItem, { backgroundColor: colors.accent }]}
    >
      <Text style={[styles.itemText, { color: colors.text }]}>{item}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  itemText: {
    textAlign: "center",
  },
});
