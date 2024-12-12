// toolTipSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heading: false,
    categoryName: false,
    value: false,
    customHeading:"",
};

const toolTipSlice = createSlice({
    name: 'toolTip',
    initialState,
    reducers: {
        setToolTipOptions: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setToolTipOptions } = toolTipSlice.actions;
export default toolTipSlice.reducer;
