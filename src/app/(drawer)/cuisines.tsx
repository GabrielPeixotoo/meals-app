import { useAreas } from "@/api/queries";
import { Area } from "@/api/schemas";
import { ErrorState, LoadingState } from "@/components/ui/ScreenState";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useThemeColors } from "@/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Cuisines() {
  const router = useRouter();
  const colors = useThemeColors();
  const { data: areas, isPending, error, refetch } = useAreas();
  const { isRefreshing, onRefresh } = useRefreshByUser(refetch);

  function onPressArea({ name, country }: Area) {
    router.push({
      pathname: "/meals_overview",
      params: { country, title: name },
    });
  }

  if (isPending) return <LoadingState />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <FlatList
      data={areas}
      keyExtractor={(area) => area.country}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item: area }) => (
        <Pressable
          onPress={() => onPressArea(area)}
          android_ripple={{ color: colors.ripple }}
          style={({ pressed }) => [
            styles.row,
            { backgroundColor: colors.card },
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
        >
          <View>
            <Text style={[styles.rowText, { color: colors.text }]}>
              {area.name}
            </Text>
            {area.country !== area.name ? (
              <Text style={[styles.rowSubtitle, { color: colors.textMuted }]}>
                {area.country}
              </Text>
            ) : null}
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
  },
  rowText: {
    fontSize: 16,
    fontWeight: "600",
  },
  rowSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
