// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Container, List, ListItemButton, ListItemText, Checkbox, Grid, Box, AppBar, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
// import Dashboard from '../dashbord-Elements/Dashboard';
// import tinycolor from 'tinycolor2';

// import { fetchTableNamesAPI} from '../../utils/api';

// const LoadExcelFile = () => {
//   const dispatch = useDispatch();
//   const { showDashboard, checkedPaths, loading } = useSelector((state) => state.loadExcel);
//   const [checkedItem, setCheckedItem] = useState(null); // Keep track of only one checked item
//   const [tableNames, setTableNames] = useState([]);
//   const databaseName = localStorage.getItem('company_name');

//   const themeColor = localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(themeColor).lighten(10).toString(); // Lighten by 10%

//   useEffect(() => {
//     const storedTableNames = JSON.parse(localStorage.getItem('tableNames')) || [];
//     setTableNames(storedTableNames);
//   }, []);

//   useEffect(() => {
//     const getTableNames = async () => {
//       if (databaseName) {
//         try {
//           const data = await fetchTableNamesAPI(databaseName);
//           setTableNames(data);
//         } catch (error) {
//           console.error('Error in getTableNames:', error);
//         }
//       }
//     };

//     getTableNames();
//   }, [databaseName]);

//   const handleCheckboxChange = (tableName) => {
//     setCheckedItem((prev) => (prev === tableName ? null : tableName)); // Toggle the same checkbox or select a new one
//   };

//   const logCheckedItem = () => {
//     if (checkedItem) {
//       dispatch(setShowDashboard(true));
//       dispatch(setCheckedPaths([checkedItem]));
//       console.log('checkedPaths:', [checkedItem]);
//     }
//   };

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
//           }}
//         >
//           <AppBar position="static" sx={{ backgroundColor: themeColor }}>
//             <Toolbar>
//               <Typography variant="h6">Load Data</Typography>
//             </Toolbar>
//           </AppBar>
//           <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '30px' }}>
//             <Grid item xs={12} sm={6} md={4}>
//               {loading ? (
//                 <CircularProgress />
//               ) : (
//                 <List>
//                   {tableNames.map((tableName) => (
//                     <ListItemButton key={tableName}>
//                       <Checkbox
//                         checked={checkedItem === tableName} // Only the selected checkbox is checked
//                         onChange={() => handleCheckboxChange(tableName)}
//                       />
//                       <ListItemText primary={tableName} />
//                     </ListItemButton>
//                   ))}
//                 </List>
//               )}
//             </Grid>
//           </Grid>
//           <Box sx={{ position: 'absolute', bottom: 16, right: 16, margin: '30px' }}>
//             <Button
//               variant="contained"
//               onClick={logCheckedItem}
//               sx={{
//                 backgroundColor: themeColor,
//                 '&:hover': {
//                   backgroundColor: lighterColor, // Use the lightened color
//                 },
//               }}
//             >
//               Load
//             </Button>
//           </Box>
//         </Container>
//       ) : (
//         <Dashboard checkedPaths={checkedPaths} />
//       )}
//     </React.Fragment>
//   );
// };

// export default LoadExcelFile;






// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Container,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Box,
//   TextField,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   Skeleton, // Import Skeleton from MUI
// } from '@mui/material';
// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
// import Dashboard from '../dashbord-Elements/Dashboard';
// import { fetchTableNamesAPI, fetchTableDetailsAPI } from '../../utils/api'; // Import the API function to fetch table details
// import tinycolor from 'tinycolor2';
// import { debounce } from 'lodash'; // Import lodash debounce

// const LoadExcelFile = () => {
//   const dispatch = useDispatch();
//   const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
//   const [tableNames, setTableNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTable, setSelectedTable] = useState('');
//   const [tableDetails, setTableDetails] = useState(null); // State to hold table details
//   const [isLoading, setIsLoading] = useState(true);
//   const theamColor = localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();
//   const databaseName = localStorage.getItem('company_name'); // Get the company name from localStorage

