import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"Cart",
    initialState:{
        loading:false,
        error:"",
        cartItems:[],
    },
    reducers:{
        addToCart: (state,action) =>{
            state.cartItems = state.cartItems.push(action.payload)
        },
        removeFromCart: (state,action)=>{
            state.cartItems = state.cartItems.filter((product) => product.product_id !== action.payload.product_id) 
        }
    }
})

export const cartSelector = (state) => {
    return state.cart.cartItems;
}

export const {addToCart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;