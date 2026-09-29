import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoritesType = {
  ids: string[];
};

const initialState: FavoritesType = { ids: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{ id: string }>) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action: PayloadAction<{ id: string }>) => {
      state.ids = state.ids.filter((id) => id !== action.payload.id);
    },
  },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;
