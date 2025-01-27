// // redux/slices/userSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   profilePic: "/broken-image.jpg", // Default profile picture
//   username: "User",
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setProfilePic: (state, action) => {
//       state.profilePic = action.payload;
//     },
//     setUsername: (state, action) => {
//       state.username = action.payload;
//     },
//   },
// });

// export const { setProfilePic, setUsername } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: localStorage.getItem("profilePic") || "/broken-image.jpg",
  username: "User",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
      localStorage.setItem("profilePic", action.payload); // Save to localStorage
    },
  },
});

export const { setProfilePic } = userSlice.actions;
export default userSlice.reducer;
