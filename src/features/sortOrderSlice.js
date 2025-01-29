// sortOrderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const sortOrderSlice = createSlice({
  name: 'sortOrder',
  initialState: 'none', // Initial sort state (none, ascending, descending)
  reducers: {
    setSortOrder: (state, action) => action.payload,
  },
});

export const { setSortOrder } = sortOrderSlice.actions;
export default sortOrderSlice.reducer;
