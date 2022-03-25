import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    address: "",
  },
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
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
