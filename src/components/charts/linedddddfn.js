
// import React, { useEffect, useRef, useState } from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// import "./tooltip.css"; // Import the CSS for the tooltip
// import ContectMenu from "./contextMenu";
// import CustomToolTip from "./customToolTip";
// import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import { sendCategoryToBackend, fetchPredictionDataAPI } from '../../utils/api';
// import Draggable from "react-draggable";

// const LineChart = ({ categories, values, aggregation }) => {
//     const dispatch = useDispatch();
//     const lineColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);

//     const [plotData, setPlotData] = useState({ categories, values });
//     const [barClicked, setBarClicked] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [timePeriod, setTimePeriod] = useState("");
//     const [number, setNumber] = useState("");

//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const contextMenuRef = useRef(null);

//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const data = await sendCategoryToBackend(
//                 clickedCategory,
//                 xAxis,
//                 yAxis,
//                 selectedTable,
//                 aggregate
//             );
//             setPlotData(data);
//             setBarClicked(true);
//         } catch (error) {
//             console.error('Error handling click event:', error);
//         }
//     };

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     const handleClickOutside = (event) => {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//             setContextMenuVisible(false);
//         }
//     };

//     const handleShowPopup = () => {
//         setPopupVisible(true);
//         setContextMenuVisible(false);
//     };

//     const handleClosePopup = () => {
//         setPopupVisible(false);
//     };

//     const isDateCategory = (category) => {
//         const datePattern1 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // YYYY-MM-DD HH:MM:SS
//         const datePattern2 = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // MM/DD/YYYY
//         return datePattern1.test(category) || datePattern2.test(category);
//     };
//     const areCategoriesDates = categories.some(isDateCategory);
//     console.log("areCategoriesDates", areCategoriesDates);

//         useEffect(() => {
//             document.addEventListener('click', handleClickOutside);
//             return () => {
//                 document.removeEventListener('click', handleClickOutside);
//             };
//         }, []);

//     const handlePredictData = async () => {
//         try {
//             const predictionData = await fetchPredictionDataAPI({
//                 xAxis,
//                 yAxis,
//                 timePeriod,
//                 number,
//             });

//             setPlotData({
//                 categories: predictionData.map((item) => item.category),
//                 values: predictionData.map((item) => item.value),
//             });

//             handleCloseModal();
//         } catch (error) {
//             console.error("Failed to fetch prediction data:", error);
//         }
//     };

//     const handleOpenModal = () => setModalOpen(true);
//     const handleCloseModal = () => setModalOpen(false);

//     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);
//     const handleNumberChange = (event) => setNumber(event.target.value);

//     const handleSortAscending = () => {
//         const sortedData = plotData.categories.map((category, index) => ({
//             category,
//             value: plotData.values[index]
//         }));

//         sortedData.sort((a, b) => a.value - b.value);

//         setPlotData({
//             categories: sortedData.map(item => item.category),
//             values: sortedData.map(item => item.value)
//         });
//     };

//     const handleSortDescending = () => {
//         const sortedData = plotData.categories.map((category, index) => ({
//             category,
//             value: plotData.values[index]
//         }));

//         sortedData.sort((a, b) => b.value - a.value);

//         setPlotData({
//             categories: sortedData.map(item => item.category),
//             values: sortedData.map(item => item.value)
//         });
//     };

//     const options = {
//         chart: {
//             events: {
//                 dataPointSelection: handleClicked
//             },
//             toolbar: {
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
//                             title: 'Sort Ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
//                             title: 'Sort Descending',
//                             click: handleSortDescending
//                         }
//                     ],
//                     download: true,
//                     selection: true,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: true,
//                     reset: true,
//                 }
//             }
//         },
//         xaxis: {
//             categories: plotData.categories || [],
//             title: { text: `${xAxis}` },
//             labels: { style: { fontSize: '12px', colors: ['#000'] } }
//         },
//         yaxis: {
//             title: { text: `${yAxis}` },
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000'],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) { // For values in crores (millions)
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) { // For values in lakhs (hundred thousand)
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) { // For values in thousands
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value; // For smaller values
//                     }
//                 }
//             },
//         },
//         tooltip: {
//             custom: ({ series, seriesIndex, dataPointIndex }) => {
//                 const category = plotData.categories[dataPointIndex];
//                 const value = series[seriesIndex][dataPointIndex];
//                 const currentAggregation = aggregation || 'Aggregation';
//                 const currentXAxis = xAxis[0] || 'X-Axis';
//                 const currentYAxis = yAxis || 'Y-Axis';
//                 return `
//                 <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//                     ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
//                     <div>
//                         ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
//                         ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
//                     </div>
//                 </div>
//                 `;
//             }
//         },
//         colors: [lineColor]
//     };

//     const series = [{
//         name: aggregation || 'Series',
//         data: plotData.values || []
//     }];

//     return (
//         <div>
//             <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu}>
//             <div className="chart-title">{customHeadings}</div>
//                 <Chart options={options} series={series} type="line" width="100%" height="100%" />
//             </ResizableBox>

//                                      {areCategoriesDates && (
//                                     <Button variant="contained" onClick={handleOpenModal}>
//                                         Predict Data
//                                     </Button>
//                                 )}
//  <Modal open={modalOpen} onClose={handleCloseModal}>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: 400,
//                         bgcolor: "background.paper",
//                         borderRadius: 1,
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                         <InputLabel>Time Period</InputLabel>
//                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
//                             <MenuItem value="years">Years</MenuItem>
//                             <MenuItem value="months">Months</MenuItem>
//                             <MenuItem value="days">Days</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <TextField
//                         fullWidth
//                         label="Enter Number"
//                         value={number}
//                         onChange={handleNumberChange}
//                         type="number"
//                         sx={{ mb: 2 }}
//                     />

//                     <Button variant="contained" onClick={handlePredictData} fullWidth>
//                         Submit
//                     </Button>
//                 </Box>
//             </Modal>
//             {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//                              {popupVisible && (
//         <Draggable>
//           <div>
//             <CustomToolTip onClose={handleClosePopup} />
//           </div>
//         </Draggable>
//       )}
//         </div>
//     );
// };

// export default LineChart;





// import React, { useEffect, useRef, useState } from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// import "./tooltip.css"; // Import the CSS for the tooltip
// import ContectMenu from "./contextMenu";
// import CustomToolTip from "./customToolTip";
// import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import { sendCategoryToBackend, fetchPredictionDataAPI } from '../../utils/api';
// import Draggable from "react-draggable";

// const LineChart = ({ categories, values, aggregation }) => {
//     const dispatch = useDispatch();
//     const lineColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);

//     const [plotData, setPlotData] = useState({ categories, values });
//     const [barClicked, setBarClicked] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [timePeriod, setTimePeriod] = useState("");
//     const [number, setNumber] = useState("");

//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const contextMenuRef = useRef(null);

//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const data = await sendCategoryToBackend(
//                 clickedCategory,
//                 xAxis,
//                 yAxis,
//                 selectedTable,
//                 aggregate
//             );
//             setPlotData(data);
//             setBarClicked(true);
//         } catch (error) {
//             console.error('Error handling click event:', error);
//         }
//     };

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     const handleClickOutside = (event) => {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//             setContextMenuVisible(false);
//         }
//     };

//     const handleShowPopup = () => {
//         setPopupVisible(true);
//         setContextMenuVisible(false);
//     };

//     const handleClosePopup = () => {
//         setPopupVisible(false);
//     };

//     const handlePredictData = async () => {
//         try {
//             const predictionData = await fetchPredictionDataAPI({
//                 xAxis,
//                 yAxis,
//                 timePeriod,
//                 number,
//             });

//             setPlotData({
//                 categories: predictionData.map((item) => item.category),
//                 values: predictionData.map((item) => item.value),
//             });

//             handleCloseModal();
//         } catch (error) {
//             console.error("Failed to fetch prediction data:", error);
//         }
//     };

//     const handleOpenModal = () => setModalOpen(true);
//     const handleCloseModal = () => setModalOpen(false);

//     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);
//     const handleNumberChange = (event) => setNumber(event.target.value);

//     const handleSortAscending = () => {
//         const sortedData = plotData.categories.map((category, index) => ({
//             category,
//             value: plotData.values[index]
//         }));

//         sortedData.sort((a, b) => a.value - b.value);

//         setPlotData({
//             categories: sortedData.map(item => item.category),
//             values: sortedData.map(item => item.value)
//         });
//     };

//     const handleSortDescending = () => {
//         const sortedData = plotData.categories.map((category, index) => ({
//             category,
//             value: plotData.values[index]
//         }));

//         sortedData.sort((a, b) => b.value - a.value);

//         setPlotData({
//             categories: sortedData.map(item => item.category),
//             values: sortedData.map(item => item.value)
//         });
//     };

//     const options = {
//         chart: {
//             events: {
//                 dataPointSelection: handleClicked
//             },
//             toolbar: {
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
//                             title: 'Sort Ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
//                             title: 'Sort Descending',
//                             click: handleSortDescending
//                         }
//                     ],
//                     download: true,
//                     pan: true,
//                     reset: true,
//                 }
//             }
//         },
//         xaxis: {
//             categories: plotData.categories || [],
//             title: { text: `${xAxis}` },
//             labels: { style: { fontSize: '12px', colors: ['#000'] } }
//         },
//         yaxis: {
//             title: { text: `${yAxis}` },
//             labels: {
//                 style: { fontSize: '12px', colors: ['#000'] },
//                 formatter: (value) => {
//                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
//                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
//                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
//                     return value;
//                 }
//             }
//         },
//         tooltip: {
//             custom: ({ series, seriesIndex, dataPointIndex }) => {
//                 const category = plotData.categories[dataPointIndex];
//                 const value = series[seriesIndex][dataPointIndex];
//                 return `
//                     <div style="background: white; padding: 10px; border-radius: 4px;">
//                         <strong>Category:</strong> ${category}<br />
//                         <strong>Value:</strong> ${value}
//                     </div>
//                 `;
//             }
//         },
//         colors: [lineColor]
//     };

//     const series = [{
//         name: aggregation || 'Series',
//         data: plotData.values || []
//     }];

//     return (
//         <div>
//             <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
//                 <Chart options={options} series={series} type="line" width="100%" height="100%" />
//             </ResizableBox>

//             <Button variant="contained" onClick={handleOpenModal}>Predict Data</Button>

//             <Modal open={modalOpen} onClose={handleCloseModal}>
//                 <Box sx={{ p: 4 }}>
//                     <FormControl fullWidth>
//                         <InputLabel>Time Period</InputLabel>
//                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
//                             <MenuItem value="years">Years</MenuItem>
//                             <MenuItem value="months">Months</MenuItem>
//                             <MenuItem value="days">Days</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField fullWidth label="Enter Number" value={number} onChange={handleNumberChange} type="number" />
//                     <Button variant="contained" onClick={handlePredictData}>Submit</Button>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default LineChart;




// import React from 'react';
// import { useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import Checkbox from "@mui/material/Checkbox";
// import '../Style.css';
// import {setXAxis, setYAxis, setAggregate,setFilterOptions, setCheckedOptions, setShowFilterDropdown, setSelectAllChecked,generateChart
// } from '../../features/Dashboard-Slice/chartSlice';
// import axios from 'axios';
// import { Mic, StopCircleRounded } from '@mui/icons-material';
// import { uploadAudioFile,fetchFilterOptionsAPI } from '../../utils/api'; // Import the API function


// function DuealChartInput() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const dispatch = useDispatch();
//   const {
//     xAxis, yAxis,aggregate,
//     filterOptions, checkedOptions, showFilterDropdown, selectAllChecked} = useSelector(state => state.chart);

//   const chartType=useSelector(state=>state.chartType.type);
//   const SelectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const barColor = useSelector((state) => state.chartColor.chartColor);
//   // const databaseName = useSelector((state) => state.database.databaseName);
//   const databaseName = localStorage.getItem('company_name');  
//   const excelCheckedPaths = useSelector((state) => state.loadExcel.checkedPaths);
//   const csvCheckedPaths = useSelector((state) => state.loadCsv.checkedPaths);
//   console.log('excelCheckedPaths:', excelCheckedPaths);
//   console.log('csvCheckedPaths:', csvCheckedPaths);
//   const selectedTablearray = (excelCheckedPaths.length > 0) ? excelCheckedPaths : csvCheckedPaths;
//   const selectedTable=selectedTablearray.join(',')
//   React.useEffect(() => {
//     if (xAxis && yAxis && aggregate && chartType) {
//       dispatch(generateChart({ selectedTable, xAxis, yAxis, barColor, aggregate, chartType, checkedOptions }));
//     }
//   }, [SelectedTable,xAxis, yAxis, aggregate, chartType, checkedOptions, dispatch]);

//   const fetchFilterOptions = async (columnName) => {
//     try {
//       const options = await fetchFilterOptionsAPI( databaseName,selectedTable, columnName);
//       dispatch(setFilterOptions(options));
//       dispatch(setCheckedOptions(options));
//       dispatch(setShowFilterDropdown(true));
//       dispatch(setSelectAllChecked(true));      // Reset "Select All" checkbox
//     } catch (error) {
//       console.error('Failed to fetch filter options:', error);
//     }
//   };

//   const handleSelectAllChange = (event) => {
//     const isChecked = event.target.checked;
//     dispatch(setSelectAllChecked(isChecked));
//     if (isChecked) {
//       dispatch(setCheckedOptions([...filterOptions]));
//     } else {
//       dispatch(setCheckedOptions([]));
//     }
//   };

//   const handleFilterIconClick = (columnName) => {
//     if (showFilterDropdown) {
//       dispatch(setShowFilterDropdown(false));
//     } else {
//       fetchFilterOptions(columnName);
//     }
//   };

//   const handleCheckboxChange = (option) => {
//     let updatedOptions;
//     if (checkedOptions.includes(option)) {
//       updatedOptions = checkedOptions.filter(item => item !== option);
//     } else {
//       updatedOptions = [...checkedOptions, option];
//     }
//     dispatch(setCheckedOptions(updatedOptions));
//     dispatch(setSelectAllChecked(updatedOptions.length === filterOptions.length));
//   };
//   const removeColumnFromYAxis = (columnNameToRemove) => {
//     const updatedYAxis = yAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setYAxis(updatedYAxis));
//   };


//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event, target) => {
//     event.preventDefault();
//     const columnName = event.dataTransfer.getData("columnName");
//     if (target === "x-axis") {
//       if (!xAxis.includes(columnName)) {
//         dispatch(setXAxis([...xAxis, columnName]));
//       }
//     } else if (target === "y-axis") {
//       if (!yAxis.includes(columnName)) {
//         dispatch(setYAxis([...yAxis, columnName]));
//       }
//     }
//   };


//   const removeColumnFromXAxis = (columnNameToRemove) => {
//     const updatedXAxis = xAxis.filter(column => column !== columnNameToRemove);
//     dispatch(setXAxis(updatedXAxis));
//     dispatch(setShowFilterDropdown(false));
//   };
//   const startRecording = () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//           mediaRecorderRef.current = new MediaRecorder(stream);
//           audioChunksRef.current = [];

//           mediaRecorderRef.current.ondataavailable = (event) => {
//             console.log('Data available:', event.data);
//             audioChunksRef.current.push(event.data);
//           };

//           mediaRecorderRef.current.onstop = () => {
//             const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//             console.log('Audio Blob:', audioBlob);
//             if (audioBlob.size === 0) {
//               console.error('Audio Blob is empty!');
//               return;
//             }
//             const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
//             const formData = new FormData();
//             formData.append('audio', audioFile);
//             formData.append('tableName', selectedTable);
//             formData.append('databaseName', databaseName);

//             uploadAudioFile(formData)
//               .then(response => {
//                 console.log('Audio uploaded successfully:', response.data);
//               })
//               .catch(error => {
//                 console.error('Error uploading audio:', error);
//               });
//           };

//           mediaRecorderRef.current.start();
//           setIsRecording(true);
//         })
//         .catch(error => {
//           console.error('Error accessing microphone:', error);
//         });
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };
  
//   return (
//     <div className="App">
//                 <div className="dash-right-side-container">
//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                     <label htmlFor="x-axis-input">X-axis: </label>
//                     <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "x-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '10px' }}>
//                       <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {xAxis.map((column, index) => (
//                           <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <span className="filter-icon" onClick={() => handleFilterIconClick(column)} style={{cursor: "pointer"}}>
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
                    
//                   <div className="input-fields">
//                   {/* <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}> */}
//                     <FormControl style={{ width: '250px', marginLeft: '30px', marginTop: '5px' }}>
//                       <InputLabel id="demo-simple-select-label">Aggregation</InputLabel>
//                       <NativeSelect
//                         style={{ marginRight: '10px' }} value={aggregate} onChange={(event) => dispatch(setAggregate(event.target.value))}
//                         inputProps={{
//                           name: 'age',
//                           id: 'uncontrolled-native',
//                         }}
//                       >
//                         <option value="sum">Sum</option>
//                         <option value="average">Average</option>
//                         <option value="count">Count</option>
//                         <option value="minimum">Minimum</option>
//                         <option value="maximum">Maximum</option>
//                         <option value="variance">Variance</option>
//                       </NativeSelect>
//                     </FormControl>

//                   </div>
                    
//                   </div>
                  

//                   <div style={{ display: 'flex', alignItems: 'center', zIndex: 1000 }}>
//                   <label htmlFor="y-axis-input" style={{ margin: '15px 10px 0px 0px' }}>Y-axis:</label>
//                   <div className="input-fields" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, "y-axis")} style={{ width: "1000px", borderRadius: "10px", height: "40px", border: '1px solid #000', marginLeft: '1px' }}>
//                   <div className="x-axis-columns" style={{ marginBottom: '3px', marginTop: "4px", marginLeft: "5px" }}>
//                         {yAxis.map((column, index) => (
//                           <div key={index} className="x-axis-column" style={{maxHeight:"30px"}}>
//                             <span>{column}</span>
//                             <ClearIcon style={{ marginLeft: '10px' }} onClick={() => removeColumnFromYAxis(column)} />
//                           </div>
//                         ))}
                        
//                   </div>
                  
//                    </div>
//                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
//           <button
//             onClick={isRecording ? stopRecording : startRecording}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               border: 'none',
//               background: 'transparent',
//               cursor: 'pointer',
//             }}
//           >
//             {isRecording ? <StopCircleRounded /> : <Mic />}
//             <span style={{ marginLeft: '8px' }}>{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
//           </button>
//           {audioUrl && (
//             <audio controls src={audioUrl} style={{ marginLeft: '20px' }}>
//               Your browser does not support the audio element.
//             </audio>
//           )}
//         </div>
//                   </div>

//                 </div>
//     </div>
//   );
// }

// export default DuealChartInput;





















// import React, { useEffect, useRef, useState } from "react";
// import Chart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// import "./tooltip.css";
// import ContectMenu from "./contextMenu";
// import CustomToolTip from "./customToolTip";
// import { Modal, Box, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import { sendCategoryToBackend, fetchPredictionDataAPI } from '../../utils/api';

// const LineChart = ({ categories, values, aggregation }) => {
//     const dispatch = useDispatch();
//     const lineColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);

//     const [plotData, setPlotData] = useState({ categories, values });
//     const [forecastData, setForecastData] = useState({ categories: [], values: [] });
//     const [modalOpen, setModalOpen] = useState(false);
//     const [timePeriod, setTimePeriod] = useState("");
//     const [number, setNumber] = useState("");

//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const contextMenuRef = useRef(null);

//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const data = await sendCategoryToBackend(
//                 clickedCategory,
//                 xAxis,
//                 yAxis,
//                 selectedTable,
//                 aggregate
//             );
//             setPlotData(data);
//         } catch (error) {
//             console.error('Error handling click event:', error);
//         }
//     };

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     const handleClickOutside = (event) => {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//             setContextMenuVisible(false);
//         }
//     };

//     const isDateCategory = (category) => {
//         const datePattern1 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
//         const datePattern2 = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
//         return datePattern1.test(category) || datePattern2.test(category);
//     };
//     const areCategoriesDates = categories.some(isDateCategory);

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     const handlePredictData = async () => {
//         try {
//             const predictionData = await fetchPredictionDataAPI({
//                 xAxis,
//                 yAxis,
//                 timePeriod,
//                 number,
//             });

//             setForecastData({
//                 categories: predictionData.map((item) => item.category),
//                 values: predictionData.map((item) => item.value),
//             });

//             handleCloseModal();
//         } catch (error) {
//             console.error("Failed to fetch prediction data:", error);
//         }
//     };

//     const handleOpenModal = () => setModalOpen(true);
//     const handleCloseModal = () => setModalOpen(false);

//     const handleTimePeriodChange = (event) => setTimePeriod(event.target.value);
//     const handleNumberChange = (event) => setNumber(event.target.value);

//     const baseOptions = {
//         xaxis: {
//             title: { text: `${xAxis}` },
//             labels: { style: { fontSize: '12px', colors: ['#000'] } }
//         },
//         yaxis: {
//             title: { text: `${yAxis}` },
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000'],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) {
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) {
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) {
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value;
//                     }
//                 }
//             },
//         },
//         tooltip: {
//             shared: true,
//             intersect: false,
//         },
//         colors: [lineColor]
//     };

//     const options = {
//         ...baseOptions,
//         chart: {
//             events: { dataPointSelection: handleClicked },
//             toolbar: { tools: { download: true, selection: true } }
//         },
//         xaxis: { ...baseOptions.xaxis, categories: plotData.categories || [] },
//     };

//     const forecastOptions = {
//         ...baseOptions,
//         xaxis: { ...baseOptions.xaxis, categories: forecastData.categories || [] },
//     };

//     const series = [{
//         name: aggregation || 'Original Data',
//         data: plotData.values || []
//     }];

//     const forecastSeries = [{
//         name: 'Forecast Data',
//         data: forecastData.values || []
//     }];

//     return (
//         <div>
//             <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu}>
//                 <Chart options={options} series={series} type="line" width="100%" height="100%" />
//             </ResizableBox>

//             {areCategoriesDates && (
//                 <Button variant="contained" onClick={handleOpenModal}>
//                     Predict Data
//                 </Button>
//             )}

//             <Modal open={modalOpen} onClose={handleCloseModal}>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: 400,
//                         bgcolor: "background.paper",
//                         borderRadius: 1,
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <FormControl fullWidth sx={{ mb: 2 }}>
//                         <InputLabel>Time Period</InputLabel>
//                         <Select value={timePeriod} onChange={handleTimePeriodChange}>
//                             <MenuItem value="years">Years</MenuItem>
//                             <MenuItem value="months">Months</MenuItem>
//                             <MenuItem value="days">Days</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <TextField
//                         fullWidth
//                         label="Enter Number"
//                         value={number}
//                         onChange={handleNumberChange}
//                         type="number"
//                         sx={{ mb: 2 }}
//                     />

//                     <Button variant="contained" onClick={handlePredictData} fullWidth>
//                         Submit
//                     </Button>
//                 </Box>
//             </Modal>

//             {forecastData.categories.length > 0 && (
//                 <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]}>
//                     <Chart options={forecastOptions} series={forecastSeries} type="line" width="100%" height="100%" />
//                 </ResizableBox>
//             )}
//         </div>
//     );
// };

// export default LineChart;
















import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import "./tooltip.css";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { fetchPredictionDataAPI } from "../../utils/api";
import PredictedLineChart from "./predictionLineChart"; // Import the new component

const LineChart = ({ categories = [], values = [], aggregation }) => {
  const dispatch = useDispatch();
  const lineColor = useSelector((state) => state.chartColor.chartColor);
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);

  const [forecastData, setForecastData] = useState({ categories: [], values: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState("");
  const [number, setNumber] = useState("");

  const handlePredictData = async () => {
    try {
      const predictionData = await fetchPredictionDataAPI({
        xAxis,
        yAxis,
        timePeriod,
        number,
      });

      setForecastData({
        categories: predictionData.map((item) => item.category),
        values: predictionData.map((item) => item.value),
      });

      handleCloseModal();
    } catch (error) {
      console.error("Failed to fetch prediction data:", error);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Parent Line Chart */}
      <div style={{ flex: 1 }}>
        <ResizableBox
          width={800}
          height={550}
          minConstraints={[300, 300]}
          maxConstraints={[800, 550]}
        >
          <div className="chart-title">{customHeadings}</div>
          <Chart
            options={{
              chart: {
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    const clickedCategoryIndex = config.dataPointIndex;
                    const clickedCategory = categories[clickedCategoryIndex];
                    dispatch(setClickedCategory(clickedCategory));
                  },
                },
              },
              xaxis: { categories, title: { text: `${xAxis}` } },
              yaxis: { title: { text: `${yAxis}` } },
              colors: [lineColor],
            }}
            series={[{ name: aggregation || "Series", data: values || [] }]}
            type="line"
            width="100%"
            height="100%"
          />
        </ResizableBox>
        <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 2 }}>
          Predict Data
        </Button>
      </div>

      {/* Prediction Line Chart */}
      {forecastData.categories.length > 0 && (
        <div style={{ flex: 1 }}>
          <PredictedLineChart
            forecastData={forecastData}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </div>
      )}

      {/* Modal for Prediction Inputs */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Time Period</InputLabel>
            <Select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <MenuItem value="years">Years</MenuItem>
              <MenuItem value="months">Months</MenuItem>
              <MenuItem value="days">Days</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Enter Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handlePredictData} fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LineChart;









    



























