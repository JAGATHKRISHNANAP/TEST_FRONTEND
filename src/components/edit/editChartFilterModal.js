
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn } from '../../features/Dashboard-Slice/chartSlice';
// import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';

// function FilterOptionsModal({ column, open, onClose }) {
//     const dispatch = useDispatch();
//     const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
//     const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || [];
//     const selectAllChecked = useSelector(state => state.chart.selectAllChecked[column]) || false;

//     // Local state to track changes
//     const [localCheckedOptions, setLocalCheckedOptions] = useState(checkedOptions);
//     const [localSelectAllChecked, setLocalSelectAllChecked] = useState(selectAllChecked);

//     useEffect(() => {
//         // Reset local state when the modal is opened or when the options change
//         setLocalCheckedOptions(checkedOptions);
//         setLocalSelectAllChecked(selectAllChecked);
//     }, [open, checkedOptions, selectAllChecked]);

//     const handleSelectAllChange = (event) => {
//         const isChecked = event.target.checked;
//         setLocalSelectAllChecked(isChecked);
//         setLocalCheckedOptions(isChecked ? [...filterOptions] : []);
//     };

//     const handleCheckboxChange = (option) => {
//         let updatedOptions = localCheckedOptions.includes(option)
//             ? localCheckedOptions.filter(item => item !== option)
//             : [...localCheckedOptions, option];

//         setLocalCheckedOptions(updatedOptions);
//         setLocalSelectAllChecked(updatedOptions.length === filterOptions.length);
//     };

//     const handleApplyChanges = () => {
//         dispatch(setCheckedOptionsForColumn({ column, options: localCheckedOptions }));
//         dispatch(setSelectAllCheckedForColumn({ column, isChecked: localSelectAllChecked }));
//         onClose();
//     };

//     const handleClose = () => {
//         // Reset to the original state when closing without applying changes
//         setLocalCheckedOptions(checkedOptions);
//         setLocalSelectAllChecked(selectAllChecked);
//         onClose();
//     };

//     return (
//         <Modal open={open} onClose={handleClose} aria-labelledby="filter-modal-title">
//             <Box sx={{
//                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//                 width: 370, bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: 1
//             }}>
//                 <Typography id="filter-modal-title" variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
//                     Filter Options for {column}
//                 </Typography>
//                 <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
//                      <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
                    
//                         <ListItemIcon>
//                             <Checkbox checked={localSelectAllChecked} />
//                         </ListItemIcon>
//                         <Typography variant="body2">Select All</Typography>
//                     </ListItemButton>
//                     {filterOptions.map((option, index) => (
//                         <ListItemButton key={index} onClick={() => handleCheckboxChange(option)} sx={{ py: 0.5, minHeight: 32 }}>
//                             <ListItemIcon>
//                                 <Checkbox checked={localCheckedOptions.includes(option)} />
//                             </ListItemIcon>
//                             <Typography variant="body2">{option}</Typography>
//                         </ListItemButton>
//                     ))}
//                 </List>
//                 <Divider sx={{ my: 1 }} />
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Button variant="contained" onClick={handleApplyChanges} sx={{ mr: 1, flex: 1 }}>Apply</Button>
//                     <Button variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>Close</Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// }

// export default FilterOptionsModal;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn, setFilterOptionsForColumn } from '../../features/EditChart/EditChartSlice';
import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';
import { fetchFilterOptionsAPI,generateChartData } from "../../utils/api";
import { setAggregate, setXAxis, setYAxis, setChartData, setFilterOptions, setSelectedTable, setChartType,
  setFontStyles,
  setColorStyles,setFilterOptionsForColumn ,setSelectAllCheckedForColumn,setCheckedOptionsForColumn } from "../../features/EditChart/EditChartSlice";
