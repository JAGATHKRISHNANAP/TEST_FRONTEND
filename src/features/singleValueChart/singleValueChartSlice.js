import { createSlice } from '@reduxjs/toolkit';

const singleValueChart = createSlice({
  name: 'singleValueChart',
  initialState: {
    result: "", 
    heading: "",
  },
  reducers: {
    setresults: (state, action) => {
      state.result = action.payload;
    }
  }
});

export const { setresults } = singleValueChart.actions;

export default singleValueChart.reducer;