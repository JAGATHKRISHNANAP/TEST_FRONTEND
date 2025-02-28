

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
import HomePage from '../../pages/HomePage';
import {useNavigate} from "react-router";
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
  const [user_id, setUserId] = React.useState(sessionStorage.getItem('user_id'));
  const [borderColor, setBorderColor] = useState("#000"); // Default black border
  const [borderSize, setBorderSize] = useState("1px"); // Default border size
  const [showBorder, setShowBorder] = useState(true); // Toggle border visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const chartDetails = useSelector((state) => state.viewChartDetails.chartDetails);

 const navigate = useNavigate(); // Initialize useNavigate
       
         useEffect(() => {
             const disableBackButton = () => {
                 navigate("/"); // Redirect to the login page
             };
       
             window.history.pushState(null, "", window.location.href);
             window.addEventListener("popstate", disableBackButton);
       
             return () => {
                 window.removeEventListener("popstate", disableBackButton);
             };
         }, [navigate]); // Add navigate to the dependency array
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
           position: dropPosition || { x: 50, y: 50 }, // Default if not dropped
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
      // <Grid item xs={12} sm={5} md={5} lg={1.7} key={data.chartName}  sx={{ padding: '0px', height: "490px" }}
      <Grid item xs={12} sm={6} md={4} lg={3} key={data.chartName} sx={{ padding: '0px', height: "490px" }}

    // Common class name for querying
       data-chartname={data.chartName}
       >
        <ResizableChart
          data={data}
          onRemove={handleCloseChart}
          updateChartDetails={updateChartDetails}
          position={data.position}
        />
        
      </Grid>
    ))
  ), [chartData, handleCloseChart, updateChartDetails]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
         <Box sx={{ flexGrow: 1, minHeight: '95vh', marginTop: '10px' }}>
         <HomePage />
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
