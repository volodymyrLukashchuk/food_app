import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bazarApi from "../api/bazarApi";

export const getUser = createAsyncThunk("user/getUser", async (item) => {
  const res = await bazarApi.post("auth/local/", item);
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  extraReducers: {
    [getUser.fulfilled](state, action) {
      state.userData = action.payload.user;
    },
  },
});

export default userSlice.reducer;
