import { createSlice } from "@reduxjs/toolkit";

import { signIn, googleLogin, signUp } from "./userThunkActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    token: null,
  },
  reducers: {
    logout(state) {
      state.userData = null;
    },
  },
  extraReducers: {
    [signIn.fulfilled](state, action) {
      state.userData = action.payload.user;
    },
    [signUp.fulfilled](state, action) {
      state.userData = action.payload.user;
    },
    [googleLogin.fulfilled](state, action) {
      state.token = action.payload.jwt;
      state.userData = action.payload.user;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
