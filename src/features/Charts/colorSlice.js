import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chartColor',
  initialState: {
    chartColor: "#2196f3", // change pieColor to chartColor to match the component
    legendColors: {},
  },
  reducers: {
    setChartColor: (state, action) => {
      state.chartColor = action.payload; // change pieColor to chartColor
    },
    setLegendColor: (state, action) => {
      const { category, color } = action.payload;
      state.legendColors[category] = color;
    },
  }
});

export const { setChartColor,setLegendColor } = chartSlice.actions;

export default chartSlice.reducer;
