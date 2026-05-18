import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
    addToWishlist(state, action) {
      const exists = state.wishlist.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  setLoading,
  setError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
