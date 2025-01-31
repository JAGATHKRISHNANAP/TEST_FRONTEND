// toolTipSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heading: false,
    categoryName: false,
    value: false,
    customHeading:"",
    xFontSize: 12,        // Default font size for x-axis
    yFontSize: 12,        // Default font size for y-axis
    categoryColor: '#000', // Default color for x-axis labels
    valueColor: '#000',  
    
};

const toolTipSlice = createSlice({
    name: 'toolTip',
    initialState,
    reducers: {
        setToolTipOptions: (state, action) => {
            return { ...state, ...action.payload };
        },
        setXFontSize: (state, action) => {
            state.xFontSize = action.payload;
        },
        setYFontSize: (state, action) => {
            state.yFontSize = action.payload;
        },
        setCategoryColor: (state, action) => {
            state.categoryColor = action.payload;
        },
        setValueColor: (state, action) => {
            state.valueColor = action.payload;
        },
    }
});

export const { setToolTipOptions, setXFontSize, setYFontSize, setCategoryColor, setValueColor } = toolTipSlice.actions;
export default toolTipSlice.reducer;