function FilterOptionsModal({ column, open, onClose }) {
  const dispatch = useDispatch();
   const chartType = useSelector(state => state.chartdata.chartType);
   const aggregate = useSelector(state => state.chartdata.aggregate) || "";
   const chartData = useSelector((state) => state.chartdata.chartData || []);
      const selectedTable = chartData[1] || "";
  const xAxis = chartData[2] || [];
  const yAxis = chartData[3] || [];
  const chartId = chartData[0] || "";
  const databaseName = chartData[10] || "";
  const filterOptionss = chartData[9] || "";
  const selectedUser=chartData[11]||"";
  const xFontSize= useSelector(state => state.chartdata.xFontSize)|| "";
  const fontStyle=useSelector(state => state.chartdata.fontStyle)|| "";
  const categoryColor=useSelector(state => state.chartdata.categoryColor)|| "";
  const yFontSize=useSelector(state => state.chartdata.yFontSize)|| "";
  const valueColor=useSelector(state => state.chartdata.valueColor)|| "";
//       const selectedUser = localStorage.getItem('selectedUser');
const checkedOptions = useSelector(state => state.chartdata.checkedOptions[column]) || []; // Access directly
    const filterOptions = useSelector(state => state.chartdata.filterOptions[column]) || [];
    const reduxFilterOptions = useSelector(state => state.chartdata.filterOptions[column]||[]);
    const selectAllChecked = checkedOptions.length === filterOptions.length; // Simplified check
const reduxCheckedOptions = useSelector(state => state.chartdata.checkedOptions); // Get from Redux
const [plotData, setPlotData] = useState({});
  const generateChart = async () => {
    
    try {
      const data = {
        selectedTable:selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        filterOptions:reduxCheckedOptions,
        databaseName,
        selectedUser,
        xFontSize,
        yFontSize,
        categoryColor,valueColor,fontStyle,
      };
      
      const chartData = await generateChartData(data);
      setPlotData(chartData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
//   const handleCloseModal = () => {
//     dispatch(setFilterOptions({ ...reduxCheckedOptions })); // Dispatch action to update filterOptions
//     onClose();
//     generateChart();
// };


  // useEffect(() => {
  //       if (open && column) {
  //           fetchFilterOptions(column);
  //       }
  //   }, [open, column]);
  useEffect(() => {
    if (open && column) {
        console.log("Modal Opened for Column:", column);
        fetchFilterOptions(column);
    }
}, [open, column]);

useEffect(() => {
    console.log("Redux Filter Options:", reduxFilterOptions);
}, [reduxFilterOptions]);

useEffect(() => {
  console.log("Checked Options:", reduxCheckedOptions);
  console.log("Filter Options:", reduxFilterOptions);
}, [reduxCheckedOptions, reduxFilterOptions]);

  // const fetchFilterOptions = async (column) => {
  //   const selectedTable = chartData[1] || "";
  //   try {
  //     const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
  //     if (options && typeof options === 'object') {
  //       console.log("Props in ChartControls:", options);
  //       dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
  //       dispatch(setCheckedOptionsForColumn({ column, options: options[column] || [] })); // Initialize checked options
  //       dispatch(setSelectAllCheckedForColumn({ column, isChecked: true })); // Initialize selectAllChecked to true
  //       setFilterOptions(options);
  //     } else {
  //       console.error('Filter options is not an object as expected', options);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch filter options:', error);
  //   }
  // };
//   const fetchFilterOptions = async (column) => {
//     const selectedTable = chartData[1] || "";
//     try {
//         let options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);

//         // Ensure options is always an object
//         if (typeof options === "string") {
//             options = JSON.parse(options);
//         }

//         if (options && typeof options === "object" && options[column]) {
//             console.log("Props in ChartControls:", options);
//            dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));; // Ensure this is an array
//             dispatch(setCheckedOptionsForColumn({ column, options: options[column] })); // Initialize checked options
//             dispatch(setSelectAllCheckedForColumn({ column, isChecked: true })); // Initialize selectAllChecked to true
//         } else {
//             console.error('Filter options is not an object or does not contain the expected column', options);
//         }
//     } catch (error) {
//         console.error('Failed to fetch filter options:', error);
//     }
// };

// const fetchFilterOptions = async (column) => {
//   const selectedTable = chartData[1] || "";
//   try {
//       console.log("Fetching filter options for column:", column);
//       let options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
//       console.log("Raw API Response:", options);

//       // Ensure options is always an object
//       if (typeof options === "string") {
//           options = JSON.parse(options);
//       }

//       console.log("Parsed options:", options);

//       if (options && typeof options === "object" && options[column]) {
//           console.log("Final Filter Options:", options[column]);
//           dispatch(setFilterOptionsForColumn({ column, options: options[column] }));
          
//           dispatch(setCheckedOptionsForColumn({ column, options: options[column] }));
//           dispatch(setSelectAllCheckedForColumn({ column, isChecked: false }));
//       } else {
//           console.error('Filter options is not an object or does not contain the expected column', options);
//       }
//   } catch (error) {
//       console.error('Failed to fetch filter options:', error);
//   }
// };
const fetchFilterOptions = async (column) => {
  const selectedTable = chartData[1] || "";
  try {
      console.log("Fetching filter options for column:", column);
      let options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
      console.log("Raw API Response:", options);

      // Ensure options is always an object
      if (typeof options === "string") {
          options = JSON.parse(options);
      }

      console.log("Parsed options:", options);

      if (options && typeof options === "object" && Array.isArray(options[column])) {
          console.log("Final Filter Options:", options[column]);

          dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
          console.log(`Dispatched setFilterOptionsForColumn for ${column}:`, options[column]);

          dispatch(setCheckedOptionsForColumn({ column, options: options[column] || [] }));
          console.log(`Dispatched setCheckedOptionsForColumn for ${column}:`, options[column]);

          dispatch(setSelectAllCheckedForColumn({ column, isChecked: false }));
          console.log(`Dispatched setSelectAllCheckedForColumn for ${column}: false`);
    
      } else {
          console.error('Filter options is not an object or does not contain an array for the expected column:', options);
      }
  } catch (error) {
      console.error('Failed to fetch filter options:', error);
  }
};



  // const handleSelectAllChange = (event) => {
  //   const isChecked = event.target.checked;
  //   dispatch(setSelectAllCheckedForColumn({ column, isChecked }));
  //   dispatch(setCheckedOptionsForColumn({ column, options: isChecked ? [...filterOptions] : [] }));
  //   generateChart();
  // };

  
  // const handleSelectAllChange = (event) => {
  //   const isChecked = event.target.checked;
  //   setSelectAllCheckedForColumn(isChecked);
  //   if (isChecked) {
  //     setCheckedOptionsForColumn([...filterOptions, ...chartData[9]]);
  //   } else {
  //     setCheckedOptionsForColumn(isChecked ? reduxFilterOptions : []); // Simplified logic
  //   }
    
  //   generateChart(); 
  // };
//   const handleSelectAllChange = (event) => {
//     const isChecked = event.target.checked;
//     dispatch(setSelectAllCheckedForColumn({ column, isChecked }));
//     dispatch(setCheckedOptionsForColumn({ column, options: isChecked ? filterOptions : [] }));
//     generateChart();
// };

const handleSelectAllChange = (event) => {
  const isChecked = event.target.checked;
  dispatch(setSelectAllCheckedForColumn({ column, isChecked }));

  // Ensure chartData[9] exists before appending it
  const updatedOptions = isChecked 
      ? [...filterOptions, ...(chartData[9] || [])] 
      : [];

  dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
  
  
  generateChart();
};

  // const handleCheckboxChange = (option) => {
  //   const updatedOptions = reduxCheckedOptions.includes(option)
  //     ? reduxCheckedOptions.filter(item => item !== option)
  //     : [...reduxCheckedOptions, option];
  //   dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
  //   dispatch(setSelectAllCheckedForColumn({ column, isChecked: updatedOptions.length === filterOptions.length }));
  //   generateChart();
  // };

//   const handleCheckboxChange = (option) => {
//     const updatedOptions = checkedOptions.includes(option)
//         ? checkedOptions.filter(item => item !== option)
//         : [...checkedOptions, option];

//     dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
//     dispatch(setSelectAllCheckedForColumn({ column, isChecked: updatedOptions.length === filterOptions.length }));
//     generateChart();
// };
// const handleCheckboxChange = (option) => {
//   const updatedOptions = checkedOptions.includes(option)
//       ? checkedOptions.filter(item => item !== option)
//       : [...checkedOptions, option];

//   // Ensure chartData[9] is included when checking all options
//   const allOptions = [...filterOptions, ...(chartData[9] || [])];

//   const isSelectAllChecked = updatedOptions.length === allOptions.length;

//   dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
//   dispatch(setSelectAllCheckedForColumn({ column, isChecked: isSelectAllChecked }));
  
//   generateChart();
// };

const handleCheckboxChange = (option) => {
  const currentOptions = Array.isArray(checkedOptions) ? checkedOptions : [];
  const updatedOptions = currentOptions.includes(option)
      ? currentOptions.filter(item => item !== option)
      : [...currentOptions, option];

  // Ensure chartData[9] is included when comparing for "Select All"
  const allOptions = filterOptions

  const isSelectAllChecked = updatedOptions.length === allOptions.length;

  dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
  dispatch(setSelectAllCheckedForColumn(updatedOptions.length === allOptions.length));
 

  generateChart();
};


  return (
    <Modal open={open} onClose={onClose} aria-labelledby="filter-modal-title">
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 370, bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: 1
      }}>
        <Typography id="filter-modal-title" variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
          Filter Options for {column}
        </Typography>
        {/* <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
          <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
            <ListItemIcon>
              <Checkbox checked={selectAllChecked} />
            </ListItemIcon>
            <Typography variant="body2">Select All</Typography>
          </ListItemButton>
          {filterOptions.map((option, index) => (
            <ListItemButton key={index} onClick={() => handleCheckboxChange(option)} sx={{ py: 0.5, minHeight: 32 }}>
              <ListItemIcon>
                <Checkbox checked={checkedOptions.includes(option)} />
              </ListItemIcon>
              <Typography variant="body2">{option}</Typography>
            </ListItemButton>
          ))}
        </List> */}
        <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
        {filterOptions.length === 0 ? (

    <Typography sx={{ textAlign: 'center', p: 2 }}>No options available</Typography>
  ) : (
    <>
      <ListItemButton onClick={handleSelectAllChange} sx={{ py: 0.5, minHeight: 32 }}>
        <ListItemIcon>
          <Checkbox checked={selectAllChecked} />
        </ListItemIcon>
        <Typography variant="body2">Select All</Typography>
      </ListItemButton>
      {filterOptions.map((option, index) => (

        <ListItemButton key={index} onClick={() => handleCheckboxChange(option)} sx={{ py: 0.5, minHeight: 32 }}>
          <ListItemIcon>
            <Checkbox checked={checkedOptions.includes(option)} />
          </ListItemIcon>
          <Typography variant="body2">{option}</Typography>
        </ListItemButton>
      ))}
    </>
  )}
</List>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={onClose} sx={{ mr: 1, flex: 1 }}>Apply</Button>
          <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default FilterOptionsModal;
