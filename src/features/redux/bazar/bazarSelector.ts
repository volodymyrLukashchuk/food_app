import { RootState } from "../store";

export const allProductsSelector = (state: RootState) =>
  state.bazar.allProducts;
export const getProductsSelector = (state: RootState) => state.bazar.products;
export const cardSelector = (state: RootState) => state.bazar.card;
export const getCouponsSelector = (state: RootState) => state.bazar.coupons;
export const getCategoriesSelector = (state: RootState) =>
  state.bazar.categories;
