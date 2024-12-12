// src/redux/slices/databaseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  databaseName: null,
};

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabaseName: (state, action) => {
      state.databaseName = action.payload;
    },
  },
});

export const { setDatabaseName } = databaseSlice.actions;

export default databaseSlice.reducer;
