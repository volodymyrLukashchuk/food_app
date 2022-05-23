import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export type Item = {
  id: number;
  quantity: number;
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
