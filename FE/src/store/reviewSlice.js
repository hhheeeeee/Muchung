// reviewSlice.js

import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: null, // 토큰을 저장할 초기 상태
  reducers: {
    setReview: (state, action) => {
      return action.payload; // 토큰을 payload로 받아와서 state에 저장
    },
  },
});

export const { setReview } = reviewSlice.actions;

export default reviewSlice.reducer;
