import { createSelector } from "reselect";
import { RootState } from "./store";

export const cartItemsSelector = (state: RootState) => state.cart.items;
export const allProductsSelector = (state: RootState) =>
  state.bazar.allProducts;

export const cartDataSelector = createSelector(
  cartItemsSelector,
  allProductsSelector,
  (items, products) => {
    return items.map((item) => ({
      itemData: products.find((product) => product.id === item.id)!,
      ...item,
    }));
  }
);

export const totalQuantitySelector = createSelector(
  cartDataSelector,
  (cartData) => {
    return cartData.reduce((total, item) => total + item.quantity, 0);
  }
);

export type ItemData = {
  category: {
    id: number;
    parentCategory: {
      id: number;
      title: string;
    };
  };
  description: string;
  discount: null;
  finalPrice: number;
  id: number;
  name: string;
  photos: Array<{}>;
  price: number;
  size: string;
};

export type CartData = {
  id: number;
  itemData: ItemData;
  quantity: 1;
}[];

export const totalPriceSelector = createSelector(
  cartDataSelector,
  (cartData) => {
    return cartData.reduce(
      (total, item) => total + item.itemData.price * item.quantity,
      0
    );
  }
);

export const discountSelector = createSelector(cartDataSelector, (cartData) => {
  return cartData.reduce(
    (total, item) => item.itemData.finalPrice * item.quantity,
    0
  );
});
