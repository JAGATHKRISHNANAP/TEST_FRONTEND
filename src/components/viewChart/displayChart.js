// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { fetchTotalRows } from '../../utils/api';
// // import DraggableChartButton from './DraggableChartButton';
// // import DroppableArea from './DroppableArea';
// // // import ResizableChart from './ResizableChart';
// // import { saveAllCharts,fetchSingleChartData } from '../../utils/api';
// // import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// // import { DndProvider } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import axios from "axios";

// // import SaveDashboardButton from './SaveDashboardButton';

// // function Charts() {
// //   const dispatch = useDispatch();
// //   const [error, setError] = useState(null);
// //   const [chartData, setChartData] = useState([]);
// //   const [droppedCharts, setDroppedCharts] = useState([]);
// //   const [chartNamesArray, setChartNamesArray] = useState([]);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [fileName, setFileName] = useState("");
// //   const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
// //   const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
// //   const company_name=(localStorage.getItem('company_name'))

// //   const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));

// //   // console.log("Chart Data:", chartData);
// //   console.log("company name*****************************",company_name)

// //   useEffect(() => {
// //     console.log("Fetching total rows");
// //     dispatch(fetchTotalRows(user_id))
// //       .unwrap()
// //       .then((response) => {
// //         if (response && response.chart_names) {
// //           // Check if chart_names is an array or an object
// //           if (Array.isArray(response.chart_names)) {
// //             setChartNamesArray(response.chart_names);
// //           } else if (typeof response.chart_names === 'object') {
// //             // Extract array from object
// //             const chartNames = Object.values(response.chart_names).flat(); // Flatten array if necessary
// //             setChartNamesArray(chartNames);
// //           } else {
// //             console.error("Unexpected format for chart_names:", response.chart_names);
// //             setChartNamesArray([]);  // Set to empty array if the format is unexpected
// //           }
// //         } else {
// //           console.error("chart_names is not present in the response:", response);
// //           setChartNamesArray([]);  // Set to empty array if chart_names is missing
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching total rows:", err);
// //         setChartNamesArray([]);  // Set to empty array in case of API error
// //       });
// //   }, [dispatch, user_id]);

// //   // const handleChartButtonClick = useCallback(async (chartName) => {
// //   //   console.log(`Chart Name: ${chartName}`);

// //   //   try {
// //   //     const response = await axios.get(`http://localhost:5000/chart_data/${chartName}`);
// //   //     const data = response.data;
// //   //     console.log('Data fetched from chartdata:', data);

// //   //     console.log('Data fetched from chartdata:', data);

// //   //     setChartData((prevData) => {
// //   //       const newData = [...prevData, { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } }];
// //   //       return newData;
// //   //     });

// //   //     setDroppedCharts((prev) => [...prev, chartName]);
// //   //     setError(null);
// //   //   } catch (error) {
// //   //     console.error(`Error fetching data for Chart ${chartName}:`, error);
// //   //     setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
// //   //   }
// //   // }, []);

// //   const handleChartButtonClick = useCallback(async (chartName) => {
// //     console.log(`Chart Name: ${chartName}`);
  
// //     try {
// //       // Fetch chart data using the API function
// //       const data = await fetchSingleChartData(chartName);
// //       console.log('Data fetched from chartdata:', data);
  
// //       setChartData((prevData) => {
// //         const newData = [
// //           ...prevData,
// //           { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } },
// //         ];
// //         return newData;
// //       });
  
// //       setDroppedCharts((prev) => [...prev, chartName]); // Add chart name to dropped charts
// //       setError(null); // Clear any previous errors
// //     } catch (error) {
// //       console.error(`Error fetching data for Chart ${chartName}:`, error);
// //       setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
// //     }
// //   }, []);

// //   const handleRemoveChart = useCallback((chartName) => {
// //     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
// //     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    
// //   }, []);

// //   const updateChartDetails = useCallback((chartName, newDetails) => {
// //     setChartData((prevData) => {
// //       const updatedData = prevData.map((data) =>
// //         data.chartName === chartName ? { ...data, ...newDetails } : data
// //       );
// //       return updatedData;
// //     });
// //   }, []);

// //   const handleSaveClick = () => {
// //     setOpenDialog(true);
// //   };

// //   // const handleDialogClose = (shouldSave) => {
// //   //   setOpenDialog(false);
// //   //   if (shouldSave && fileName) {
// //   //     saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName,company_name);
// //   //     setFileName(""); // Reset the file name after saving
// //   //   }
// //   // };
// //   const handleDialogClose = async (shouldSave) => {
// //     setOpenDialog(false);
  
// //     if (shouldSave && fileName) {
// //       try {
// //         // API call to check if the file name exists
// //         const response = await axios.get(`http://localhost:5000/check_filename/${fileName}`);
// //         if (response.data.exists) {
// //           alert(`The file name "${fileName}" already exists. Please choose a different name.`);
// //           return; // Stop further execution if the file name exists
// //         }
  
// //         // Proceed to save if the file name does not exist
// //         await saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name);
// //         setFileName(""); // Reset the file name after saving
// //       } catch (error) {
// //         console.error("Error checking file name existence:", error);
// //         alert("An error occurred while checking the file name. Please try again later.");
// //       }
// //     }
// //   };
  
// //   const handleRemoveChartbutton = useCallback((chartName) => {
// //     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
// //     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
// //     setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));

// //   }, []);
// //   const renderedDraggableButtons = useMemo(() => (
// //     chartNamesArray.map((chartName, index) => (
// //       <DraggableChartButton
// //         key={index}
// //         chartName={chartName}
// //         disabled={droppedCharts.includes(chartName)}
// //         onRemove={handleRemoveChartbutton}
// //       />
// //     ))
// //   ), [chartNamesArray, droppedCharts]);

