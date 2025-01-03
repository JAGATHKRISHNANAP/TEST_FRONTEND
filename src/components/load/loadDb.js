// import React, { useEffect, useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, AppBar, Toolbar, Typography, Button, CircularProgress, Select, FormControl, InputLabel, MenuItem, Box, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Skeleton } from '@mui/material';
// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
 import Dashboard from '../dashbord-Elements/Dashboard';
// import { fetchTableNamesFromExternalDB, fetchTableDetailsFromExternalDB } from '../../utils/api'; // Import new API function
// import tinycolor from 'tinycolor2';
// import { debounce } from 'lodash';

// const LoadDbFile = () => {
//   const dispatch = useDispatch();
//   const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
//   const [tableNames, setTableNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTable, setSelectedTable] = useState('');
//   const [tableDetails, setTableDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const theamColor = localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();
//   const databaseName = localStorage.getItem('company_name'); // Get the company name from localStorage

//   useEffect(() => {
//     const fetchTableNames = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchTableNamesFromExternalDB(databaseName);
//         setTableNames(data.sort()); // Sort alphabetically
//       } catch (error) {
//         console.error('Error fetching table names:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTableNames();
//   }, [databaseName]);

//   useEffect(() => {
//     if (selectedTable) {
//       const fetchTableDetails = async () => {
//         setIsLoading(true);
//         try {
//           const data = await fetchTableDetailsFromExternalDB(databaseName, selectedTable);
//           setTableDetails(data); // Store table details in state
//           localStorage.setItem('connectionType', 'external'); 
//         } catch (error) {
//           console.error('Error fetching table details:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchTableDetails();
//     }
//   }, [selectedTable, databaseName]);

//   const handleSearchDebounced = debounce((query) => {
//     setSearchQuery(query);
//     handleSearchDebounced(query); 
//   }, 300);

//   const handleSearchChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query); // Update the search query immediately
//     handleSearchDebounced(query); // Debounce the filtering
//   };

//   const filteredTableNames = tableNames.filter((tableName) =>
//     tableName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleTableSelect = (event) => {
//     setSelectedTable(event.target.value);
//   };

//   const handleLoadTable = () => {
//     if (selectedTable) {
//       dispatch(setShowDashboard(true));
//       dispatch(setCheckedPaths([selectedTable]));
//       console.log('Selected Table:', selectedTable);
//     }
//   };

//   // Limit the table details to the first 5 rows
//   const limitedTableDetails = tableDetails ? tableDetails.slice(0, 5) : [];

//   return (
//     <React.Fragment>
//       {!showDashboard ? (
//         <Container
//           sx={{
//             height: '85vh',
//             border: '1px solid #4287f5',
//             borderRadius: '10px',
//             backgroundColor: '#ffffff',
//             position: 'relative',
//             marginTop: '80px',
//             padding: '20px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <AppBar position="static" sx={{ backgroundColor: theamColor }}>
//             <Toolbar>
//               <Typography variant="h6">Select Table</Typography>
//             </Toolbar>
//           </AppBar>

//           <Grid container spacing={4} sx={{ marginTop: '20px' }} justifyContent="center">
//             <Grid item xs={12} md={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="table-select-label"></InputLabel>
//                 <Select
//                   labelId="table-select-label"
//                   value={selectedTable}
//                   onChange={handleTableSelect}
//                   displayEmpty
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         maxHeight: 300,
//                       },
//                     },
//                   }}
//                   sx={{
//                     backgroundColor: '#f9f9f9',
//                     borderRadius: '10px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                   }}
//                 >
//                   <MenuItem disableRipple>
//                     <TextField
//                       placeholder="Search..."
//                       required
//                       fullWidth
//                       variant="outlined"
//                       value={searchQuery}
//                       onChange={handleSearchChange}
//                       autoFocus
//                       onClick={(e) => e.stopPropagation()}
//                       sx={{
//                         marginBottom: '10px',
//                         backgroundColor: '#ffffff',
//                         borderRadius: '8px',
//                       }}
//                     />
//                   </MenuItem>
//                   {filteredTableNames.length > 0 ? (
//                     filteredTableNames.map((tableName) => (
//                       <MenuItem key={tableName} value={tableName}>
//                         {tableName}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled>No matching tables found</MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Table Details Section */}
//             {selectedTable && tableDetails && (
//               <Grid item xs={12} sx={{ marginTop: '5px' }}>
//                 <Typography variant="h6" sx={{ textAlign: 'center' }}>
//                   Table Details for <>{selectedTable}</>:
//                 </Typography>
//                 <TableContainer
//                   component={Paper}
//                   sx={{
//                     maxHeight: 320,
//                     overflow: 'auto',
//                     borderRadius: '10px',
//                     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//                     marginTop: '15px',
//                     padding: '16px',
//                     width: '100%',
//                     marginLeft: 'auto',
//                     marginRight: 'auto',
//                   }}
//                 >
//                   {isLoading ? (
//                     <Box sx={{ padding: '20px' }}>
//                       <Skeleton variant="text" width="100%" height={40} sx={{ marginBottom: '10px' }} />
//                       <Skeleton variant="text" width="80%" height={40} sx={{ marginBottom: '10px' }} />
//                       <Skeleton variant="text" width="60%" height={40} sx={{ marginBottom: '10px' }} />
//                     </Box>
//                   ) : (
//                     <Table sx={{ minWidth: 650 }}>
//                       <TableHead sx={{ backgroundColor: theamColor }}>
//                         <TableRow>
//                           {Object.keys(limitedTableDetails[0] || {}).map((key) => (
//                             <TableCell
//                               key={key}
//                               sx={{
//                                 color: '#fff',
//                                 fontWeight: 'bold',
//                                 textAlign: 'center',
//                                 padding: '10px 16px',
//                               }}
//                             >
//                               {key}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {limitedTableDetails.map((row, rowIndex) => (
//                           <TableRow
//                             key={rowIndex}
//                             sx={{
//                               '&:nth-of-type(odd)': {
//                                 backgroundColor: '#f9f9f9',
//                               },
//                               '&:hover': {
//                                 backgroundColor: '#e0f7fa',
//                                 cursor: 'pointer',
//                               },
//                             }}
//                           >
//                             {Object.values(row).map((value, colIndex) => (
//                               <TableCell
//                                 key={colIndex}
//                                 sx={{
//                                   textAlign: 'center',
//                                   padding: '10px 16px',
//                                   fontSize: '14px',
//                                 }}
//                               >
//                                 {value}
//                               </TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   )}
//                 </TableContainer>
//               </Grid>
//             )}

