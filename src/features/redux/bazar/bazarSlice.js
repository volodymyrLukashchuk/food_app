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

const initialState = {
  coupons: [],
  categories: [],
  products: [],
  allProducts: [],
  card: [],
  lastProducts: [],
  checkout: [],
  page: 0,
};

const bazarSlice = createSlice({
  name: "bazar",
  initialState,
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
      state.products = state.products.concat(action.payload.newProducts);
      state.page = action.payload.newPage;
    },
    [postCheckout.fulfilled](state, action) {
      state.checkout = action.payload;
    },
  },
});

export const bazarReducer = bazarSlice.reducer;
