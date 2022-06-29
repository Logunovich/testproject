import { configureStore } from "@reduxjs/toolkit";
import products from '../slices/productSlice';
import cart from "../slices/cartSlice";

const store = configureStore({
  reducer: {products, cart},
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;