//   useEffect(() => {
//     const fetchTableNames = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchTableNamesAPI(databaseName);
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
//           const data = await fetchTableDetailsAPI(databaseName, selectedTable); // Send company name and selected table to backend
//           setTableDetails(data); // Store table details in state
//         } catch (error) {
//           console.error('Error fetching table details:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchTableDetails();
//     }
//   }, [selectedTable, databaseName]);

//   // Debounced search function to optimize API calls
//   const handleSearchChange = debounce((event) => {
//     setSearchQuery(event.target.value);
//   }, 500);

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
//             alignItems: 'center', // Center the content horizontally
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
//                   renderValue={(selected) => selected}
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
//                       onChange={handleSearchChange} // Apply debounced search
//                       autoFocus
//                       onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on search
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
//                     width: '100%', // Center the table
//                     marginLeft: 'auto',
//                     marginRight: 'auto',
//                   }}
//                 >
//                   {isLoading ? (
//                     <Box sx={{ padding: '20px' }}>
//                       <Skeleton variant="text" width="100%" height={40} sx={{ marginBottom: '10px' }} />
//                       <Skeleton variant="text" width="80%" height={40} sx={{ marginBottom: '10px' }} />
//                       <Skeleton variant="text" width="60%" height={40} sx={{ marginBottom: '10px' }} />
//                       {/* Add more Skeleton components for rows */}
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
//                 Load
//               </Button>
//             </Box>
//           </Grid>
//         </Container>
//       ) : (
//         <Dashboard checkedPaths={checkedPaths} />
//       )}
//     </React.Fragment>
//   );
// };

// export default LoadExcelFile;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Container,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Box,
//   TextField,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   Skeleton,
// } from '@mui/material';
// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
// import Dashboard from '../dashbord-Elements/Dashboard';
// import { fetchTableNamesAPI, fetchTableDetailsAPI } from '../../utils/api';
// import tinycolor from 'tinycolor2';
// import { debounce } from 'lodash';

// const LoadExcelFile = () => {
//   const dispatch = useDispatch();
//   const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
//   const [tableNames, setTableNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTable, setSelectedTable] = useState('');
//   const [tableDetails, setTableDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const theamColor = localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();
//   const databaseName = localStorage.getItem('company_name');

//   useEffect(() => {
//     const fetchTableNames = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchTableNamesAPI(databaseName);
//         setTableNames(data.sort());
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
//           const data = await fetchTableDetailsAPI(databaseName, selectedTable);
//           setTableDetails(data);
//         } catch (error) {
//           console.error('Error fetching table details:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchTableDetails();
//     }
//   }, [selectedTable, databaseName]);

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchQuery(value);
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
//                 <TextField
//                   placeholder="Search..."
//                   required
//                   fullWidth
//                   variant="outlined"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   sx={{
//                     marginBottom: '10px',
//                     backgroundColor: '#ffffff',
//                     borderRadius: '8px',
//                   }}
//                 />
//                 <Select
//                   value={selectedTable}
//                   onChange={handleTableSelect}
//                   displayEmpty
//                   renderValue={(selected) => selected || 'Select a table'}
//                   MenuProps={{
//                     PaperProps: {
//                       sx: { maxHeight: 300 },
//                     },
//                   }}
//                   sx={{
//                     backgroundColor: '#f9f9f9',
//                     borderRadius: '10px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                   }}
//                 >
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

//             {selectedTable && tableDetails && (
//               <Grid item xs={12} sx={{ marginTop: '5px' }}>
//                 <Typography variant="h6" sx={{ textAlign: 'center' }}>
//                   Table Details for {selectedTable}:
//                 </Typography>
//                 <TableContainer component={Paper} sx={{ maxHeight: 320, overflow: 'auto' }}>
//                   {isLoading ? (
//                     <Skeleton variant="rectangular" height={200} />
//                   ) : (
//                     <Table>
//                       <TableHead sx={{ backgroundColor: theamColor }}>
//                         <TableRow>
//                           {Object.keys(limitedTableDetails[0] || {}).map((key) => (
//                             <TableCell key={key} sx={{ color: '#fff' }}>{key}</TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {limitedTableDetails.map((row, index) => (
//                           <TableRow key={index}>
//                             {Object.values(row).map((value, idx) => (
//                               <TableCell key={idx}>{value}</TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   )}
//                 </TableContainer>
//               </Grid>
//             )}
//           </Grid>
//           <Box sx={{ position: 'absolute', bottom: 16, right: 550 }}>
//             <Button
//               variant="contained"
//               onClick={handleLoadTable}
//               sx={{ backgroundColor: theamColor }}
//               disabled={!selectedTable}
//             >
//               Load
//             </Button>
//           </Box>
//         </Container>
//       ) : (
//         <Dashboard checkedPaths={checkedPaths} />
//       )}
//     </React.Fragment>
//   );
// };

