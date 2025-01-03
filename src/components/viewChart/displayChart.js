// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTotalRows } from '../../utils/api';
// import DraggableChartButton from './DraggableChartButton';
// import DroppableArea from './DroppableArea';
// import ResizableChart from './ResizableChart';
// import { saveAllCharts } from '../../utils/api';
// import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import axios from "axios";

// function Charts() {
//   const dispatch = useDispatch();
//   const [error, setError] = useState(null);
//   const [chartData, setChartData] = useState([]);
//   const [droppedCharts, setDroppedCharts] = useState([]);
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const dashboardfilterXaxis = useSelector((state) => state.viewcharts.selectedCategory_xaxis);
//   const selectedCategory = useSelector((state) => state.viewcharts.selectedCategory);
//   const company_name=(localStorage.getItem('company_name'))

//   const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));

//   // console.log("Chart Data:", chartData);
//   console.log("company name*****************************",company_name)

//   // useEffect(() => {
//   //   console.log("Fetching total rows");
//   //   dispatch(fetchTotalRows())
//   //     .unwrap()
//   //     .then((response) => {
//   //       if (response && response.chart_names) {
//   //         setChartNamesArray(response.chart_names);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.error("Error fetching total rows:", err);
//   //     });
//   // }, [dispatch]);
//   useEffect(() => {
//     console.log("Fetching total rows");
//     dispatch(fetchTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           // Check if chart_names is an array or an object
//           if (Array.isArray(response.chart_names)) {
//             setChartNamesArray(response.chart_names);
//           } else if (typeof response.chart_names === 'object') {
//             // Extract array from object
//             const chartNames = Object.values(response.chart_names).flat(); // Flatten array if necessary
//             setChartNamesArray(chartNames);
//           } else {
//             console.error("Unexpected format for chart_names:", response.chart_names);
//             setChartNamesArray([]);  // Set to empty array if the format is unexpected
//           }
//         } else {
//           console.error("chart_names is not present in the response:", response);
//           setChartNamesArray([]);  // Set to empty array if chart_names is missing
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);  // Set to empty array in case of API error
//       });
//   }, [dispatch, user_id]);
//   const handleChartButtonClick = useCallback(async (chartName) => {
//     console.log(`Chart Name: ${chartName}`);

//     try {
//       const response = await axios.get(`http://localhost:5000/chart_data/${chartName}`);
//       const data = response.data;
//       console.log('Data fetched from chartdata:', data);

//       console.log('Data fetched from chartdata:', data);

//       setChartData((prevData) => {
//         const newData = [...prevData, { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } }];
//         return newData;
//       });

//       setDroppedCharts((prev) => [...prev, chartName]);
//       setError(null);
//     } catch (error) {
//       console.error(`Error fetching data for Chart ${chartName}:`, error);
//       setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
//     }
//   }, []);

//   const handleRemoveChart = useCallback((chartName) => {
//     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
//     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
//     setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));
//   }, []);

//   const updateChartDetails = useCallback((chartName, newDetails) => {
//     setChartData((prevData) => {
//       const updatedData = prevData.map((data) =>
//         data.chartName === chartName ? { ...data, ...newDetails } : data
//       );
//       return updatedData;
//     });
//   }, []);

//   const handleSaveClick = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = (shouldSave) => {
//     setOpenDialog(false);
//     if (shouldSave && fileName) {
//       saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName,company_name);
//       setFileName(""); // Reset the file name after saving
//     }
//   };

//   const renderedDraggableButtons = useMemo(() => (
//     chartNamesArray.map((chartName, index) => (
//       <DraggableChartButton
//         key={index}
//         chartName={chartName}
//         onRemove={handleRemoveChart}
//         disabled={droppedCharts.includes(chartName)}
//       />
//     ))
//   ), [chartNamesArray, droppedCharts]);

//   const renderedCharts = useMemo(() => (
//     chartData.map((data) => (
//       <ResizableChart
//         key={data.chartName}
//         data={data}
//         onRemove={handleRemoveChart}
//         updateChartDetails={updateChartDetails}
//       />
//     ))
//   ), [chartData, handleRemoveChart, updateChartDetails]);

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="App">
//         <Box sx={{ flexGrow: 1, minHeight: '85vh' ,marginTop:'70px'}}>
//           <Grid container spacing={2} wrap="wrap">
//             <Grid item xs={12} md={12}>
//               <DroppableArea onDrop={handleChartButtonClick}>
//                 {renderedCharts}
//               </DroppableArea>
//             </Grid>
//           </Grid>
//         </Box>
//         <Button variant="contained" color="primary" onClick={handleSaveClick} >
//           Save Dashboard
//         </Button>
        
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
//         <Grid item xs={12} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', boxShadow: 3,height:'35px' ,marginBottom:'5px'}}>
//           <Box sx={{ display: 'flex', justifyContent: 'center',height:'30px', marginTop:'3px' }}>
//             {renderedDraggableButtons}
//           </Box>
//         </Grid>
//       </div>
//     </DndProvider>
//   );
// }

// export default Charts;

