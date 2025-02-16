// // // XAxisInput.js
// // import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import ClearIcon from '@mui/icons-material/Clear';
// // import FilterListIcon from '@mui/icons-material/FilterList';
// // import List from '@mui/material/List';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import Checkbox from "@mui/material/Checkbox";
// // import { setXAxis, setYAxis, setShowFilterDropdown, setFilterOptions, setCheckedOptions, setSelectAllChecked } from '../../features/Dashboard-Slice/chartSlice';
// // import { fetchFilterOptionsAPI } from '../../utils/api';

// // function XAxisInput({ xAxis, MAX_COLUMNS, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
// //     const dispatch = useDispatch();
// //     const { yAxis, filterOptions, checkedOptions, showFilterDropdown, selectAllChecked } = useSelector(state => state.chart);
// //     const databaseName = localStorage.getItem('company_name');
// //     const selectedTable = localStorage.getItem('selectedTable');
// //     const selectedUser = localStorage.getItem('selectedUser');


// //     React.useEffect(() => {
// //         if (xAxis.length >= 2 || xAxis.length == 1) {
// //             const lastAddedColumn = xAxis[0];
// //             fetchFilterOptions(lastAddedColumn);
// //         }
// //     }, [xAxis]);

// //     const fetchFilterOptions = async (columnName) => {
// //         try {
// //             const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName, selectedUser);
// //             dispatch(setFilterOptions(options));
// //             dispatch(setCheckedOptions(options));
// //         } catch (error) {
// //             console.error('Failed to fetch filter options:', error);
// //         }
// //     };

// //     const handleSelectAllChange = (event) => {
// //         const isChecked = event.target.checked;
// //         dispatch(setSelectAllChecked(isChecked));
// //         if (isChecked) {
// //             dispatch(setCheckedOptions([...filterOptions]));
// //         } else {
// //             dispatch(setCheckedOptions([]));
// //         }
// //     };

// //     const handleFilterIconClick = async (columnName) => {
// //         if (showFilterDropdown) {
// //             dispatch(setShowFilterDropdown(false));
// //         } else {
// //             await fetchFilterOptions(columnName);
// //             dispatch(setShowFilterDropdown(true));
// //         }
// //     };

// //     const handleCheckboxChange = (option) => {
// //         let updatedOptions;
// //         if (checkedOptions.includes(option)) {
// //             updatedOptions = checkedOptions.filter(item => item !== option);
// //         } else {
// //             updatedOptions = [...checkedOptions, option];
// //         }
// //         dispatch(setCheckedOptions(updatedOptions));
// //         dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
// //     };

// //     const removeColumnFromXAxis = (columnNameToRemove) => {
// //         const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
// //         dispatch(setXAxis(updatedXAxis));
// //         dispatch(setShowFilterDropdown(false));
// //     };

// //     const handleDragOver = (event) => {
// //         event.preventDefault();
// //     };

// //     const handleDragStart = (event, columnName) => {
// //         event.dataTransfer.setData("columnName", columnName);
// //         event.dataTransfer.setData("origin", "x-axis");
// //     };

// //     const handleDrop = (event, target) => {
// //         event.preventDefault();
// //         const columnName = event.dataTransfer.getData("columnName");
// //         const origin = event.dataTransfer.getData("origin");

// //         if (target === "x-axis") {
// //             if (xAxis.length >= MAX_COLUMNS) {
// //                 setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
// //                 setOpenSnackbar(true);
// //                 return;
// //             }
// //             if (origin === "y-axis") {
// //                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
// //                 dispatch(setXAxis([...xAxis, columnName]));
// //             } else if (!xAxis.includes(columnName)) {
// //                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
// //                 dispatch(setXAxis([...xAxis, columnName]));
// //             }
// //         } 
// //     };

