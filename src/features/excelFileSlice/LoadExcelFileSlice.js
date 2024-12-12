import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDirectoryStructure = createAsyncThunk(
  'loadExcel/fetchDirectoryStructure',
  async () => {
    const response = await axios.get('http://127.0.0.1:5000/list-excel-files',{
      database_name:"excel_database"
    });

    return response.data;
  }
);

export const loadExcelFileSlice = createSlice({
  name: 'loadExcel',
  initialState: {
    directoryStructure: {},
    expandedDirectories: {},
    checkedItems: {},
    showDashboard: false,
    checkedPaths: [],
    loading: false,
  },
  reducers: {
    toggleExpand: (state, action) => {
      const path = action.payload;
      state.expandedDirectories[path] = !state.expandedDirectories[path];
    },
    handleCheckboxChange: (state, action) => {
      const { path, checked } = action.payload;
      state.checkedItems[path] = checked;
    },
    setShowDashboard: (state, action) => {
      state.showDashboard = action.payload;
    },
    setCheckedPaths: (state, action) => {
      state.checkedPaths = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectoryStructure.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDirectoryStructure.fulfilled, (state, action) => {
        state.loading = false;
        state.directoryStructure = action.payload;
      })
      .addCase(fetchDirectoryStructure.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  toggleExpand,
  handleCheckboxChange,
  setShowDashboard,
  setCheckedPaths,
} = loadExcelFileSlice.actions;

export default loadExcelFileSlice.reducer;