import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userInfo/userSlice";
import productReducer from "./features/allProducts/allProductsSlice";
import favoriteReducer from "./features/favoriteProducts/favoriteProductsSlice";
import cartReducer from "./features/cartProducts/cartProductsSlice";
const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        favorite:favoriteReducer,
        cart:cartReducer,
    }
})
export default store;