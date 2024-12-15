// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// // import * as XLSX from 'xlsx';

// // Async thunk for file upload
// export const uploadFile = createAsyncThunk(
//     'file/uploadFile',
//     async ({ file, primaryKeyColumnName }, { rejectWithValue }) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('primaryKeyColumnName', primaryKeyColumnName);



//         try {
//             const response = await axios.post('http://localhost:5000/uploadexcel', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// const fileSlice = createSlice({
//     name: 'file',
//     initialState: {
//         file: null,
//         fileName: '',
//         columnHeadings: [],
//         primaryKeyColumn: null,
//         uploadSuccess: false,
//         uploadError: null,
//         updateNotNeeded: false,
//         loading: false,
//     },
//     reducers: {
//         setFile: (state, action) => {
//             state.file = action.payload.file;
//             state.fileName = action.payload.fileName;
//             state.columnHeadings = action.payload.columnHeadings;
//         },
//         setPrimaryKeyColumn: (state, action) => {
//             state.primaryKeyColumn = action.payload;
//         },
//         resetState: (state) => {
//             state.file = null;
//             state.fileName = '';
//             state.columnHeadings = [];
//             state.primaryKeyColumn = null;
//             state.uploadSuccess = false;
//             state.uploadError = null;
//             state.updateNotNeeded = false;
//             state.loading = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(uploadFile.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(uploadFile.fulfilled, (state, action) => {
//                 state.loading = false;
//                 if (action.payload === 'File uploaded successfully' || action.payload === 'File uploaded successfully thanks') {
//                     state.uploadSuccess = true;
//                 } else if (action.payload === 'Existing Excel sheet is not updated') {
//                     state.updateNotNeeded = true;
//                 } else {
//                     state.uploadError = action.payload;
//                 }
//             })
//             .addCase(uploadFile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.uploadError = action.payload || 'Error uploading file. Please try again.';
//             });
//     },
// });

// export const { setFile, setPrimaryKeyColumn, resetState } = fileSlice.actions;

// export default fileSlice.reducer;
