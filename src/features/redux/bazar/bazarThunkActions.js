import { createAsyncThunk } from "@reduxjs/toolkit";
import bazarApi from "../../api/bazarApi";

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
      .join("&")}&_start=0&_limit=10`;

    const res = await bazarApi.get(url);
    return res.data;
  }
);

export const getLastProducts = createAsyncThunk(
  "lastProducts/getLastProducts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const newPage = state.bazar.page + 1;
    const res = await bazarApi.get(
      `products?&_start=${newPage * 10}&_limit=10`
    );
    return { newProducts: res.data, newPage };
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
