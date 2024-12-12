// excelFileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadExcelFile } from '../../utils/api'; // Import the function from api.js


export const uploadExcel = createAsyncThunk(
  'excelFile/uploadExcel',
  async ({ user_id, file, primaryKeyColumnName, company_database,selectedSheet }, { rejectWithValue }) => { // Add company_database here
    try {
      const response = await uploadExcelFile(user_id, file, primaryKeyColumnName, company_database,selectedSheet); // Pass it to the upload function
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error uploading file. Please try again.');
    }
  }
);

const excelFileSlice = createSlice({
  name: 'excelFile',
  initialState: {
    file: null,
    uploading: false,
    uploadSuccess: false,
    uploadError: null,
    fileName: '',
    columnHeadings: [],
    primaryKeyColumn: null,
  },
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
      state.uploadSuccess = false;
      state.uploadError = null;
      state.fileName = action.payload ? action.payload.name : '';
    },
    setColumnHeadings(state, action) {
      state.columnHeadings = action.payload;
    },
    setPrimaryKeyColumn(state, action) {
      state.primaryKeyColumn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcel.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadExcel.fulfilled, (state) => {
        state.uploading = false;
        state.uploadSuccess = true;
        state.file = null;
        state.fileName = '';
        state.columnHeadings = [];
        state.primaryKeyColumn = null;
      })
      .addCase(uploadExcel.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
        state.uploadSuccess = false;
      });
  },
});

export const { setFile, setColumnHeadings, setPrimaryKeyColumn } = excelFileSlice.actions;
export default excelFileSlice.reducer;
