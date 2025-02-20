// import React from "react";
// import ClearIcon from "@mui/icons-material/Clear";
// import FilterListIcon from "@mui/icons-material/FilterList";

// function DroppedXValues({ xAxis, handleDragStart, handleFilterIconClick, removeColumnFromXAxis }) {
//   return (
//     <div className="x-axis-columns" style={{ marginBottom: "3px", marginTop: "4px", marginLeft: "5px" }}>
//       {xAxis.map((column, index) => (
//         <div
//           key={index}
//           className="x-axis-column"
//           draggable
//           onDragStart={(event) => handleDragStart(event, column)}
//           style={{ maxHeight: "30px", borderRadius: "1px" }}
//         >
//           <span>{column}</span>
          
//           <ClearIcon style={{ marginLeft: "10px" }} onClick={() => removeColumnFromXAxis(column)} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DroppedXValues;
// import { fetchFilterOptionsAPI } from '../../utils/api';
// import React, { useState,useEffect } from 'react';
// import ClearIcon from "@mui/icons-material/Clear";
// import FilterOptionsModal from './filterDropDown';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { useSelector, useDispatch } from 'react-redux';
// import { setFilterOptionsForColumn } from '../../features/Dashboard-Slice/chartSlice';
// function DroppedXValues({ xAxis, handleDragStart, handleRemoveColumn }) {
//     const { yAxis } = useSelector(state => state.chart);
//     const dispatch = useDispatch();
//     const [selectedColumn, setSelectedColumn] = useState(null);
//     const databaseName = localStorage.getItem('company_name');
//     const selectedTable = localStorage.getItem('selectedTable');
//     const selectedUser = localStorage.getItem('selectedUser');
//         const [modalOpen, setModalOpen] = useState(false);
//         const openFilterModal = (column) => {
//             fetchFilterOptions(column); // Fetch options before opening modal
//             setSelectedColumn(column);
//             setModalOpen(true);
//         };
        
//         const closeFilterModal = () => {
//             setModalOpen(false);
//         };
// const fetchFilterOptions = async (column) => {
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
//   return (
//     <div className="x-axis-columns" style={{ marginBottom: "3px", marginTop: "4px", marginLeft: "5px" }}>
//       {xAxis.map((column, index) => (
//         <div
//           key={index}
//           className="x-axis-column"
//           draggable
//           onDragStart={(event) => handleDragStart(event, column)}
//           style={{ maxHeight: "30px", borderRadius: "1px", padding: "5px", border: "1px solid #000" }}
//         >
//           <span>{column}</span>
// {/*         
//           <ClearIcon style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => handleRemoveColumn(column)} /> */}
//        <span className="filter-icon" onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }}>
//                                 <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => handleRemoveColumn(column)} />
//                             {selectedColumn && <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} />}
                           
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DroppedXValues;


// import { fetchFilterOptionsAPI } from '../../utils/api';
// import React, { useState, useEffect, useRef } from 'react';
// import ClearIcon from "@mui/icons-material/Clear";
// import FilterOptionsModal from './filterDropDown';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { useSelector, useDispatch } from 'react-redux';
// import { setFilterOptionsForColumn } from '../../features/Dashboard-Slice/chartSlice';

// function DroppedXValues({ xAxis, handleDragStart, handleRemoveColumn }) {
//     const dispatch = useDispatch();
//     const [selectedColumn, setSelectedColumn] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
    
//     const databaseName = localStorage.getItem('company_name');
//     const selectedTable = localStorage.getItem('selectedTable');
//     const selectedUser = localStorage.getItem('selectedUser');

//     // Store the previous xAxis state
//     const prevXAxisRef = useRef([]);

//     // Function to fetch filter options for a column
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

//     // Fetch filter options only for newly added columns
//     useEffect(() => {
//         const prevXAxis = prevXAxisRef.current || [];
    
//         // Find newly added columns
//         const newColumns = xAxis.filter(column => !prevXAxis.includes(column));
    
//         // Fetch options for all columns (previous + new), but execute only for new ones
//         if (newColumns.length > 0) {
//             newColumns.forEach(fetchFilterOptions);
//         }
    
//         // Update previous xAxis reference to include the latest state
//         prevXAxisRef.current = [...xAxis];
//     }, [xAxis]);  // Runs only when xAxis changes
//     const openFilterModal = (column) => {
//         setSelectedColumn(column);
//         setModalOpen(true);
//     };

//     const closeFilterModal = () => {
//         setModalOpen(false);
//     };