// //   const renderedCharts = useMemo(() => (
// //     chartData.map((data) => (
// //       <ResizableChart
// //         key={data.chartName}
// //         data={data}
// //         onRemove={handleRemoveChart} 
// //         updateChartDetails={updateChartDetails}
// //       />
// //     ))
// //   ), [chartData, handleRemoveChart, updateChartDetails]);

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <div className="App">
// //         <Box sx={{ flexGrow: 1, minHeight: '85vh' ,marginTop:'70px'}}>
// //           <Grid container spacing={3} wrap="wrap">
// //             <Grid item xs={12} md={12}>
// //               <DroppableArea onDrop={handleChartButtonClick}>
// //                 {renderedCharts}
// //               </DroppableArea>
// //             </Grid>
// //           </Grid>
// //         </Box>
// //         {/* <Button variant="contained" color="primary" onClick={handleSaveClick} >
// //           Save Dashboard
// //         </Button>
        
// //         */}
// //         <SaveDashboardButton onSaveClick={handleSaveClick} />
// //         {error && <div className="error-message">{error}</div>}
        
// //         <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
// //           <DialogTitle>Save Charts</DialogTitle>
// //           <DialogContent>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               label="File Name"
// //               type="text"
// //               fullWidth
// //               variant="standard"
// //               value={fileName}
// //               onChange={(e) => setFileName(e.target.value)}
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => handleDialogClose(false)} color="primary">
// //               Cancel
// //             </Button>
// //             <Button onClick={() => handleDialogClose(true)} color="primary">
// //               Save
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //         <Grid item xs={12} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white',overflowY: 'auto',  boxShadow: 3,height:'40px' ,marginBottom:'5px'}}>
// //           <Box sx={{ display: 'flex', justifyContent: 'center',height:'30px', marginTop:'3px' }}>
// //             {renderedDraggableButtons}
// //           </Box>
// //         </Grid>
// //       </div>
// //     </DndProvider>
// //   );
// // }

// // export default Charts;


// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import DraggableChartButton from './DraggableChartButton';
// // import DroppableArea from './DroppableArea';
// // import ResizableChart from './ResizableChart';
// // import { saveAllCharts, fetchSingleChartData } from '../../utils/api';
// // import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// // import { DndProvider } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import axios from "axios";
// // import SaveDashboardButton from './SaveDashboardButton';  // Import SaveDashboardButton component

// // function Charts() {
// //   const dispatch = useDispatch();
// //   const [error, setError] = useState(null);
// //   const [chartData, setChartData] = useState([]);
// //   const [droppedCharts, setDroppedCharts] = useState([]);
// //   const [chartNamesArray, setChartNamesArray] = useState([]);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [fileName, setFileName] = useState("");
// //   const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
// //   const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
// //   const company_name = localStorage.getItem('company_name');
// //   const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));

// //   useEffect(() => {
// //     console.log("Fetching total rows");
// //     dispatch(fetchTotalRows(user_id))
// //       .unwrap()
// //       .then((response) => {
// //         if (response && response.chart_names) {
// //           if (Array.isArray(response.chart_names)) {
// //             setChartNamesArray(response.chart_names);
// //           } else if (typeof response.chart_names === 'object') {
// //             const chartNames = Object.values(response.chart_names).flat();
// //             setChartNamesArray(chartNames);
// //           } else {
// //             console.error("Unexpected format for chart_names:", response.chart_names);
// //             setChartNamesArray([]);
// //           }
// //         } else {
// //           console.error("chart_names is not present in the response:", response);
// //           setChartNamesArray([]);
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching total rows:", err);
// //         setChartNamesArray([]);
// //       });
// //   }, [dispatch, user_id]);

// //   const handleChartButtonClick = useCallback(async (chartName) => {
// //     console.log(`Chart Name: ${chartName}`);
  
// //     try {
// //       const data = await fetchSingleChartData(chartName);
// //       console.log('Data fetched from chartdata:', data);
  
// //       setChartData((prevData) => {
// //         const newData = [
// //           ...prevData,
// //           { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } },
// //         ];
// //         return newData;
// //       });
  
// //       setDroppedCharts((prev) => [...prev, chartName]);
// //       setError(null);
// //     } catch (error) {
// //       console.error(`Error fetching data for Chart ${chartName}:`, error);
// //       setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
// //     }
// //   }, []);

// //   const handleRemoveChart = useCallback((chartName) => {
// //     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
// //     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
// //   }, []);

// //   const updateChartDetails = useCallback((chartName, newDetails) => {
// //     setChartData((prevData) => {
// //       const updatedData = prevData.map((data) =>
// //         data.chartName === chartName ? { ...data, ...newDetails } : data
// //       );
// //       return updatedData;
// //     });
// //   }, []);

// //   const handleSaveClick = () => {
// //     setOpenDialog(true);
// //   };

// //   const handleDialogClose = async (shouldSave) => {
// //     setOpenDialog(false);
  
// //     if (shouldSave && fileName) {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/check_filename/${fileName}`);
// //         if (response.data.exists) {
// //           alert(`The file name "${fileName}" already exists. Please choose a different name.`);
// //           return;
// //         }
// //         await saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name);
// //         setFileName("");
// //       } catch (error) {
// //         console.error("Error checking file name existence:", error);
// //         alert("An error occurred while checking the file name. Please try again later.");
// //       }
// //     }
// //   };

