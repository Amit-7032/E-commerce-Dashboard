import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productListReducer from "./reducer/productListReducer";

const persistConfig = {
  key: "persist-key",
  storage,
//   blacklist: "productList",
};

const reducer = combineReducers({
  "productList": productListReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const rootReducer = combineReducers({
  local: persistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: false,
//   }),
});

export default store;
