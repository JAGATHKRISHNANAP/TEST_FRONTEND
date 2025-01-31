// // // sortOrderSlice.js

// // import { createSlice } from '@reduxjs/toolkit';

// // const sortOrderSlice = createSlice({
// //   name: 'sortOrder',
// //   initialState: 'none', // Initial sort state (none, ascending, descending)
// //   reducers: {
// //     setSortOrder: (state, action) => action.payload,
// //   },
// // });

// // export const { setSortOrder } = sortOrderSlice.actions;
// // export default sortOrderSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     sortedCategories: [],
//     sortedValues: [],
//     isFiltered: false,
// };

// const filterSlice = createSlice({
//     name: 'filter',
//     initialState,
//     reducers: {
//         setTop10(state, action) {
//             state.sortedCategories = action.payload.categories;
//             state.sortedValues = action.payload.values;
//             state.isFiltered = true;
//         },
//         setBottom10(state, action) {
//             state.sortedCategories = action.payload.categories;
//             state.sortedValues = action.payload.values;
//             state.isFiltered = true;
//         },
//         resetFilter(state) {
//             state.sortedCategories = [];
//             state.sortedValues = [];
//             state.isFiltered = false;
//         },
//     },
// });

// export const { setTop10, setBottom10, resetFilter } = filterSlice.actions;
// export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        sortedCategories: [],
        sortedValues: [],
        isFiltered: false,
    },
    reducers: {
        setCategories: (state, action) => {
            state.sortedCategories = action.payload;
        },
        setValues: (state, action) => {
            state.sortedValues = action.payload;
        },
        setTop10: (state, action) => {
            state.sortedCategories = action.payload.categories;
            state.sortedValues = action.payload.values;
            state.isFiltered = true;
        },
        setBottom10: (state, action) => {
            state.sortedCategories = action.payload.categories;
            state.sortedValues = action.payload.values;
            state.isFiltered = true;
        },
        resetFilter: (state) => {
            state.isFiltered = false;
        },
    },
});

export const { setCategories, setValues, setTop10, setBottom10, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