// //     return (
// //         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
// //             <label htmlFor="x-axis-input">Columns: </label>
// //             <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
// //                 <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
// //                     {xAxis.map((column, index) => (
// //                         <div key={index} className="x-axis-column" draggable onDragStart={(event) => handleDragStart(event, column)} style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px" }}>
// //                             <span>{column}</span>
// //                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{ cursor: "pointer" }}>
// //                                 <FilterListIcon />
// //                             </span>
// //                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
// //                         </div>
// //                     ))}
// //                 </div>
// //                 {showFilterDropdown && (
// //                     <div className="filter-dropdown">
// //                         <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
// //                             <label>
// //                                 <ListItemButton sx={{ height: "35px" }}>
// //                                     <ListItemIcon>
// //                                         <Checkbox style={{ marginLeft: '10px' }}
// //                                             checked={selectAllChecked}
// //                                             onChange={handleSelectAllChange}
// //                                         />
// //                                     </ListItemIcon>
// //                                     Select All
// //                                 </ListItemButton>
// //                             </label>
// //                         </List>
// //                         {filterOptions.map((option, index) => (
// //                             <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
// //                                 <label>
// //                                     <ListItemButton sx={{ height: "35px" }}>
// //                                         <ListItemIcon>
// //                                             <Checkbox style={{ marginLeft: '10px' }}
// //                                                 type="checkbox"
// //                                                 value={option}
// //                                                 checked={checkedOptions.includes(option)}
// //                                                 onChange={() => handleCheckboxChange(option)}
// //                                             />
// //                                         </ListItemIcon>
// //                                         {option}
// //                                     </ListItemButton>
// //                                 </label>
// //                             </List>
// //                         ))}
// //                     </div>
// //                 )}

// //             </div>

// //         </div>
// //     );
// // }

// // export default XAxisInput;


// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Checkbox from "@mui/material/Checkbox";
// import { setXAxis, setYAxis, setShowFilterDropdown, setFilterOptions, setCheckedOptions, setSelectAllChecked } from '../../features/Dashboard-Slice/chartSlice';
// import { fetchFilterOptionsAPI } from '../../utils/api';

// function XAxisInput({ xAxis, MAX_COLUMNS, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
//     const dispatch = useDispatch();
//     const { yAxis, filterOptions, checkedOptions, showFilterDropdown, selectAllChecked } = useSelector(state => state.chart);
//     const databaseName = localStorage.getItem('company_name');
//     const selectedTable = localStorage.getItem('selectedTable');
//     const selectedUser = localStorage.getItem('selectedUser');

//     React.useEffect(() => {
//         if (xAxis.length >= 2) {
//             // If xAxis has 2 or more columns, fetch filter options for both
//             fetchFilterOptions(xAxis);
//         } else if (xAxis.length === 1) {
//             // If only one column is selected, fetch filter options for that
//             fetchFilterOptions(xAxis[0]);
//         }
//     }, [xAxis]);

//     // const fetchFilterOptions = async (columns) => {
//     //     try {
//     //         // Adjust the API to handle multiple columns if xAxis has 2 or more columns
//     //         const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser);
//     //         dispatch(setFilterOptions(options));
//     //         dispatch(setCheckedOptions(options));
//     //     } catch (error) {
//     //         console.error('Failed to fetch filter options:', error);
//     //     }
//     // };
//     const fetchFilterOptions = async (columns) => {
//       try {
//           const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser);
//           console.log('Filter options:', options);  // Add this to debug
//           if (Array.isArray(options)) {
//               dispatch(setFilterOptions(options));
//               dispatch(setCheckedOptions(options));
//           } else {
//               console.error('Filter options is not an array:', options);
//           }
//       } catch (error) {
//           console.error('Failed to fetch filter options:', error);
//       }
//   };
  

//     const handleSelectAllChange = (event) => {
//         const isChecked = event.target.checked;
//         dispatch(setSelectAllChecked(isChecked));
//         if (isChecked) {
//             dispatch(setCheckedOptions([...filterOptions]));
//         } else {
//             dispatch(setCheckedOptions([]));
//         }
//     };

//     const handleFilterIconClick = async (columnName) => {
//         if (showFilterDropdown) {
//             dispatch(setShowFilterDropdown(false));
//         } else {
//             await fetchFilterOptions(xAxis);  // Pass both columns to fetch filter options
//             dispatch(setShowFilterDropdown(true));
//         }
//     };

//     const handleCheckboxChange = (option) => {
//         let updatedOptions;
//         if (checkedOptions.includes(option)) {
//             updatedOptions = checkedOptions.filter(item => item !== option);
//         } else {
//             updatedOptions = [...checkedOptions, option];
//         }
//         dispatch(setCheckedOptions(updatedOptions));
//         dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
//     };

