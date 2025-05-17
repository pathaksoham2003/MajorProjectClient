// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/#persisting-state-redux-persist

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

import cartReducer from "./features/cartSlice";
import userReducer from "./features/userInfo/userSlice";
import shopReducer from "./features/shopSlice";
import productReducer from "./features/productSlice";
import favoriteSlice from "./features/favoriteSlice";

const rootReducer = combineReducers({
  user: userReducer,
  shop:shopReducer,
  product:productReducer,
  favorites: favoriteSlice,
  cart: cartReducer,
});

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "favorite", "cart", "toogle","shop"],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
