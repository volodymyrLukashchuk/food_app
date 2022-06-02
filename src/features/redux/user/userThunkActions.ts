import bazarApi from "../../api/bazarApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const googleLogin = createAsyncThunk(
  "token/getToken",
  async (accessToken: string | null) => {
    const res = await bazarApi.get(
      `auth/google/callback?access_token=${accessToken}`
    );
    return res.data;
  }
);

interface ItemSignIn {
  identifier: string;
  password: string;
}

interface ItemSignUp {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpModal {
  closeModal(): void;
}

export const signIn = createAsyncThunk(
  "signin/getSignin",
  async (item: ItemSignIn) => {
    const res = await bazarApi.post("auth/local/", item);
    return res.data;
  }
);

export const signUp = createAsyncThunk(
  "signUp/getSignUp",
  async (item: ItemSignUp) => {
    const res = await bazarApi.post("auth/local/register", item);
    return res.data;
  }
);