//     const removeColumnFromXAxis = (columnNameToRemove) => {
//         const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//         dispatch(setXAxis(updatedXAxis));
//         dispatch(setShowFilterDropdown(false));
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDragStart = (event, columnName) => {
//         event.dataTransfer.setData("columnName", columnName);
//         event.dataTransfer.setData("origin", "x-axis");
//     };

//     const handleDrop = (event, target) => {
//         event.preventDefault();
//         const columnName = event.dataTransfer.getData("columnName");
//         const origin = event.dataTransfer.getData("origin");

//         if (target === "x-axis") {
//             if (xAxis.length >= MAX_COLUMNS) {
//                 setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
//                 setOpenSnackbar(true);
//                 return;
//             }
//             if (origin === "y-axis") {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             } else if (!xAxis.includes(columnName)) {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             }
//         }
//     };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//             <label htmlFor="x-axis-input">Columns: </label>
//             <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                 <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                     {xAxis.map((column, index) => (
//                         <div key={index} className="x-axis-column" draggable onDragStart={(event) => handleDragStart(event, column)} style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px" }}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{ cursor: "pointer" }}>
//                                 <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
//                         </div>
//                     ))}
//                 </div>
//                 {showFilterDropdown && (
//                     <div className="filter-dropdown">
//                         <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
//                             <label>
//                                 <ListItemButton sx={{ height: "35px" }}>
//                                     <ListItemIcon>
//                                         <Checkbox style={{ marginLeft: '10px' }}
//                                             checked={selectAllChecked}
//                                             onChange={handleSelectAllChange}
//                                         />
//                                     </ListItemIcon>
//                                     Select All
//                                 </ListItemButton>
//                             </label>
//                         </List>
//                         {filterOptions.map((option, index) => (
//                             <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
//                                 <label>
//                                     <ListItemButton sx={{ height: "35px" }}>
//                                         <ListItemIcon>
//                                             <Checkbox style={{ marginLeft: '10px' }}
//                                                 type="checkbox"
//                                                 value={option}
//                                                 checked={checkedOptions.includes(option)}
//                                                 onChange={() => handleCheckboxChange(option)}
//                                             />
//                                         </ListItemIcon>
//                                         {option}
//                                     </ListItemButton>
//                                 </label>
//                             </List>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default XAxisInput;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Checkbox from "@mui/material/Checkbox";
// import { setXAxis, setYAxis, setShowFilterDropdown, setFilterOptions, setCheckedOptions, setSelectAllChecked } from '../../features/Dashboard-Slice/chartSlice';
// import { fetchFilterOptionsAPI } from '../../utils/api';

// function XAxisInput({ xAxis, MAX_COLUMNS, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
//     const dispatch = useDispatch();
//     const { yAxis, filterOptions, checkedOptions, showFilterDropdown, selectAllChecked } = useSelector(state => state.chart);
//     const databaseName = localStorage.getItem('company_name');
//     const selectedTable = localStorage.getItem('selectedTable');
//     const selectedUser = localStorage.getItem('selectedUser');

//     useEffect(() => {
//         if (xAxis.length >= 2) {
//             // If xAxis has 2 or more columns, fetch filter options for both
//             fetchFilterOptions(xAxis);
//         } else if (xAxis.length === 1) {
//             // If only one column is selected, fetch filter options for that
//             fetchFilterOptions(xAxis[0]);
//         }
//     }, [xAxis]);

//     // const fetchFilterOptions = async (columns) => {
//     //     try {
//     //         // Adjust the API to handle multiple columns if xAxis has 2 or more columns
//     //         const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser);
//     //         console.error('Filter options', options);
//     //         if (Array.isArray(options)) {
//     //             dispatch(setFilterOptions(options));
//     //             dispatch(setCheckedOptions(options));
//     //         } else {
//     //             console.error('Filter options is not an array', options);
//     //         }
//     //     } catch (error) {
//     //         console.error('Failed to fetch filter options:', error);
//     //     }
//     // };

//     const fetchFilterOptions = async (columns) => {
//       try {
//           // Adjust the API to handle multiple columns if xAxis has 2 or more columns
//           const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser);
//           console.error('Filter options', options);
          
//           // Ensure options is an object and extract values (arrays of options)
//           if (options && typeof options === 'object') {
//               // Flatten all the options into a single array if needed
//               const flattenedOptions = Object.values(options).flat();
  
//               // Set the filter options and checked options as an array
//               dispatch(setFilterOptions(flattenedOptions));
//               dispatch(setCheckedOptions(flattenedOptions));
//           } else {
//               console.error('Filter options is not an object as expected', options);
//           }
//       } catch (error) {
//           console.error('Failed to fetch filter options:', error);
//       }
//   };
  
//     const handleSelectAllChange = (event) => {
//         const isChecked = event.target.checked;
//         dispatch(setSelectAllChecked(isChecked));
//         if (isChecked) {
//             dispatch(setCheckedOptions([...filterOptions]));
//         } else {
//             dispatch(setCheckedOptions([]));
//         }
//     };

//     const handleFilterIconClick = async (columnName) => {
//         if (showFilterDropdown) {
//             dispatch(setShowFilterDropdown(false));
//         } else {
//             await fetchFilterOptions(xAxis);  // Pass both columns to fetch filter options
//             dispatch(setShowFilterDropdown(true));
//         }
//     };

//     const handleCheckboxChange = (option) => {
//         let updatedOptions;
//         if (checkedOptions.includes(option)) {
//             updatedOptions = checkedOptions.filter(item => item !== option);
//         } else {
//             updatedOptions = [...checkedOptions, option];
//         }
//         dispatch(setCheckedOptions(updatedOptions));
//         dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
//     };

//     const removeColumnFromXAxis = (columnNameToRemove) => {
//         const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//         dispatch(setXAxis(updatedXAxis));
//         dispatch(setShowFilterDropdown(false));
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDragStart = (event, columnName) => {
//         event.dataTransfer.setData("columnName", columnName);
//         event.dataTransfer.setData("origin", "x-axis");
//     };

//     const handleDrop = (event, target) => {
//         event.preventDefault();
//         const columnName = event.dataTransfer.getData("columnName");
//         const origin = event.dataTransfer.getData("origin");

//         if (target === "x-axis") {
//             if (xAxis.length >= MAX_COLUMNS) {
//                 setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
//                 setOpenSnackbar(true);
//                 return;
//             }
//             if (origin === "y-axis") {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             } else if (!xAxis.includes(columnName)) {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             }
//         }
//     };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//             <label htmlFor="x-axis-input">Columns: </label>
//             <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                 <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                     {xAxis.map((column, index) => (
//                         <div key={index} className="x-axis-column" draggable onDragStart={(event) => handleDragStart(event, column)} style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px" }}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{ cursor: "pointer" }}>
//                                 <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
//                         </div>
//                     ))}
//                 </div>
//                 {showFilterDropdown && (
//                     <div className="filter-dropdown">
//                         <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
//                             <label>
//                                 <ListItemButton sx={{ height: "35px" }}>
//                                     <ListItemIcon>
//                                         <Checkbox style={{ marginLeft: '10px' }}
//                                             checked={selectAllChecked}
//                                             onChange={handleSelectAllChange}
//                                         />
//                                     </ListItemIcon>
//                                     Select All
//                                 </ListItemButton>
//                             </label>
//                         </List>
//                         {Array.isArray(filterOptions) && filterOptions.map((option, index) => (
//                             <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
//                                 <label>
//                                     <ListItemButton sx={{ height: "35px" }}>
//                                         <ListItemIcon>
//                                             <Checkbox style={{ marginLeft: '10px' }}
//                                                 type="checkbox"
//                                                 value={option}
//                                                 checked={checkedOptions.includes(option)}
//                                                 onChange={() => handleCheckboxChange(option)}
//                                             />
//                                         </ListItemIcon>
//                                         {option}
//                                     </ListItemButton>
//                                 </label>
//                             </List>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default XAxisInput;


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { setXAxis, setYAxis, setShowFilterDropdown, setFilterOptions, setCheckedOptions, setSelectAllChecked } from '../../features/Dashboard-Slice/chartSlice';
import { fetchFilterOptionsAPI } from '../../utils/api';
// import FilterOptionsDropdown from './filterDropDown';

// function XAxisInput({ xAxis, MAX_COLUMNS, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
//     const dispatch = useDispatch();
//     const { yAxis, showFilterDropdown } = useSelector(state => state.chart);
//     const databaseName = localStorage.getItem('company_name');
//     const selectedTable = localStorage.getItem('selectedTable');
//     const selectedUser = localStorage.getItem('selectedUser');

//     useEffect(() => {
//         if (xAxis.length >= 1) {
//             fetchFilterOptions(xAxis);
//         }
//     }, [xAxis]);

//     const fetchFilterOptions = async (columns) => {
//         try {
//             const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser);
//             if (options && typeof options === 'object') {
//                 const flattenedOptions = Object.values(options).flat();
//                 dispatch(setFilterOptions(flattenedOptions));
//                 dispatch(setCheckedOptions(flattenedOptions));
//             } else {
//                 console.error('Filter options is not an object as expected', options);
//             }
//         } catch (error) {
//             console.error('Failed to fetch filter options:', error);
//         }
//     };

//     const handleFilterIconClick = () => {
//         dispatch(setShowFilterDropdown(!showFilterDropdown));
//     };

//     const removeColumnFromXAxis = (columnNameToRemove) => {
//         const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//         dispatch(setXAxis(updatedXAxis));
//         dispatch(setShowFilterDropdown(false));
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDragStart = (event, columnName) => {
//         event.dataTransfer.setData("columnName", columnName);
//         event.dataTransfer.setData("origin", "x-axis");
//     };

//     const handleDrop = (event, target) => {
//         event.preventDefault();
//         const columnName = event.dataTransfer.getData("columnName");
//         const origin = event.dataTransfer.getData("origin");

//         if (target === "x-axis") {
//             if (xAxis.length >= MAX_COLUMNS) {
//                 setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
//                 setOpenSnackbar(true);
//                 return;
//             }
//             if (origin === "y-axis") {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             } else if (!xAxis.includes(columnName)) {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             }
//         }
//     };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//             <label htmlFor="x-axis-input">Columns: </label>
//             <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                 <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                     {xAxis.map((column, index) => (
//                         <div key={index} className="x-axis-column" draggable onDragStart={(event) => handleDragStart(event, column)} style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px" }}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={handleFilterIconClick} style={{ cursor: "pointer" }}>
//                                 <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
//                         </div>
//                     ))}
//                 </div>
//                 {showFilterDropdown && <FilterOptionsDropdown />}
//             </div>
//         </div>
//     );
// }

// export default XAxisInput;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
 import { setFilterOptionsForColumn } from '../../features/Dashboard-Slice/chartSlice';
// import{ fetchFilterOptionsAPI } from '../../utils/api';
// import FilterOptionsDropdown from './filterDropDown';

// function XAxisInput({ xAxis, MAX_COLUMNS, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
//     const dispatch = useDispatch();
//     const { yAxis, filterDropdowns } = useSelector(state => state.chart);
//     const databaseName = localStorage.getItem('company_name');
//     const selectedTable = localStorage.getItem('selectedTable');
//     const selectedUser = localStorage.getItem('selectedUser');

//     useEffect(() => {
//         xAxis.forEach(column => {
//             fetchFilterOptions(column);
//         });
//     }, [xAxis]);

//     const fetchFilterOptions = async (column) => {
//         try {
//             const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
//             if (options && typeof options === 'object') {
//                 dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
//             } else {
//                 console.error('Filter options is not an object as expected', options);
//             }
//         } catch (error) {
//             console.error('Failed to fetch filter options:', error);
//         }
//     };

//     const handleFilterIconClick = (column) => {
//         dispatch(toggleFilterDropdownForColumn(column));
//     };

//     const removeColumnFromXAxis = (columnNameToRemove) => {
//         const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//         dispatch(setXAxis(updatedXAxis));
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDragStart = (event, columnName) => {
//         event.dataTransfer.setData("columnName", columnName);
//         event.dataTransfer.setData("origin", "x-axis");
//     };

//     const handleDrop = (event, target) => {
//         event.preventDefault();
//         const columnName = event.dataTransfer.getData("columnName");
//         const origin = event.dataTransfer.getData("origin");

//         if (target === "x-axis") {
//             if (xAxis.length >= MAX_COLUMNS) {
//                 setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
//                 setOpenSnackbar(true);
//                 return;
//             }
//             if (origin === "y-axis") {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             } else if (!xAxis.includes(columnName)) {
//                 dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
//                 dispatch(setXAxis([...xAxis, columnName]));
//             }
//         }
//     };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//             <label htmlFor="x-axis-input">Columns: </label>
//             <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                 <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                     {xAxis.map((column, index) => (
//                         <div key={index} className="x-axis-column" draggable onDragStart={(event) => handleDragStart(event, column)} style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px", position: "relative" }}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{ cursor: "pointer" }}>
//                                 <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
//                             {filterDropdowns[column] && <FilterOptionsDropdown column={column} />}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default XAxisInput;
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import { setXAxis, setYAxis, toggleFilterDropdownForColumn } from '../../features/Dashboard-Slice/chartSlice';
import FilterOptionsModal from './filterDropDown';

function XAxisInput({ xAxis, MAX_COLUMNS, errorMessage, setErrorMessage, openSnackbar, setOpenSnackbar }) {
    const dispatch = useDispatch();
    const { yAxis } = useSelector(state => state.chart);
    
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const databaseName = localStorage.getItem('company_name');
    const selectedTable = localStorage.getItem('selectedTable');
    const selectedUser = localStorage.getItem('selectedUser');
    useEffect(() => {
        if (xAxis.length >= 1) {
            fetchFilterOptions(xAxis);
        }
    }, [xAxis]);
    const fetchFilterOptions = async (column) => {
        try {
            const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
            if (options && typeof options === 'object') {
                dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
            } else {
                console.error('Filter options is not an object as expected', options);
            }
        } catch (error) {
            console.error('Failed to fetch filter options:', error);
        }
    };

    // const openFilterModal = (column) => {
    //     setSelectedColumn(column);
    //     setModalOpen(true);
    // };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragStart = (event, columnName) => {
        event.dataTransfer.setData("columnName", columnName);
        event.dataTransfer.setData("origin", "x-axis");
    };
    const openFilterModal = (column) => {
        fetchFilterOptions(column); // Fetch options before opening modal
        setSelectedColumn(column);
        setModalOpen(true);
    };
    
    const closeFilterModal = () => {
        setModalOpen(false);
    };

    const removeColumnFromXAxis = (columnNameToRemove) => {
        dispatch(setXAxis(xAxis.filter(column => column !== columnNameToRemove)));
    };
    const handleDrop = (event, target) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");
        const origin = event.dataTransfer.getData("origin");

        if (target === "x-axis") {
            if (xAxis.length >= MAX_COLUMNS) {
                setErrorMessage("Error: Cannot drop more than 5 columns on the X-axis.");
                setOpenSnackbar(true);
                return;
            }
            if (origin === "y-axis") {
                dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
                dispatch(setXAxis([...xAxis, columnName]));
            } else if (!xAxis.includes(columnName)) {
                dispatch(setYAxis(yAxis.filter((col) => col !== columnName)));
                dispatch(setXAxis([...xAxis, columnName]));
            }
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
            <label htmlFor="x-axis-input">Columns: </label>
            <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
                <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                    {xAxis.map((column, index) => (
                        <div key={index} className="x-axis-column" draggable onDragStart={(event) => handleDragStart(event, column)} style={{ maxHeight: "30px", cursor: "grab", borderRadius: "1px", position: "relative" }}>
                            <span>{column}</span>
                            <span className="filter-icon" onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }}>
                                <FilterListIcon />
                            </span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
                            {selectedColumn && <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} />}
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default XAxisInput;

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//             <label htmlFor="x-axis-input">Columns: </label>
//             <div className="input-fields" style={{ width: "900px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                 <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                     {xAxis.map((column, index) => (
//                         <div key={index} className="x-axis-column" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "grab", borderRadius: "4px", padding: "5px", border: "1px solid #ccc" }}>
//                             <span>{column}</span>
//                             <FilterListIcon onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }} />
//                             <ClearIcon onClick={() => removeColumnFromXAxis(column)} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {selectedColumn && <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} />}
//         </div>
//     );
// }

// export default XAxisInput;
