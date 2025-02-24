// // toolTipSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     heading: false,
//     categoryName: false,
//     value: false,
//     customHeading:"",
//     xFontSize: 12,        // Default font size for x-axis
//     yFontSize: 12,        // Default font size for y-axis
//     categoryColor: '#000', // Default color for x-axis labels
//     valueColor: '#000',  
    
// };

// const toolTipSlice = createSlice({
//     name: 'toolTip',
//     initialState,
//     reducers: {
//         setToolTipOptions: (state, action) => {
//             return { ...state, ...action.payload };
//         },
//         setXFontSize: (state, action) => {
//             state.xFontSize = action.payload;
//         },
//         setYFontSize: (state, action) => {
//             state.yFontSize = action.payload;
//         },
//         setCategoryColor: (state, action) => {
//             state.categoryColor = action.payload;
//         },
//         setValueColor: (state, action) => {
//             state.valueColor = action.payload;
//         },
//     }
// });

// export const { setToolTipOptions, setXFontSize, setYFontSize, setCategoryColor, setValueColor } = toolTipSlice.actions;
// export default toolTipSlice.reducer;

// toolTipSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heading: false,
    categoryName: false,
    value: false,
    customHeading: "",
    headingColor: "#000", // Default heading color
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
        setCustomHeading: (state, action) => {
            state.customHeading = action.payload;
        },
        setHeadingColor: (state, action) => {
            state.headingColor = action.payload;
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
        // Reset custom heading and color (optional, for chart type change)
        resetCustomHeading: (state) => {
            state.customHeading = "";
            state.headingColor = "#000"; // Reset to default color
        },
    }
});

export const { 
    setToolTipOptions, 
    setCustomHeading, 
    setHeadingColor,
    setXFontSize, 
    setYFontSize, 
    setCategoryColor, 
    setValueColor,
    resetCustomHeading, // Export the reset action
} = toolTipSlice.actions;

export default toolTipSlice.reducer;

