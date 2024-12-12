import { createSlice } from '@reduxjs/toolkit';

const chartTypeSlice = createSlice({
  name: 'chartType',
  initialState: {
    type: '',
  },
  reducers: {
    setChartType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setChartType } = chartTypeSlice.actions;

export default chartTypeSlice.reducer;
