// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// // import {selectCheckedPaths} from '../Dashboard-Slice/dashboardtableSlice';

// // Async thunk to generate chart.
// export const generateDuelAxisChart = createAsyncThunk(
//   'dual_axis_chart/generateDuelAxisChart',
//   async ({selectedTable,xAxis, yAxis, barColor, aggregate, chartType, checkedOptions },{ getState }) => {
//     const xAxisColumns = xAxis.join(', ');
//     const state = getState();
//     // const selectedTables = selectCheckedPaths(state);
//     // const databaseName = state.database.databaseName;
//     const databaseName = localStorage.getItem('company_name');
//     const response = await axios.post('http://localhost:5000/plot_dual_axis_chart', {
//       selectedTable,
//       xAxis: xAxisColumns,
//       yAxis,
//       barColor,
//       aggregate,
//       chartType,
//       filterOptions: checkedOptions.join(', '),
//       databaseName,
//     });
//     return response.data;
//   }
// );

// const chartSlice = createSlice({
//   name: 'dual_axis_chart',
//   initialState: {
//     // selectedTable: "",
//     // columnInfo: { numeric_columns: [], text_columns: [] },
//     xAxis: [],
//     // yAxis: "",
//     yAxis: [],
//     plotData: {},
//     aggregate: "sum",
//     chartType: "",
//     draggedColumn: "",
//     isChartGenerationClicked: false,
//     showBarChart: false,
//     isDrillDownEnabled: false,
//     clickedCategory: null,
//     filterOptions: [],
//     checkedOptions: [],
//     showFilterDropdown: false,
//     selectAllChecked: true,
//     barColor: "#2196f3",
//     dashboardPlotData: {},
//     dashboardBarColor: "#2196f3",
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     setSelectedTable: (state, action) => { state.selectedTable = action.payload },
//     setXAxis: (state, action) => { state.xAxis = action.payload },
//     setYAxis: (state, action) => {state.yAxis = Array.isArray(action.payload) ? action.payload : [action.payload];},
//     setAggregate: (state, action) => { state.aggregate = action.payload },
//     setChartType: (state, action) => { state.chartType = action.payload },
//     setDraggedColumn: (state, action) => { state.draggedColumn = action.payload },
//     setShowBarChart: (state, action) => { state.showBarChart = action.payload },
//     setFilterOptions: (state, action) => { state.filterOptions = action.payload },
//     setCheckedOptions: (state, action) => { state.checkedOptions = action.payload },
//     setShowFilterDropdown: (state, action) => { state.showFilterDropdown = action.payload },
//     setSelectAllChecked: (state, action) => { state.selectAllChecked = action.payload },
//     setBarColor: (state, action) => { state.barColor = action.payload },
//     setDashboardPlotData: (state, action) => { state.dashboardPlotData = action.payload },
//     setDashboardBarColor: (state, action) => { state.dashboardBarColor = action.payload },
//     setClickedCategory: (state, action) => { state.clickedCategory = action.payload },
//     setIsChartGenerationClicked: (state, action) => { state.isChartGenerationClicked = action.payload }
//   },
//   extraReducers: (builder) => {
//     builder
 
//       .addCase(generateDuelAxisChart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(generateDuelAxisChart.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.plotData = action.payload;
//       })
//       .addCase(generateDuelAxisChart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const {
//    setXAxis, setYAxis, setAggregate, setChartType, setDraggedColumn,
//   setShowBarChart, setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,
//   setBarColor, setDashboardPlotData, setDashboardBarColor, setClickedCategory, setIsChartGenerationClicked
// } = chartSlice.actions;

// export default chartSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateDualAxisChartApi } from '../../utils/api';

export const generateDuelAxisChart = createAsyncThunk(
  'dual_axis_chart/generateDuelAxisChart',
  async ({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }, { rejectWithValue }) => {
    try {
      return await generateDualAxisChartApi({
        selectedTable,
        xAxis,
        yAxis,
        barColor,
        aggregate,
        chartType,
        checkedOptions,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chartSlice = createSlice({
  name: 'dual_axis_chart',
  initialState: {
    xAxis: [],
    yAxis: [],
    plotData: {},
    aggregate: 'sum',
    chartType: '',
    draggedColumn: '',
    isChartGenerationClicked: false,
    showBarChart: false,
    isDrillDownEnabled: false,
    clickedCategory: null,
    filterOptions: [],
    checkedOptions: [],
    showFilterDropdown: false,
    selectAllChecked: true,
    barColor: '#2196f3',
    dashboardPlotData: {},
    dashboardBarColor: '#2196f3',
    status: 'idle',
    error: null,
  },
  reducers: {
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    setAggregate: (state, action) => {
      state.aggregate = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setDraggedColumn: (state, action) => {
      state.draggedColumn = action.payload;
    },
    setShowBarChart: (state, action) => {
      state.showBarChart = action.payload;
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
    setCheckedOptions: (state, action) => {
      state.checkedOptions = action.payload;
    },
    setShowFilterDropdown: (state, action) => {
      state.showFilterDropdown = action.payload;
    },
    setSelectAllChecked: (state, action) => {
      state.selectAllChecked = action.payload;
    },
    setBarColor: (state, action) => {
      state.barColor = action.payload;
    },
    setDashboardPlotData: (state, action) => {
      state.dashboardPlotData = action.payload;
    },
    setDashboardBarColor: (state, action) => {
      state.dashboardBarColor = action.payload;
    },
    setClickedCategory: (state, action) => {
      state.clickedCategory = action.payload;
    },
    setIsChartGenerationClicked: (state, action) => {
      state.isChartGenerationClicked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateDuelAxisChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateDuelAxisChart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plotData = action.payload;
      })
      .addCase(generateDuelAxisChart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setXAxis,
  setYAxis,
  setAggregate,
  setChartType,
  setDraggedColumn,
  setShowBarChart,
  setFilterOptions,
  setCheckedOptions,
  setShowFilterDropdown,
  setSelectAllChecked,
  setBarColor,
  setDashboardPlotData,
  setDashboardBarColor,
  setClickedCategory,
  setIsChartGenerationClicked,
} = chartSlice.actions;

export default chartSlice.reducer;