// export default LoadExcelFile;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Container,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Box,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   Skeleton,
// } from '@mui/material';
// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
// import Dashboard from '../dashbord-Elements/Dashboard';
// import { fetchTableNamesAPI, fetchTableDetailsAPI } from '../../utils/api';
// import tinycolor from 'tinycolor2';

// const LoadExcelFile = () => {
//   const dispatch = useDispatch();
//   const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
//   const [tableNames, setTableNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTable, setSelectedTable] = useState('');
//   const [tableDetails, setTableDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const theamColor = localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();
//   const databaseName = localStorage.getItem('company_name');

//   useEffect(() => {
//     const fetchTableNames = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchTableNamesAPI(databaseName);
//         setTableNames(data.sort());
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
//           const data = await fetchTableDetailsAPI(databaseName, selectedTable);
//           setTableDetails(data);
//         } catch (error) {
//           console.error('Error fetching table details:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchTableDetails();
//     }
//   }, [selectedTable, databaseName]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleTableSelect = (event) => {
//     setSelectedTable(event.target.value);
//     setSearchQuery(event.target.value);
//   };

//   const filteredTableNames = tableNames.filter((tableName) =>
//     tableName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLoadTable = () => {
//     if (selectedTable) {
//       dispatch(setShowDashboard(true));
//       dispatch(setCheckedPaths([selectedTable]));
//     }
//   };

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
//                 <Select
//                   value={selectedTable}
//                   onChange={handleTableSelect}
//                   displayEmpty
//                   renderValue={() => searchQuery || 'Search or Select a table'}
//                   MenuProps={{
//                     PaperProps: {
//                       sx: { maxHeight: 300 },
//                     },
//                   }}
//                   sx={{
//                     backgroundColor: '#f9f9f9',
//                     borderRadius: '10px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//                   }}
//                 >
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

//             {selectedTable && tableDetails && (
//               <Grid item xs={12} sx={{ marginTop: '5px' }}>
//                 <Typography variant="h6" sx={{ textAlign: 'center' }}>
//                   Table Details for {selectedTable}:
//                 </Typography>
//                 <TableContainer component={Paper} sx={{ maxHeight: 320, overflow: 'auto' }}>
//                   {isLoading ? (
//                     <Skeleton variant="rectangular" height={200} />
//                   ) : (
//                     <Table>
//                       <TableHead sx={{ backgroundColor: theamColor }}>
//                         <TableRow>
//                           {Object.keys(limitedTableDetails[0] || {}).map((key) => (
//                             <TableCell key={key} sx={{ color: '#fff' }}>{key}</TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {limitedTableDetails.map((row, index) => (
//                           <TableRow key={index}>
//                             {Object.values(row).map((value, idx) => (
//                               <TableCell key={idx}>{value}</TableCell>
//                             ))}
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   )}
//                 </TableContainer>
//               </Grid>
//             )}
//           </Grid>

//           <Box sx={{ position: 'absolute', bottom: 16, right: 550 }}>
//             <Button
//               variant="contained"
//               onClick={handleLoadTable}
//               sx={{ backgroundColor: theamColor }}
//               disabled={!selectedTable}
//             >
//               Load
//             </Button>
//           </Box>
//         </Container>
//       ) : (
//         <Dashboard checkedPaths={checkedPaths} />
//       )}
//     </React.Fragment>
//   );
// };

// export default LoadExcelFile;














