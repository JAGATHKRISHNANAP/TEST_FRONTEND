import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to handle the form submission
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
      
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    success: false,
    error: null,
    organizationName:'',
    email: '',  
    userName: '',
    password: '',
    retypePassword: ''
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRetypePassword: (state, action) => {
      state.retypePassword = action.payload;
    },
    setOrganizationName: (state, action) => {
      state.organizationName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { setUserName, setPassword, setRetypePassword,setEmail,setOrganizationName } = signupSlice.actions;
export default signupSlice.reducer;
