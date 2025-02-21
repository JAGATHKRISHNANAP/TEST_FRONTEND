// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   chartPositions: [], // Store chart positions in Redux
// };

// const viewchartspostion = createSlice({
//   name: "viewchartspostion",
//   initialState,
//   reducers: {
//     setChartPositions: (state, action) => {
//       state.chartPositions = action.payload;
//     },
//     updateChartPosition: (state, action) => {
//       const { index, x, y, width, height, chartName } = action.payload;
//       if (state.chartPositions[index]) {
//         state.chartPositions[index] = { x, y, width, height, chartName };
//       }
//     },
//     addChartPosition: (state, action) => {
//       state.chartPositions.push(action.payload);
//     },
//     removeChartPosition: (state, action) => {
//       state.chartPositions = state.chartPositions.filter(
//         (chart) => chart.chartName !== action.payload
//       );
//     },
//   },
// });

// export const {
//   setChartPositions,
//   updateChartPosition,
//   addChartPosition,
//   removeChartPosition,
// } = viewchartspostion.actions;

// export default viewchartspostion.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartPositions: [], // Store chart positions in Redux
};

const viewchartspostion = createSlice({
  name: "viewchartspostion",
  initialState,
  reducers: {
    setChartPositions: (state, action) => {
      // Ensure the payload is an array; if not, default to an empty array.
      state.chartPositions = Array.isArray(action.payload) ? action.payload : [];
    },
    updateChartPosition: (state, action) => {
      const { index, x, y, width, height, chartName } = action.payload;
      if (state.chartPositions[index]) {
        state.chartPositions[index] = { x, y, width, height, chartName };
      }
    },
    addChartPosition: (state, action) => {
      // Ensure chartPositions remains an array and add the new position.
      state.chartPositions = [...state.chartPositions, action.payload];
    },
    removeChartPosition: (state, action) => {
      state.chartPositions = state.chartPositions.filter(
        (chart) => chart.chartName !== action.payload
      );
    },
  },
});

export const {
  setChartPositions,
  updateChartPosition,
  addChartPosition,
  removeChartPosition,
} = viewchartspostion.actions;

export default viewchartspostion.reducer;
