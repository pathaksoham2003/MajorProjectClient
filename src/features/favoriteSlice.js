import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  loading: false,
  error: null
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites,action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setFavorites, addFavorite, removeFavorite, setLoading, setError } = favoriteSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;
export const selectFavoriteLoading = (state) => state.favorites.loading;
export const selectFavoriteError = (state) => state.favorites.error;

export default favoriteSlice.reducer;