// //   const renderedDraggableButtons = useMemo(() => (
// //     <>
// //       {chartNamesArray.map((chartName, index) => (
// //         <DraggableChartButton
// //           key={index}
// //           chartName={chartName}
// //           disabled={droppedCharts.includes(chartName)}
// //           onRemove={handleRemoveChart}
// //         />
// //       ))}
// //       <SaveDashboardButton onSaveClick={handleSaveClick} />
// //     </>
// //   ), [chartNamesArray, droppedCharts]);

// //   const renderedCharts = useMemo(() => (
// //     chartData.map((data) => (
// //       <Grid item xs={12} sm={6} md={4} lg={3} key={data.chartName} sx={{ padding: '16px' }}>
// //         <ResizableChart
// //           data={data}
// //           onRemove={handleRemoveChart}
// //           updateChartDetails={updateChartDetails}
// //         />
// //       </Grid>
// //     ))
// //   ), [chartData, handleRemoveChart, updateChartDetails]);

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <div className="App">
// //         <Box sx={{ flexGrow: 1, minHeight: '85vh', marginTop: '70px' }}>
// //           <Grid container spacing={2} wrap="wrap">
// //             <Grid item xs={12} md={12}>
// //               <DroppableArea onDrop={handleChartButtonClick}>
// //                 <Grid container spacing={2}>
// //                   {renderedCharts}
// //                 </Grid>
// //               </DroppableArea>
// //             </Grid>
// //           </Grid>
// //         </Box>

// //         <Grid item xs={12} sx={{
// //           position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowY: 'auto',
// //           boxShadow: 3, height: '40px', marginBottom: '5px'
// //         }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'center', height: '30px', marginTop: '3px' }}>
// //             {renderedDraggableButtons}
// //           </Box>
// //         </Grid>

// //         {error && <div className="error-message">{error}</div>}

// //         <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
// //           <DialogTitle>Save Charts</DialogTitle>
// //           <DialogContent>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               label="File Name"
// //               type="text"
// //               fullWidth
// //               variant="standard"
// //               value={fileName}
// //               onChange={(e) => setFileName(e.target.value)}
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => handleDialogClose(false)} color="primary">
// //               Cancel
// //             </Button>
// //             <Button onClick={() => handleDialogClose(true)} color="primary">
// //               Save
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //       </div>
// //     </DndProvider>
// //   );
// // }

// // export default Charts;

// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import DraggableChartButton from './DraggableChartButton';
// // import DroppableArea from './DroppableArea';
// // import ResizableChart from './ResizableChart';
// // import { saveAllCharts, fetchSingleChartData } from '../../utils/api';
// // import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Snackbar, Alert  } from "@mui/material";
// // import { DndProvider } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import axios from "axios";
// // import SaveDashboardButton from './SaveDashboardButton';  // Import SaveDashboardButton component
// // import { fetchTotalRows } from '../../utils/api';
// // function Charts() {
// //   const dispatch = useDispatch();
// //   const [error, setError] = useState(null);
// //   const [chartData, setChartData] = useState([]);
// //   console.log("chartData",chartData)
// //   const [droppedCharts, setDroppedCharts] = useState([]);
// //   const [chartNamesArray, setChartNamesArray] = useState([]);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [fileName, setFileName] = useState("");
// //   const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
// //   const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
// //   const company_name = localStorage.getItem('company_name');
// //   const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));
// //   const [borderColor, setBorderColor] = useState("#000"); // Default black border
// //   const [borderSize, setBorderSize] = useState("1px"); // Default border size
// //   const [showBorder, setShowBorder] = useState(true); // Toggle border visibility
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);

// //   useEffect(() => {
// //     console.log("Fetching total rows");
// //     dispatch(fetchTotalRows(user_id))
// //       .unwrap()
// //       .then((response) => {
// //         if (response && response.chart_names) {
// //           if (Array.isArray(response.chart_names)) {
// //             setChartNamesArray(response.chart_names);
// //           } else if (typeof response.chart_names === "object") {
// //             const chartNames = Object.values(response.chart_names).flat();
// //             setChartNamesArray(chartNames);
// //           } else {
// //             console.error("Unexpected format for chart_names:", response.chart_names);
// //             setChartNamesArray([]);
// //             setSnackbarOpen(true); // Show snackbar
// //           }
// //         } else {
// //           console.error("chart_names is not present in the response:", response);
// //           setChartNamesArray([]);
// //           setSnackbarOpen(true); // Show snackbar
// //         }
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching total rows:", err);
// //         setChartNamesArray([]);
// //         setSnackbarOpen(true); // Show snackbar
// //       });
// //   }, [dispatch, user_id]);


// //   const handleChartButtonClick = useCallback(async (chartName) => {
// //     console.log(`Chart Name: ${chartName}`);
  
// //     try {
// //       const data = await fetchSingleChartData(chartName);
// //       console.log("Data fetched from chartdata:", data);
  
// //       // Define dimensions and spacing
// //       const margin = 20; // Space between charts
// //       const chartWidth = 500;
// //       const chartHeight = 400;
// //       const chartsPerRow = 4; // Number of charts per row
  
// //       const existingCharts = [...chartData];
// //       const totalCharts = existingCharts.length;
  
// //       // Calculate the row and column for the new chart
// //       const row = Math.floor(totalCharts / chartsPerRow);
// //       const col = totalCharts % chartsPerRow;
  
// //       // Calculate the initial position for the new chart
// //       const newX = col * (chartWidth + margin) + margin; // Horizontal position
// //       const newY = row * (chartHeight + margin) + margin; // Vertical position
  
// //       // Flatten positions (x, y pairs)
// //       const existingPositions = existingCharts.flatMap(chart => [chart.position.x, chart.position.y]);
  
