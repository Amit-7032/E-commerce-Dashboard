import { createSlice } from "@reduxjs/toolkit";

export const ProductListReducer = createSlice({
  name: "productList",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },  
  },
});

export const { setProducts } = ProductListReducer.actions;

export default ProductListReducer.reducer;
