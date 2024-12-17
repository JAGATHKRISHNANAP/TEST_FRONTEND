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
//   const [checkedItems, setCheckedItems] = useState({});
//   const [tableNames, setTableNames] = useState([]);
//   const databaseName = localStorage.getItem('company_name');


//   const theamColor=localStorage.getItem('theamColor');
//   const lighterColor = tinycolor(theamColor).lighten(10).toString();  // Lighten by 10%

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


//   const handleCheckboxChange = (tableName, checked) => {
//     setCheckedItems((prev) => ({ ...prev, [tableName]: checked }));
//   };

//   const logCheckedItems = () => {
//     const checkedTableNames = tableNames.filter((table) => checkedItems[table]);
//     dispatch(setShowDashboard(true));
//     dispatch(setCheckedPaths(checkedTableNames));
//     console.log('checkedPaths:', checkedTableNames);
//   };

//   return (
//     <React.Fragment>
//       {!showDashboard ? (
//         <Container sx={{ height: '85vh', border: '1px solid #4287f5', borderRadius: '10px', backgroundColor: '#ffffff', position: 'relative' ,marginTop:'80px'}}>
//           <AppBar position="static" sx={{ backgroundColor: theamColor }}>
//             <Toolbar>
//               <Typography variant="h6">
//                 Load Data
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <Grid container spacing={2} sx={{ height: 'calc(100% - 64px)', marginTop: '10px' }}>
//             <Grid item xs={12} sm={4} sx={{ padding: '10px' }}>
//               <Typography variant="h6">Available Tables</Typography>
//               {loading ? (
//                 <CircularProgress />
//               ) : (
//                 <List sx={{ maxHeight: '600px', overflowY: 'auto' }}>
//                   {tableNames.map((tableName) => (
//                     <ListItemButton key={tableName}>
//                       <Checkbox
//                         checked={!!checkedItems[tableName]}
//                         onChange={(event) => handleCheckboxChange(tableName, event.target.checked)}
//                       />
//                       <ListItemText primary={tableName} />
//                     </ListItemButton>
//                   ))}
//                 </List>
//               )}
//             </Grid>
//             </Grid>
//           <Box sx={{ position: 'absolute', bottom: 16, right: 16, margin: '30px' }}>
//           <Button 
//   variant="contained"  
//   onClick={logCheckedItems}
//   sx={{ 
//     backgroundColor: theamColor, 
//     '&:hover': {
//       backgroundColor: lighterColor, // Use the lightened color
//     }
//   }}
// >
//   Load
// </Button>
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
import { Container, List, ListItemButton, ListItemText, Checkbox, Grid, Box, AppBar, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import Dashboard from '../dashbord-Elements/Dashboard';
import tinycolor from 'tinycolor2';

const LoadExcelFile = () => {
  const dispatch = useDispatch();
  const { showDashboard, checkedPaths, loading } = useSelector((state) => state.loadExcel);
  const [checkedItem, setCheckedItem] = useState(null); // Keep track of only one checked item
  const [tableNames, setTableNames] = useState([]);

  const themeColor = localStorage.getItem('theamColor');
  const lighterColor = tinycolor(themeColor).lighten(10).toString(); // Lighten by 10%

  useEffect(() => {
    const storedTableNames = JSON.parse(localStorage.getItem('tableNames')) || [];
    setTableNames(storedTableNames);
  }, []);

  const handleCheckboxChange = (tableName) => {
    setCheckedItem((prev) => (prev === tableName ? null : tableName)); // Toggle the same checkbox or select a new one
  };

  const logCheckedItem = () => {
    if (checkedItem) {
      dispatch(setShowDashboard(true));
      dispatch(setCheckedPaths([checkedItem]));
      console.log('checkedPaths:', [checkedItem]);
    }
  };

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
          }}
        >
          <AppBar position="static" sx={{ backgroundColor: themeColor }}>
            <Toolbar>
              <Typography variant="h6">Load Data</Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '30px' }}>
            <Grid item xs={12} sm={6} md={4}>
              {loading ? (
                <CircularProgress />
              ) : (
                <List>
                  {tableNames.map((tableName) => (
                    <ListItemButton key={tableName}>
                      <Checkbox
                        checked={checkedItem === tableName} // Only the selected checkbox is checked
                        onChange={() => handleCheckboxChange(tableName)}
                      />
                      <ListItemText primary={tableName} />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
          <Box sx={{ position: 'absolute', bottom: 16, right: 16, margin: '30px' }}>
            <Button
              variant="contained"
              onClick={logCheckedItem}
              sx={{
                backgroundColor: themeColor,
                '&:hover': {
                  backgroundColor: lighterColor, // Use the lightened color
                },
              }}
            >
              Load
            </Button>
          </Box>
        </Container>
      ) : (
        <Dashboard checkedPaths={checkedPaths} />
      )}
    </React.Fragment>
  );
};

export default LoadExcelFile;
