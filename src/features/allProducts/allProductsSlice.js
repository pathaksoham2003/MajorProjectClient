import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../utils/api";

const getAllProduct = createAsyncThunk("Products/getAll", async () => {
  const response = await fetch(getAllProducts);
  const data = await response.json();
  return data;
});

const allProductsSlice = createSlice({
  name: "Product",
  initialState: {
    error: "",
    loading: false,
    products: [],
    filteredproducts: [],
    uniqueCategories: [],
    uniqueBrands: [],
  },
  reducers: {
    loadData: (state, action) => {
      state.products = action.payload;
      state.filteredproducts = action.payload;
    },

    uniqueCategories: (state, action) => {
      state.uniqueCategories = state.products
        .map((products) => products.category)
        .filter((value, index, array) => array.indexOf(value) === index);
    },
    getCategory: (state, action) => {
      state.filteredproducts = state.products.filter(
        (product) =>
          product.category.toLowerCase() === action.payload.toLowerCase()
      );
    },
    uniqueBrands: (state, action) => {
      state.uniqueBrands = state.products
        .map((products) => products.brand)
        .filter((value, index, array) => array.indexOf(value) === index);
    },
    getBrand: (state, action) => {
      state.filteredproducts = state.products.filter(
        (product) =>
          product.brand.toLowerCase() === action.payload.toLowerCase()
      );
    },
    allProducts: (state, action) => {
      state.filteredproducts = state.products;
    },
    searchProducts: (state, action) => {
      state.filteredproducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    ratedProducts: (state, action) => {
      state.filteredproducts = state.products.filter(
        (product) => product.rating === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredproducts = action.payload;
        state.error = "";
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const loadingSelector = (state) => {
  return state.product.loading;
};
export const allProductsSelector = (state) => {
  return state.product.products;
};
export const filteredProductsSelector = (state) => {
  return state.product.filteredproducts;
};
export const getUniqueCat = (state) => {
  return state.product.uniqueCategories;
};
export const getUniqueBrands = (state) => {
  return state.product.uniqueBrands;
};
export const {
  loadData,
  getCategory,
  allProducts,
  searchProducts,
  uniqueCategories,
  uniqueBrands,
  ratedProducts,
  getBrand
} = allProductsSlice.actions;
export default allProductsSlice.reducer;
