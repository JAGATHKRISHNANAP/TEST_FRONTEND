

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalRows } from "../../utils/api";
import ResizableChart from "./ResizableChart";
import { saveAllCharts } from "../../utils/api";
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
  const [user_id, setUserId] = React.useState(localStorage.getItem("user_id"));

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const handleChartButtonClick = useCallback(async (chartName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/chart_data/${chartName}`
      );
      const data = response.data;

      // Increase chart size based on window size
      const chartWidth = windowSize.width * 0.6; // 80% of the window width
      const chartHeight = windowSize.height * 0.4; // 60% of the window height

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
      console.error(`Error fetching data for Chart ${chartName}:`, error);
      setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
    }
  }, [windowSize]);

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

  const handleSaveClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (shouldSave) => {
    setOpenDialog(false);
    if (shouldSave && fileName) {
      saveAllCharts(
        user_id,
        chartData,
        dashboardfilterXaxis,
        selectedCategory,
        fileName
      );
      setFileName("");
    }
  };

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
                fontSize: "14px",
                // marginTop: "2px",
                marginLeft: "2px",
                marginRight: "2px",
                width: "90px",
                height: "25px",
                color: "white",
                overflow: "hidden", // Ensure overflow content is hidden
                whiteSpace: "nowrap", // Prevent text from wrapping
                textOverflow: "ellipsis", // Show ellipsis for overflowing text
                display: "block",
                position: "relative", // For the scrolling effect
                flexShrink: 0, // Prevent shrinking
                '&:hover span': { // Activate scrolling on hover
                  animation: 'scroll 10s linear infinite' // Animation when hovered
                }
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
      />
    ));
  }, [chartData, updateChartDetails]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, minHeight: "85vh", marginTop: "70px" ,backgroundColor:"white"}}>
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12} md={12}>
            {/* Render charts when the user clicks on the buttons */}
            {renderedCharts}
          </Grid>
        </Grid>
      </Box>
<Grid item xs={12} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white',overflowY: 'auto',  boxShadow: 3,height:'40px' ,marginBottom:'5px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center',height:'30px', marginTop:'3px' }}>
            {renderedChartButtons}
          </Box>
        </Grid>
    </div>
  );
}

export default Chartsview;
