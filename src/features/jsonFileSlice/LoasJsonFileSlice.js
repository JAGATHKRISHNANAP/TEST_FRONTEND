import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: null,
  fileName: '',
  columnHeadings: [],
  primaryKeyColumn: null,
  uploading: false,
  uploadSuccess: false,
  uploadError: null,
};

const loadJsonFileSlice = createSlice({
  name: 'jsonFile',
  initialState,
  reducers: {
    setFile(state, action) {
      const file = action.payload;
      state.file = file;
      state.fileName = file ? file.name : '';
    },
    setColumnHeadings(state, action) {
      state.columnHeadings = action.payload;
    },
    setPrimaryKeyColumn(state, action) {
      state.primaryKeyColumn = action.payload;
    },
    startUploading(state) {
      state.uploading = true;
      state.uploadSuccess = false;
      state.uploadError = null;
    },
    uploadSuccess(state) {
      state.uploading = false;
      state.uploadSuccess = true;
      state.uploadError = null;
    },
    uploadFailure(state, action) {
      state.uploading = false;
      state.uploadSuccess = false;
      state.uploadError = action.payload;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const {
  setFile,
  setColumnHeadings,
  setPrimaryKeyColumn,
  startUploading,
  uploadSuccess,
  uploadFailure,
  resetState,
} = loadJsonFileSlice.actions;

export default loadJsonFileSlice.reducer;
