import bazarApi from "../../api/bazarApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const googleLogin = createAsyncThunk(
  "token/getToken",
  async (accessToken) => {
    const res = await bazarApi.get(
      `auth/google/callback?access_token=${accessToken}`
    );
    localStorage.setItem("jwt", res.data.jwt);
    return res.data;
  }
);

export const signIn = createAsyncThunk("signin/getSignin", async (item) => {
  const res = await bazarApi.post("auth/local/", item);
  return res.data;
});
