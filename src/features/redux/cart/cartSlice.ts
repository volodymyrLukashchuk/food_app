import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IAddress {
  setShowNewAddressForm(showNewAddressForm: boolean): void;
  showNewAddressForm: boolean;
  showOrder: boolean;
  setShowOrder(showOrder: boolean): void;
  allAddresses: Array<Address>;
  setAllAddresses(allAddresses: Array<Address>): void;
}

export interface INum {
  number: string;
  numberTitle: string;
}

export interface INumber {
  setShowNewNumberForm(showNewNumberForm: boolean): void;
  showNewNumberForm: boolean;
  showOrder: boolean;
  setShowOrder(showOrder: boolean): void;
  allNumbers: Array<Number>;
  setAllNumbers(allNumbers: Array<Number>): void;
}

export interface IAdd {
  addressTitle: string;
  addresses: string;
}

export type Item = {
  id: number;
  quantity: number;
};

export type Address = {
  address: string;
  id: string;
  title: string;
};

export type Time = {
  description: string;
  id: number;
  title: string;
};

export type Number = {
  id: string;
  num: string;
  title: string;
};

type Cart = {
  items: Array<Item>;
};

const initialState = {
  items: [],
};

const cartSlice = createSlice<Cart, SliceCaseReducers<Cart>>({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart(state, action) {
      const newItem = action.payload;
      const itemIndex = state.items.findIndex((i) => i.id === newItem);
      const existingItem = itemIndex !== -1;

      if (!existingItem) {
        state.items.push({
          id: newItem,
          quantity: 1,
        });
      } else {
        state.items[itemIndex].quantity = state.items[itemIndex].quantity + 1;
      }
    },
    removeItemsFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    increaseItemQuantity(state, action) {
      const id = action.payload;
      state.items.forEach((item) => {
        if (item.id === id) {
          item.quantity++;
        }
      });
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      state.items.forEach((item) => {
        if (!item.quantity) return;
        if (item.id === id) {
          item.quantity--;
        }
      });
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
