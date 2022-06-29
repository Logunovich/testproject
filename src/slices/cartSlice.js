import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  emptyCart: true,
  sum: 0,
  amount: 0,
  productsInCart: {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState, 
  reducers: {
    addProduct: (state, action) => {
      state.emptyCart = false;
      state.amount += 1;
      if (state.productsInCart[action.payload.id]) {
        state.productsInCart[action.payload.id].count += 1;
        state.productsInCart[action.payload.id].price += +action.payload.price;
      } else {
        state.productsInCart[action.payload.id] = {
          count: 1,
          title: action.payload.title,
          price: action.payload.price,
        }
      }
      state.sum += action.payload.price;
    },
    removeProduct: (state, action) => {
      state.amount -= 1;
      state.sum -= action.payload.price;
      state.productsInCart[action.payload.id].count -= 1;
      state.productsInCart[action.payload.id].price -= +action.payload.price;
      if (state.amount === 0) {
        state.emptyCart = true;
        state.isCartOpen = false;
      }
    },
    toggleCart: state => {state.isCartOpen = !state.isCartOpen}
  },
})

export default cartSlice.reducer;
export const { addProduct, removeProduct, toggleCart } = cartSlice.actions;