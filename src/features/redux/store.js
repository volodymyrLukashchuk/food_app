import { configureStore } from "@reduxjs/toolkit";
import bazarReducer from "./bazarSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    bazar: bazarReducer,
    cart: cartSlice.reducer,
  },
});

export default store;
