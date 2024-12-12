
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textChart:[],
  dashboard_charts: [],
  selectedCategory: null,
  selectedCategory_xaxis: null,
  chartStatus: false,
};

const viewChartSlice = createSlice({
  name: 'viewdashboard',
  initialState,
  reducers: {
    addTextChart:(state,action)=>{
      state.textChart.push(action.payload);
    },
    addChartData: (state, action) => {
      state.dashboard_charts.push(action.payload);
    },
    updateChartData: (state, action) => {
      const { chart_id, categories, values } = action.payload;

      // Find the chart by chart_id
      const chart = state.charts.find(chart => chart.chart_id === chart_id);
      
      // If chart exists, update its categories and values
      if (chart) {
        chart.categories = categories;
        chart.values = values;
      }
    },
    removeChartData: (state, action) => {
      state.charts = state.charts.filter(chart => chart.chart_id !== action.payload);
    },
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setChartStatus: (state, action) => {
      state.chartStatus = action.payload;
    },
    updateSelectedCategory_xaxis: (state, action) => {
      state.selectedCategory_xaxis = action.payload;
    },
  }
});

export const {
  addTextChart,
  addChartData,
  updateChartData,
  removeChartData,
  updateSelectedCategory,
  setChartStatus,
  updateSelectedCategory_xaxis
} = viewChartSlice.actions;

export default viewChartSlice.reducer;





