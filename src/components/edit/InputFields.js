import React, { useState, useEffect } from "react";
import axios from "axios";
import Pie from '../charts/Pie';
import LineChart from '../charts/lineChart';
import ScatterPlot from '../charts/scatterChart';
import BarChart from '../charts/barChart';
import { Box, Checkbox, FormControl, Grid, InputLabel, List, ListItemButton, ListItemIcon, NativeSelect, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import { setAggregate, setXAxis, setYAxis, setChartData, setFilterOptions, setSelectedTable, setChartType } from "../../features/EditChart/EditChartSlice";
import AreaChart from "../charts/area";
import DuelAxisChart from "../charts/duelAxesChart";
import TextChart from "../charts/textChart";
import PolarAreaChart from "../charts/polarArea";

import {fetchFilterOptionsAPI,generateChartData,saveChartData} from '../../utils/api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function EditDashboard() {
  const [plotData, setPlotData] = useState({});
  const [isChartGenerationClicked, setIsChartGenerationClicked] = useState(false);
  const [isDrillDownEnabled, setIsDrillDownEnabled] = useState(false);

  const [filterOptions, setFilterOptions] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(true);

  const [barColor, setBarColor] = useState("#2196f3");
  const [dashboardPlotData, setDashboardPlotData] = useState({});
  const [dashboardBarColor, setDashboardBarColor] = useState("#2196f3");

  const chartType1 = useSelector(state => state.chartType.type);
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
  const filterOptionsas = filterOptionss.split(', ');
  console.log("filterOptionsas--------------------------1",filterOptionsas)

  console.log("filterOptions-----------------------------2",filterOptions)

  useEffect(() => {
    if (chartType1) {
      dispatch(setChartType(chartType1));
    }
  }, [chartType1, dispatch]);

  useEffect(() => {
    if (xAxis && yAxis && aggregate && chartType && barColor) {
      generateChart();
    }
  }, [xAxis, yAxis, aggregate, chartType, checkedOptions]);

  const generateChart = async () => {
    setIsChartGenerationClicked(true);
    try {
      const data = await generateChartData(
        selectedTable,
        xAxis,
        yAxis,
        aggregate,
        chartType,
        checkedOptions,
        databaseName
      );
      setPlotData(data);
    } catch (error) {
      console.error('Error generating chart:', error);
    }
  };

  console.log("checkedOptions---------------00000000000",checkedOptions)

  console.log("databaseName",databaseName)
  console.log("selectedTable",selectedTable)
  // console.log("columnNames",columnName)

const fetchFilterOptions = async (columnName) => {

  try {
    const options = await fetchFilterOptionsAPI(databaseName,selectedTable, columnName);
    setFilterOptions(options);          // Update filter options state
    setCheckedOptions(chartData[9]);    // Set default checked options
    setShowFilterDropdown(true);        // Show filter dropdown
    setSelectAllChecked(false);         // Reset "Select All" checkbox
  } catch (error) {
    console.error('Failed to fetch filter options:', error);
  }
};

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAllChecked(isChecked);
    if (isChecked) {
      setCheckedOptions([...filterOptions, ...chartData[9]]);
    } else {
      setCheckedOptions([]);
    }
    generateChart(); // Update chart when select all changes
  };

  const handleFilterIconClick = (columnName) => {
    if (showFilterDropdown) {
      setShowFilterDropdown(false);
    } else {
      fetchFilterOptions(columnName);
    }
  };

  const handleCheckboxChange = (option) => {
    let updatedOptions;
    const currentOptions = Array.isArray(checkedOptions) ? checkedOptions : [];

    if (currentOptions.includes(option)) {
      updatedOptions = currentOptions.filter(item => item !== option);
    } else {
      updatedOptions = [...currentOptions, option];
    }
    setCheckedOptions(updatedOptions);
    setSelectAllChecked(updatedOptions.length === filterOptions.length);
    generateChart(); // Update chart when individual checkboxes change
  };

  const removeColumnFromXAxis = (columnNameToRemove) => {
    const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
    dispatch(setXAxis(updatedXAxis));
    setShowFilterDropdown(false);
  };

  useEffect(() => {
    if (xAxis.length > 1) {
      setIsDrillDownEnabled(true);
    } else {
      setIsDrillDownEnabled(false);
    }
  }, [xAxis]);

