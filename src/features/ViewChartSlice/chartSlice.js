// redux/chartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // This object will hold chart details keyed by chart name.
  chartDetails: {},
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    saveChartDetail: (state, action) => {
      // action.payload should have the structure: { chartName, domPosition }
      const { chartName, domPosition } = action.payload;
      // Save or update the chart detail for the given chart name.
      state.chartDetails[chartName] = domPosition;
    },
    // You can add more reducers here as needed.
  },
});

export const { saveChartDetail } = chartSlice.actions;

export default chartSlice.reducer;
