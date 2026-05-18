import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  userReview: null,
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    addReview(state, action) {
      state.reviews.push(action.payload);
      state.userReview = action.payload;
    },
    updateReview(state, action) {
      const index = state.reviews.findIndex(
        (r) => r._id === action.payload._id
      );
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
      state.userReview = action.payload;
    },
    deleteReview(state, action) {
      state.reviews = state.reviews.filter((r) => r._id !== action.payload);
      state.userReview = null;
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
  setReviews,
  addReview,
  updateReview,
  deleteReview,
  setLoading,
  setError,
} = reviewSlice.actions;

export default reviewSlice.reducer;
