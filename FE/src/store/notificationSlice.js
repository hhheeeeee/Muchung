import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    setNotification: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { addNotification, setNotification } = notificationSlice.actions;
export const notificationState = (state) => state.notification;

export default notificationSlice.reducer;
