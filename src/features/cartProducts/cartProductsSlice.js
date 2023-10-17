import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    loading: false,
    error: "",
    cartItems: [{ item: {}, quantity: 0 }],
  },
  reducers: {
    addToCart: (state, action) => {
        state.cartItems = state.cartItems.push({item:action.payload ,quantity:1});
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (obj) => obj.item.product_id !== action.payload.product_id
      );
    },
    incrementQuantity: (state, action) => {
        
    },

},
});

export const cartSelector = (state) => {
  return state.cart.cartItems;
};

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