// //       // Check if the new position is already taken
// //       const isPositionTaken = existingPositions.some(
// //         (position, index) => {
// //           // Check both x and y in pairs
// //           const isMatchingX = position === newX && existingPositions[index + 1] === newY;
// //           return isMatchingX;
// //         }
// //       );
  
// //       if (isPositionTaken) {
// //         // If the position is taken, try to find the next available position
// //         let foundAvailablePosition = false;
// //         let tempX = newX;
// //         let tempY = newY;
  
// //         // Loop to find an empty spot
// //         while (!foundAvailablePosition) {
// //           // Increase column number to move to the next position
// //           tempX = (col + 1) * (chartWidth + margin) + margin;
// //           tempY = row * (chartHeight + margin) + margin;
  
// //           // Check for available position
// //           foundAvailablePosition = !existingPositions.some(
// //             (position, index) => {
// //               const isMatchingX = position === tempX && existingPositions[index + 1] === tempY;
// //               return isMatchingX;
// //             }
// //           );
// //         }
  
// //         // Use the found position
// //         setChartData((prevData) => [
// //           ...prevData,
// //           {
// //             ...data,
// //             chartName,
// //             width: chartWidth,
// //             height: chartHeight,
// //            position: { x: newX, y: newY }, // Store the new position
// //           },
// //         ]);
// //       } else {
// //         // If position is available, add chart at the calculated position
// //         setChartData((prevData) => [
// //           ...prevData,
// //           {
// //             ...data,
// //             chartName,
// //             width: chartWidth,
// //             height: chartHeight,
// //             position: { x: newX, y: newY }, // Store the calculated position
// //           },
// //         ]);
// //       }
  
// //       setDroppedCharts((prev) => [...prev, chartName]);
// //       setError(null);
// //     } catch (error) {
// //       console.error(`Error fetching data for Chart ${chartName}:`, error);
// //       setError(error.message); // Set the error message from the backend
// //       setSnackbarOpen(true); // Open the Snackbar with error message
// //     }
// //   }, [chartData]);
  
  

// //   const handleRemoveChart = useCallback((chartName) => {
// //     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
// //     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
// //     setChartNamesArray((prev) => prev.filter((name) => name !== chartName));
// //   }, []);

// //   const handleCloseChart = useCallback((chartName) => {
// //     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
// //     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
// //   }, []);

// //   const updateChartDetails = useCallback((chartName, newDetails) => {
// //     setChartData((prevData) => {
// //       const updatedData = prevData.map((data) =>
// //         data.chartName === chartName ? { ...data, ...newDetails } : data
// //       );
// //       return updatedData;
// //     });
// //   }, []);

// //   const handleSaveClick = () => {
// //     setOpenDialog(true);
// //   };

// //   const handleDialogClose = async (shouldSave) => {
// //     setOpenDialog(false);
    
// //     if (shouldSave && fileName) {
// //       try {
// //         const response = await axios.get(`http://localhost:5000/check_filename/${fileName}`);
// //         if (response.data.exists) {
// //           alert(`The file name "${fileName}" already exists. Please choose a different name.`);
// //           return;
// //         }
// //         await saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name);
       
// //         setFileName("");
// //       } catch (error) {
// //         console.error("Error checking file name existence:", error);
// //         alert("An error occurred while checking the file name. Please try again later.");
// //       }
// //     }
// //   };

// //   const renderedDraggableButtons = useMemo(() => (
// //     <>
// //       {chartNamesArray.map((chartName, index) => (
// //         <DraggableChartButton
// //           key={index}
// //           chartName={chartName}
// //           disabled={droppedCharts.includes(chartName)}
// //           onRemove={handleRemoveChart}
// //         />
// //       ))}
// //     </>
// //   ), [chartNamesArray, droppedCharts]);

// //   const renderedCharts = useMemo(() => (
// //     chartData.map((data) => (
// //       <Grid item xs={12} sm={5} md={5} lg={3} key={data.chartName} sx={{ padding: '16px', height: "450px"}}>
// //         <ResizableChart
// //           data={data}
// //           onRemove={handleCloseChart}
// //           updateChartDetails={updateChartDetails}
// //           position={data.position}
// //         />
        
// //       </Grid>
// //     ))
// //   ), [chartData, handleCloseChart, updateChartDetails]);

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <div className="App">
// //         <Box sx={{ flexGrow: 1, minHeight: '95vh', marginTop: '70px' }}>
// //           <Grid container spacing={2} wrap="wrap">
// //             <Grid item xs={12} md={12}>
// //               <DroppableArea onDrop={handleChartButtonClick}>
// //                 <Grid container spacing={2}>
// //                   {renderedCharts}
// //                 </Grid>
// //               </DroppableArea>
// //             </Grid>
// //           </Grid>
// //         </Box>

// //         {/* Fixed Save Dashboard Button */}
        

// //         {/* Draggable Chart Buttons */}
// //         {/* <Grid item xs={12} sx={{
// //          position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX:'scroll',
// //           boxShadow: 3, height: '60px'
// //         }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'center', height: '40px', marginTop: '5px' }}>
// //             {renderedDraggableButtons}
// //           </Box> 
// //         </Grid> */}
// //         <Grid item xs={12} sx={{
// //   position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',justifyContent: "flex-start",
// //   boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center',marginRight:'200PX' ,borderTop:` 2px solid grey` 
// // }}>
// //   {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', height: '40px', marginTop: '4px' }}>
    