//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 16,
//                 right: 550,
//               }}
//             >
//               <Button
//                 variant="contained"
//                 onClick={handleLoadTable}
//                 sx={{
//                   backgroundColor: theamColor,
//                   '&:hover': {
//                     backgroundColor: lighterColor,
//                   },
//                 }}
//                 disabled={!selectedTable}
//               >
//                 Load Table
//               </Button>
//             </Box>
//           </Grid>
//         </Container>
//       ) : (
//         <Dashboard />
//       )}
//     </React.Fragment>
//   );
// };

// export default LoadDbFile;

import React, { useEffect, useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Skeleton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import { fetchUsers, fetchTableDetailsFromExternalDB, fetchTableNamesFromExternalDB } from '../../utils/api'; // Adjusted API functions
import tinycolor from 'tinycolor2';

const LoadDbFile = () => {
  const dispatch = useDispatch();
  const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [tableNames, setTableNames] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableDetails, setTableDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const theamColor = localStorage.getItem('theamColor');
  const lighterColor = tinycolor(theamColor).lighten(10).toString();
  const databaseName = localStorage.getItem('company_name'); // Get the company name from localStorage
  console.log("databaseName",databaseName)
  // Fetch user names on component mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
          try {
            const data = await fetchUsers(databaseName);
            setUsers(data.sort(databaseName)); // Sort alphabetically
          } catch (error) {
            console.error('Error fetching table names:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchAllUsers();
      }, [databaseName]);
    
  // Fetch table names when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchTables = async () => {
        setIsLoading(true);
        try {
          const data = await fetchTableNamesFromExternalDB(selectedUser); // Fetch tables based on user
          setTableNames(data.sort());
        } catch (error) {
          console.error('Error fetching table names:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTables();
    }
  }, [selectedUser]);

  // Fetch table details when a table is selected
  useEffect(() => {
    if (selectedTable) {
      const fetchTableDetails = async () => {
        setIsLoading(true);
        try {
          const data = await fetchTableDetailsFromExternalDB(selectedTable); // Fetch table details
          setTableDetails(data);
        } catch (error) {
          console.error('Error fetching table details:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTableDetails();
    }
  }, [selectedTable]);

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
    setTableNames([]); // Clear table names when switching users
    setSelectedTable('');
    setTableDetails(null);
  };

  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleLoadTable = () => {
    if (selectedTable) {
      dispatch(setShowDashboard(true));
      dispatch(setCheckedPaths([selectedTable]));
      console.log('Selected Table:', selectedTable);
    }
  };

  const limitedTableDetails = tableDetails ? tableDetails.slice(0, 5) : [];

  return (
    <React.Fragment>
      {!showDashboard ? (
        <Container
          sx={{
            height: '85vh',
            border: '1px solid #4287f5',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            position: 'relative',
            marginTop: '80px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AppBar position="static" sx={{ backgroundColor: theamColor }}>
            <Toolbar>
              <Typography variant="h6">Select User and Table</Typography>
            </Toolbar>
          </AppBar>

          <Grid container spacing={4} sx={{ marginTop: '20px' }} justifyContent="center">
            {/* User Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                  labelId="user-select-label"
                  value={selectedUser}
                  onChange={handleUserSelect}
                  displayEmpty
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '10px',
                  }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.name}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Table Selection */}
            {selectedUser && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="table-select-label">Select Table</InputLabel>
                  <Select
                    labelId="table-select-label"
                    value={selectedTable}
                    onChange={handleTableSelect}
                    displayEmpty
                    sx={{
                      backgroundColor: '#f9f9f9',
                      borderRadius: '10px',
                    }}
                  >
                    {tableNames.map((tableName) => (
                      <MenuItem key={tableName} value={tableName}>
                        {tableName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {/* Table Details Section */}
            {selectedTable && tableDetails && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Table Details for {selectedTable}:
                </Typography>
                <TableContainer component={Paper}>
                  {isLoading ? (
                    <Box sx={{ padding: '20px' }}>
                      <Skeleton variant="text" width="100%" height={40} />
                    </Box>
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow>
                          {Object.keys(limitedTableDetails[0] || {}).map((key) => (
                            <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                              {key}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {limitedTableDetails.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {Object.values(row).map((value, colIndex) => (
                              <TableCell key={colIndex}>{value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Grid>
            )}

            <Box sx={{ position: 'absolute', bottom: 16, right: 550 }}>
              <Button
                variant="contained"
                onClick={handleLoadTable}
                sx={{
                  backgroundColor: theamColor,
                  '&:hover': {
                    backgroundColor: lighterColor,
                  },
                }}
                disabled={!selectedTable}
              >
                Load Table
              </Button>
            </Box>
          </Grid>
        </Container>
      ) : (
        <Dashboard />
      )}
    </React.Fragment>
  );
};

export default LoadDbFile;
