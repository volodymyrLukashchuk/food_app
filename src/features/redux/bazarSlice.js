import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bazarApi from "../api/bazarApi";

export const getCoupons = createAsyncThunk("coupons/getCoupons", async () => {
  const res = await bazarApi.get("coupons");
  return res.data;
});

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res = await bazarApi.get("categories");
    return res.data;
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (activeChildCategoriesIds) => {
    const url = `products?${activeChildCategoriesIds
      .map((id, indx) => "_where[_or][" + indx + "][category]=" + id)
      .join("&")}&_start=0&_limit=15`;

    const res = await bazarApi.get(url);
    return res.data;
  }
);

export const getLastProducts = createAsyncThunk(
  "lastProducts/getLastProducts",
  async () => {
    const res = await bazarApi.get(`products`);
    return res.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "allproducts/getAllProducts",
  async () => {
    const res = await bazarApi.get(`products`);
    return res.data;
  }
);

export const getSingleProduct = createAsyncThunk(
  "allproducts/getSingleProduct",
  async (id) => {
    const res = await bazarApi.get(`products/${id}`);
    return res.data;
  }
);

export const getCard = createAsyncThunk("card/getCard", async () => {
  const res = await bazarApi.get(`products`, {
    params: {
      "_where[_or][0][category]": 1,
      "_where[_or][1][category.parentCategory.id]": 7,
      _start: 0,
      _limit: 10,
    },
  });
  return res.data;
});

export const postCheckout = createAsyncThunk(
  "checkout/postCheckout",
  async (data) => {
    const res = await bazarApi.post("orders", data);
    return res.data;
  }
);

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
