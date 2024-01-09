import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {thunk} from "redux-thunk";

import productReducer from "./features/allProducts/allProductsSlice";
import favoriteReducer from "./features/favoriteProducts/favoriteProductsSlice";
import cartReducer from "./features/cartProducts/cartProductsSlice";
import toogleReducer from "./features/allFeatureSlice";
import userReducer from "./features/userInfo/userSlice";

// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/#persisting-state-redux-persist

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    toogle: toogleReducer,
  });
  
const rootPersistConfig = {
  key: "root",
  storage,
  // blacklist : ['unwanted-states']
  whitelist:['user','favorite','cart']
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
});

export default store