import { createSlice } from "@reduxjs/toolkit";

import {
  getCoupons,
  getCategories,
  getProducts,
  getAllProducts,
  getCard,
  getLastProducts,
  getSingleProduct,
  postCheckout,
} from "./bazarThunkActions";

const bazarSlice = createSlice({
  name: "bazar",
  initialState: {
    coupons: [],
    categories: [],
    products: [],
    allProducts: [],
    card: [],
    lastProducts: [],
    checkout: [],
  },
  extraReducers: {
    [getCoupons.fulfilled](state, action) {
      state.coupons = action.payload;
    },
    [getCategories.fulfilled](state, action) {
      state.categories = action.payload;
    },
    [getProducts.fulfilled](state, action) {
      state.products = action.payload;
    },
    [getAllProducts.fulfilled](state, action) {
      state.allProducts = action.payload;
    },
    [getSingleProduct.fulfilled](state, action) {
      state.allProducts = [...state.allProducts, action.payload];
    },
    [getCard.fulfilled](state, action) {
      state.card = action.payload;
    },
    [getLastProducts.fulfilled](state, action) {
      state.products = action.payload;
    },
    [postCheckout.fulfilled](state, action) {
      state.checkout = action.payload;
    },
  },
});

export default bazarSlice.reducer;
