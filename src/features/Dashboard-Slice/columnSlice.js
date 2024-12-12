import { createSlice } from '@reduxjs/toolkit';

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    xAxis: [],
    yAxis: '',
    draggedColumn: '',
  },
  reducers: {
    setXAxis(state, action) {
      state.xAxis = action.payload;
    },
    setYAxis(state, action) {
      state.yAxis = action.payload;
    },
    setDraggedColumn(state, action) {
      state.draggedColumn = action.payload;
    },
    removeColumnFromXAxis(state, action) {
      state.xAxis = state.xAxis.filter(column => column !== action.payload);
    },
  },
});

export const { setXAxis, setYAxis, setDraggedColumn, removeColumnFromXAxis } = columnSlice.actions;
export default columnSlice.reducer;