import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
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
  InputBase,
} from '@mui/material';
import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import Dashboard from '../dashbord-Elements/Dashboard';
import { fetchTableNamesAPI, fetchTableDetailsAPI } from '../../utils/api';
import tinycolor from 'tinycolor2';
import { useNavigate } from 'react-router';

const LoadExcelFile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
  const [tableNames, setTableNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [tableDetails, setTableDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theamColor = localStorage.getItem('theamColor');
  const lighterColor = tinycolor(theamColor).lighten(10).toString();
  const databaseName = localStorage.getItem('company_name');

  useEffect(() => {
    const fetchTableNames = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTableNamesAPI(databaseName);
        setTableNames(data.sort());
      } catch (error) {
        console.error('Error fetching table names:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTableNames();
  }, [databaseName]);

  useEffect(() => {
    if (selectedTable) {
      const fetchTableDetails = async () => {
        setIsLoading(true);
        try {
          const data = await fetchTableDetailsAPI(databaseName, selectedTable);
          setTableDetails(data);
        } catch (error) {
          console.error('Error fetching table details:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTableDetails();
    }
  }, [selectedTable, databaseName]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleTableSelect = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleLoadTable = () => {
    if (selectedTable) {
      dispatch(setShowDashboard(true));
      dispatch(setCheckedPaths([selectedTable]));
      console.log('Selected Table:', selectedTable);
      navigate('/create_charts', { state: { checkedPaths: [selectedTable] } });
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
              <Typography variant="h6">Select Table</Typography>
            </Toolbar>
          </AppBar>

          <Grid container spacing={4} sx={{ marginTop: '20px' }} justifyContent="center">
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <Select
                  value={selectedTable}
                  onChange={handleTableSelect}
                  displayEmpty
                  renderValue={(selected) => selected || 'Search and Select a table'}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 200 },
                    },
                  }}
                  input={
                    <InputBase
                      placeholder="Search..."
                      onChange={handleSearchChange}
                      sx={{
                        padding: '5px 10px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        marginBottom: '8px',
                      }}
                    />
                  }
                >
                  {tableNames
                    .filter((tableName) =>
                      tableName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((tableName) => (
                      <MenuItem key={tableName} value={tableName}>
                        {tableName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {selectedTable && tableDetails && (
              <Grid item xs={12} sx={{ marginTop: '5px' }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  {/* Table Details for {selectedTable}: */}
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 450, overflow: 'auto' }}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={200} />
                  ) : (
                    <Table>
                      <TableHead sx={{ backgroundColor: theamColor }}>
                        <TableRow>
                          {Object.keys(limitedTableDetails[0] || {}).map((key) => (
                            <TableCell key={key} sx={{ color: '#fff' }}>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {limitedTableDetails.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, idx) => (
                              <TableCell key={idx}>{value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Grid>
            )}
          </Grid>
          <Box sx={{ position: 'absolute', bottom: 16, right: 550 }}>
            <Button
              variant="contained"
              onClick={handleLoadTable}
              sx={{ backgroundColor: theamColor }}
              disabled={!selectedTable}
            >
              Load
            </Button>
          </Box>
        </Container>
      ) : (
        // <Dashboard checkedPaths={checkedPaths} />
        <div></div>
      )}
    </React.Fragment>
  );
};

export default LoadExcelFile;










// import React, { useEffect, useState,useCallback  } from 'react';
// import { useDispatch, useSelector } from 'react-redux';


// import {
//   Container,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Box,
//   TextField,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   Skeleton,
//   Snackbar,
//   Alert, // Import Skeleton from MUI
// } from '@mui/material';
// import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
// // import Dashboard from '../dashbord-Elements/Dashboard';
// import { fetchTableNamesAPI, fetchTableDetailsAPI } from '../../utils/api'; // Import the API function to fetch table details
// import tinycolor from 'tinycolor2';
// import { debounce } from 'lodash'; // Import lodash debounce

// const LoadExcelFile = () => {
//   const dispatch = useDispatch();
//   // const { showDashboard, checkedPaths } = useSelector((state) => state.loadExcel);
//   const [tableNames, setTableNames] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTable, setSelectedTable] = useState('');
//   const [tableDetails, setTableDetails] = useState(null); // State to hold table details
//   const [isLoading, setIsLoading] = useState(true);
//   const theamColor = localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();
//   const databaseName = localStorage.getItem('company_name'); // Get the company name from localStorage
//   const [loadSuccess, setLoadSuccess] = useState(false); // New state for message

//   useEffect(() => {
//     const fetchTableNames = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchTableNamesAPI(databaseName);
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
//       localStorage.setItem('selectedTable',selectedTable); 

//       const fetchTableDetails = async () => {
//         setIsLoading(true);
//         try {
//           const data = await fetchTableDetailsAPI(databaseName, selectedTable); // Send company name and selected table to backend
//           setTableDetails(data); // Store table details in state
//           localStorage.setItem('connectionType', 'local'); 
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



//   const filteredTableNames = tableNames.filter((tableName) =>
//     tableName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleTableSelect = (event) => {
//     setSelectedTable(event.target.value);
//     localStorage.removeItem('selectedUser'); 
//   };

//   const handleLoadTable = () => {
//     if (selectedTable) {
//       dispatch(setShowDashboard(false));
//       dispatch(setCheckedPaths([selectedTable]));
//       console.log('Selected Table:', selectedTable);

//       // Show success message
//       setLoadSuccess(true);
//     }
//   };

//   // Close success message
//   const handleCloseSnackbar = () => {
//     setLoadSuccess(false);
//   };
//   // Limit the table details to the first 5 rows
//   const limitedTableDetails = tableDetails ? tableDetails.slice(0, 5) : [];

//   return (
//     <React.Fragment>
     
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
//             alignItems: 'center', // Center the content horizontally
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
//   <InputLabel id="table-select-label"></InputLabel>
//   <Select
//     labelId="table-select-label"
//     value={selectedTable} // Ensure this reflects only the selected table
//     onChange={handleTableSelect}
//     displayEmpty
    
//     MenuProps={{
//       PaperProps: {
//         sx: {
//           maxHeight: 300,
//         },
//       },
//     }}
//     sx={{
//       backgroundColor: '#f9f9f9',
//       borderRadius: '10px',
//       boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     }}
//     renderValue={(selected) =>
//       selected || <em>Search and Select Table</em> // Placeholder for empty value
//     }
//   >
//     {/* Search Field as the first item */}
//     <MenuItem disableRipple>
//       <TextField
//   placeholder="Search..."
//   required
//   fullWidth
//   variant="outlined"
//   value={searchQuery} // Bind the searchQuery state
//   onChange={(event) => {
//     const query = event.target.value;
//     setSearchQuery(query); // Update the search query
//     // handleSearchDebounced(query); // Apply debounced filtering
//   }}
//   autoFocus
//   onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on search
//   sx={{
//     marginBottom: '10px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//   }}
// />

//     </MenuItem>
//     {/* Filtered table names */}
//     {filteredTableNames.length > 0 ? (
//       filteredTableNames.map((tableName) => (
//         <MenuItem key={tableName} value={tableName}>
//           {tableName}
//         </MenuItem>
//       ))
//     ) : (
//       <MenuItem disabled>No matching tables found</MenuItem>
//     )}
//   </Select>
// </FormControl>

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
//                     width: '100%', // Center the table
//                     marginLeft: 'auto',
//                     marginRight: 'auto',
//                   }}
//                 >
//                   {isLoading ? (
//                     <Box sx={{ padding: '20px' }}>
//                       <Skeleton variant="text" width="100%" height={40} sx={{ marginBottom: '10px' }} />
//                       <Skeleton variant="text" width="80%" height={40} sx={{ marginBottom: '10px' }} />
//                       <Skeleton variant="text" width="60%" height={40} sx={{ marginBottom: '10px' }} />
//                       {/* Add more Skeleton components for rows */}
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
//                 Load
//               </Button>
//             </Box>
//           </Grid>
//         </Container>
//         <Snackbar
//         open={loadSuccess}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//           Load successful!
//         </Alert>
//       </Snackbar>
//     </React.Fragment>
//   );
// };

// export default LoadExcelFile;