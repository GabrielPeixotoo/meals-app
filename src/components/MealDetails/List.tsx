import { StyleSheet, Text, View } from "react-native";

interface ListProps {
  items: string[];
}

export default function List({ items }: ListProps) {
  return items.map((item, index) => (
    <View key={index} style={styles.listItem}>
      <Text style={styles.itemText}>{item}</Text>
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
    backgroundColor: "#f3c9c1",
  },
  itemText: {
    textAlign: "center",
  },
});