// //   {/* </Box> */}
// //   {renderedDraggableButtons} </Grid>
// //   <Grid item xs={12} sx={{position: 'fixed', bottom: '0px', right: '0px', zIndex: 1000, bgcolor: 'white', height: '60px', display: 'flex', alignItems: 'center',justifyContent: "center",width:'200PX',borderTop: '2px solid grey'
// // }}>
      
// //           <SaveDashboardButton onSaveClick={handleSaveClick}  />
// //         </Grid>
// // {/* </Grid> */}


// //         {error && <div className="error-message">{error}</div>}

// //         <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
// //           <DialogTitle>Save Charts</DialogTitle>
// //           <DialogContent>
// //             <TextField
// //               autoFocus
// //               margin="dense"
// //               label="File Name"
// //               type="text"
// //               fullWidth
// //               variant="standard"
// //               value={fileName}
// //               onChange={(e) => setFileName(e.target.value)}
// //             />
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={() => handleDialogClose(false)} color="primary">
// //               Cancel
// //             </Button>
// //             <Button onClick={() => handleDialogClose(true)} color="primary">
// //               Save
// //             </Button>
// //           </DialogActions>
// //         </Dialog>
// //         <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={3000}
// //         onClose={() => setSnackbarOpen(false)}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// //       >
// //         <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
// //           Chart data is not available!
// //         </Alert>
// //       </Snackbar>
// //       </div>
// //     </DndProvider>
// //   );
// // }

// // export default Charts;






// //real code...........................................................................................




// // In Charts.js
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DraggableChartButton from './DraggableChartButton';
// import DroppableArea from './DroppableArea';
// import ResizableChart from './ResizableChart';
// import { saveAllCharts, fetchSingleChartData } from '../../utils/api';
// import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert } from "@mui/material";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import axios from "axios";
// import SaveDashboardButton from './SaveDashboardButton';
// import { fetchTotalRows } from '../../utils/api';

