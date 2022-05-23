import bazarApi from "../../api/bazarApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const googleLogin: any = createAsyncThunk(
  "token/getToken",
  async (accessToken) => {
    const res = await bazarApi.get(
      `auth/google/callback?access_token=${accessToken}`
    );
    return res.data;
  }
);

export const signIn = createAsyncThunk("signin/getSignin", async (item) => {
  const res = await bazarApi.post("auth/local/", item);
  return res.data;
});

export const signUp = createAsyncThunk("signUp/getSignUp", async (item) => {
  const res = await bazarApi.post("auth/local/register", item);
  return res.data;
});
