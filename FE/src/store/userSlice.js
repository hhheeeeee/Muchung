import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    id: null,
    email: null,
    profileImg: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.profileImg = action.payload.profileImg;
    },
  },
});

export const { setToken, setUserDetails } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectUserDetails = (state) => ({
  id: state.user.id,
  email: state.user.email,
  profileImg: state.user.profileImg,
});

export default userSlice.reducer;
