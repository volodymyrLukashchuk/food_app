import { RootState } from "../store";

export const cartItemsSelector = (state: RootState) => state.cart.items;
