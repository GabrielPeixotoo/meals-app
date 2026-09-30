import { MIN_SEARCH_LENGTH, useSearchMeals } from "@/api/queries";
import MealsList from "@/components/MealsList/MealsList";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/ui/ScreenState";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useOpenMeal } from "@/hooks/useOpenMeal";
import { useThemeColors } from "@/hooks/useThemeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Search() {
  const colors = useThemeColors();
  const openMeal = useOpenMeal();

  const [query, setQuery] = useState("");
  // Waits for the user to stop typing instead of sending a request per key
  const debouncedQuery = useDebouncedValue(query.trim());
  const {
    data: meals,
    isPending,
    error,
    refetch,
  } = useSearchMeals(debouncedQuery);

  function renderContent() {
    if (debouncedQuery.length < MIN_SEARCH_LENGTH) {
      return <EmptyState message="Search meals by name, like “pasta”." />;
    }
    if (isPending) return <LoadingState />;
    if (error) return <ErrorState message={error.message} onRetry={refetch} />;
    if (meals.length === 0) {
      return <EmptyState message={`No meals found for “${debouncedQuery}”.`} />;
    }

    return <MealsList meals={meals} onPress={openMeal} />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          // Uncontrolled (no `value`): a controlled input can drop keystrokes
          // when typing fast, and nothing here needs to rewrite the text
          onChangeText={setQuery}
          placeholder="Search meals"
          placeholderTextColor={colors.textMuted}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          returnKeyType="search"
          accessibilityLabel="Search meals by name"
        />
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
});
