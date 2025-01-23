// import * as React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CssBaseline, Box, FormControl, TextField, Checkbox, InputAdornment, Grid } from '@mui/material';
// import { setColumnInfo, setSelectedTable, setShowDashboard } from '../../features/Dashboard-Slice/dashboardtableSlice';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import Columns from './columns';
// import SplitButton from '../navbartop/dropbutton'; // Ensure you have the correct path

// function DashboardTableDetails({ handleTableChange }) {
//   const [checked, setChecked] = React.useState(false);
//   const dispatch = useDispatch();
//   const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
//   const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
//   const databaseName = localStorage.getItem('company_name');

//   const checkedPathss = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;

//   const fetchColumnInfo = async (checkedPaths) => {
//     try {
//       const connectionType = localStorage.getItem('connectionType'); // Get connection type from localStorage
//       const selectedUser = localStorage.getItem('selectedUser'); 
//       const response = await fetch(`http://localhost:5000/column_names/${checkedPaths}?databaseName=${databaseName}&connectionType=${connectionType}&selectedUser=${selectedUser}`);
//       const data = await response.json();
//       if (data && data.numeric_columns && Array.isArray(data.numeric_columns) &&
//         data.text_columns && Array.isArray(data.text_columns)) {
//         dispatch(setColumnInfo(data));
//       } else {
//         console.error('Invalid data structure:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching column information:', error);
//     }
//   };

//   const handleLocalTableChange = (event) => {
//     const selectedTableName = event.target.value;
//     dispatch(setShowDashboard(true));
//     dispatch(setSelectedTable(selectedTableName));
//     fetchColumnInfo(selectedTableName);
//     setChecked(event.target.checked); // Update checked state
//   };

//   return (
//     <div className="App">
//       <Box sx={{ flexGrow: 1, fontSize: '12px' }}>
//         <Box sx={{ fontSize: '12px', maxHeight: '84vh', display: 'flex', flexDirection: 'column' }}>
//           <React.Fragment>
//             <CssBaseline />
//             <FormControl fullWidth>
//               <Grid container alignItems="center" display={"flex"}>
//                 <Grid container direction="row" alignItems="center" spacing={1}>
//                   <Grid item sx={{ flexGrow: 1, fontSize: '12px' }}>
                    
//                   </Grid>
//                   <Grid item>
//                     <TextField
//                       sx={{ flexGrow: 1, fontSize: '12px' }}
//                       id="input-with-icon-textfield"
//                       InputProps={{
//                         readOnly: true,
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <Checkbox
//                       sx={{ flexGrow: 1, fontSize: '12px' }}
//                       checked={checked}
//                       value={checkedPathss}
//                       onChange={handleLocalTableChange}
//                       inputProps={{ 'aria-label': 'Checkbox' }}
//                     />
//                           </InputAdornment>
//                         ),
//                       }}
//                       value={checkedPathss}
//                       variant="standard"
//                       aria-readonly
//                     />
//                   </Grid>
//                   <Grid item>
//                     <SplitButton handleTableChange={handleLocalTableChange} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </FormControl>

//             {/* Conditionally render the Columns component based on the checkbox */}
//             {checked && <Columns />}
//           </React.Fragment>
//         </Box>
//       </Box>
//     </div>
//   );
// }

