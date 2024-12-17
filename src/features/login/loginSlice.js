import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginStatus: false,
  sessionId: null,
  username: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginStatus = true;
      state.sessionId = action.payload.sessionId;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.loginStatus = false;
      state.sessionId = null;
      state.username = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
