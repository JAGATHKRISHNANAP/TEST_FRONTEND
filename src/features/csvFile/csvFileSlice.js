import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { uploadCsvApi } from '../../utils/api';

export const uploadCsv = createAsyncThunk(
  'csvFile/uploadCsv',
  async (file, { rejectWithValue }) => {
    try {
      const response = await uploadCsvApi(file); // Use the API function
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error uploading file. Please try again.');
    }
  }
);

const initialState = {
  file: null,
  uploading: false,
  uploadSuccess: false,
  uploadError: null,
  fileName: '',
};

const csvFileSlice = createSlice({
  name: 'csvFile',
  initialState,
  reducers: {
    setFile(state, action) {
      state.file = action.payload;
      state.fileName = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCsv.pending, (state) => {
        state.uploading = true;
        state.uploadSuccess = false;
        state.uploadError = null;
      })
      .addCase(uploadCsv.fulfilled, (state) => {
        state.uploading = false;
        state.uploadSuccess = true;
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
      });
  },
});

export const { setFile } = csvFileSlice.actions;
export default csvFileSlice.reducer;
