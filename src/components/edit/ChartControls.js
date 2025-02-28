// import React from 'react';
// import { FormControl, InputLabel, NativeSelect, Paper, styled } from "@mui/material";
// import { setAggregate } from "../../features/EditChart/EditChartSlice"; // Import the action


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// const ChartControls = ({ aggregate, dispatch, xAxis, yAxis }) => {  // Added yAxis as a prop
//     return (
//       <Item>
//         <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000, marginTop:"x" }}>
//         <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
//             <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
//             <NativeSelect
//               style={{ marginRight: '10px' }} value={aggregate}
//               onChange={(event) => {
//                 if (xAxis.length === 0 || yAxis.length === 0) { // Check for both xAxis and yAxis
//                   alert("Please select both Columns and Rows before choosing an aggregation.");
//                 } else {
//                   dispatch(setAggregate(event.target.value));
//                 }
//               }}
//               inputProps={{ name: 'age', id: 'uncontrolled-native' }}
//             >
//               <option value=""></option>
//               <option value="sum">Sum</option>
//               <option value="average">Average</option>
//               <option value="count">Count</option>
//               <option value="minimum">Minimum</option>
//               <option value="maximum">Maximum</option>
//               <option value="variance">Variance</option>
//             </NativeSelect>
//           </FormControl>
//         </div>
//       </Item>
//     );
//   };
  
//   export default ChartControls;

// import React from 'react';
import { FormControl, InputLabel, NativeSelect, Paper, styled, List, ListItemButton, ListItemIcon, Checkbox } from "@mui/material";
// import { useDispatch } from "react-redux";
import { setAggregate, setYAxis,setFilterOption,setFilterOptionsForColumn ,setSelectAllCheckedForColumn,setCheckedOptionsForColumn } from "../../features/EditChart/EditChartSlice"; // Import setYAxis
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterOptionsModal from './editChartFilterModal';
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchFilterOptionsAPI,generateChartData,saveChartData} from '../../utils/api';
// import { setXAxis, toggleFilterDropdownForColumn } from '../../features/Dashboard-Slice/chartSlice';
 import { setCheckedOptions} from "../../features/Dashboard-Slice/chartSlice";
