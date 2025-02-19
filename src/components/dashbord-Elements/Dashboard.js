import React, { useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Filters from '../chartCreation/filter';
import DashboardTableDetails from './dashbordTableDetails';
import DashboardCharts from './dashbord-chartComponent';

import DuealChartInputsss from '../charts/duealChartInput';

import DashboardFilter from'./dashboardFilter';
import {setXAxis,
  setYAxis,setAggregate,
  generateChart
} from '../../features/Dashboard-Slice/chartSlice';
import { saveDataToDatabase,validateSaveName } from '../../utils/api';
import HomePage from '../../pages/HomePage';
import ChartDisplay from '../chartDisplay';
import { Filter } from '@mui/icons-material';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Items = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '635px',
}));

function Dashboard() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [user_id, setUserId] = React.useState(sessionStorage.getItem('user_id'));
  const [company_name, setCompanyName] = React.useState(localStorage.getItem('company_name'));
 
  const [previousState, setPreviousState] = useState({ xAxis: '', yAxis: '', chartType: '' ,selectedTable:''});
  const data  = useSelector((state) => state.aicharts);
  
  const [selectedUser, setSelectedUser] = React.useState(sessionStorage.getItem('selectedUser'));
  console.log('user_id:', user_id); 
  console.log('company_name:', company_name);
 
  const {
    xAxis, yAxis, plotData, aggregate, checkedOptions, dashboardPlotData, dashboardBarColor
  } = useSelector(state => state.chart);

  const chartType = useSelector(state => state.chartType.type);
  const SelectedTable = useSelector((state) => state.dashboard.checkedPaths);
  
  const barColor = useSelector((state) => state.chartColor.chartColor);
  // const databaseName = useSelector((state) => state.database.databaseName);
  const databaseName = localStorage.getItem('company_name');
  const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
  const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
  const chart_heading = useSelector((state) => state.toolTip.customHeading);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
  const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor= useSelector((state) => state.toolTip.valueColor);
  const [saveStatus, setSaveStatus] = useState(''); // State to manage save status message
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
const selectedTable=sessionStorage.getItem("selectedTable")
  const selectedTablearray = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
  // const selectedTable = selectedTablearray.join(',');
  
  React.useEffect(() => {
    if (xAxis && yAxis && aggregate && chartType) {
      dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions,selectedUser }));
    }
  }, [SelectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);
  const preventReload = (e) => {
    e.preventDefault();
    e.returnValue = '';  // This triggers a confirmation prompt
  };
  
  
  useEffect(() => {
    if (
      previousState.xAxis !== xAxis ||
      previousState.yAxis !== yAxis ||
      previousState.chartType !== chartType
    ) {
      setSaveName('');
      setPreviousState({ xAxis, yAxis, chartType });
    }
  }, [xAxis, yAxis, chartType, previousState]);

  const handleSaveButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveToDatabase = async () => {
    if (!saveName.trim()) {
      alert("Please enter a save name before saving.");
      return;
    }
  
  
  
    try {
      // Validate saveName
      const isValid = await validateSaveName(saveName);
      console.log("isValid",isValid)
      if (isValid === true) {
        alert("Save name already exists. Please choose a different name.");
        return;
      }
     
      const formattedCheckedOptions = Object.fromEntries(
        Object.entries(checkedOptions).map(([key, values]) => [key, Array.isArray(values) ? values : []])
      );
      console.log('checkedOptions:', formattedCheckedOptions);
      
      const response = await saveDataToDatabase({
        user_id,
        company_name,
        selectedUser,
        selectedTable,
        databaseName,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        barColor,
        chart_heading,
        dashboardBarColor,
        checkedOptions: formattedCheckedOptions, // Pass the formatted object
        ai_chart_data: data.data,
        saveName,
        xFontSize,         
        fontStyle,          
        categoryColor,   
        yFontSize,          
        valueColor,        
      });
      
  //     const response = await saveDataToDatabase({
  //       user_id,
  //       company_name,
  //       selectedUser,
  //       selectedTable,
  //       databaseName,
  //       xAxis,
  //       yAxis,
  //       aggregate,
  //       chartType,
  //       barColor,
  //       chart_heading,
  //       dashboardBarColor,
  //       checkedOptions,
  //       ai_chart_data: data.data,
  //       saveName,
  //       xFontSize,         
  //       fontStyle,          
  //       categoryColor,   
  //       yFontSize,          
  //       valueColor,        
  //     });
      console.log('Data saved successfully:', response);
    setSnackbarSeverity('success');
    setSnackbarMessage('Data saved successfully!');
    setSnackbarOpen(true); // Show snackbar on success
    setOpen(false);
  } catch (error) {
    console.error('Error saving data:', error);
    setSnackbarSeverity('error');
    setSnackbarMessage('Error saving data. Please try again.');
    setSnackbarOpen(true); // Show snackbar on error
  }
  };
  
  

  return (
    <div className="App">
      
      {/* <Box sx={{ flexGrow: 1,marginTop:'10px',marginLeft:'5px',marginRight:'5px'}}>
        */}
        <Grid container spacing={1.5} wrap="wrap">
        
          <Grid item xs={12} md={1.5}>
            <Item>
            <DashboardTableDetails />
            </Item>
          </Grid>
          <Grid item xs={12} md={9}>
            <Item>
              <DuealChartInputsss/>
            </Item>

            <Grid item xs={12}>
              <ChartDisplay
                xAxis={xAxis}
                yAxis={yAxis}
                chartType={chartType}
                plotData={plotData}
                handleSaveButtonClick={handleSaveButtonClick}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Item>
              <DashboardCharts />
            </Item>
            {xAxis.length > 0 && (
              
              <div style={{ marginTop: '20px',marginRight:'5px',order:'2px solid #ccc'}}>
                
                <Item> <DashboardFilter />
                </Item>
              </div>
            )}
                        
              
              <div style={{ marginTop: '20px',marginRight:'5px',order:'2px solid #ccc'}}>
                
                <Item> <Filters />
                </Item>
              </div>
            
          </Grid>
          
        </Grid>
      {/* </Box> */}

      {/* Modal for saving data */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Chart</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Save Name"
            fullWidth
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSaveToDatabase} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000} // Auto-hide after 6 seconds
  onClose={() => setSnackbarOpen(false)}
>
  <MuiAlert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </MuiAlert>
</Snackbar>

    </div>
  );
}

export default Dashboard;
