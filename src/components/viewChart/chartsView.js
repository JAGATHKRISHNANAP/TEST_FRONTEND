

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRows } from "../../utils/api";
import ResizableChart from "./ResizableChart";
import {fetchSingleChartData } from "../../utils/api";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router";
import HomePage from '../../pages/HomePage';
function Chartsview() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]); // Will hold a single chart
  const [droppedCharts, setDroppedCharts] = useState([]); // Single chart tracking
  const [chartNamesArray, setChartNamesArray] = useState([]); // Initialize as an empty array
  const [openDialog, setOpenDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const dashboardfilterXaxis = useSelector(
    (state) => state.viewcharts.selectedCategory_xaxis
  );
  const selectedCategory = useSelector(
    (state) => state.viewcharts.selectedCategory
  );
  const database_name = localStorage.getItem("company_name");
  const [user_id, setUserId] = React.useState(sessionStorage.getItem("user_id"));

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchTotalRows(user_id,database_name))
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          if (Array.isArray(response.chart_names)) {
            setChartNamesArray(response.chart_names);
          } else if (typeof response.chart_names === "object") {
            const chartNames = Object.values(response.chart_names).flat();
            setChartNamesArray(chartNames);
          } else {
            console.error(
              "Unexpected format for chart_names:",
              response.chart_names
            );
            setChartNamesArray([]);
          }
        } else {
          console.error("chart_names is not present in the response:", response);
          setChartNamesArray([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setChartNamesArray([]);
      });
  }, [dispatch, user_id]);

  // const handleChartButtonClick = useCallback(async (chartName) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/chart_data/${chartName}`
  //     );
  //     const data = response.data;

  //     // Increase chart size based on window size
  //     const chartWidth = windowSize.width * 0.6; // 80% of the window width
  //     const chartHeight = windowSize.height * 0.4; // 60% of the window height

  //     setChartData([
  //       {
  //         ...data,
  //         chartName,
  //         width: chartWidth,
  //         height: chartHeight,
  //         position: { x: 0, y: 0 },
  //       },
  //     ]);
  //     setDroppedCharts([chartName]);
  //     setError(null);
  //   } catch (error) {
  //     console.error(`Error fetching data for Chart ${chartName}:`, error);
  //     setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
  //   }
  // }, [windowSize]);
  const handleChartButtonClick = useCallback(
    async (chartName) => {
      try {
        const data = await fetchSingleChartData(chartName);
  
        // Increase chart size based on window size
        const chartWidth = windowSize.width * 0.8; // 80% of the window width
        const chartHeight = windowSize.height * 0.6; // 60% of the window height
  
        setChartData([
          {
            ...data,
            chartName,
            width: chartWidth,
            height: chartHeight,
            position: { x: 0, y: 0 },
          },
        ]);
        setDroppedCharts([chartName]);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
      }
    },
    [windowSize]
  );

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
  }, []);

  // const handleSaveClick = () => {
  //   setOpenDialog(true);
  // };

  // const handleDialogClose = (shouldSave) => {
  //   setOpenDialog(false);
  //   if (shouldSave && fileName) {
  //     saveAllCharts(
  //       user_id,
  //       chartData,
  //       dashboardfilterXaxis,
  //       selectedCategory,
  //       fileName
  //     );
  //     setFileName("");
  //   }
  // };
  const renderedChartButtons = useMemo(
    () =>
      Array.isArray(chartNamesArray)
        ? chartNamesArray.map((chartName, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleChartButtonClick(chartName)}
              disabled={droppedCharts.includes(chartName)}
              // sx={{ margin: "5px" }}
              sx={{
                margin: '4px',
                minWidth: '90px',
                color: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
                maxHeight: '28px',
                fontSize: '12px',
                textOverflow: 'ellipsis',
                whiteSpace: "nowrap",
                padding: '6px',
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '4px',
                textTransform: 'none',
                border: '2px solid #D3D3D3', 
                '&:hover': {
                  backgroundColor: '#A0A0A0',
                  transform: 'scale(1.05)', // Slight zoom effect for hover
                },
              }}
            >
              {chartName}
            </Button>
          ))
        : [],
    [chartNamesArray, droppedCharts]
  );

  const renderedCharts = useMemo(() => {
    return chartData.map((data) => (
      <ResizableChart
        key={data.chartName}
        data={data}
        onRemove={handleRemoveChart}
        updateChartDetails={updateChartDetails}
        isChartView={true} 
      />
    ));
  }, [chartData, updateChartDetails]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, minHeight: "89vh", marginTop: "70px" ,backgroundColor:"white"}}>
      <HomePage />
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12} md={12}>
            {/* Render charts when the user clicks on the buttons */}
            {renderedCharts}
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} sx={{
  position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',justifyContent: "flex-start",
  boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center' ,borderTop:` 2px solid grey` 
}}>          {renderedChartButtons}
          
        </Grid>
    </div>
  );
}

export default Chartsview;




































