// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// import { fetchTotalRows,fetchChartData } from '../../utils/api';
// import { createSlice } from '@reduxjs/toolkit';




// const chartSlice = createSlice({
//   name: 'chartdata',
//   initialState: {
//     chartid: null,
//     totalRows: null,
//     databaseName:null,
//     chartData: null, // Assuming you have at least 5 elements
//     tableName:null,
//     xAxis: null,
//     yAxis: [],
//     aggregate: null,
//     chartType: null,
//     filterOptions: null,
//     chartColor: null,
//     error: null,
//   },
//   reducers: {
//     setChartData: (state, action) => {  
//       state.chartData = action.payload;
//     },
//     setXAxis: (state, action) => {
//       state.xAxis = action.payload;
//     },
//     setYAxis: (state, action) => {
//       state.yAxis = action.payload;
//     },
//     setChartType: (state, action) => {
//       state.chartType = action.payload;
//     },
//     setAggregate: (state, action) => {
//       state.aggregate = action.payload;
//     },
//     setFilterOptions: (state, action) => {
//       state.filterOptions = action.payload;
//     },
//     setChartColor: (state, action) => {
//       state.chartColor = action.payload;
//     },  
//     setSelectedTable: (state, action) => {
//       state.tableName = action.payload;
//     },
//     setChartId: (state, action) => {
//       state.chartid = action.payload;
//     },

