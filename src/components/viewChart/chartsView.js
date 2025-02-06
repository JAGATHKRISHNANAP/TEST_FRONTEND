

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








































// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTotalRows } from "../../utils/api";
// import ResizableChart from "./ResizableChart";
// import {fetchSingleChartData } from "../../utils/api";
// import {
//   Box,
//   Grid,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField, IconButton,
// } from "@mui/material";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

// import axios from "axios";

// function Chartsview() {
//   const dispatch = useDispatch();
//   const [error, setError] = useState(null);
//   const [chartData, setChartData] = useState([]); // Will hold a single chart
//   const [droppedCharts, setDroppedCharts] = useState([]); // Single chart tracking
//   const [chartNamesArray, setChartNamesArray] = useState([]); // Initialize as an empty array
//   const [openDialog, setOpenDialog] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [fullscreenChart, setFullscreenChart] = useState(null); // Track fullscreen chart

//   const dashboardfilterXaxis = useSelector(
//     (state) => state.viewcharts.selectedCategory_xaxis
//   );
//   const selectedCategory = useSelector(
//     (state) => state.viewcharts.selectedCategory
//   );
//   const database_name = localStorage.getItem("company_name");
//   const [user_id, setUserId] = React.useState(localStorage.getItem("user_id"));
//   // const windowSize = useMemo(() => ({
//   //   width: window.innerWidth,
//   //   height: window.innerHeight,
//   // }), []);

//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   // Update window size on resize
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     dispatch(fetchTotalRows(user_id,database_name))
//       .unwrap()
//       .then((response) => {
//         if (response && response.chart_names) {
//           if (Array.isArray(response.chart_names)) {
//             setChartNamesArray(response.chart_names);
//           } else if (typeof response.chart_names === "object") {
//             const chartNames = Object.values(response.chart_names).flat();
//             setChartNamesArray(chartNames);
//           } else {
//             console.error(
//               "Unexpected format for chart_names:",
//               response.chart_names
//             );
//             setChartNamesArray([]);
//           }
//         } else {
//           console.error("chart_names is not present in the response:", response);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//       });
//   }, [dispatch, user_id]);

//   // const handleChartButtonClick = useCallback(async (chartName) => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:5000/chart_data/${chartName}`
//   //     );
//   //     const data = response.data;

//   //     // Increase chart size based on window size
//   //     const chartWidth = windowSize.width * 0.6; // 80% of the window width
//   //     const chartHeight = windowSize.height * 0.4; // 60% of the window height

//   //     setChartData([
//   //       {
//   //         ...data,
//   //         chartName,
//   //         width: chartWidth,
//   //         height: chartHeight,
//   //         position: { x: 0, y: 0 },
//   //       },
//   //     ]);
//   //     setDroppedCharts([chartName]);
//   //     setError(null);
//   //   } catch (error) {
//   //     console.error(`Error fetching data for Chart ${chartName}:`, error);
//   //     setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
//   //   }
//   // }, [windowSize]);
//   const handleChartButtonClick = useCallback(
//     async (chartName) => {
//       try {
//         const data = await fetchSingleChartData(chartName);
  
//         // Increase chart size based on window size
//         // const chartWidth = windowSize.width * 0.8; // 80% of the window width
//         // const chartHeight = windowSize.height * 0.6; // 60% of the window height
  
//         setChartData([
//           {
//             ...data,
//             chartName,
//             width: 400,
//             height: 400,
//             position: { x: 0, y: 0 },
//           },
//         ]);
//         setDroppedCharts([chartName]);
//         setError(null);
//       } catch (error) {
//         setError(`Failed to fetch data for Chart ${chartName}. Please try again later.`);
//       }
//     },
//     []
//   );
//   const handleToggleFullscreen = useCallback(
//     (chartName) => {
//       setFullscreenChart((prev) => (prev === chartName ? null : chartName));
//     },
//     []
//   );

//   const updateChartDetails = useCallback((chartName, newDetails) => {
//     setChartData((prevData) =>
//       prevData.map((data) =>
//         data.chartName === chartName ? { ...data, ...newDetails } : data
//       )
//     );
//   }, []);
//   const handleRemoveChart = useCallback((chartName) => {
//     setChartData((prevData) => prevData.filter((data) => data.chartName !== chartName));
//     setDroppedCharts((prev) => prev.filter((name) => name !== chartName));
//   }, []);

