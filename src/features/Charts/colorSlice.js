import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartColor',
  initialState: {
    chartColor: "#2196f3", // change pieColor to chartColor to match the component
  },
  reducers: {
    setChartColor: (state, action) => {
      state.chartColor = action.payload; // change pieColor to chartColor
    }
  }
});

export const { setChartColor } = chartSlice.actions;

export default chartSlice.reducer;
