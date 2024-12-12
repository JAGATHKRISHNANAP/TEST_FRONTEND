
import { createSlice } from '@reduxjs/toolkit';

const barColorSlice = createSlice({
  name: 'barColor',
  initialState: {
    barColor: "#2196f3", 
  },
  reducers: {
    setBarColor: (state, action) => {
      state.barColor = action.payload;
    }
  }
});

export const { setBarColor } = barColorSlice.actions;

export default barColorSlice.reducer;
