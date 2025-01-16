import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AiMLchartData } from '../../utils/api'; // Use your API utility

// Async thunk to fetch data
export const fetchChartData = createAsyncThunk(
    'charts/fetchChartData',
    async (_, { rejectWithValue }) => {
        try {
            const data = await AiMLchartData();
            return data['ai_ml_charts_details']; // Adjust based on your API response
        } catch (error) {
            console.error('Error fetching chart data:', error);
            return rejectWithValue(error.message);
        }
    }
);


const chartSlice = createSlice({
    name: 'aicharts',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        update_Ai_Charts_Datas(state, action) {
            state.data = action.payload;
        },
        delete_Ai_Charts_Datas: (state, action) => {
            const idsToDelete = action.payload;
            state.data = state.data.filter((_, index) => !idsToDelete.includes(index));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChartData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChartData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { update_Ai_Charts_Datas ,delete_Ai_Charts_Datas} = chartSlice.actions;
export default chartSlice.reducer;


