import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import Checkbox from "@mui/material/Checkbox";
import '../Style.css';
import {setXAxis, setYAxis, setAggregate,setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,generateChart
} from '../../features/Dashboard-Slice/chartSlice';
import { fetchFilterOptionsAPI } from '../../utils/api';

import { io } from "socket.io-client";

function DuealChartInput() {
  const dispatch = useDispatch();
  const {
    xAxis, yAxis,aggregate,
    filterOptions, checkedOptions, showFilterDropdown, selectAllChecked} = useSelector(state => state.chart);

  const chartType=useSelector(state=>state.chartType.type);
  const SelectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const barColor = useSelector((state) => state.chartColor.chartColor);
  // const databaseName = useSelector((state) => state.database.databaseName);
  const databaseName = localStorage.getItem('company_name');  
  const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
  const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
  console.log('excelCheckedPaths:', excelCheckedPaths);
  console.log('csvCheckedPaths:', csvCheckedPaths);
  const selectedTablearray = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
  const selectedTable=selectedTablearray.join(',');

  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    if (xAxis.length > 0) {
      // Automatically fetch filter options for the last added column
      const lastAddedColumn = xAxis[xAxis.length - 1];
      fetchFilterOptions(lastAddedColumn);
    }
  }, [xAxis]);
  
  const fetchFilterOptions = async (columnName) => {
    try {
      // console.log('fetchFilterOptions------------:', columnName);
      const options = await fetchFilterOptionsAPI(databaseName, selectedTable, columnName,xAxis);
      dispatch(setFilterOptions(options));
      dispatch(setCheckedOptions(options));
      // Do not show the dropdown here, it will only be triggered on filter icon click
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };
  
  const handleFilterIconClick = (columnName) => {
    // Toggle the dropdown visibility
    if (showFilterDropdown) {
      dispatch(setShowFilterDropdown(false));
    } else {
      // Ensure the filter options are already fetched
      const optionsForColumn = filterOptions; // Assume filterOptions are already fetched
      if (optionsForColumn.length === 0) {
        fetchFilterOptions(columnName).then(() => {
          dispatch(setShowFilterDropdown(true));
        });
      } else {
        dispatch(setShowFilterDropdown(true));
      }
    }
  };
  

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    dispatch(setSelectAllChecked(isChecked));
    if (isChecked) {
      dispatch(setCheckedOptions([...filterOptions]));
    } else {
      dispatch(setCheckedOptions([]));
    }
  };



  React.useEffect(() => {
    if (xAxis.length > 0) {
      const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
      fetchFilterOptions(columnName); // Fetch filter options but do not show the dropdown
    }
  }, [xAxis]); // Trigger whenever xAxis changes
  
  const handleCheckboxChange = (option) => {
    let updatedOptions;
    if (checkedOptions.includes(option)) {
      updatedOptions = checkedOptions.filter(item => item !== option);
    } else {
      updatedOptions = [...checkedOptions, option];
    }
    dispatch(setCheckedOptions(updatedOptions));
    dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
  };
  const removeColumnFromYAxis = (columnNameToRemove) => {
    const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
    dispatch(setYAxis(updatedYAxis));
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, target) => {
    event.preventDefault();
    // console.log("chart type.............................................",chartType)
    const columnName = event.dataTransfer.getData("columnName");
  
    const singleColumnChartTypes = ["bar", "pie", "scatter", "line", "area", "polarArea"]; // List of chart types that allow only one column on the X-axis
  
    if (target === "x-axis") {
      if (singleColumnChartTypes.includes(chartType)) {
        // Replace the existing column for specified chart types
        dispatch(setXAxis([columnName]));
      } else {
        // Allow multiple columns for other chart types
        if (!xAxis.includes(columnName)) {
          dispatch(setXAxis([...xAxis, columnName]));
        }
      }
    } else if (target === "y-axis") {
      if (!yAxis.includes(columnName)) {
        dispatch(setYAxis([...yAxis, columnName]));
      }
    }
  };
  
  


  const removeColumnFromXAxis = (columnNameToRemove) => {
    const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
    dispatch(setXAxis(updatedXAxis));
    dispatch(setShowFilterDropdown(false));
  };

  React.useEffect(() => {
    if (xAxis.length > 0) {
      const columnName = xAxis[xAxis.length - 1]; // Get the latest X-axis column
      fetchFilterOptions(columnName);
    }
  }, [xAxis]); // Trigger whenever xAxis changes
  React.useEffect(() => {
    if (
      selectedTable &&
      xAxis.length > 0 &&
      yAxis.length > 0 &&
      aggregate &&
      checkedOptions.length > 0 &&
      databaseName
    ) {
      const newSocket = io("http://localhost:5000", {
        query: {
          selectedTable,
          xAxis,
          yAxis,
          aggregate,
          filterOptions: checkedOptions.join(", "),
          databaseName,
          chartType,
        },
        
      });
      newSocket.on("chart_update", (data) => {
        console.log("🔥🔥🔥🔥Received chart update:", data);

        dispatch(
          generateChart({
            selectedTable,
            xAxis,
            yAxis,
            aggregate,
            chartType,
            checkedOptions,
            chartData: data.data, // Store the new data
          })
        );
      });
      

    
  
      setSocket(newSocket);
  

  
      return () => {
        newSocket.disconnect(); // Cleanup previous socket connection
      };
    }
  }, [selectedTable, xAxis, yAxis, aggregate, checkedOptions, databaseName, dispatch, chartType]);
  
  return (
    <div className="App">
                <div className="dash-right-side-container">
                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    <label htmlFor="x-axis-input">X-axis: </label>
                    <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
                      <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {xAxis.map((column, index) => (
                          <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{cursor: "pointer"}}>
                              <FilterListIcon />
                            </span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromXAxis(column)} />
                          </div>
                        ))}
                      </div>
                      {showFilterDropdown && (
  <div className="filter-dropdown">
    <List
      sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
    >
      <label>
        <ListItemButton sx={{ height: "35px" }}>
          <ListItemIcon>
            <Checkbox
              style={{ marginLeft: '10px' }}
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
            />
          </ListItemIcon>
          Select All
        </ListItemButton>
      </label>
    </List>
    {filterOptions.map((option, index) => (
      <List
        sx={{ width: "20%", maxWidth: 260, bgcolor: "background.paper", zIndex: 1000 }}
        key={index}
      >
        <label>
          <ListItemButton sx={{ height: "35px" }}>
            <ListItemIcon>
              <Checkbox
                style={{ marginLeft: '10px' }}
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
                    
                  <div className="input-fields">
                  {/* <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}> */}
                    <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
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
                        {/* <option value="variance">Variance</option> */}
                      </NativeSelect>
                    </FormControl>

                  </div>
                    
                  </div>
                  

                  <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                  <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
                  <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
                  <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
                        {yAxis.map((column, index) => (
                          <div key={index} className="y-axis-column" style={{maxHeight:"30px"}}>
                            <span>{column}</span>
                            <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
                          </div>
                        ))}
                        
                  </div>
                  
                   </div>
                   <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        </div>
                  </div>

                </div>
    </div>
  );
}

export default DuealChartInput;


