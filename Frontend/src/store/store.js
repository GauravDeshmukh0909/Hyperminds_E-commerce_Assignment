import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice"  
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
  },
});