//   // const handleSaveClick = () => {
//   //   setOpenDialog(true);
//   // };

//   // const handleDialogClose = (shouldSave) => {
//   //   setOpenDialog(false);
//   //   if (shouldSave && fileName) {
//   //     saveAllCharts(
//   //       user_id,
//   //       chartData,
//   //       dashboardfilterXaxis,
//   //       selectedCategory,
//   //       fileName
//   //     );
//   //     setFileName("");
//   //   }
//   // };

//   const renderedChartButtons = useMemo(
//     () =>
//       Array.isArray(chartNamesArray)
//         ? chartNamesArray.map((chartName, index) => (
//             <Button
//               key={index}
//               variant="contained"
//               onClick={() => handleChartButtonClick(chartName)}
//               disabled={droppedCharts.includes(chartName)}
//               // sx={{ margin: "5px" }}
//               sx={{
//                 margin: '4px',
//                 minWidth: '90px',
//                 color: 'white',
//                 backgroundColor: 'primary.main',
//                 justifyContent: 'center',
//                 maxHeight: '28px',
//                 fontSize: '12px',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: "nowrap",
//                 padding: '6px',
//                 position: 'relative',
//                 display: 'inline-flex',
//                 borderRadius: '4px',
//                 textTransform: 'none',
//                 '&:hover': {
//                   backgroundColor: 'primary.dark',
//                   transform: 'scale(1.05)', // Slight zoom effect for hover
//                 },
//               }}
//             >
//               {chartName}
//             </Button>
//           ))
//         : [],
//     [chartNamesArray, droppedCharts]
//   );

//   // const renderedCharts = useMemo(() => {
//   //   return chartData.map((data) => (
//   //     <ResizableChart
//   //       key={data.chartName}
//   //       data={data}
//   //       onRemove={handleRemoveChart}
//   //       updateChartDetails={updateChartDetails}
//   //     />
//   //   ));
//   // }, [chartData, updateChartDetails]);

//   const renderedCharts = useMemo(() => {
//     return chartData.map((data) => {
//       const isFullscreen = fullscreenChart === data.chartName;
//       const chartStyles = isFullscreen
//         ? {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: windowSize.width,
//             height: windowSize.height,
//             zIndex: 9999,
//             background: "white",
//           }
//         : {
//             width: data.width,
//             height: data.height,
//             position: "relative",
//           };
//           return (
//             <div key={data.chartName} style={chartStyles}>
//               <ResizableChart
//                 data={data}
//                 onRemove={(name) => {
//                   setChartData((prev) => prev.filter((c) => c.chartName !== name));
//                   setDroppedCharts((prev) => prev.filter((c) => c !== name));
//                   if (fullscreenChart === name) setFullscreenChart(null);
//                 }}
//                 // key={data.chartName}
//                 // data={data}
//                 // onRemove={handleRemoveChart}
//                 updateChartDetails={updateChartDetails}
//               />
//               <IconButton
//                 style={{
//                   position: "absolute",
//                   top: 10,
//                   right: 10,
//                   zIndex: 10000,
//                 }}
//                 onClick={() => handleToggleFullscreen(data.chartName)}
//               >
//                 {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//               </IconButton>
//             </div>
//           );
//         });
//       }, [chartData, fullscreenChart, windowSize,updateChartDetails]);
    

//   return (
//     <div className="App">
//       <Box sx={{ flexGrow: 1, minHeight: "85vh", marginTop: "70px" ,backgroundColor:"white"}}>
//         <Grid container spacing={2} wrap="wrap">
//           <Grid item xs={12} md={12}>
//             {/* Render charts when the user clicks on the buttons */}
//             {renderedCharts}
//           </Grid>
//         </Grid>
//       </Box>
// <Grid item xs={12} sx={{
//   position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'white', overflowX: 'auto',justifyContent: "flex-start",
//   boxShadow: 3, height: '60px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center' ,borderTop:` 2px solid grey` 
// }}>          {renderedChartButtons}
          
//         </Grid>
//     </div>
//   );
// }

// export default Chartsview;
