import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const uploadCsv = createAsyncThunk(
  'csvFile/uploadCsv',
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);

    // Get company_database from localStorage and append to formData
    const company_database = localStorage.getItem('company_name');
    formData.append('company_database', company_database);

    try {
      const response = await axios.post('http://localhost:5000/uploadcsv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'Error uploading file. Please try again.');
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
