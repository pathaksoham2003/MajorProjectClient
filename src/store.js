import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userInfo/userSlice";
import productReducer from "./features/allProducts/allProductsSlice";
const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer
    }
})
export default store;