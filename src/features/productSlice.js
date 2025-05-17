// redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0
    },
    filters: {
      category: "",
      brand: "",
      gender: "",
      minRating: "",
      maxPrice: "",
      discount: "",
      sortBy: "",
      search: ""
    }
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.products;
      state.pagination = {
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalProducts: action.payload.totalProducts
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page on filter change
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        brand: "",
        gender: "",
        minRating: "",
        maxPrice: "",
        discount: "",
        sortBy: "",
        search: ""
      };
      state.pagination.currentPage = 1;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  }
});

export const { 
  setProducts, 
  setLoading, 
  setError, 
  setFilters, 
  clearFilters, 
  setPage 
} = productSlice.actions;

export default productSlice.reducer;
