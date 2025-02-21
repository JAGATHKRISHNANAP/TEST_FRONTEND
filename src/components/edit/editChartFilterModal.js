
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
import { setCheckedOptionsForColumn, setSelectAllCheckedForColumn, setFilterOptionsForColumn } from '../../features/Dashboard-Slice/chartSlice';
import { Modal, Box, Typography, List, ListItemButton, ListItemIcon, Checkbox, Button, Divider } from '@mui/material';
import { fetchFilterOptionsAPI,generateChartData } from "../../utils/api";

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
const checkedOptions = useSelector(state => state.chart.checkedOptions[column]) || []; // Access directly
    const filterOptions = useSelector(state => state.chart.filterOptions[column]) || [];
    const selectAllChecked = checkedOptions.length === filterOptions.length; // Simplified check

const [plotData, setPlotData] = useState({});
  const generateChart = async () => {
    
    try {
      const data = {
        selectedTable:selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        filterOptions:checkedOptions,
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

  useEffect(() => {
        if (open && column) {
            fetchFilterOptions(column);
        }
    }, [open, column]);

  const fetchFilterOptions = async (column) => {
    const selectedTable = chartData[1] || "";
    try {
      const options = await fetchFilterOptionsAPI(databaseName, selectedTable, [column], selectedUser);
      if (options && typeof options === 'object') {
        dispatch(setFilterOptionsForColumn({ column, options: options[column] || [] }));
        dispatch(setCheckedOptionsForColumn({ column, options: options[column] || [] })); // Initialize checked options
        dispatch(setSelectAllCheckedForColumn({ column, isChecked: true })); // Initialize selectAllChecked to true
      } else {
        console.error('Filter options is not an object as expected', options);
      }
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    dispatch(setSelectAllCheckedForColumn({ column, isChecked }));
    // dispatch(setCheckedOptionsForColumn({ column, options: isChecked ? [...filterOptions] : [] }));
    generateChart();
  };

  const handleCheckboxChange = (option) => {
    const updatedOptions = checkedOptions.includes(option)
      ? checkedOptions.filter(item => item !== option)
      : [...checkedOptions, option];
    dispatch(setCheckedOptionsForColumn({ column, options: updatedOptions }));
    // dispatch(setSelectAllCheckedForColumn({ column, isChecked: updatedOptions.length === filterOptions.length }));
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
        <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
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
