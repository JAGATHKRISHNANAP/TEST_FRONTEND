

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { plot_chart } from '../../utils/api'; // Import the API function



// // Define the initial state separately
// const initialState = {
//   xAxis: [],
//   yAxis: [],
//   plotData: {},
//   aggregate: "sum",
//   chartType: "",
//   draggedColumn: "",
//   isChartGenerationClicked: false,
//   showBarChart: false,
//   isDrillDownEnabled: false,
//   clickedCategory: null,
//   filterOptions: {}, // Store options as { column1: [...options], column2: [...options] }
//   checkedOptions: {},
//   showFilterDropdown: false,
//   selectAllChecked: true,
//   barColor: "#2196f3",
//   dashboardPlotData: {},
//   dashboardBarColor: "#2196f3",
//   status: 'idle',
//   error: null,
// };

// // Async thunk to generate chart
// export const generateChart = createAsyncThunk(
//   'chart/generateChart',
//   async ({ xAxis, yAxis, barColor, aggregate, chartType, checkedOptions, selectedUser }, { getState }) => {
//     const xAxisColumns = xAxis.join(', ');
//     const selectedTable = localStorage.getItem("selectedTable");
//     // Fetch company name and user from localStorage (or redux, depending on where you store it)
//     const databaseName = localStorage.getItem('company_name');
    
//     localStorage.setItem('filterOptions', JSON.stringify(checkedOptions));
    
//     const data = {
//       selectedTable: selectedTable,
//       xAxis: xAxisColumns,
//       yAxis,
//       barColor,
//       aggregate,
//       chartType,
//       filterOptions: checkedOptions.join(', '),
//       databaseName,
//       selectedUser, // Add the selected user here
//     };

//     return await plot_chart(data); // Pass the data including selectedUser to the backend
//   }
// );

// const chartSlice = createSlice({
//   name: 'chart',
//   initialState,
//   reducers: {
//     setSelectedTable: (state, action) => { state.selectedTable = action.payload },
//     setXAxis: (state, action) => { state.xAxis = action.payload },
//     setYAxis: (state, action) => { state.yAxis = Array.isArray(action.payload) ? action.payload : [action.payload]; },
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
//     setIsChartGenerationClicked: (state, action) => { state.isChartGenerationClicked = action.payload },
//     resetState: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generateChart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(generateChart.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.plotData = action.payload;
//       })
//       .addCase(generateChart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const {
//   setSelectedTable, setXAxis, setYAxis, setAggregate, setChartType, setDraggedColumn,
//   setShowBarChart, setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,
//   setBarColor, setDashboardPlotData, setDashboardBarColor, setClickedCategory, setIsChartGenerationClicked, resetState
// } = chartSlice.actions;

// export default chartSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { plot_chart } from '../../utils/api'; // Import the API function

// Define the initial state separately
const initialState = {
  xAxis: [],
  yAxis: [],
  plotData: {},
  aggregate: "sum",
  chartType: "",
  draggedColumn: "",
  isChartGenerationClicked: false,
  showBarChart: false,
  isDrillDownEnabled: false,
  clickedCategory: null,
  filterOptions: {}, // Store options as { column1: [...options], column2: [...options] }
  checkedOptions: {},
  showFilterDropdown: false,
  selectAllChecked: true,
  barColor: "#2196f3",
  dashboardPlotData: {},
  dashboardBarColor: "#2196f3",
  status: 'idle',
  error: null,
  filterDropdowns: {}
};

// Async thunk to generate chart
export const generateChart = createAsyncThunk(
  'chart/generateChart',
  async ({ xAxis, yAxis, barColor, aggregate, chartType, checkedOptions, selectedUser }, { getState }) => {
    const xAxisColumns = xAxis.join(', ');
    const selectedTable = localStorage.getItem("selectedTable");
    const databaseName = localStorage.getItem('company_name');
    
    localStorage.setItem('filterOptions', JSON.stringify(checkedOptions));
    
    const data = {
      selectedTable,
      xAxis: xAxisColumns,
      yAxis,
      barColor,
      aggregate,
      chartType,
      filterOptions: checkedOptions, // Pass structured filter data
      databaseName,
      selectedUser,
    };

    return await plot_chart(data); // Pass the data including structured filter options
  }
);

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    // setFilterOptionsForColumn: (state, action) => {
    //   const { column, options } = action.payload;
    //   state.filterOptions[column] = options;
    //   state.checkedOptions[column] = [...options];
      
    // },
  //   setFilterOptionsForColumn: (state, action) => {
  //     const { column, options } = action.payload;
  
  //     if (!options) { // If options is undefined or empty, remove the column from state
  //         delete state.filterOptions[column];
  //         delete state.checkedOptions[column];
  //     } else {
  //         state.filterOptions[column] = options;
  //         state.checkedOptions[column] = Array.isArray(options) ? [...options] : [];
  //     }
  // },
  setFilterOptionsForColumn: (state, action) => {
    const { column, options } = action.payload;

    if (!options || (Array.isArray(options) && options.length === 0)) { 
        // If options is undefined or an empty array, remove the column from state
        delete state.filterOptions[column];
        delete state.checkedOptions[column];
    } else {
        state.filterOptions[column] = options;
        state.checkedOptions[column] = [...options];
    }
},

  
  
    toggleFilterDropdownForColumn: (state, action) => {
      state.filterDropdowns[action.payload] = !state.filterDropdowns[action.payload];
    },
    setSelectedTable: (state, action) => { state.selectedTable = action.payload },
    setXAxis: (state, action) => { state.xAxis = action.payload },
    setYAxis: (state, action) => { state.yAxis = Array.isArray(action.payload) ? action.payload : [action.payload]; },
    setAggregate: (state, action) => { state.aggregate = action.payload },
    setChartType: (state, action) => { state.chartType = action.payload },
    setDraggedColumn: (state, action) => { state.draggedColumn = action.payload },
    setShowBarChart: (state, action) => { state.showBarChart = action.payload },
    setFilterOptions: (state, action) => { state.filterOptions = action.payload },
    setCheckedOptions: (state, action) => { state.checkedOptions = action.payload },
    setShowFilterDropdown: (state, action) => { state.showFilterDropdown = action.payload },
    setSelectAllChecked: (state, action) => { state.selectAllChecked = action.payload },
    setBarColor: (state, action) => { state.barColor = action.payload },
    setDashboardPlotData: (state, action) => { state.dashboardPlotData = action.payload },
    setDashboardBarColor: (state, action) => { state.dashboardBarColor = action.payload },
    setClickedCategory: (state, action) => { state.clickedCategory = action.payload },
    setIsChartGenerationClicked: (state, action) => { state.isChartGenerationClicked = action.payload },
    setCheckedOptionsForColumn: (state, action) => {
      const { column, options } = action.payload;
      state.checkedOptions[column] = options;
    },
    setSelectAllCheckedForColumn: (state, action) => {
      const { column, isChecked } = action.payload;
      state.selectAllChecked = isChecked;
    },
    
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateChart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plotData = action.payload; // Ensure data is stored separately for each filtered value
      })
      .addCase(generateChart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setFilterOptionsForColumn, toggleFilterDropdownForColumn,setCheckedOptionsForColumn,setSelectAllCheckedForColumn,
  setSelectedTable, setXAxis, setYAxis, setAggregate, setChartType, setDraggedColumn,
  setShowBarChart, setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,
  setBarColor, setDashboardPlotData, setDashboardBarColor, setClickedCategory, setIsChartGenerationClicked, resetState
} = chartSlice.actions;

export default chartSlice.reducer;
