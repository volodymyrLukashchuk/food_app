import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

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

export type Products = {
  category: {
    id: number;
    title: string;
    parentCategory: {
      id: number;
      title: string;
    };
  };
  description: string;
  discount: null | {
    amount: number;
  };
  finalPrice: number;
  id: number;
  name: string;
  photos: any[];
  price: number;
  size: string;
};

type Bazar = {
  coupons: Array<any>;
  categories: Array<any>;
  products: Array<Products>;
  allProducts: Array<Products>;
  card: Array<Products>;
  lastProducts: Array<any>;
  checkout: Array<any>;
  page: number;
};

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

const bazarSlice = createSlice<Bazar, SliceCaseReducers<Bazar>>({
  name: "bazar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.coupons = action.payload;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.allProducts = [...state.allProducts, action.payload];
    });
    builder.addCase(getCard.fulfilled, (state, action) => {
      state.card = action.payload;
    });
    builder.addCase(getLastProducts.fulfilled, (state, action) => {
      state.products = state.products.concat(action.payload.newProducts);
      state.page = action.payload.newPage;
    });
    builder.addCase(postCheckout.fulfilled, (state, action) => {
      state.checkout = action.payload;
    });
  },
});

export const bazarReducer = bazarSlice.reducer;