// export default DashboardTableDetails;

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Box, FormControl, TextField, Checkbox, InputAdornment, Grid } from '@mui/material';
import { setColumnInfo, setSelectedTable, setShowDashboard } from '../../features/Dashboard-Slice/dashboardtableSlice';
import TableChartIcon from '@mui/icons-material/TableChart';
import Columns from './columns';
import SplitButton from '../navbartop/dropbutton'; // Ensure you have the correct path
import {fetchColumnNames} from '../../utils/api';
function DashboardTableDetails({ handleTableChange }) {
  const [checked, setChecked] = React.useState(false);
  const [selectedTableName, setSelectedTableName] = React.useState('');
  const dispatch = useDispatch();
  const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
  const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
  const databaseName = localStorage.getItem('company_name');

  const selectedTable = localStorage.getItem('selectedTable');

  React.useEffect(() => {
    // Load selected table name from localStorage
    const tableNameFromStorage = localStorage.getItem('selectedTableName');
    if (tableNameFromStorage) {
      setSelectedTableName(tableNameFromStorage);
    }
  }, []);

  // const fetchColumnInfo = async (selectedTable) => {
  //   try {
  //     const connectionType = localStorage.getItem('connectionType'); // Get connection type from localStorage
  //     const selectedUser = localStorage.getItem('selectedUser');
  //     // const response = await fetch(
  //     //   `http://localhost:5000/column_names/${checkedPaths}?databaseName=${databaseName}&connectionType=${connectionType}&selectedUser=${selectedUser}`
  //     // );
  //     const response = await fetch(`http://localhost:5000/column_names/${selectedTable}?databaseName=${databaseName}&connectionType=${connectionType}&selectedUser=${selectedUser}`);   
  //     const data = await response.json();
  //     if (
  //       data &&
  //       data.numeric_columns &&
  //       Array.isArray(data.numeric_columns) &&
  //       data.text_columns &&
  //       Array.isArray(data.text_columns)
  //     ) {
  //       dispatch(setColumnInfo(data));
  //     } else {
  //       console.error('Invalid data structure:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching column information:', error);
  //   }
  // };
  
  const fetchColumnInfo = async (selectedTable) => {
    try {
      const connectionType = localStorage.getItem('connectionType'); // Get connection type from localStorage
      const selectedUser = localStorage.getItem('selectedUser');
      const data = await fetchColumnNames(selectedTable, databaseName,connectionType,selectedUser);
      if (data) {
        dispatch(setColumnInfo(data));
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  // // Fetch column info at a regular interval
  // React.useEffect(() => {
  //   if (selectedTableName) {
  //     const intervalId = setInterval(() => {
  //       fetchColumnInfo(selectedTableName);
  //     }, 5000); // Executes every 5 seconds

  //     // Cleanup interval on component unmount
  //     return () => clearInterval(intervalId);
  //   }
  // }, [selectedTableName]);

  const handleLocalTableChange = (event) => {
    const selectedTable = event.target.value;
    setSelectedTableName(selectedTable); // Update local state
    localStorage.setItem('selectedTableName', selectedTable); // Save to localStorage
    dispatch(setShowDashboard(true));
    dispatch(setSelectedTable(selectedTable));
    fetchColumnInfo(selectedTable);
    setChecked(event.target.checked); // Update checked state
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, fontSize: '12px' }}>
        <Box sx={{ fontSize: '12px', maxHeight: '84vh', display: 'flex', flexDirection: 'column' }}>
          <React.Fragment>
            <CssBaseline />
            <FormControl fullWidth>
              <Grid container alignItems="center" display={'flex'}>
                <Grid container direction="row" alignItems="center" spacing={1}>
                  <Grid item sx={{ flexGrow: 1, fontSize: '12px' }}>
                    {/* Table Name Display */}
                  </Grid>
                  <Grid item>
                    <TextField
                      sx={{ flexGrow: 1, fontSize: '12px' }}
                      id="input-with-icon-textfield"
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Checkbox
                              sx={{ flexGrow: 1, fontSize: '12px' }}
                              checked={checked}
                              value={selectedTable}
                              onChange={handleLocalTableChange}
                              inputProps={{ 'aria-label': 'Checkbox' }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={selectedTableName || 'Select a table'}
                      variant="standard"
                      aria-readonly
                    />
                  </Grid>
                  <Grid item>
                    <SplitButton handleTableChange={handleLocalTableChange} />
                  </Grid>
                </Grid>
              </Grid>
            </FormControl>

            {/* Conditionally render the Columns component based on the checkbox */}
            {checked && <Columns />}
          </React.Fragment>
        </Box>
      </Box>
    </div>
  );
}

export default DashboardTableDetails;
