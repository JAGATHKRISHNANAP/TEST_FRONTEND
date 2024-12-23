// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// export const uploadCsv = createAsyncThunk(
//   'csvFile/uploadCsv',
//   async (file, { rejectWithValue }) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     // Get company_database from localStorage and append to formData
//     const company_database = localStorage.getItem('company_name');
//     formData.append('company_database', company_database);

//     try {
//       const response = await axios.post('http://localhost:5000/uploadcsv', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data || 'Error uploading file. Please try again.');
//     }
//   }
// );

// const initialState = {
//     file: null,
//     uploading: false,
//     uploadSuccess: false,
//     uploadError: null,
//     fileName: '',
//   };
  
//   const csvFileSlice = createSlice({
//     name: 'csvFile',
//     initialState,
//     reducers: {
//       setFile(state, action) {
//         state.file = action.payload;
//         state.fileName = action.payload.name;
//       },
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(uploadCsv.pending, (state) => {
//           state.uploading = true;
//           state.uploadSuccess = false;
//           state.uploadError = null;
//         })
//         .addCase(uploadCsv.fulfilled, (state) => {
//           state.uploading = false;
//           state.uploadSuccess = true;
//         })
//         .addCase(uploadCsv.rejected, (state, action) => {
//           state.uploading = false;
//           state.uploadError = action.payload;
//         });
//     },
//   });
  

// export const { setFile } = csvFileSlice.actions;
// export default csvFileSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for uploading CSV files
export const uploadCsv = createAsyncThunk(
  'csvFile/uploadCsv',
  async ({ user_id,file, primaryKeyColumnName, updatePermission }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('file', file);
    formData.append('primaryKeyColumnName', primaryKeyColumnName);
    formData.append('updatePermission', updatePermission);
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

// Initial state for the CSV file slice
const initialState = {
  file: null,
  uploading: false,
  uploadSuccess: false,
  uploadError: null,
  fileName: '',
  columnHeadings: [],        // Added for column headings
  primaryKeyColumn: null,     // Added for primary key column
};

// Create the CSV file slice
const csvFileSlice = createSlice({
  name: 'csvFile',
  initialState,
  reducers: {
    // Reducer to set the file state
    setFile(state, action) {
      state.file = action.payload;
      state.fileName = action.payload.name;
    },
    // Reducer to set column headings
    setColumnHeadings(state, action) {
      state.columnHeadings = action.payload;
    },
    // Reducer to set primary key column
    setPrimaryKeyColumn(state, action) {
      state.primaryKeyColumn = action.payload;
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
        state.file = null; 
        state.fileName = ''; 
        state.columnHeadings = []; 
        state.primaryKeyColumn = null;
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
      });
  },
});

// Export actions for setting file, column headings, and primary key column
export const { setFile, setColumnHeadings, setPrimaryKeyColumn } = csvFileSlice.actions;
// Export the reducer for the slice
export default csvFileSlice.reducer;