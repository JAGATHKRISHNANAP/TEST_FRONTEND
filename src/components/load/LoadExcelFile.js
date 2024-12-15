import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, ListItemButton, ListItemText, Checkbox, Grid, Box, AppBar, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
import { setShowDashboard, setCheckedPaths } from '../../features/excelFileSlice/LoadExcelFileSlice';
import Dashboard from '../dashbord-Elements/Dashboard';
import {fetchTableNamesAPI} from'../../utils/api';
import tinycolor from 'tinycolor2';
import axios from 'axios';


const LoadExcelFile = () => {
  const dispatch = useDispatch();
  const { showDashboard, checkedPaths, loading } = useSelector((state) => state.loadExcel);
  const [checkedItems, setCheckedItems] = useState({});
  const [tableNames, setTableNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Local loading state for fetching table names
  const theamColor=localStorage.getItem('theamColor');
  const lighterColor = tinycolor(theamColor).lighten(10).toString();  // Lighten by 10%
  const databaseName = localStorage.getItem('company_name');
  
  useEffect(() => {
    const fetchTableNames = async () => {
      setIsLoading(true); // Show loading spinner while fetching
      try {
        const data = await fetchTableNamesAPI(databaseName);
        setTableNames(data);
      } catch (error) {
        console.error('Error fetching table names:', error);
      } finally {
        setIsLoading(false); // Hide loading spinner once done
      }
    };
    fetchTableNames();
  }, [databaseName]);
  
  

  const handleCheckboxChange = (tableName, checked) => {
    if (checked) {
      // Ensure only one item is checked
      setCheckedItems({ [tableName]: true });
    } else {
      // Uncheck the item
      setCheckedItems({});
    }
  };
  

  const logCheckedItems = () => {
    const checkedTableNames = tableNames.filter((table) => checkedItems[table]);
    dispatch(setShowDashboard(true));
    dispatch(setCheckedPaths(checkedTableNames));
    console.log('checkedPaths:', checkedTableNames);
  };

  return (
    <React.Fragment>
      {!showDashboard ? (
        <Container sx={{ height: '85vh', border: '1px solid #4287f5', borderRadius: '10px', backgroundColor: '#ffffff', position: 'relative' ,marginTop:'80px'}}>
          <AppBar position="static" sx={{ backgroundColor: theamColor }}>
            <Toolbar>
              <Typography variant="h6">
                Load Data
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', margin: '30px' }}>
            <Grid item xs={12} sm={6} md={4}>
              {loading ? (
                <CircularProgress />
              ) : (
                <List sx={{ maxHeight: '600px', overflowY: 'auto' }}>
                  {tableNames.map((tableName) => (
                    <ListItemButton key={tableName}>
                       <Checkbox
                          checked={!!checkedItems[tableName]}
                          onChange={(event) => handleCheckboxChange(tableName, event.target.checked)}
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
  onClick={logCheckedItems}
  sx={{ 
    backgroundColor: theamColor, 
    '&:hover': {
      backgroundColor: lighterColor, // Use the lightened color
    }
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
