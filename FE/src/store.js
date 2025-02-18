//store.js

import { configureStore } from "@reduxjs/toolkit";

import taskListSlice from "store/taskListSlice";
import tokenSlice from "store/tokenSlice";
import userSlice from "store/userSlice";
import reviewSlice from "store/reviewSlice";

// 리듀서 내보내기
const store = configureStore({
  reducer: {
    user: userSlice,

    // taskListSlice 추가
    taskList: taskListSlice,

    // tokenSlice 추가
    token: tokenSlice,

    // reviewSlice 추가
    review: reviewSlice,
  },
});

export default store;
