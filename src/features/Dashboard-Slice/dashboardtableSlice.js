import { createSlice } from '@reduxjs/toolkit';


export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    columnInfo: {
      numeric_columns: [],
      text_columns: [],
    },
    checkedPaths: '', //table_name
    showDashboard: false,
    draggedColumn: '',
  },
  reducers: {
    setColumnInfo: (state, action) => {
      state.columnInfo = action.payload;
    },
    setSelectedTable: (state, action) => {
      state.checkedPaths = action.payload;
    },
    setDraggedColumn: (state, action) => {
      state.draggedColumn = action.payload;
    },
    setShowDashboard: (state, action) => {
      state.showDashboard = action.payload;
    },
  },
});

export const {
  setColumnInfo,
  setSelectedTable,
  setDraggedColumn,
  setShowDashboard,
} = dashboardSlice.actions;

export const selectCheckedPaths = (state) => state.dashboard.checkedPaths;

export default dashboardSlice.reducer;


