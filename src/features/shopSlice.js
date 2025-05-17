import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopData: null,
  isRegistered: false,
  shopProducts: [],
  filterOptions: {}, // ✅ Keeps track of applied filters
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShopData: (state, action) => {
      state.shopData = action.payload;
      state.isRegistered = true;
    },
    updateShopData: (state, action) => {
      state.shopData = {
        ...state.shopData,
        ...action.payload,
      };
    },
    resetShopData: (state) => {
      state.shopData = null;
      state.isRegistered = false;
      state.shopProducts = [];
      state.filterOptions = {}; // ✅ Reset filters on logout/reset
    },
    setShopProducts: (state, action) => {
      state.shopProducts = action.payload;
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload; // ✅ Set filters
    },
  },
});

export const {
  setShopData,
  updateShopData,
  resetShopData,
  setShopProducts,
  setFilterOptions, // ✅ Export the new action
} = shopSlice.actions;

export const selectShop = (state) => state.shop;
export const selectShopData = (state) => state.shop.shopData;
export const selectShopProducts = (state) => state.shop.shopProducts;
export const selectFilterOptions = (state) => state.shop.filterOptions; // ✅ Selector for filters

export default shopSlice.reducer;
