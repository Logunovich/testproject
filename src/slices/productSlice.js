import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StoreService from "../services/StoreService";

const initialState = {
  isLogged: false,
  products: [],
  offset: 0,
  loading: true,
  newProductsLogain: false,
  error: false,
  productsEnded: false,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  (offset) => {
    const storeService = new StoreService();
    return storeService.getAllProducts(offset)
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.newProductsLogain = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.newProductsLogain = false;
        state.products = [...state.products, ...action.payload];
        state.offset += 12;
        if (action.payload.length < 12) {
          state.productsEnded = true;
        }
      })
      .addCase(fetchProducts.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addDefaultCase(() => {})
  }
})

export default productSlice.reducer;