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
import TreeHierarchy from '../charts/treeHierarchy'; 
import HierarchicalBarChart from '../charts/hierarchialBarChart';

import DashboardTableDetails from './dashbordTableDetails';
import DashboardCharts from './dashbord-chartComponent';
import Pie from '../charts/Pie';
import LineChart from '../charts/lineChart';
import ScatterPlot from '../charts/scatterChart';
import BarChart from '../charts/barChart';
import AreaChart from '../charts/area';
import PolarAreaChart from '../charts/polarArea';
import DuealChartInputsss from '../charts/duealChartInput';
import DuelAxisChart from '../charts/duelAxesChart';
import TextChart from '../charts/textChart';
import MapChart from '../charts/mapchart';
import SingleValueChart from '../charts/singleValueChart';
import ChartColor from '../charts/color';
import DuelBarChart from '../charts/duelBarChart';

import SampleAiTestChart from '../charts/sampleAiTestChart';
import BoxPlotChart from '../charts/BoxPlotChart';

import {
  generateChart
} from '../../features/Dashboard-Slice/chartSlice';
import { saveDataToDatabase } from '../../utils/api';
import Treemap from '../charts/animatedTreeChart';
import AiChart from '../charts/aiChart';

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
  const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));
  const [company_name, setCompanyName] = React.useState(localStorage.getItem('company_name'));
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
  const selectedTablearray = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
  const selectedTable = selectedTablearray.join(',');

  React.useEffect(() => {
    if (xAxis && yAxis && aggregate && chartType) {
      dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
    }
  }, [SelectedTable, xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);
  const preventReload = (e) => {
    e.preventDefault();
    e.returnValue = '';  // This triggers a confirmation prompt
  };
  useEffect(() => {
    // Listen for the beforeunload event
    window.addEventListener('beforeunload', preventReload);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', preventReload);
    };
  }, []);
  const handleSaveButtonClick = () => {
    setSaveName('');
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

    console.log('Sending data to save:', saveName);
    try {
      const response = await saveDataToDatabase({
        user_id,
        company_name,
        selectedTable,
        databaseName,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        barColor,
        chart_heading,
        dashboardBarColor,
        checkedOptions,
        saveName,
      });
      console.log('Data saved successfully:', response);
      setOpen(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1,marginTop:'80px',marginLeft:'5px',marginRight:'5px'}}>
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12} md={1.5}>
            <Item>
            <DashboardTableDetails />
            </Item>
          </Grid>
          <Grid item xs={12} md={9}>
            <Item>
              <DuealChartInputsss/>
            </Item>

            {xAxis.length > 0 && chartType === "pie" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <Pie categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "line" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <LineChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "scatter" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <ScatterPlot categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "bar" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <BarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}

            
            {xAxis.length > 0 && chartType === "area" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <AreaChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "polarArea" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <PolarAreaChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "textChart" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <TextChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
             {xAxis.length > 0 && chartType === "singleValueChart" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <SingleValueChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}


            {xAxis.length > 0 && chartType === "mapchart" && (
                          <div style={{ marginTop: '20px' }}>
                            <Items>
                              <div className="chart-container">
                                <MapChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                              </div>
                            </Items>
                            <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}


            {xAxis.length > 0 && chartType === "duealChart" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <DuelAxisChart
                      categories={plotData?.categories}
                      series1={plotData?.series1}
                      series2={plotData?.series2}
                      aggregation={plotData?.aggregation}
                    />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "duealbarChart" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <DuelBarChart
                      categories={plotData?.categories}
                      series1={plotData?.series1}
                      series2={plotData?.series2}
                      aggregation={plotData?.aggregation}
                    />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {chartType === "treeHierarchy"  && (
                          <div style={{ marginTop: '20px' }}>
                              <div >
                                <TreeHierarchy/>
                              </div>
                              <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}


{chartType === "sampleAitestChart"  && (
                          <div style={{ marginTop: '20px' }}>
                              <div >
                                <SampleAiTestChart/>
                              </div>
                              <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}

{chartType === "AiCharts"  && (
                          <div style={{ marginTop: '20px' }}>
                            {/* <Items> */}
                              <div className="chart-container">
                                <AiChart/>
                              </div>
                              {/* </Items> */}
                              <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}


             {xAxis.length > 0 && chartType === "animatedTreeChart" && (
             <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <Treemap categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>

                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}

          {xAxis.length > 0 && chartType === "hierarchialBarChart" && (
                      <div style={{ marginTop: '20px' }}>
                          <Items>
                            <div className="chart-container">
                              <HierarchicalBarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>

                            </div>
                          </Items>
                          <div className='btn-container'>
                            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                          </div>
                        </div>
                      )}
          </Grid>
          <Grid item xs={12} md={1.5}>
            <Item>
              <DashboardCharts />
            </Item>
            {xAxis.length > 0 && (
              <div style={{ marginTop: '20px',marginRight:'25px'}}>
                {/* <Item> */}
                  <ChartColor />
                {/* </Item> */}
              </div>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Modal for saving data */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Data</DialogTitle>
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
    </div>
  );
}

export default Dashboard;
