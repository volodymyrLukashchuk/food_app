import { AnyAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { signIn, googleLogin, signUp } from "./userThunkActions";

const initialState = {
  userData: null,
  token: null,
  error: null,
};

export type User = {
  blocked: null;
  confirmed: boolean;
  created_at: string;
  created_by: null;
  email: string;
  id: number;
  provider: string;
  role: {};
  updated_at: string;
  updated_by: null;
  username: string;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userData = initialState.userData;
      state.token = initialState.token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, signUp.fulfilled, googleLogin.fulfilled),
      (state, action) => {
        state.token = action.payload.jwt;
        state.userData = action.payload.user;
      }
    );
    builder.addMatcher<AnyAction>(
      isAnyOf(signIn.rejected, signUp.rejected),
      (state, action) => {
        state.error = action.error.message;
      }
    );
    builder.addMatcher(isAnyOf(signIn.pending, signUp.pending), (state) => {
      state.error = null;
    });
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
