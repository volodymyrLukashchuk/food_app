import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bazarApi from "../api/bazarApi";

export const getUser = createAsyncThunk("user/getUser", async (item) => {
  const res = await bazarApi.post("auth/local/", item);
  return res.data;
});

export const getToken = createAsyncThunk(
  "token/getToken",
  async (accessToken) => {
    const res = await bazarApi.get(
      `auth/google/callback?access_token=${accessToken}`
    );
    localStorage.setItem("jwt", res.data.jwt);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    token: "",
  },
  reducers: {
    logout(state) {
      state.userData = null;
    },
  },
  extraReducers: {
    [getUser.fulfilled](state, action) {
      state.userData = action.payload.user;
    },
    [getToken.fulfilled](state, action) {
      state.token = action.payload.jwt;
      state.userData = action.payload.user;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