//     return (
//         <div className="x-axis-columns" style={{ marginBottom: "3px", marginTop: "4px", marginLeft: "5px" }}>
//             {xAxis.map((column, index) => (
//                 <div
//                     key={index}
//                     className="x-axis-column"
//                     draggable
//                     onDragStart={(event) => handleDragStart(event, column)}
//                     style={{ maxHeight: "30px", borderRadius: "1px", padding: "5px", border: "1px solid #000" }}
//                 >
//                     <span>{column}</span>
//                     <span className="filter-icon" onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }}>
//                         <FilterListIcon />
//                     </span>
//                     <ClearIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleRemoveColumn(column)} />
//                 </div>
//             ))}
//             {selectedColumn && (
//                 <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} />
//             )}
//         </div>
//     );
// }

// export default DroppedXValues;

import { fetchFilterOptionsAPI } from '../../utils/api';
import React, { useState, useEffect, useRef } from 'react';
import ClearIcon from "@mui/icons-material/Clear";
import FilterOptionsModal from './filterDropDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterOptionsForColumn } from '../../features/Dashboard-Slice/chartSlice';

function DroppedXValues({ xAxis, handleDragStart, handleRemoveColumn }) {
    const dispatch = useDispatch();
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const filterOptions = useSelector(state => state.chart.filterOptions);
    console.log("Redux Filter Options:", filterOptions);
    
    const databaseName = localStorage.getItem('company_name');
    const selectedTable = sessionStorage.getItem('selectedTable');
    const selectedUser = localStorage.getItem('selectedUser');

    // Store the previous xAxis state
    const prevXAxisRef = useRef([]);

    // Function to fetch filter options for a column
    const fetchFilterOptions = async (columns) => {
        try {
            console.log("Fetching filter options for:", columns); // Debugging
            const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columns, selectedUser);
            
            if (options && typeof options === 'object') {
                columns.forEach(column => {
                    dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
                });
            } else {
                console.error('Filter options is not an object as expected', options);
            }
        } catch (error) {
            console.error('Failed to fetch filter options:', error);
        }
    };

//     // Fetch filter options when xAxis changes
//     useEffect(() => {
//         const prevXAxis = prevXAxisRef.current || [];

//         // Find newly added columns
//         const newColumns = xAxis.filter(column => !prevXAxis.includes(column));

        

//         // Ensure previous columns persist
//         prevXAxisRef.current = [...new Set([...prevXAxis, ...xAxis])]; 
//         console.log("Updated prevXAxisRef:", prevXAxisRef.current); // Debugging
// // Fetch options only for new columns
// if (newColumns.length > 0) {
//     fetchFilterOptions(prevXAxisRef.current);  
// }
//     }, [xAxis]);  // Runs only when xAxis changes
useEffect(() => {
    const prevXAxis = prevXAxisRef.current || [];

    // Find newly added columns
    const newColumns = xAxis.filter(column => !prevXAxis.includes(column));

    // Find removed/hidden columns
    const removedColumns = prevXAxis.filter(column => !xAxis.includes(column));

    // Fetch options for new columns
    if (newColumns.length > 0) {
        fetchFilterOptions(newColumns);
    }

    // Remove options for removed/hidden columns
    if (removedColumns.length > 0) {
        removedColumns.forEach(column => {
            dispatch(setFilterOptionsForColumn({ column, options: undefined })); // Completely remove from Redux
        });
    }

    // Update previous X-axis reference
    prevXAxisRef.current = [...xAxis];
    console.log("Updated prevXAxisRef:", prevXAxisRef.current); // Debugging
}, [xAxis]);


    const openFilterModal = (column) => {
        setSelectedColumn(column);
        setModalOpen(true);
    };

    const closeFilterModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="x-axis-columns" style={{ marginBottom: "3px", marginTop: "4px", marginLeft: "5px" }}>
            {xAxis.map((column, index) => (
                <div
                    key={index}
                    className="x-axis-column"
                    draggable
                    onDragStart={(event) => handleDragStart(event, column)}
                    style={{ maxHeight: "30px", borderRadius: "1px", padding: "5px", border: "1px solid #000" }}
                >
                    <span>{column}</span>
                    <span className="filter-icon" onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }}>
                        <FilterListIcon />
                    </span>
                    <ClearIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleRemoveColumn(column)} />
                </div>
            ))}
            {selectedColumn && (
                <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} />
            )}
        </div>
    );
}

export default DroppedXValues;
