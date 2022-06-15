import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

import {
  getCoupons,
  getCategories,
  getProducts,
  getAllProducts,
  getCard,
  getLastProducts,
  getSingleProduct,
} from "./bazarThunkActions";
import { ICoupon } from "./bazarTypes";

export interface IProduct {
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
  photos: {
    alternativeText: string;
    caption: string;
    created_at: string;
    created_by: number;
    ext: string;
    formats: {};
    hash: string;
    height: number;
    id: number;
    mime: string;
    name: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    size: number;
    updated_at: string;
    updated_by: number;
    url: string;
    width: number;
  }[];
  price: number;
  size: string;
}

export type Pics = {
  alternativeText: string;
  caption: string;
  created_at: string;
  created_by: number;
  ext: string;
  formats: {};
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updated_at: string;
  updated_by: number;
  url: string;
};

export type Category = {
  id: number;
  title: string;
  childCategories: Array<{
    id: number;
    title: string;
  }>;
};

export type ChildCategory = Omit<Category, "childCategories">;

type Bazar = {
  coupons: Array<ICoupon>;
  categories: Array<Category>;
  products: Array<IProduct>;
  allProducts: Array<IProduct>;
  card: Array<IProduct>;
  lastProducts: Array<IProduct>;
  page: number;
};

const initialState = {
  coupons: [],
  categories: [],
  products: [],
  allProducts: [],
  card: [],
  lastProducts: [],
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
  },
});

export const bazarReducer = bazarSlice.reducer;
