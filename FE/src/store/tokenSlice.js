// tokenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: "null", // 토큰을 저장할 초기 상태
  reducers: {
    setToken: (state, action) => {
      return action.payload; // 토큰을 payload로 받아와서 state에 저장
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