// function Charts() {
//   const dispatch = useDispatch();
//   const [chartData, setChartData] = useState([]);
//   const [droppedCharts, setDroppedCharts] = useState([]);
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
//   const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
//   const company_name = localStorage.getItem('company_name');
//   const [user_id] = useState(localStorage.getItem('user_id'));
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           if (Array.isArray(response.chart_names)) {
//             setChartNamesArray(response.chart_names);
//           } else if (typeof response.chart_names === "object") {
//             const chartNames = Object.values(response.chart_names).flat();
//             setChartNamesArray(chartNames);
//           } else {
//             console.error("Unexpected format for chart_names:", response.chart_names);
//             setChartNamesArray([]);
//             setSnackbarOpen(true);
//           }
//         } else {
//           console.error("chart_names is not present in the response:", response);
//           setChartNamesArray([]);
//           setSnackbarOpen(true);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//         setSnackbarOpen(true);
//       });
//   }, [dispatch, user_id]);

//   const handleChartButtonClick = useCallback(async (chartName) => {
//     try {
//       const data = await fetchSingleChartData(chartName);
//       // Define dimensions and spacing
//       const margin = 20;
//       const chartWidth = 500;
//       const chartHeight = 400;
//       const chartsPerRow = 4;
//       const existingCharts = [...chartData];
//       const totalCharts = existingCharts.length;
//       const row = Math.floor(totalCharts / chartsPerRow);
//       const col = totalCharts % chartsPerRow;
//       const newX = col * (chartWidth + margin) + margin;
//       const newY = row * (chartHeight + margin) + margin;
      
//       // Add chart with its initial position
//       setChartData((prevData) => [
//         ...prevData,
//         {
//           ...data,
//           chartName,
//           width: chartWidth,
//           height: chartHeight,
         
//         },
//       ]);
//       setDroppedCharts((prev) => [...prev, chartName]);
//     } catch (error) {
//       console.error(`Error fetching data for Chart ${chartName}:`, error);
//       setSnackbarOpen(true);
//     }
//   }, [chartData]);

//   // When a chart is moved (for example via ResizableChart using updateChartDetails),
//   // updateChartDetails should update the chart's data in state.
//   const updateChartDetails = useCallback((chartName, newDetails) => {
//     setChartData((prevData) =>
//       prevData.map((data) =>
//         data.chartName === chartName ? { ...data, ...newDetails } : data
//       )
//     );
//   }, []);

//   const handleCloseChart = useCallback((chartName) => {
//     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
//     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
//   }, []);

//   const handleSaveClick = () => {
//     setOpenDialog(true);
//   };
//   const renderedDraggableButtons = useMemo(() => (
//     <>
//       {chartNamesArray.map((chartName, index) => (
//         <DraggableChartButton
//           key={index}
//           chartName={chartName}
//           disabled={droppedCharts.includes(chartName)}
         
//         />
//       ))}
//     </>
//   ), [chartNamesArray, droppedCharts]);

//   const renderedCharts = useMemo(() => (
//     chartData.map((data) => (
//       <Grid
//         item
//         xs={12}
//         sm={5}
//         md={5}
//         lg={3}
//         key={data.chartName}
//         sx={{ padding: '16px', height: "450px" }}
//         className="chart-container"       // Common class name for querying
//         data-chartname={data.chartName}    // Data attribute to match chart details
//       >
//         <ResizableChart
//           data={data}
//           onRemove={handleCloseChart}
//           updateChartDetails={updateChartDetails}
//           position={data.position}
//         />
//       </Grid>
//     ))
//   ), [chartData, handleCloseChart, updateChartDetails]);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="App">
//         <Box sx={{ flexGrow: 1, minHeight: '95vh', marginTop: '70px' }}>
//           {/* Pass chartData as a prop to DroppableArea */}
//           <DroppableArea onDrop={handleChartButtonClick} chartData={chartData}>
//             <Grid container spacing={2}>
//               {renderedCharts}
//             </Grid>
//           </DroppableArea>
//         </Box>

//         <Grid item xs={12} sx={{
//   position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',justifyContent: "flex-start",
//   boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center',marginRight:'200PX' ,borderTop:` 2px solid grey` 
// }}>
  
//   {renderedDraggableButtons} </Grid>
//   <Grid item xs={12} sx={{position: 'fixed', bottom: '0px', right: '0px', zIndex: 1000, bgcolor: 'white', height: '60px', display: 'flex', alignItems: 'center',justifyContent: "center",width:'200PX',borderTop: '2px solid grey'
// }}>
      
//           <SaveDashboardButton onSaveClick={handleSaveClick}  />
//         </Grid>


//         {/* Render draggable buttons and other UI elements here */}
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={() => setSnackbarOpen(false)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
//             Chart data is not available!
//           </Alert>
//         </Snackbar>
//       </div>
//     </DndProvider>
//   );
// }

// export default Charts;





// import React, { useState, useEffect, useCallback, useMemo,useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DraggableChartButton from './DraggableChartButton';
// import DroppableArea from './DroppableArea';
// import ResizableChart from './ResizableChart';
// import { saveAllCharts, fetchSingleChartData } from '../../utils/api';
// import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Snackbar, Alert  } from "@mui/material";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import axios from "axios";
// import SaveDashboardButton from './SaveDashboardButton';  // Import SaveDashboardButton component
// import { fetchTotalRows } from '../../utils/api';
// function Charts() {
//   const dispatch = useDispatch();
//   const [error, setError] = useState(null);
//   const [chartData, setChartData] = useState([]);
//   console.log("chartData",chartData)
//   const [droppedCharts, setDroppedCharts] = useState([]);
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
//   const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
//   const company_name = localStorage.getItem('company_name');
//   const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));
//   const [borderColor, setBorderColor] = useState("#000"); // Default black border
//   const [borderSize, setBorderSize] = useState("1px"); // Default border size
//   const [showBorder, setShowBorder] = useState(true); // Toggle border visibility
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const elementRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           if (Array.isArray(response.chart_names)) {
//             setChartNamesArray(response.chart_names);
//           } else if (typeof response.chart_names === "object") {
//             const chartNames = Object.values(response.chart_names).flat();
//             setChartNamesArray(chartNames);
//           } else {
//             console.error("Unexpected format for chart_names:", response.chart_names);
//             setChartNamesArray([]);
//             setSnackbarOpen(true);
//           }
//         } else {
//           console.error("chart_names is not present in the response:", response);
//           setChartNamesArray([]);
//           setSnackbarOpen(true);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//         setSnackbarOpen(true);
//       });
//   }, [dispatch, user_id]);

//   const handleChartButtonClick = useCallback(async (chartName,dropPosition) => {
//     try {
//       const data = await fetchSingleChartData(chartName);
//       // Define dimensions and spacing
//       const margin = 20;
//       const chartWidth = 500;
//       const chartHeight = 400;
//       const chartsPerRow = 4;
//       const existingCharts = [...chartData];
//       const totalCharts = existingCharts.length;
//       const row = Math.floor(totalCharts / chartsPerRow);
//       const col = totalCharts % chartsPerRow;
//       const newX = col * (chartWidth + margin) + margin;
//       const newY = row * (chartHeight + margin) + margin;
      
//     //  // Add chart with its initial position
//     //   setChartData((prevData) => [
//     //     ...prevData,
//     //     {
//     //       ...data,
//     //       chartName,
//     //       width: chartWidth,
//     //       height: chartHeight,
//     //       position: dropPosition || { x: 0, y: 0 }, 
//     //     },
//     //   ]);
      

//       setChartData((prevData) => [
//         ...prevData,
//         {
//           ...data,
//           chartName,
//           width: chartWidth,
//           height: chartHeight,
//           position: dropPosition || (elementRef.current ? { x: elementRef.current.getBoundingClientRect().x, y: elementRef.current.getBoundingClientRect().y } : { x: 0, y: 0 }),
//         },
//       ]);
      
      
      
//       setDroppedCharts((prev) => [...prev, chartName]);
//     } catch (error) {
//       console.error(`Error fetching data for Chart ${chartName}:`, error);
//       setSnackbarOpen(true);
//     }
//   }, [chartData]);

//   // When a chart is moved (for example via ResizableChart using updateChartDetails),
//   // updateChartDetails should update the chart's data in state.
//   // const updateChartDetails = useCallback((chartName, newDetails) => {
//   //   setChartData((prevData) =>
//   //     prevData.map((data) =>
//   //       data.chartName === chartName ? { ...data, ...newDetails } : data
//   //     )
//   //   );
//   // }, []);
//   const updateChartDetails = useCallback((chartName, newDetails) => {
//     setChartData((prevData) =>
//       prevData.map((data) =>
//         data.chartName === chartName
//           ? { ...data, ...newDetails, position: newDetails.position || data.position }
//           : data
//       )
//     );
//   }, []);
  

//   const handleRemoveChart = useCallback((chartName) => {
//     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
//     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
//     setChartNamesArray((prev) => prev.filter((name) => name !== chartName));
//   }, []);

//   const handleCloseChart = useCallback((chartName) => {
//     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
//     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
//   }, []);

//   // const updateChartDetails = useCallback((chartName, newDetails) => {
//   //   setChartData((prevData) => {
//   //     const updatedData = prevData.map((data) =>
//   //       data.chartName === chartName ? { ...data, ...newDetails } : data
//   //     );
//   //     return updatedData;
//   //   });
//   // }, []);

//   const handleSaveClick = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = async (shouldSave) => {
//     setOpenDialog(false);
    
//     if (shouldSave && fileName) {
//       try {
//         const response = await axios.get(`http://localhost:5000/check_filename/${fileName}`);
//         if (response.data.exists) {
//           alert(`The file name "${fileName}" already exists. Please choose a different name.`);
//           return;
//         }
//         await saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name);
       
//         setFileName("");
//       } catch (error) {
//         console.error("Error checking file name existence:", error);
//         alert("An error occurred while checking the file name. Please try again later.");
//       }
//     }
//   };

//   const renderedDraggableButtons = useMemo(() => (
//     <>
//       {chartNamesArray.map((chartName, index) => (
//         <DraggableChartButton
//           key={index}
//           chartName={chartName}
//           disabled={droppedCharts.includes(chartName)}
//           onRemove={handleRemoveChart}
//         />
//       ))}
//     </>
//   ), [chartNamesArray, droppedCharts]);

//   const renderedCharts = useMemo(() => (
//     chartData.map((data) => (
//       <Grid item xs={12} sm={5} md={5} lg={3} key={data.chartName}  sx={{ padding: '20px', height: "490px" }}
//          // Common class name for querying
//       data-chartname={data.chartName} >
//         <ResizableChart
//           data={data}
//           onRemove={handleCloseChart}
//           updateChartDetails={updateChartDetails}
//           position={data.position}
//         />
        
//       </Grid>
//     ))
//   ), [chartData, handleCloseChart, updateChartDetails]);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="App">
//          <Box sx={{ flexGrow: 1, minHeight: '95vh', marginTop: '70px' }}>
//           <Grid container spacing={2} wrap="wrap">
//             <Grid item xs={12} md={12}>
//               <DroppableArea onDrop={handleChartButtonClick} chartData={chartData}>
//                 <Grid container spacing={2}>
//                   {renderedCharts}
//                 </Grid>
//               </DroppableArea>
//             </Grid>
//           </Grid>
//         </Box> 
//         <Grid item xs={12} sx={{
//   position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',justifyContent: "flex-start",
//   boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center',marginRight:'200PX' ,borderTop:` 2px solid grey` 
// }}>
//   {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', height: '40px', marginTop: '4px' }}>
    
//   {/* </Box> */}
//   {renderedDraggableButtons} </Grid>
//   <Grid item xs={12} sx={{position: 'fixed', bottom: '0px', right: '0px', zIndex: 1000, bgcolor: 'white', height: '60px', display: 'flex', alignItems: 'center',justifyContent: "center",width:'200PX',borderTop: '2px solid grey'
// }}>
      
//           <SaveDashboardButton onSaveClick={handleSaveClick}  />
//         </Grid>
// {/* </Grid> */}


//         {error && <div className="error-message">{error}</div>}

//         <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
//           <DialogTitle>Save Charts</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="File Name"
//               type="text"
//               fullWidth
//               variant="standard"
//               value={fileName}
//               onChange={(e) => setFileName(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => handleDialogClose(false)} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={() => handleDialogClose(true)} color="primary">
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
//           Chart data is not available!
//         </Alert>
//       </Snackbar>
//       </div>
//     </DndProvider>
//   );
// }

// export default Charts;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DraggableChartButton from './DraggableChartButton';
import DroppableArea from './DroppableArea';
import ResizableChart from './ResizableChart';
import { saveAllCharts, fetchSingleChartData } from '../../utils/api';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Snackbar, Alert  } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import SaveDashboardButton from './SaveDashboardButton';  // Import SaveDashboardButton component
import { fetchTotalRows } from '../../utils/api';

function Charts() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  const [droppedCharts, setDroppedCharts] = useState([]);
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
  const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
  const company_name = localStorage.getItem('company_name');
  const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));
  const [borderColor, setBorderColor] = useState("#000"); // Default black border
  const [borderSize, setBorderSize] = useState("1px"); // Default border size
  const [showBorder, setShowBorder] = useState(true); // Toggle border visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const chartDetails = useSelector((state) => state.viewChartDetails.chartDetails);


  useEffect(() => {
    console.log("Redux Chart Details:", chartDetails);
    console.log(" chartData:", chartData);
  }, [chartDetails,chartData]);


  useEffect(() => {
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          if (Array.isArray(response.chart_names)) {
            setChartNamesArray(response.chart_names);
          } else if (typeof response.chart_names === "object") {
            const chartNames = Object.values(response.chart_names).flat();
            setChartNamesArray(chartNames);
          } else {
            console.error("Unexpected format for chart_names:", response.chart_names);
            setChartNamesArray([]);
            setSnackbarOpen(true);
          }
        } else {
          console.error("chart_names is not present in the response:", response);
          setChartNamesArray([]);
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setChartNamesArray([]);
        setSnackbarOpen(true);
      });
  }, [dispatch, user_id]);

  // const handleChartButtonClick = useCallback(async (chartName) => {
  //   try {
  //     const data = await fetchSingleChartData(chartName);
  //     // Define dimensions and spacing
  //     const margin = 20;
  //     const chartWidth = 500;
  //     const chartHeight = 400;
  //     const chartsPerRow = 4;
  //     const existingCharts = [...chartData];
  //     const totalCharts = existingCharts.length;
  //     const row = Math.floor(totalCharts / chartsPerRow);
  //     const col = totalCharts % chartsPerRow;
  //     const newX = col * (chartWidth + margin) + margin;
  //     const newY = row * (chartHeight + margin) + margin;
      
  //     // Add chart with its initial position
  //     setChartData((prevData) => [
  //       ...prevData,
  //       {
  //         ...data,
  //         chartName,
  //         width: chartWidth,
  //         height: chartHeight,
  //         position: { x: newX, y: newY },
  //       },
  //     ]);
  //     setDroppedCharts((prev) => [...prev, chartName]);
  //   } catch (error) {
  //     console.error(`Error fetching data for Chart ${chartName}:`, error);
  //     setSnackbarOpen(true);
  //   }
  // }, [chartData]);
  const handleChartButtonClick = useCallback(async (chartName, dropPosition) => {
    try {
      const data = await fetchSingleChartData(chartName);
  
      setChartData((prevData) => [
        ...prevData,
        {
          ...data,
          chartName,
          width: 500,
          height: 400,
          // position: dropPosition || { x: 50, y: 50 }, // Default if not dropped
        },
      ]);
  
      setDroppedCharts((prev) => [...prev, chartName]);
    } catch (error) {
      console.error(`Error fetching data for Chart ${chartName}:`, error);
      setSnackbarOpen(true);
    }
  }, [chartData]);
  useEffect(() => {
    setChartData((prevData) =>
      prevData.map((chart) => ({
        ...chart,
        // If there's a corresponding saved DOM position for this chart, update it.
        position: chartDetails[chart.chartName] || chart.position,
      }))
    );
    
  }, [chartDetails]);
  // When a chart is moved (for example via ResizableChart using updateChartDetails),
  // updateChartDetails should update the chart's data in state.
  // const updateChartDetails = useCallback((chartName, newDetails) => {
  //   setChartData((prevData) =>
  //     prevData.map((data) =>
  //       data.chartName === chartName ? { ...data, ...newDetails } : data
  //     )
  //   );
  // }, []);
  // const updateChartDetails = useCallback((chartName, newDetails) => {
  //   setChartData((prevData) =>
  //     prevData.map((data) =>
  //       data.chartName === chartName
  //   ? { ...data, ...newDetails}
  //         // ? { ...data, ...newDetails, position: newDetails.position || data.position }
  //         : data
  //     )
  //   );
  // }, []);
  
  const updateChartDetails = useCallback((chartName, newDetails) => {
    setChartData((prevData) =>
      prevData.map((data) =>
        data.chartName === chartName ? { ...data, ...newDetails } : data
      )
    );
  }, []);
  
  const handleRemoveChart = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    setChartNamesArray((prev) => prev.filter((name) => name !== chartName));
  }, []);

  const handleCloseChart = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
  }, []);

  // const updateChartDetails = useCallback((chartName, newDetails) => {
  //   setChartData((prevData) => {
  //     const updatedData = prevData.map((data) =>
  //       data.chartName === chartName ? { ...data, ...newDetails } : data
  //     );
  //     return updatedData;
  //   });
  // }, []);

  const handleSaveClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async (shouldSave) => {
    setOpenDialog(false);
    
    if (shouldSave && fileName) {
      try {
        const response = await axios.get(`http://localhost:5000/check_filename/${fileName}`);
        if (response.data.exists) {
          alert(`The file name "${fileName}" already exists. Please choose a different name.`);
          return;
        }
        await saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name);
       
        setFileName("");
      } catch (error) {
        console.error("Error checking file name existence:", error);
        alert("An error occurred while checking the file name. Please try again later.");
      }
    }
  };

  const renderedDraggableButtons = useMemo(() => (
    <>
      {chartNamesArray.map((chartName, index) => (
        <DraggableChartButton
          key={index}
          chartName={chartName}
          disabled={droppedCharts.includes(chartName)}
          onRemove={handleRemoveChart}
        />
      ))}
    </>
  ), [chartNamesArray, droppedCharts]);

  const renderedCharts = useMemo(() => (
    chartData.map((data) => (
      <Grid item xs={12} sm={5} md={5} lg={3} key={data.chartName}  sx={{ padding: '20px', height: "490px" }}
    // Common class name for querying
      // data-chartname={data.chartName}
       >
        <ResizableChart
          data={data}
          onRemove={handleCloseChart}
          updateChartDetails={updateChartDetails}
          // position={data.position}
        />
        
      </Grid>
    ))
  ), [chartData, handleCloseChart, updateChartDetails]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
         <Box sx={{ flexGrow: 1, minHeight: '95vh', marginTop: '70px' }}>
          <Grid container spacing={2} wrap="wrap">
            <Grid item xs={12} md={12}>
              <DroppableArea onDrop={handleChartButtonClick} chartData={chartData}>
                <Grid container spacing={2}>
                  {renderedCharts}
                </Grid>
              </DroppableArea>
            </Grid>
          </Grid>
        </Box> 

        <Grid item xs={12} sx={{
  position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',justifyContent: "flex-start",
  boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center',marginRight:'200PX' ,borderTop:` 2px solid grey` 
}}>
 
  {renderedDraggableButtons} </Grid>
  <Grid item xs={12} sx={{position: 'fixed', bottom: '0px', right: '0px', zIndex: 1000, bgcolor: 'white', height: '60px', display: 'flex', alignItems: 'center',justifyContent: "center",width:'200PX',borderTop: '2px solid grey'
}}>
      
          <SaveDashboardButton onSaveClick={handleSaveClick}  />
        </Grid>
{/* </Grid> */}


        {error && <div className="error-message">{error}</div>}

        <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
          <DialogTitle>Save Charts</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="File Name"
              type="text"
              fullWidth
              variant="standard"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDialogClose(true)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          Chart data is not available!
        </Alert>
      </Snackbar>
      </div>
    </DndProvider>
  );
}

export default Charts;