const saveDataToDatabase = async () => {
  try {
    const data = {
      chartId,
      selectedTable,
      xAxis,
      yAxis,
      aggregate,
      chartType,
      plotData,
      barColor,
      dashboardPlotData,
      dashboardBarColor,
      checkedOptions,
    };
    const response = await saveChartData(data);
    alert('saved successfully!');
    console.log('Data saved successfully:', response);
  } catch (error) {
    alert('not Saved!');
    console.error('Error saving data:', error);
  }
};


  return (
    <div className="App">
    
          <Item>
                <div className="dash-right-side-container">
                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    <label htmlFor="x-axis-input">X-axis: </label>
                    <div className="input-fields" style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
                      <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {xAxis.map((column, index) => (
                          <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <span className="filter-icon" onClick={() => handleFilterIconClick(column)}>
                              <FilterListIcon />
                            </span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
                          </div>
                        ))}
                      </div>
                      {showFilterDropdown && (
                        <div className="filter-dropdown">
                          <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
                            <label>
                              <ListItemButton sx={{ height: "35px" }}>
                                <ListItemIcon>
                                  <Checkbox style={{ marginLeft: '10px' }}
                                    checked={selectAllChecked}
                                    onChange={handleSelectAllChange}
                                  />
                                </ListItemIcon>
                                Select All
                              </ListItemButton>
                            </label>
                          </List>
                          {filterOptions.map((option, index) => (
                            <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
                              <label>
                                <ListItemButton sx={{ height: "35px" }}>
                                  <ListItemIcon>
                                    <Checkbox style={{ marginLeft: '10px' }}
                                      type="checkbox"
                                      value={option}
                                      checked={checkedOptions.includes(option)}
                                      onChange={() => handleCheckboxChange(option)}
                                    />
                                  </ListItemIcon>
                                  {option}
                                </ListItemButton>
                              </label>
                            </List>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <div className="input-fields"> */}
                    <FormControl style={{ width: '250px',  marginLeft: '50px', marginTop: '10px' }}>
                      <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
                      <NativeSelect
                        style={{ marginRight: '10px' }} value={aggregate} onChange={(event) => dispatch(setAggregate(event.target.value))}
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
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis: </label>
                    <div className="input-fields"  style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' ,marginTop:'5px'}}>

                    <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>



                        {yAxis.map((columnName) => (
                          <div key={columnName} className="x-axis-column" value={yAxis} onChange={(event) => dispatch(setYAxis(event.target.value))} style={{maxHeight:"30px"}}>
                            <span>{columnName}</span>
                            </div>
                        ))}

                        </div>
                    </div>
                    </div>


                </div>
                </Item>
                {xAxis.length > 0 && chartType === "pie" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <Pie categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}
          {xAxis.length > 0 && chartType === "line" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <LineChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}
          {xAxis.length > 0 && chartType === "scatter" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <ScatterPlot categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}

          {xAxis.length > 0 && chartType === "bar" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <BarChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}

{xAxis.length > 0 && chartType === "area" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <AreaChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}
          {xAxis.length > 0 && chartType === "polarArea" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <PolarAreaChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}
          {xAxis.length > 0 && chartType === "textChart" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <TextChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save</button>
              </Item>
            </div>
          )}
          {xAxis.length > 0 && chartType === "duealChart" && (
            <div style={{ marginTop: '20px' }}>
              <Item>
                <div className="chart-container">
                  <DuelAxisChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
                </div>
                <button className="save-button" onClick={saveDataToDatabase}>Save </button>
              </Item>
            </div>
          )}
    </div>
  );
}

export default EditDashboard;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Pie from '../charts/Pie';
// import LineChart from '../charts/lineChart';
// import ScatterPlot from '../charts/scatterChart';
// import BarChart from '../charts/barChart';
// import {Snackbar, Alert, Box, Checkbox, FormControl, Grid, InputLabel, List, ListItemButton, ListItemIcon, NativeSelect, Paper, styled } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { setAggregate, setXAxis, setYAxis, setChartData, setFilterOptions, setSelectedTable, setChartType } from "../../features/EditChart/EditChartSlice";
// import AreaChart from "../charts/area";
// import DuelAxisChart from "../charts/duelAxesChart";
// import TextChart from "../charts/textChart";
// import PolarAreaChart from "../charts/polarArea";
// import TreeHierarchy from '../charts/treeHierarchy'; 

// import MapChart from '../charts/mapchart';
// import SingleValueChart from '../charts/singleValueChart';
// import ChartColor from '../charts/color';
// import TreeMap from '../charts/animatedTreeChart';
// import HierarchicalBarChart from'../charts/hierarchialBarChart';


// import DuelBarChart from '../charts/duelBarChart';

// import SampleAiTestChart from '../charts/sampleAiTestChart';
// import BoxPlotChart from '../charts/BoxPlotChart';
// import Treemap from '../charts/animatedTreeChart';
// import AiChart from '../charts/aiChart';
// import WordCloudChart from '../charts/wordCloudChart';
// import {fetchFilterOptionsAPI,generateChartData} from '../../utils/api';
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


// const Items = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   height: '635px',
// }));
// function EditDashboard() {
//   const [plotData, setPlotData] = useState({});
//   const [isChartGenerationClicked, setIsChartGenerationClicked] = useState(false);
//   const [isDrillDownEnabled, setIsDrillDownEnabled] = useState(false);

//   const [filterOptions, setFilterOptions] = useState([]);
//   const [checkedOptions, setCheckedOptions] = useState([]);
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [selectAllChecked, setSelectAllChecked] = useState(true);
//   const [showSnackbar, setShowSnackbar] = useState(false); // Snackbar visibility
//   const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar severity

//   const [barColor, setBarColor] = useState("#2196f3");
//   const [dashboardPlotData, setDashboardPlotData] = useState({});
//   const [dashboardBarColor, setDashboardBarColor] = useState("#2196f3");

//   const chartType1 = useSelector(state => state.chartType.type);
//   const dispatch = useDispatch();

//   const chartType = useSelector(state => state.chartdata.chartType);
//   const aggregate = useSelector(state => state.chartdata.aggregate) || "";
//   const chartData = useSelector((state) => state.chartdata.chartData || []);
//   const selectedTable = chartData[1] || "";
//   const xAxis = chartData[2] || [];
//   const yAxis = chartData[3] || [];
//   const chartId = chartData[0] || "";
//   const databaseName = chartData[10] || "";
//   const filterOptionss = chartData[9] || "";
//   const selectedUser=chartData[11]||"";
//   const filterOptionsas = filterOptionss.split(', ');

//   console.log("filterOptionsas--------------------------1",filterOptionsas)

//   console.log("filterOptions-----------------------------2",filterOptions)

//   useEffect(() => {
//     if (chartType1) {
//       dispatch(setChartType(chartType1));
//     }
//   }, [chartType1, dispatch]);

  
//   useEffect(() => {
//     if (xAxis.length > 0) {
//       const firstColumn = xAxis[0];
  
//       // Fetch filter options asynchronously
//       fetchFilterOptions(firstColumn);
//       generateChart();
//     }
//   }, [xAxis, chartData]);
  
  
//   useEffect(() => {
//     if (xAxis && yAxis && aggregate && chartType && barColor) {
//       generateChart();
//     }
//   }, [xAxis, yAxis, aggregate, chartType, checkedOptions]);

// const generateChart = async () => {
//   setIsChartGenerationClicked(true);
//   try {
//     const data = {
//       selectedTable,
//       xAxis,
//       yAxis,
//       aggregate,
//       chartType,
//       checkedOptions,
//       databaseName,
//       selectedUser
//     };
    
//     const chartData = await generateChartData(data);
//     setPlotData(chartData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

//   const fetchFilterOptions = async (columnName) => {
//     try {
//       const options = await fetchFilterOptionsAPI( databaseName,selectedTable,columnName, selectedUser);
//       console.log("options", options);
      
//       setFilterOptions(options);
//       setCheckedOptions(options);
//       setShowFilterDropdown(false);
//       setSelectAllChecked(false);
//     } catch (error) {
//       console.error('Error fetching filter options:', error);
//     }
//   };

//   const handleSelectAllChange = (event) => {
//     const isChecked = event.target.checked;
//     setSelectAllChecked(isChecked);
//     if (isChecked) {
//       setCheckedOptions([...filterOptions, ...chartData[9]]);
//     } else {
//       setCheckedOptions([]);
//     }
//     generateChart(); // Update chart when select all changes
//   };


//     const handleFilterIconClick = async (columnName) => {
//       if (showFilterDropdown) {
//         // Close the dropdown if it's already open
//         setShowFilterDropdown(false);
//       } else {
//         // Fetch filter options for the selected column and open the dropdown
//         await fetchFilterOptions(columnName); // Ensure correct column name is passed
//         setShowFilterDropdown(true);
//       }
//     };
    

//   const handleCheckboxChange = (option) => {
//     let updatedOptions;
//     const currentOptions = Array.isArray(checkedOptions) ? checkedOptions : [];

//     if (currentOptions.includes(option)) {
//       updatedOptions = currentOptions.filter(item => item !== option);
//     } else {
//       updatedOptions = [...currentOptions, option];
//     }
//     setCheckedOptions(updatedOptions);
//     setSelectAllChecked(updatedOptions.length === filterOptions.length);
//     generateChart(); // Update chart when individual checkboxes change
//   };

//   const removeColumnFromXAxis = (columnNameToRemove) => {
//     const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setXAxis(updatedXAxis));
//     setShowFilterDropdown(false);
//   };

//   useEffect(() => {
//     if (xAxis.length > 1) {
//       setIsDrillDownEnabled(true);
//     } else {
//       setIsDrillDownEnabled(false);
//     }
//   }, [xAxis]);

//   const saveDataToDatabase = async () => {
//     try {
//       console.log('Sending data to save:', {
//         chartId,
//         selectedTable,
//         xAxis,
//         yAxis,
//         aggregate,
//         chartType,
//         chartData: plotData,
//         chartColor: barColor,
//         drilldownChartData: dashboardPlotData,
//         drillDownChartColor: dashboardBarColor,
//         filterOptions: checkedOptions.join(', '),
//         selectedUser
//       });

//       const response = await axios.post('http://localhost:5000/update_data', {
//         chartId,
//         selectedTable,
//         xAxis,
//         yAxis,
//         aggregate,
//         chartType,
//         chartData: plotData,
//         chartColor: barColor,
//         drilldownChartData: dashboardPlotData,
//         drillDownChartColor: dashboardBarColor,
//         filterOptions: checkedOptions.join(', '),
//         selectedUser
//       });
//       console.log("Data saved successfully:", response.data);
//       setSnackbarMessage("Data saved successfully!");
//       setSnackbarSeverity("success");
//       setShowSnackbar(true);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       setSnackbarMessage("Failed to save data. Please try again.");
//       setSnackbarSeverity("error");
//       setShowSnackbar(true);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setShowSnackbar(false);
//   };


//   return (
//     <div className="App">
    
//           <Item>
//                 <div className="dash-right-side-container">
//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                     <label htmlFor="x-axis-input">X-axis: </label>
//                     <div className="input-fields" style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                       <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {xAxis.map((column, index) => (
//                           <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)}>
//                               <FilterListIcon />
//                             </span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
//                           </div>
//                         ))}
//                       </div>
//                       {showFilterDropdown && (
//                         <div className="filter-dropdown">
//                           <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}>
//                             <label>
//                               <ListItemButton sx={{ height: "35px" }}>
//                                 <ListItemIcon>
//                                   <Checkbox style={{ marginLeft: '10px' }}
//                                     checked={selectAllChecked}
//                                     onChange={handleSelectAllChange}
//                                   />
//                                 </ListItemIcon>
//                                 Select All
//                               </ListItemButton>
//                             </label>
//                           </List>
//                           {filterOptions.map((option, index) => (
//                             <List sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }} key={index}>
//                               <label>
//                                 <ListItemButton sx={{ height: "35px" }}>
//                                   <ListItemIcon>
//                                     <Checkbox style={{ marginLeft: '10px' }}
//                                       type="checkbox"
//                                       value={option}
//                                       checked={checkedOptions.includes(option)}
//                                       onChange={() => handleCheckboxChange(option)}
//                                     />
//                                   </ListItemIcon>
//                                   {option}
//                                 </ListItemButton>
//                               </label>
//                             </List>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     {/* <div className="input-fields"> */}
//                     <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
//                                           <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
//                                           <NativeSelect
//                                             style={{ marginRight: '10px' }} value={aggregate} onChange={(event) => dispatch(setAggregate(event.target.value))}
//                                             inputProps={{
//                                               name: 'age',
//                                               id: 'uncontrolled-native',
//                                             }}
//                                           >
//                                            <option value=""></option>
//                                             <option value="sum">Sum</option>
//                                             <option value="average">Average</option>
//                                             <option value="count">Count</option>
//                                             <option value="minimum">Minimum</option>
//                                             <option value="maximum">Maximum</option>
//                                             <option value="variance">Variance</option>
//                                           </NativeSelect>
//                                         </FormControl>
//                   {/* </div> */}
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                     <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis: </label>
//                     <div className="input-fields"  style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' ,marginTop:'5px'}}>
//               <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>



//                         {yAxis.map((columnName) => (
//                           <div key={columnName} className="x-axis-column" value={yAxis} onChange={(event) => dispatch(setYAxis(event.target.value))} style={{maxHeight:"30px"}}>
//                             <span>{columnName}</span>
//                             </div>
//                         ))}

//                         </div>

//    </div>
//                     </div>
//                 </div>
//                 </Item>
//                 {xAxis.length > 0 && chartType === "pie" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <Pie categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}
//           {xAxis.length > 0 && chartType === "line" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <LineChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}
//           {xAxis.length > 0 && chartType === "scatter" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <ScatterPlot categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}

//           {xAxis.length > 0 && chartType === "bar" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <BarChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}

// {xAxis.length > 0 && chartType === "area" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <AreaChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}
//           {xAxis.length > 0 && chartType === "polarArea" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <PolarAreaChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}
//           {xAxis.length > 0 && chartType === "textChart" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <TextChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}
//           {xAxis.length > 0 && chartType === "duealChart" && (
//             <div style={{ marginTop: '20px' }}>
//               <Item>
//                 <div className="chart-container">
//                   <DuelAxisChart categories={plotData && plotData.categories} values={plotData && plotData.values} aggregation={plotData && plotData.aggregation} />
//                 </div>
//                 <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//               </Item>
//             </div>
//           )}

// {xAxis.length > 0 && chartType === "singleValueChart" && (
//               <div style={{ marginTop: '20px' }}>
//                 <Item>
//                   <div className="chart-container">
//                     <SingleValueChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
//                   </div>
//                 </Item>
//                 <div className='btn-container'>
//                   <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//                 </div>
//               </div>
//             )}


//             {xAxis.length > 0 && chartType === "mapchart" && (
//                           <div style={{ marginTop: '20px' }}>
//                             <Item>
//                               <div className="chart-container">
//                                 <MapChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
//                               </div>
//                             </Item>
//                             <div className='btn-container'>
//                               <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//                             </div>
//                           </div>
//                         )}

//             {chartType === "treeHierarchy"  && (
//                           <div style={{ marginTop: '20px' }}>
//                               <div >
//                                 <TreeHierarchy/>
//                               </div>
//                               <div className='btn-container'>
//                               <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//                             </div>
//                           </div>
//                         )}
//             {xAxis.length > 0 && chartType === "animatedTreeChart" && (
//               <div style={{ marginTop: '20px' }}>
//                  <Item>
//                    <div className="chart-container">
//                      <TreeMap categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>

//                    </div>
//                  </Item>
//                  <div className='btn-container'>
//                    <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//                  </div>
//                </div>)}
//                {xAxis.length > 0 && chartType === "hierarchialBarChart" && (
//               <div style={{ marginTop: '20px' }}>
//                 <Item>
//                   <div className="chart-container">
//                     <HierarchicalBarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
//                   </div>
//                 </Item>
//                 <div className='btn-container'>
//                   <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//                 </div>
//               </div>
              
//             )}
            
//             {chartType === "sampleAitestChart"  && (
//                           <div style={{ marginTop: '20px' }}>
//                               <div >
//                                 <SampleAiTestChart/>
//                               </div>
//                               <div className='btn-container'>
//                               <button className="save-button" onClick={saveDataToDatabase}>Save Chart</button>
//                             </div>
//                           </div>
//                         )}
// {chartType === "AiCharts"  && (
//                           <div style={{ marginTop: '20px' }}>
//                             {/* <Items> */}
//                               <div className="chart-container">
//                                 <AiChart/>
//                               </div>
//                               {/* </Items> */}
//                               <div className='btn-container'>
//                               <button className="save-button" onClick={saveDataToDatabase}>Save Chart</button>
//                             </div>
//                           </div>
//                         )}


//              {xAxis.length > 0 && chartType === "animatedTreeChart" && (
//              <div style={{ marginTop: '20px' }}>
//                 <Items>
//                   <div className="chart-container">
//                     <Treemap categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>

//                   </div>
//                 </Items>
//                 <div className='btn-container'>
//                   <button className="save-button" onClick={saveDataToDatabase}>Save Chart</button>
//                 </div>
//               </div>
//             )}
//             {xAxis.length > 0 && chartType === "wordCloud" && (
//               <div style={{ marginTop: '20px' }}>
//                 <Items>
//                   <div className="chart-container">
//                     <WordCloudChart categories={plotData?.categories} values={plotData?.values}  />
//                     </div>
//                 </Items>
//                 <div className='btn-container'>
//                   <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//                 </div>
//               </div>
//             )}
//             <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// export default EditDashboard;