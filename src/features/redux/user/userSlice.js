import { createSlice, isAnyOf } from "@reduxjs/toolkit";

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
  // extraReducers: {
  //   [signIn.fulfilled](state, action) {
  //     state.userData = action.payload.user;
  //   },
  //   [signUp.fulfilled](state, action) {
  //     state.userData = action.payload.user;
  //   },
  //   [googleLogin.fulfilled](state, action) {
  //     state.token = action.payload.jwt;
  //     state.userData = action.payload.user;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        signIn.fulfilled,
        signUp.fulfilled,
        googleLogin.fulfilled
      ),
      (state, action) => {
        state.token = action.payload.jwt;
        state.userData = action.payload.user;
      }
    )
  }
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
