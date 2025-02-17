// // // // import React from 'react';

// // // // import DroppedXValues from '../chartCreation/droppedX';
// // // // import { setXAxis, setYAxis, setShowFilterDropdown, setFilterOptions, setCheckedOptions, setSelectAllChecked } from '../../features/Dashboard-Slice/chartSlice';
// // // // import { useSelector, useDispatch } from 'react-redux';
// // // // function DualInputChart() {
    
// // // // const {  filterOptions, checkedOptions,  selectAllCheckedxAxis,xAxis, yAxis, plotData, aggregate,  dashboardPlotData, dashboardBarColor } = useSelector(state => state.chart);
// // // //     const databaseName = localStorage.getItem('company_name');
// // // //     const selectedTable = localStorage.getItem('selectedTable');
// // // //     const selectedUser = localStorage.getItem('selectedUser');
// // // //     const dispatch = useDispatch();
    
// // // //     // React.useEffect(() => {
// // // //     //     if (xAxis && yAxis && aggregate && chartType) {
// // // //     //         dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions, selectedUser }));
// // // //     //     }
// // // //     // }, [SelectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions, selectedUser, dispatch]);
// // // // const handleDragOver = (event) => {
// // // //         event.preventDefault();
// // // //     };

// // // //     const handleDragStart = (event, columnName) => {
// // // //         event.dataTransfer.setData("columnName", columnName);
// // // //         event.dataTransfer.setData("origin", "x-axis");
// // // //     };

// // // //     const removeColumnFromXAxis = (columnNameToRemove) => {
// // // //         const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
// // // //         dispatch(setXAxis(updatedXAxis));
// // // //         dispatch(setShowFilterDropdown(false));
// // // //     };

// // // //     const handleDrop = (event, target) => {
// // // //         event.preventDefault();
// // // //         const columnName = event.dataTransfer.getData("columnName");
// // // //         const origin = event.dataTransfer.getData("origin");
// // // //     };
// // // //     return (
// // // //         <div>
            

            
// // // //             <DroppedXValues xAxis={xAxis} handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleDrop={handleDrop} removeColumnFromXAxis={removeColumnFromXAxis}/>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default DualInputChart;

// // // import React from 'react';
// // // import DroppedXValues from '../chartCreation/droppedX';
// // // import { setXAxis, setShowFilterDropdown } from '../../features/Dashboard-Slice/chartSlice';
// // // import { useSelector, useDispatch } from 'react-redux';

// // // function DualInputChart() {
// // //     const { xAxis } = useSelector(state => state.chart);
// // //     const dispatch = useDispatch();

// // //     const handleDragOver = (event) => {
// // //         event.preventDefault();
// // //     };

// // //     const handleDrop = (event) => {
// // //         event.preventDefault();
// // //         const columnName = event.dataTransfer.getData("columnName");
        
// // //         // Ensure the column is not already in xAxis
// // //         if (columnName && !xAxis.includes(columnName)) {
// // //             dispatch(setXAxis([...xAxis, columnName]));
// // //         }
// // //     };

   
// // //     return (
// // //         <div 
// // //             onDragOver={handleDragOver} 
// // //             onDrop={handleDrop} 
// // //             style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px" }}
// // //         > 
// // //         {xAxis.length === 0 ? (
// // //             <span>Drop Here</span>
// // //         ) : (
// // //             <DroppedXValues 
// // //                 xAxis={xAxis} 
// // //                 handleDragStart={(event, column) => {
// // //                     event.dataTransfer.setData("columnName", column);
// // //                 }} 
               
// // //             />
// // //                 )}
// // //         </div>
// // //     );
// // // }

// // // export default DualInputChart;
// // import React, { useState } from 'react';
// // import DroppedXValues from '../chartCreation/droppedX';
// // import { setXAxis } from '../../features/Dashboard-Slice/chartSlice';
// // import { useSelector, useDispatch } from 'react-redux';

// // function DualInputChart() {
// //     const { xAxis } = useSelector(state => state.chart);
// //     const dispatch = useDispatch();
    
// //     // State to track hidden columns
// //     const [hiddenColumns, setHiddenColumns] = useState([]);

// //     const handleDragOver = (event) => {
// //         event.preventDefault();
// //     };

// //     const handleDrop = (event) => {
// //         event.preventDefault();
// //         const columnName = event.dataTransfer.getData("columnName");
        
// //         // Ensure the column is not already in xAxis
// //         if (columnName && !xAxis.includes(columnName)) {
// //             dispatch(setXAxis([...xAxis, columnName]));
// //         }
// //     };

// //     // Function to hide a column (without updating Redux state)
// //     const handleRemoveColumn = (columnName) => {
// //         setHiddenColumns([...hiddenColumns, columnName]);
// //     };

// //     return (
// //         <div 
// //             onDragOver={handleDragOver} 
// //             onDrop={handleDrop} 
// //             style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px" }}
// //         > 
// //             {xAxis.length === 0 ? (
// //                 <span>Drop Here</span>
// //             ) : (
// //                 <DroppedXValues 
// //                     xAxis={xAxis.filter(col => !hiddenColumns.includes(col))} // Hide removed columns
// //                     handleDragStart={(event, column) => {
// //                         event.dataTransfer.setData("columnName", column);
// //                     }} 
// //                     handleRemoveColumn={handleRemoveColumn} // Pass function to hide columns
// //                 />
// //             )}
// //         </div>
// //     );
// // }

