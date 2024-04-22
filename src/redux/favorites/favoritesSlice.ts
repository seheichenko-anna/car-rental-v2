import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Car } from '../cars/carsSlice';

interface FavoritesState {
  favorites: Car[];
}

const initialState: FavoritesState = {
  favorites: [],
};
const slice = createSlice({
  name: 'favorites',
  initialState,
  selectors: {
    selectFavorites: state => state.favorites,
  },
  reducers: {
    addToFavorites: (state, action: PayloadAction<{ car: Car }>) => {
      const { car } = action.payload;
      if (!state.favorites.some(favorite => favorite.id === car.id)) {
        state.favorites.push(car);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.favorites = state.favorites.filter(favorite => favorite.id !== id);
    },
  },
});

export const favoritesReducer = slice.reducer;
export const { addToFavorites, removeFromFavorites } = slice.actions;
export const { selectFavorites } = slice.selectors;
