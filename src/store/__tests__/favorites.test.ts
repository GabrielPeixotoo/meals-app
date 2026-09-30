import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavoritesStore } from "../favorites";

const teriyaki = { id: "52772", name: "Teriyaki", thumbnail: "https://x" };
const amok = { id: "53483", name: "Amok", thumbnail: null };

describe("useFavoritesStore", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ meals: [] });
  });

  it("adds a meal that isn't a favorite yet", () => {
    useFavoritesStore.getState().toggleFavorite(teriyaki);

    expect(useFavoritesStore.getState().meals).toEqual([teriyaki]);
  });

  it("removes a meal that is already a favorite", () => {
    const { toggleFavorite } = useFavoritesStore.getState();
    toggleFavorite(teriyaki);
    toggleFavorite(amok);
    toggleFavorite(teriyaki);

    expect(useFavoritesStore.getState().meals).toEqual([amok]);
  });

  it("stores only the summary fields of a meal", () => {
    const detail = { ...teriyaki, category: "Chicken", steps: ["Bake."] };
    useFavoritesStore.getState().toggleFavorite(detail);

    expect(useFavoritesStore.getState().meals).toEqual([teriyaki]);
  });

  it("persists favorites to AsyncStorage", async () => {
    useFavoritesStore.getState().toggleFavorite(teriyaki);

    const stored = JSON.parse((await AsyncStorage.getItem("favorites")) ?? "");
    expect(stored.state.meals).toEqual([teriyaki]);
  });
});