// // export default DualInputChart;

// import React, { useState } from 'react';
// import DroppedXValues from '../chartCreation/droppedX';
// import { setXAxis } from '../../features/Dashboard-Slice/chartSlice';
// import { useSelector, useDispatch } from 'react-redux';

// function DualInputChart() {
//     const { xAxis } = useSelector(state => state.chart);
//     const dispatch = useDispatch();
    
//     // State to track hidden columns (only for UI)
//     const [hiddenColumns, setHiddenColumns] = useState([]);

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const columnName = event.dataTransfer.getData("columnName");

//         if (columnName) {
//             // If column is hidden, remove it from the hidden list
//             setHiddenColumns(hiddenColumns.filter(col => col !== columnName));

//             // Ensure it's added to Redux state only if not already present
//             if (!xAxis.includes(columnName)) {
//                 dispatch(setXAxis([...xAxis, columnName]));
//             }
//         }
//     };

//     // Function to hide a column (removes from UI but not Redux)
//     const handleRemoveColumn = (columnName) => {
//         setHiddenColumns([...hiddenColumns, columnName]);
//     };

//     return (
//         <div 
//             onDragOver={handleDragOver} 
//             onDrop={handleDrop} 
//             style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px" }}
//         > 
//             {xAxis.length === 0 ? (
//                 <span>Drop Here</span>
//             ) : (
//                 <DroppedXValues 
//                     xAxis={xAxis.filter(col => !hiddenColumns.includes(col))} // Hide removed columns
//                     handleDragStart={(event, column) => {
//                         event.dataTransfer.setData("columnName", column);
//                     }} 
//                     handleRemoveColumn={handleRemoveColumn} // Pass function to hide columns
//                 />
//             )}
//         </div>
//     );
// }

// export default DualInputChart;

// import React, { useState } from 'react';
// import DroppedXValues from '../chartCreation/droppedX';
// import { useSelector } from 'react-redux';

// function DualInputChart() {
//     const { xAxis } = useSelector(state => state.chart); // Redux state (unchanged)
//     const [hiddenColumns, setHiddenColumns] = useState([]);
//     // Local state to manage additional dropped columns (not in Redux)
//     const [droppedColumns, setDroppedColumns] = useState([]);

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const columnName = event.dataTransfer.getData("columnName");

//         if (columnName && !droppedColumns.includes(columnName) && !xAxis.includes(columnName)) {
//             setDroppedColumns([...droppedColumns, columnName]); // Add to local state only
//         }
//     };

//     // Function to remove column (only from UI, not Redux)
//     const handleRemoveColumn = (columnName) => {
//         setDroppedColumns(droppedColumns.filter(col => col !== columnName));
        
//     };

//     // Combine Redux xAxis with locally dropped columns
//     const displayedColumns = [...new Set([...xAxis, ...droppedColumns])];

//     return (
//         <div 
//             onDragOver={handleDragOver} 
//             onDrop={handleDrop} 
//             style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px" }}
//         > 
//             {displayedColumns.length === 0 ? (
//                 <span>Drop Here</span>
//             ) : (
//                 <DroppedXValues 
//                     xAxis={displayedColumns}  // Display both Redux xAxis & locally dropped columns
//                     handleRemoveColumn={handleRemoveColumn} 
//                 />
//             )}
//         </div>
//     );
// }

// export default DualInputChart;

import React, { useState } from 'react';
import DroppedXValues from '../chartCreation/droppedX';
import { useSelector } from 'react-redux';

function DualInputChart() {
    const { xAxis } = useSelector(state => state.chart); // Redux state
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [droppedColumns, setDroppedColumns] = useState([]); // Columns added manually
    const [filter, setFilter] = useState(''); // State to filter columns

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const columnName = event.dataTransfer.getData("columnName");

        if (columnName) {
            if (xAxis.includes(columnName)) {
                // If column exists in Redux, hide it instead of adding it again
                setHiddenColumns(hiddenColumns.filter(col => col !== columnName));
                if (!hiddenColumns.includes(columnName)) {
                    setHiddenColumns([...hiddenColumns, columnName]);
                }
            } else if (!droppedColumns.includes(columnName)) {
                // If column is manually added, store it in droppedColumns
                setDroppedColumns([...droppedColumns, columnName]);
            }
        }
    };

    // Function to remove column:
    // - If from Redux, hide it (don't remove)
    // - If manually added, remove it
    const handleRemoveColumn = (columnName) => {
        if (xAxis.includes(columnName)) {
            setHiddenColumns([...hiddenColumns, columnName]); // Hide Redux columns
        } else {
            setDroppedColumns(droppedColumns.filter(col => col !== columnName)); // Remove local columns
        }
    };

    // Displayed columns = Redux `xAxis` (excluding hidden ones) + manually dropped columns
    const displayedColumns = [...new Set([...xAxis, ...droppedColumns])].filter(col => !hiddenColumns.includes(col));

    return (
        <div 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            style={{ border: "2px dashed #ccc", padding: "10px", minHeight: "60px" }}
        > <div>
        <h3>Table Filter</h3>  {/* Heading */}
        
    </div>
            {displayedColumns.length === 0 ? (
                <span>Drop Here</span>
            ) : (
                <DroppedXValues 
                    xAxis={displayedColumns}  // Display only non-hidden columns
                    handleRemoveColumn={handleRemoveColumn} 
                />
            )}
        </div>
    );
}

export default DualInputChart;
