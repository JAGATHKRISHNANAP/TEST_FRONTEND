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
    resetChartType: (state) => {

      state.type = "";
    },
  },
});

export const { setChartType,resetChartType } = chartTypeSlice.actions;

export default chartTypeSlice.reducer;
