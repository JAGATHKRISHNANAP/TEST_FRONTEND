import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { setXAxis } from '../Dashboard-Slice/chartSlice';
// import { setClickedCategory } from '../Dashboard-Slice/chartSlice';
export const drillDownChart= createAsyncThunk(
    'drillDownChart/drillDownChart',
    async ({ selectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions },{ getState }) => {
        const xAxisColumns = xAxis.join(', ');
        const state = getState();
        const databaseName = state.database.databaseName;
        const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
            selectedTable,
            xAxis: xAxisColumns,
            yAxis,
            aggregate,
            chartType,
            filterOptions: checkedOptions.join(', '),
            databaseName,
        });
        return response.data;
    }
);

// const 

const drillDownChartSlice = createSlice({
  name: 'drillDownChart',
  initialState: {
    drillDownChart: "",
    xAxis: [],
    yAxis: "",
    drilldownPlotedData: {},

  },
  reducers: {
    setClickedCategory: (state, action) => {state.clickedCatagory = action.payload}
  },
  extraReducers: (builder) => {
    builder
      .addCase(drillDownChart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(drillDownChart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drilldownPlotedData = action.payload;
      })
      .addCase(drillDownChart.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {setClickedCategory} = drillDownChartSlice.actions;

export default drillDownChartSlice.reducer;
