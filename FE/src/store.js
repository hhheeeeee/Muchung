//store.js

import { configureStore } from "@reduxjs/toolkit";

import taskListSlice from "store/taskListSlice";
import tokenSlice from "store/tokenSlice";
import userSlice from "store/userSlice";

// 리듀서 내보내기
const store = configureStore({
  reducer: {
    user: userSlice,

    // taskListSlice 추가
    taskList: taskListSlice,

    // tokenSlice 추가
    token: tokenSlice,
  },
});

export default store;
