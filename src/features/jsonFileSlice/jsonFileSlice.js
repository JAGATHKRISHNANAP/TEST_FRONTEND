
import { createAsyncThunk } from '@reduxjs/toolkit';
import { startUploading, uploadSuccess, uploadFailure } from './LoasJsonFileSlice';
// import axios from 'axios';
import { uploadJsonFile } from '../../utils/api';

// Thunk to upload the JSON file
// export const uploadJson = createAsyncThunk(
//   'jsonFile/uploadJson',
//   async ({ file, primaryKeyColumnName, company_database}, { dispatch }) => {
//     dispatch(startUploading());

//     try {
//       // Prepare form data
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('primaryKeyColumnName', primaryKeyColumnName);
//       formData.append('company_database', company_database);
//       console.log("primaryKeyColumnName",primaryKeyColumnName)
//       // Send data to the backend
//       const response = await axios.post('http://localhost:5000/upload-json', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.status === 200) {
//         dispatch(uploadSuccess());
//       } else {
//         throw new Error(response.data.message || 'Failed to upload JSON file.');
//       }
//     } catch (error) {
//       dispatch(uploadFailure(error.message));
//     }
//   }
// );
// export { setFile, setColumnHeadings, setPrimaryKeyColumn } from './LoasJsonFileSlice'


export const uploadJson = createAsyncThunk(
  'jsonFile/uploadJson',
  async ({ file, primaryKeyColumnName, company_database }, { dispatch }) => {
    dispatch(startUploading());

    try {
      const response = await uploadJsonFile(file, primaryKeyColumnName, company_database);

      if (response.status === 200) {
        dispatch(uploadSuccess());
      } else {
        throw new Error(response.data.message || 'Failed to upload JSON file.');
      }
    } catch (error) {
      dispatch(uploadFailure(error.message));
    }
  }
);

export { setFile, setColumnHeadings, setPrimaryKeyColumn } from './LoasJsonFileSlice';