//========================GAYATHRI CODE===========================  

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRows } from '../../utils/api';
import DraggableChartButton from './DraggableChartButton';
import DroppableArea from './DroppableArea';
import ResizableChart from './ResizableChart';
import { saveAllCharts ,fetchSingleChartData} from '../../utils/api';
import { Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

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
  const company_name=(localStorage.getItem('company_name'))

  const [user_id, setUserId] = React.useState(localStorage.getItem('user_id'));

  // console.log("Chart Data:", chartData);
  console.log("company name*****************************",company_name)

  useEffect(() => {
    console.log("Fetching total rows");
    dispatch(fetchTotalRows(user_id))
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          // Check if chart_names is an array or an object
          if (Array.isArray(response.chart_names)) {
            setChartNamesArray(response.chart_names);
          } else if (typeof response.chart_names === 'object') {
            // Extract array from object
            const chartNames = Object.values(response.chart_names).flat(); // Flatten array if necessary
            setChartNamesArray(chartNames);
          } else {
            console.error("Unexpected format for chart_names:", response.chart_names);
            setChartNamesArray([]);  // Set to empty array if the format is unexpected
          }
        } else {
          console.error("chart_names is not present in the response:", response);
          setChartNamesArray([]);  // Set to empty array if chart_names is missing
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setChartNamesArray([]);  // Set to empty array in case of API error
      });
  }, [dispatch, user_id]);

  // const handleChartButtonClick = useCallback(async (chartName) => {
  //   console.log(`Chart Name: ${chartName}`);

  //   try {
  //     const response = await axios.get(`http://localhost:5000/chart_data/${chartName}`);
  //     const data = response.data;
  //     console.log('Data fetched from chartdata:', data);

  //     console.log('Data fetched from chartdata:', data);

  //     setChartData((prevData) => {
  //       const newData = [...prevData, { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } }];
  //       return newData;
  //     });

  //     setDroppedCharts((prev) => [...prev, chartName]);
  //     setError(null);
  //   } catch (error) {
  //     console.error(`Error fetching data for Chart ${chartName}:`, error);
  //     setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
  //   }
  // }, []);
  const handleChartButtonClick = useCallback(async (chartName) => {
    console.log(`Chart Name: ${chartName}`);
  
    try {
      // Fetch chart data using the API function
      const data = await fetchSingleChartData(chartName);
      console.log('Data fetched from chartdata:', data);
  
      setChartData((prevData) => {
        const newData = [
          ...prevData,
          { ...data, chartName, width: 500, height: 400, position: { x: 0, y: 0 } },
        ];
        return newData;
      });
  
      setDroppedCharts((prev) => [...prev, chartName]); // Add chart name to dropped charts
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(`Error fetching data for Chart ${chartName}:`, error);
      setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
    }
  }, []);

  const handleRemoveChart = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    // setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));

  }, []);

  const handleRemoveChartButton = useCallback((chartName) => {
    setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
    setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
    setChartNamesArray((prevArray) => prevArray.filter((name) => name !== chartName));

  }, []);


  const updateChartDetails = useCallback((chartName, newDetails) => {
    setChartData((prevData) => {
      const updatedData = prevData.map((data) =>
        data.chartName === chartName ? { ...data, ...newDetails } : data
      );
      return updatedData;
    });
  }, []);

  const handleSaveClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (shouldSave) => {
    setOpenDialog(false);
    if (shouldSave && fileName) {
      saveAllCharts(user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName,company_name);
      setFileName(""); // Reset the file name after saving
    }
  };

  const renderedDraggableButtons = useMemo(() => (
    chartNamesArray.map((chartName, index) => (
      <DraggableChartButton
        key={index}
        chartName={chartName}
        disabled={droppedCharts.includes(chartName)}
        onRemove={handleRemoveChartButton} 
      />
    ))
  ), [chartNamesArray, droppedCharts]);

  const renderedCharts = useMemo(() => (
    chartData.map((data) => (
      <ResizableChart
        key={data.chartName}
        data={data}
        onRemove={handleRemoveChart}
        updateChartDetails={updateChartDetails}
      />
    ))
  ), [chartData, handleRemoveChart, updateChartDetails]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Box sx={{ flexGrow: 1, minHeight: '85vh' ,marginTop:'70px'}}>
          <Grid container spacing={2} wrap="wrap">
            <Grid item xs={12} md={12}>
              <DroppableArea onDrop={handleChartButtonClick}>
                {renderedCharts}
              </DroppableArea>
            </Grid>
          </Grid>
        </Box>
        <Button variant="contained" color="primary" onClick={handleSaveClick} >
          Save Dashboard
        </Button>
        
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
        {/* <Grid item xs={12} sx={{   overflowX: 'auto', 
  overflowY: 'hidden',  position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', boxShadow: 3,height:'35px' ,marginBottom:'1px',marginLeft:'1px',marginRight:'1px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center',height:'30px', marginTop:'3px' }}>
            {renderedDraggableButtons}
          </Box>
        </Grid> */}
<Grid item xs={12} sx={{ 
  overflowX: 'auto', 
  overflowY: 'hidden', 
  position: 'fixed', 
  bottom: 0, 
  left: 0, 
  right: 0, 
  bgcolor: 'white', 
  boxShadow: 3, 
  height: '35px', 
  marginBottom: '1px', 
  marginLeft: '1px', 
  marginRight: '1px', 
  paddingBottom: '15px' }}> {/* Increased paddingBottom */}
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'flex-start', 
    height: '30px', 
    marginTop: '3px', 
    whiteSpace: 'nowrap' }}>
    {renderedDraggableButtons}
  </Box>
</Grid>


      </div>
    </DndProvider>
  );
}

export default Charts;

