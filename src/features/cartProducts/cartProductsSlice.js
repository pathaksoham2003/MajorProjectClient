import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    message:"",
    loading: false,
    error: "",
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.cartItems.findIndex((data)=>data.item.product_id === action.payload.product_id)
      if(found !== -1){
        return;
      } 
      state.cartItems = [...state.cartItems,{item:action.payload ,quantity:1}]; 
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product)=> product.item.product_id !== action.payload.product_id)
    },
    incrementQuantity: (state, action) => {
        const found = state.cartItems.findIndex((obj)=>obj.item.product_id === action.payload);
        if(state.cartItems[found].quantity === 5){
          return;
        }
        if(found !== -1){
          state.cartItems[found] = { item: state.cartItems[found].item, quantity: state.cartItems[found].quantity + 1 }
        }
    },
    decrementQuantity: (state,action) => {
      const found = state.cartItems.findIndex((data)=>data.item.product_id === action.payload);
      if(state.cartItems[found].quantity === 1) {
        return;
      }
      if(found !== -1){
        state.cartItems[found] = {item:state.cartItems[found].item , quantity:state.cartItems[found].quantity - 1}
      }
    }
},
});

export const cartSelector = (state) => {
  return state.cart.cartItems;
};

export const { addToCart, removeFromCart , incrementQuantity ,decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;