//     // Add other reducers as needed for other properties
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTotalRows.fulfilled, (state, action) => {
//         state.totalRows = action.payload;
//       })
//       .addCase(fetchChartData.fulfilled, (state, action) => {
//         state.chartData = action.payload;
//         state.chartid = action.payload[0]; // Initialize chartid
//         state.tableName = action.payload[1]; // Initialize tableName
//         state.xAxis = action.payload[2]; // Initialize xAxis
//         state.yAxis = action.payload[3]; // Initialize yAxis
//         // state.yAxis = Array.isArray(action.payload[3]) ? action.payload[3] : [action.payload[3]]; // Ensure yAxis is an array
//         state.aggregate = action.payload[4]; // Initialize aggregate
//         state.aggregate = action.payload[4]; // Initialize aggregate
//         state.chartType = action.payload[5]; // Initialize chartType if needed
//         state.filterOptions = action.payload[10]; // Initialize filterOptions if needed
//         state.chartColor = action.payload[7]; // Initialize chartColor if needed
//         state.databaseName= action.payload[11]; // Initialize databaseName if needed
//         state. xFontSize= action.payload[12];
//         state. yFontSize= action.payload[13];
//         state. categoryColor= action.payload[14];
//         state. valueColor= action.payload[15];
//         state. fontStyle= action.payload[16];
        
//       })
//       .addCase(fetchTotalRows.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(fetchChartData.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setXAxis, setYAxis, setChartType, setAggregate ,setChartColor,setFilterOptions,setChartData,setSelectedTable} = chartSlice.actions;
// export default chartSlice.reducer; 

import { createSlice } from '@reduxjs/toolkit';
import { fetchTotalRows, fetchChartData } from '../../utils/api';

const chartSlice = createSlice({
  name: 'chartdata',
  initialState: {
    chartid: null,
    totalRows: null,
    databaseName: null,
    chartData: null, // Assuming you have at least 5 elements
    tableName: null,
    xAxis: null,
    yAxis: [],
    aggregate: null,
    chartType: null,
    filterOptions: {}, // Store options as { column1: [...options], column2: [...options] }
  checkedOptions: {},
    chartColor: null,
    xFontSize: null,
    yFontSize: null,
    categoryColor: null,
    valueColor: null,
    fontStyle: null,
    error: null,
    filterDropdowns: {},
    selectAllCheckedForColumn: {}
  },
  reducers: {
  //   setFilterOptionsForColumn: (state, action) => {
  //     const { column, options } = action.payload;
  
  //     if (!options || (Array.isArray(options) && options.length === 0)) { 
  //         // If options is undefined or an empty array, remove the column from state
  //         delete state.filterOptions[column];
  //         delete state.checkedOptions[column];
  //     } else {
  //         state.filterOptions[column] = options;
  //         state.checkedOptions[column] = [...options];
  //     }
  // },
  
  // setFilterOptionsForColumn: (state, action) => {
  //   const { column, options } = action.payload;
  //   state.filterOptions[column] = options;
  //   if (!state.checkedOptions[column]) {
  //     state.checkedOptions[column] = [...options]; //Initialize checked options with filterOptions
  //   }
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

  // setFilterOptionsForColumn: (state, action) => {
  //   const { column, options } = action.payload;
  //   state.filterOptions[column] = options;
  // },
      toggleFilterDropdownForColumn: (state, action) => {
        state.filterDropdowns[action.payload] = !state.filterDropdowns[action.payload];
      },
    
  
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setAggregate: (state, action) => {
      state.aggregate = action.payload;
    },
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
    setChartColor: (state, action) => {
      state.chartColor = action.payload;
    },
    setSelectedTable: (state, action) => {
      state.tableName = action.payload;
    },
    setChartId: (state, action) => {
      state.chartid = action.payload;
    },
    setFontStyles: (state, action) => {
      state.xFontSize = action.payload.xFontSize;
      state.yFontSize = action.payload.yFontSize;
      state.fontStyle = action.payload.fontStyle;
    },
    setColorStyles: (state, action) => {
      state.categoryColor = action.payload.categoryColor;
      state.valueColor = action.payload.valueColor;
    },
    // setCheckedOptionsForColumn: (state, action) => {
    //   const { column, options } = action.payload;
    //   state.checkedOptions[column] = options;
    // },
  //   setCheckedOptionsForColumn: (state, action) => {
  //     const { column, options } = action.payload;
  //     state.checkedOptions[column] = options; // Directly assign the options array
  // },
  //   // setSelectAllCheckedForColumn: (state, action) => {
  //   //   const { column, isChecked } = action.payload;
  //   //   state.selectAllChecked = isChecked;
  //   // },
  //   setSelectAllCheckedForColumn: (state, action) => {
  //     const { column, isChecked } = action.payload;
  //     if (isChecked) {
  //       state.checkedOptions[column] = state.filterOptions[column] || []; // Select all available options
  //     } else {
  //       state.checkedOptions[column] = []; // Clear options
  //     }
  //   },
  setCheckedOptionsForColumn: (state, action) => {
    const { column, options } = action.payload;
    state.checkedOptions[column] = options;
  },
  setSelectAllCheckedForColumn: (state, action) => {
    const { column, isChecked } = action.payload;
    state.selectAllCheckedForColumn[column] = isChecked;
    if (isChecked) {
      state.checkedOptions[column] = state.filterOptions[column] || []; // Select all
    } else {
      state.checkedOptions[column] = []; // Deselect all
    }
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalRows.fulfilled, (state, action) => {
        state.totalRows = action.payload;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartData = action.payload;
        state.chartid = action.payload[0]; // Initialize chartid
        state.tableName = action.payload[1]; // Initialize tableName
        state.xAxis = action.payload[2]; // Initialize xAxis
        state.yAxis = action.payload[3]; // Initialize yAxis
        state.aggregate = action.payload[4]; // Initialize aggregate
        state.chartType = action.payload[5]; // Initialize chartType if needed
        state.filterOptions = action.payload[9]; // Initialize filterOptions if needed
        state.chartColor = action.payload[7]; // Initialize chartColor if needed
        state.databaseName = action.payload[11]; // Initialize databaseName if needed
        state.xFontSize = action.payload[12]; // Initialize xFontSize
        state.yFontSize = action.payload[15]; // Initialize yFontSize
        state.categoryColor = action.payload[14]; // Initialize categoryColor
        state.valueColor = action.payload[16]; // Initialize valueColor
        state.fontStyle = action.payload[13]; // Initialize fontStyle
      })
      .addCase(fetchTotalRows.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setXAxis,
  setYAxis,
  setChartType,
  setAggregate,
  setChartColor,
  setFilterOptions,
  setChartData,
  setSelectedTable,
  setFontStyles,
  setColorStyles,setFilterOptionsForColumn, toggleFilterDropdownForColumn,setCheckedOptionsForColumn,setSelectAllCheckedForColumn,
} = chartSlice.actions;

export default chartSlice.reducer;