// import { fetchFilterOptionsAPI } from "../../utils/api";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ChartControls = ({ aggregate, dispatch,xAxis, yAxis, filterOptions, checkedOptions, handleSelectAllChange, handleCheckboxChange, handleFilterIconClick, showFilterDropdown, removeColumnFromXAxis,selectAllChecked,generateChart }) => {
  // const dispatch = useDispatch();
 const [selectedColumn, setSelectedColumn] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    
    // const databaseName = localStorage.getItem('company_name');
    // const selectedTable = localStorage.getItem('selectedTable');
    const selectedUser = localStorage.getItem('selectedUser');
    const chartData = useSelector((state) => state.chartdata.chartData || []);
      const selectedTable =sessionStorage.getItem('selectedTable');
      // const xAxis = chartData[2] || [];
      // const yAxis = chartData[3] || [];
      // const chartId = chartData[0] || "";
       const databaseName = chartData[10] || "";
       
       useEffect(() => {
        console.log("Props in ChartControls:", { xAxis, yAxis, generateChart });
    }, [xAxis, yAxis, generateChart]);
    
      // const filterOptionss = chartData[9] || "";
      // const selectedUser=chartData[11]||"";
  //     useEffect((column) => {
  //       if (xAxis.length > 0) {
  //         const firstColumn = xAxis;
  //         fetchFilterOptions(firstColumn);
  //         generateChart();
  //       }
  //     }, [xAxis, chartData]);
  // const fetchFilterOptions = async (column) => {
  //         try {
  //           console.log("Selected Table:", selectedTable);
  //             const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
  //             console.log('options', options);
  //             if (options && typeof options === 'object') {
  //                 dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
  //             } else {
  //                 console.error('Filter options is not an object as expected', options);
  //             }
  //         } catch (error) {
  //             console.error('Failed to fetch filter options:', error);
  //         }
  //     };
  
  //   const fetchFilterOptions = async (column) => {
  //     try {
  //         const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
  //         if (options && typeof options === 'object') {
  //           dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
  //             // dispatch(setCheckedOptions({ column, options: options[column] || [] })); // Dispatch for checked options
  //             //  dispatch(setCheckedOptionsForColumn({ column, options: options[column] || [] })); // Initialize checked options
  //                   //  dispatch(setSelectAllCheckedForColumn({ column, isChecked: true })); // Set selectAllChecked to true initially
                  
  //             setFilterOptions(options); // This line is still needed for the initial render of the filter list in the modal
  //           } else {
  //             console.error('Filter options is not an object as expected', options);
  //         }
  //     } catch (error) {
  //         console.error('Failed to fetch filter options:', error);
  //     }
  // };
  
      const openFilterModal = (column) => {
        setSelectedColumn(column);
        console.log("column",column)
        setModalOpen(true);
    };

    const closeFilterModal = (column) => {
        setModalOpen(false);
        generateChart()
    };

  return (
    <Item>
      <div className="dash-right-side-container">
                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                  <label htmlFor="x-axis-input">Columns: </label>
                    <div className="input-fields" style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
                      <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {xAxis.map((column, index) => (
                          <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <span className="filter-icon" onClick={() => openFilterModal(column)} style={{ cursor: "pointer" }}>
                            <FilterListIcon />
                            </span>
                            
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
                            {selectedColumn && <FilterOptionsModal column={selectedColumn} open={modalOpen} onClose={closeFilterModal} generateChart={generateChart}/>}
                            </div>
                             
                        ))}
                      </div>
                      
                    </div> 
                    {/* <div className="input-fields"> */}
                    {/* <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
                                          <InputLabel id="demo-simple-select-label"></InputLabel>
                                          <NativeSelect
                                            style={{ marginRight: '10px' }} value={aggregate} 
                                            // onChange={(event) => dispatch(setAggregate(event.target.value))}
                                            onChange={(event) => {
                                              if (!xAxis.length === 0) {
                                                // Show an alert if no table is selected
                                                alert("Please select a table before choosing an aggregation.");
                                              } else {
                                                // Proceed with updating the aggregation if a table is selected
                                                dispatch(setAggregate(event.target.value));
                                              }}}
                                            inputProps={{
                                              name: 'age',
                                              id: 'uncontrolled-native',
                                            }}
                                          >
                                           <option value=""></option>
                                            <option value="sum">Sum</option>
                                            <option value="average">Average</option>
                                            <option value="count">Count</option>
                                            <option value="minimum">Minimum</option>
                                            <option value="maximum">Maximum</option>
                                            <option value="variance">Variance</option>
                                          </NativeSelect>
                                        </FormControl>
                                         */}
                                         {(xAxis.length > 0) && (
  <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
    <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
    <NativeSelect
      style={{ marginRight: '10px' }} 
      value={aggregate} 
      onChange={(event) => {
        if (xAxis.length === 0) {
          alert("Please select a table before choosing an aggregation.");
        } else {
          dispatch(setAggregate(event.target.value));
        }
      }}
      inputProps={{
        name: 'age',
        id: 'uncontrolled-native',
      }}
    >
      
      <option value="sum">Sum</option>
      <option value="average">Average</option>
      <option value="count">Count</option>
      <option value="minimum">Minimum</option>
      <option value="maximum">Maximum</option>
      <option value="variance">Variance</option>
    </NativeSelect>
  </FormControl>
)}



                  {/* </div> */}
                  </div>

                  {/* <div className="input-fields" style={{ marginTop: '5px', display: 'flex' }}>
                    <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis: </label>

                    <input type="text" className="input_edit" value={yAxis}  onChange={(event) => dispatch(setYAxis(event.target.value))} readOnly style={{ backgroundColor: '#ffffff', border: '1px solid #000' }} />
                  </div> */}
                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                  <label htmlFor="y-axis-input" style={{ margin: '15px 30px 0px 0px' }}>Rows:  </label>
                    <div className="input-fields"  style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' ,marginTop:'5px'}}>
                    {/* <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "1px", marginLeft: "5px",marginRight : "5px" }}> */}
                    <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                       
                        {yAxis.map((columnName) => (
                          <div key={columnName} className="x-axis-column" value={yAxis} onChange={(event) => dispatch(setYAxis(event.target.value))} style={{maxHeight:"30px"}}>
                            <span>{columnName}</span>
                            </div>
                        ))}

                        </div>

                    {/* <input type="text" className="input_edit" value={yAxis} onChange={(event) => dispatch(setYAxis(event.target.value))} readOnly style={{ backgroundColor: '#ffffff', border: '1px solid #000' }} /> */}
                    </div>
                    </div>
                    </div>
    </Item>
  );
};

export default ChartControls;