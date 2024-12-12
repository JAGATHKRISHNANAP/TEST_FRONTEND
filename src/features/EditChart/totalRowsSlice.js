import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTotalRows = createAsyncThunk(
  'totalRows/fetchTotalRows',
  async () => {
    const response = await axios.get('http://localhost:5000/total_rows');
    return response.data.total_rows;
  }
);

const totalRowsSlice = createSlice({
  name: 'totalRows',
  initialState: { value: null, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalRows.fulfilled, (state, action) => {
        state.value = action.payload;
        state.error = null;
      })
      .addCase(fetchTotalRows.rejected, (state, action) => {
        state.error = 'Failed to fetch total rows. Please try again later.';
      });
  }
});

export default totalRowsSlice.reducer;












