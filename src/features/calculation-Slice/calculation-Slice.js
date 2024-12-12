import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columnNames: [],
    calculations: [],
};

const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        addCalculation: (state, action) => {
            state.calculations.push(action.payload);
        },
        addColumnName: (state, action) => {
            state.columnNames.push(action.payload);
        }
    }
});

export const { addCalculation, addColumnName } = calculationSlice.actions;
export default calculationSlice.reducer;
