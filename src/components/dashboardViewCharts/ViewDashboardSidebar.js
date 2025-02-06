// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardTotalRows, fetchDashboardData,deletedashboard } from '../../utils/api';
// import { addTextChart, addChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
// import { Box, Button, ButtonGroup ,IconButton,Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from "@mui/material";
// import "../Style.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";

// function ViewDashboardSidebar() {
//   const dispatch = useDispatch();
//   const [chartNamesArray, setChartNamesArray] = useState([]);
//   const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);
//   const [chartPositions, setChartPositions] = useState({});

//   useEffect(() => {
//     if (chartData) {
//       localStorage.setItem("charts", JSON.stringify(chartData));
//     }
//   }, [chartData]); // Runs whenever chartData changes

//   const testchartData = useSelector((state) => state.viewdashboard.textChart);
//   const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
//   const [chartToDelete, setChartToDelete] = useState(null); // State to store the chart to delete
//   const [anchorEl, setAnchorEl] = useState(null); // State to manage the context menu anchor
//   const user_id = localStorage.getItem("user_id"); // Fetch user ID from localStorage
//   // const testchartData = { chartData };
//   //       dispatch(addTextChart(textChartData));
//   console.log("chartData:", chartData); 
//   console.log("testchartData:", testchartData);
//   console.log("user_id:", user_id);
//   useEffect(() => {
//     const company_name = localStorage.getItem("company_name");
//     console.log("company_name:", company_name);

//     if (!user_id) {
//       console.error("User ID not found in localStorage");
//       return;
//     }

//     console.log("Fetching total rows");
//     dispatch(fetchDashboardTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         console.log("API Response:", response);

//         // Validate and process `chart_names`
//         if (response && response.chart_names && typeof response.chart_names === "object") {
//           const chartNames = Object.values(response.chart_names).flat();
//           setChartNamesArray(chartNames);
//           console.log("Updated Chart Names Array:", chartNames);
//         } else {
//           console.error("chart_names is not an object or has unexpected structure:", response.chart_names);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//       });
//   }, [dispatch, user_id]);


//   const handleChartButtonClick = (chartNumber, chartName) => {
//     dispatch(fetchDashboardData(chartName))
//       .unwrap()
//       .then((response) => {
//         console.log("Chart data:", response); // Logging the chart data
  
//         // Save the chart data in localStorage
//         if (response && response.chart_ids && response.position) {
//           const chartIds = response.chart_ids.replace(/[{}]/g, "").split(",");
//           const parsedPositions = JSON.parse(response.position.replace(/'/g, '"'));
          
//           // Create a mapping of chart ID to its position
//           const chartPositionMap = chartIds.reduce((acc, chartId, index) => {
//             acc[chartId] = parsedPositions[index] || { x: 0, y: 0 }; // Default (0,0) if missing
//             return acc;
//           }, {});
//           setChartPositions(chartPositionMap);
//       }
  
//         // Process the chart data as needed
//         response.chart_datas.forEach((chartData) => {
//           if (chartData.chart_type === "singleValueChart") {
//             dispatch(addTextChart(chartData));
//           }
//         });
  
//         const filteredChartData = response.chart_datas.filter(
//           (chartData) => chartData.chart_type !== "singleValueChart"
//         );
//         filteredChartData.forEach((chartData, index) => {
//           console.log("addChartData", addChartData);
//           dispatch(addChartData({ ...chartData, index }));
//         });
//       })
//       .catch((err) => {
//         console.error("Error fetching chart data:", err);
//       });
//   };

  
//   const handleContextMenu = (event, chartName, index) => {
//     event.preventDefault(); // Prevent default context menu
//     setAnchorEl({
//       mouseX: event.clientX + 2, // Adjust for better alignment
//       mouseY: event.clientY + 4,
//     }); 
//     setChartToDelete({ chartName, index }); // Store chart info for potential deletion
//   };
  
//   const handleCloseContextMenu = () => {
//     setAnchorEl(null); // Reset anchor position
//   };
  

//   // Handle delete option from context menu
//   const handleDeleteFromContextMenu = () => {
//     if (chartToDelete) {
//       const { index, chartName } = chartToDelete;

//       // Open the confirmation dialog
//       setOpenModal(true);
//     }
//     setAnchorEl(null); // Close context menu after action
//   };

//   // Function to handle the deletion confirmation
//   const handleDeleteConfirm = () => {
//     if (chartToDelete) {
//       const { index, chartName } = chartToDelete;

//       // Dispatch delete action
//       dispatch(deletedashboard(chartName)) // Call API to delete chart data from the database
//         .then((response) => {
//           console.log("Chart deleted successfully:", response);

//           // Update the chart names array in the state after successful deletion
//           const updatedChartNames = chartNamesArray.filter((_, idx) => idx !== index);
//           setChartNamesArray(updatedChartNames);

//           // Optionally, update the Redux state (if required) or trigger any other actions
//         })
//         .catch((err) => {
//           console.error("Error deleting chart:", err);
//         });
//       setOpenModal(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

// return (
//       <div className="App" style={{ height: '100vh' }}>
//         {/* Sidebar fixed at the bottom */}
//         <Box sx={{ 
//             position: 'fixed', 
//             bottom: 0, 
//             left: 0, 
//             right: 0, 
//             padding: '10px', 
//             backgroundColor: 'white', 
//             display: 'flex', 
//             justifyContent: 'flex-start',
//             overflowY: 'auto',  
//             // zIndex: 1000, // Ensure it's above other elements
           
//         }}>
         
          
//             {/* {chartNamesArray.map((name, index) => (
//               <Button
//                 sx={{ 
//                   margin: '4px',
//               minWidth: '90px',
//               color: 'white',
//               backgroundColor: 'primary.main',
//               justifyContent: 'center',
//               maxHeight: '28px',
//               fontSize: '12px',
//               textOverflow: 'ellipsis',
//               whiteSpace: "nowrap",
//               padding: '6px',
//               position: 'relative',
//               display: 'inline-flex',
//               borderRadius: '4px',
//               textTransform: 'none',
//                   '&:hover': { backgroundColor: 'bgcolour' }
//                 }}
//                 className="x-axis-column"
//                 key={index + 1}
//                 onClick={() => handleChartButtonClick(index + 1, name)}
//               onContextMenu={(event) => handleContextMenu(event, name, index)} // Right-click to open context menu
//               >
//                 {name}
//               </Button> */}
            
//       {chartNamesArray.map((name, index) => {
//         const position = chartPositions[index] || { x: 0, y: 0 }; // Default to (0,0) if not found
//         return (
//           <Button
//                 sx={{ 
//                   margin: '4px',
//               minWidth: '90px',
//               color: 'black',
//               background:'white',
//               // backgroundColor: 'primary.white',
//               justifyContent: 'center',
//               maxHeight: '28px',
//               fontSize: '12px',
//               textOverflow: 'ellipsis',
//               whiteSpace: "nowrap",
//               padding: '6px',
//               position: 'relative',
//               display: 'inline-flex',
//               borderRadius: '4px',
//               textTransform: 'none',
//               border: '2px solid #D3D3D3', 
//                   '&:hover': { backgroundColor: 'bgcolour' }
//                 }}
//                 className="x-axis-column"
//                 key={index + 1}
//                 onClick={() => handleChartButtonClick(index + 1, name)}
//               onContextMenu={(event) => handleContextMenu(event, name, index)} // Right-click to open context menu
//               >
//                 {name}
//               </Button> 
            
//         );
//       })}
//         </Box>
//         {/* </Box> */}
//         <Menu
//   anchorReference="anchorPosition"
//   anchorPosition={
//     anchorEl
//       ? { top: anchorEl.mouseY, left: anchorEl.mouseX }
//       : undefined
//   }
//   open={Boolean(anchorEl)}
//   onClose={handleCloseContextMenu}
//   sx={{
//     boxShadow: 1,
//     borderRadius: "6px",
//     padding: "0px",
//     minWidth: "160px", 
//   }}
// >
//   {/* Delete Option */}
//   <MenuItem
//     onClick={handleDeleteFromContextMenu}
//     sx={{
//       fontSize: "12px", 
//       fontWeight: "300", 
//       color: "black", 
//       padding: "10px 20px", 
//       display: "flex",
//       alignItems: "center",
//       "&:hover": {
//         backgroundColor: "#f5f5f5", 
//       },
//     }}
//   >
//     <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> 
//     Delete 
//   </MenuItem>

//   {/* Cancel Option */}
//   <MenuItem
//     onClick={handleCloseContextMenu}
//     sx={{
//       fontSize: "12px",
//       fontWeight: "300",
//       color: "black", 
//       padding: "10px 20px", 
//       display: "flex",
//       alignItems: "center",
//       "&:hover": {
//         backgroundColor: "#f5f5f5", 
//       },
//     }}
//   >
//     <CancelIcon sx={{ marginRight: 1, color: 'grey' }} />
//     Cancel
//   </MenuItem>
// </Menu>

//       {/* Confirmation Dialog */}
//       <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//         <DialogTitle>Delete Chart</DialogTitle>
//         <DialogContent>
//           {/* Display chart name in the modal */}
//           <p>Are you sure you want to delete the chart: <strong>{chartToDelete ? chartToDelete.chartName : ""}</strong>?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenModal(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteConfirm} color="secondary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
// // export default ViewDashboardSidebar;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardTotalRows, fetchDashboardData, deletedashboard } from '../../utils/api';
// import { addTextChart, addChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
// import {
//   Box,
//   Button,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Menu,
//   MenuItem
// } from "@mui/material";
// import "../Style.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";

// function ViewDashboardSidebar() {
//   const dispatch = useDispatch();
  
//   // Array of chart names (used for sidebar labels or similar)
//   const [chartNamesArray, setChartNamesArray] = useState([]);
  
//   // Array of chart objects (each chart now contains its own position info)
//   const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);
 

//   // (Optional) We can still store positions locally if needed.
//   const [chartPositions, setChartPositions] = useState({});

//   useEffect(() => {
//     if (chartData) {
//       localStorage.setItem("charts", JSON.stringify(chartData));
//     }
//   }, [chartData]);

//   const testchartData = useSelector((state) => state.viewdashboard.textChart);
//   const [openModal, setOpenModal] = useState(false);
//   const [chartToDelete, setChartToDelete] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const user_id = localStorage.getItem("user_id");

//   console.log("chartData:", chartData); 
//   console.log("testchartData:", testchartData);
//   console.log("user_id:", user_id);

//   useEffect(() => {
//     const company_name = localStorage.getItem("company_name");
//     console.log("company_name:", company_name);

//     if (!user_id) {
//       console.error("User ID not found in localStorage");
//       return;
//     }

//     console.log("Fetching total rows");
//     dispatch(fetchDashboardTotalRows(user_id))
//       .unwrap()
//       .then((response) => {
//         console.log("API Response:", response);
//         // Validate and process `chart_names`
//         if (response && response.chart_names && typeof response.chart_names === "object") {
//           const chartNames = Object.values(response.chart_names).flat();
//           setChartNamesArray(chartNames);
//           console.log("Updated Chart Names Array:", chartNames);
//         } else {
//           console.error("chart_names is not an object or has unexpected structure:", response.chart_names);
//           setChartNamesArray([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching total rows:", err);
//         setChartNamesArray([]);
//       });
//   }, [dispatch, user_id]);

//   const handleChartButtonClick = (chartNumber, chartName) => {
//     dispatch(fetchDashboardData(chartName))
//       .unwrap()
//       .then((response) => {
//         console.log("Chart data:", response);

//         // If your backend returns a combined string of chart_ids and positions,
//         // process them here (if needed). In this example, we assume that each chart
//         // object in response.chart_datas already contains a property "positions"
//         // with the correct { x, y } values.
//         if (response && response.chart_ids && response.position) {
//           const chartIds = response.chart_ids.replace(/[{}]/g, "").split(",");
//           const parsedPositions = JSON.parse(response.position.replace(/'/g, '"'));
          
//           // Create a mapping of chart ID to its position (if you need it for other purposes)
//           const chartPositionMap = chartIds.reduce((acc, chartId, index) => {
//             acc[chartId] = parsedPositions[index] || { x: 0, y: 0 };
//             return acc;
//           }, {});
//           setChartPositions(chartPositionMap);
//         }

//         // Dispatch singleValue charts separately
//         response.chart_datas.forEach((chartData) => {
//           if (chartData.chart_type === "singleValueChart") {
//             dispatch(addTextChart(chartData));
//           }
//         });

//         // For other charts, dispatch them (each chartData now should contain its "positions" field)
//         const filteredChartData = response.chart_datas.filter(
//           (chartData) => chartData.chart_type !== "singleValueChart"
//         );
//         filteredChartData.forEach((chartData, index) => {
//           dispatch(addChartData({ ...chartData, index }));
//         });
//       })
//       .catch((err) => {
//         console.error("Error fetching chart data:", err);
//       });
//   };

//   const handleContextMenu = (event, chartName, index) => {
//     event.preventDefault();
//     setAnchorEl({
//       mouseX: event.clientX + 2,
//       mouseY: event.clientY + 4,
//     }); 
//     setChartToDelete({ chartName, index });
//   };

//   const handleCloseContextMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleDeleteFromContextMenu = () => {
//     if (chartToDelete) {
//       setOpenModal(true);
//     }
//     setAnchorEl(null);
//   };

//   const handleDeleteConfirm = () => {
//     if (chartToDelete) {
//       const { index, chartName } = chartToDelete;
//       dispatch(deletedashboard(chartName))
//         .then((response) => {
//           console.log("Chart deleted successfully:", response);
//           const updatedChartNames = chartNamesArray.filter((_, idx) => idx !== index);
//           setChartNamesArray(updatedChartNames);
//         })
//         .catch((err) => {
//           console.error("Error deleting chart:", err);
//         });
//       setOpenModal(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <div className="App" style={{ height: '100vh' }}>
//       {/* Container for the charts */}
//       <Box
//         sx={{ 
//           position: 'relative', // Set container to relative so that absolute children position relative to it
//           width: '100%',
//           height: '100%',
//           backgroundColor: '#f9f9f9'
//         }}
//       >
//         {/* Render charts based on chartData from Redux.
//             We assume each chartData object contains a property "positions" with { x, y } */}
//         {chartData &&
//           chartData.map((chart, index) => {
//             // Use chart.positions from the fetched chart data
            
//             const pos = chartPositions[chart.chart_id] || { x: 0, y: 0 };
//             return (
//               <Button
//                 key={chart.chart_id || index}
//                 sx={{ 
//                   position: 'absolute', // Use absolute positioning
//                   left: `${pos.x}px`,
//                   top: `${pos.y}px`,
//                   minWidth: '90px',
//                   color: 'black',
//                   background: 'white',
//                   justifyContent: 'center',
//                   maxHeight: '28px',
//                   fontSize: '12px',
//                   textOverflow: 'ellipsis',
//                   whiteSpace: 'nowrap',
//                   padding: '6px',
//                   display: 'inline-flex',
//                   borderRadius: '4px',
//                   textTransform: 'none',
//                   border: '2px solid #D3D3D3',
//                   '&:hover': { backgroundColor: 'bgcolour' }
//                 }}
//                 onClick={() => handleChartButtonClick(index + 1, chart.chart_heading)}
//                 onContextMenu={(event) => handleContextMenu(event, chart.chart_heading, index)}
//               >
//                 {chart.chart_heading}
//               </Button>
//             );
//           })}
//       </Box>

//       {/* Sidebar fixed at the bottom (if you still want a list of chart names) */}
//       <Box sx={{ 
//           position: 'fixed', 
//           bottom: 0, 
//           left: 0, 
//           right: 0, 
//           padding: '10px', 
//           backgroundColor: 'white', 
//           display: 'flex', 
//           justifyContent: 'flex-start',
//           overflowY: 'auto',
//       }}>
//         {chartNamesArray.map((name, index) => (
//           <Button
//             sx={{ 
//               margin: '4px',
//               minWidth: '90px',
//               color: 'black',
//               background: 'white',
//               justifyContent: 'center',
//               maxHeight: '28px',
//               fontSize: '12px',
//               textOverflow: 'ellipsis',
//               whiteSpace: "nowrap",
//               padding: '6px',
//               position: 'relative',
//               display: 'inline-flex',
//               borderRadius: '4px',
//               textTransform: 'none',
//               border: '2px solid #D3D3D3', 
//               '&:hover': { backgroundColor: 'bgcolour' }
//             }}
//             key={index + 1}
//             onClick={() => handleChartButtonClick(index + 1, name)}
//             onContextMenu={(event) => handleContextMenu(event, name, index)}
//           >
//             {name}
//           </Button> 
//         ))}
//       </Box>

//       <Menu
//         anchorReference="anchorPosition"
//         anchorPosition={
//           anchorEl
//             ? { top: anchorEl.mouseY, left: anchorEl.mouseX }
//             : undefined
//         }
//         open={Boolean(anchorEl)}
//         onClose={handleCloseContextMenu}
//         sx={{
//           boxShadow: 1,
//           borderRadius: "6px",
//           padding: "0px",
//           minWidth: "160px",
//         }}
//       >
//         <MenuItem
//           onClick={handleDeleteFromContextMenu}
//           sx={{
//             fontSize: "12px",
//             fontWeight: "300",
//             color: "black",
//             padding: "10px 20px",
//             display: "flex",
//             alignItems: "center",
//             "&:hover": {
//               backgroundColor: "#f5f5f5",
//             },
//           }}
//         >
//           <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> 
//           Delete 
//         </MenuItem>

//         <MenuItem
//           onClick={handleCloseContextMenu}
//           sx={{
//             fontSize: "12px",
//             fontWeight: "300",
//             color: "black",
//             padding: "10px 20px",
//             display: "flex",
//             alignItems: "center",
//             "&:hover": {
//               backgroundColor: "#f5f5f5",
//             },
//           }}
//         >
//           <CancelIcon sx={{ marginRight: 1, color: 'grey' }} />
//           Cancel
//         </MenuItem>
//       </Menu>

//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>Delete Chart</DialogTitle>
//         <DialogContent>
//           <p>
//             Are you sure you want to delete the chart: 
//             <strong>{chartToDelete ? chartToDelete.chartName : ""}</strong>?
//           </p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteConfirm} color="secondary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default ViewDashboardSidebar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardTotalRows,
  fetchDashboardData,
  deletedashboard,
} from "../../utils/api";
import { addTextChart, addChartData,clearDashboardCharts } from "../../features/viewDashboardSlice/viewDashboardSlice";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,Snackbar,Alert
} from "@mui/material";
import "../Style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

function ViewDashboardSidebar() {
  const dispatch = useDispatch();

  // Array of chart names for sidebar labels
  const [chartNamesArray, setChartNamesArray] = useState([]);

  // Array of chart objects (each chart should contain its own chart_id)
  const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);

  // Mapping of chart_id to its position { x, y }
  const [chartPositions, setChartPositions] = useState({});

  // Track which chart is currently active
  const [activeChart, setActiveChart] = useState(null);
  useEffect(() => {
    if (chartData) {
      localStorage.setItem("charts", JSON.stringify(chartData));
    }
  }, [chartData]);

  const testchartData = useSelector((state) => state.viewdashboard.textChart);
  const [openModal, setOpenModal] = useState(false);
  const [chartToDelete, setChartToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

  const user_id = localStorage.getItem("user_id");

  console.log("chartData:", chartData); 
  console.log("testchartData:", testchartData);
  console.log("user_id:", user_id);

  useEffect(() => {
    const company_name = localStorage.getItem("company_name");
    console.log("company_name:", company_name);

    if (!user_id) {
      console.error("User ID not found in localStorage");
      return;
    }

    console.log("Fetching total rows");
    dispatch(fetchDashboardTotalRows(user_id))
      .unwrap()
      .then((response) => {
        console.log("API Response:", response);
        // Validate and process chart_names
        if (response && response.chart_names && typeof response.chart_names === "object") {
          const chartNames = Object.values(response.chart_names).flat();
          setChartNamesArray(chartNames);
          console.log("Updated Chart Names Array:", chartNames);
        } else {
          console.error("chart_names is not an object or has unexpected structure:", response.chart_names);
          setChartNamesArray([]);
        }
      })
      
      .catch((err) => {
        console.error("Error fetching total rows:", err);
        setChartNamesArray([]);
      });
  }, [dispatch, user_id]);

  // // Handle click to fetch dashboard data and set chart positions
  // const handleChartButtonClick = (chartNumber, chartName) => {
  //   dispatch(fetchDashboardData(chartName))
  //     .unwrap()
  //     .then((response) => {
  //       console.log("Chart data:", response);

  //       // Ensure response has both chart_ids and positions
  //       if (response && response.chart_ids && response.position) {
  //         // Remove curly braces from chart_ids and split into an array
  //         const chartIds = response.chart_ids.replace(/[{}]/g, "").split(",");
          
  //         // Parse positions from string (ensure backend returns valid JSON)
  //         const parsedPositions = JSON.parse(response.position.replace(/'/g, '"'));
          
  //         // Map each chart ID to its corresponding position
  //         const chartPositionMap = chartIds.reduce((acc, chartId, index) => {
  //           acc[chartId] = parsedPositions[index] || { x: 0, y: 0 };
  //           return acc;
  //         }, {});
  //         setChartPositions(chartPositionMap);
  //       }

  //       // Dispatch singleValue charts separately
  //       response.chart_datas.forEach((chartData) => {
  //         if (chartData.chart_type === "singleValueChart") {
  //           dispatch(addTextChart(chartData));
  //         }
  //       });

  //       // For other charts, dispatch them with an additional index property
  //       const filteredChartData = response.chart_datas.filter(
  //         (chartData) => chartData.chart_type !== "singleValueChart"
  //       );
  //       filteredChartData.forEach((chartData, index) => {
  //         dispatch(addChartData({ ...chartData, index }));
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching chart data:", err);
  //     });
  // };
  // const handleChartButtonClick = (chartNumber, chartName) => {
  //   dispatch(fetchDashboardData(chartName))
  //     .unwrap()
  //     .then((response) => {
  //       if (response && response.chart_datas) {
  
  //         const updatedChartData = response.chart_datas.map(chart => {
  //           // Ensure chart.chart_id exists and is a string
  //           const chartId = chart.chart_id ? chart.chart_id.toString() : null;
  
  //           //Check if position exists, if not, provide default values
  //           const position = chart.position || { x: 0, y: 0 };
  
  //           return { ...chart, chart_id: chartId, position: position }; // Add or overwrite chart_id and position
  //         });
  
  //         updatedChartData.forEach(chartData => {
  //           if (chartData.chart_type === "singleValueChart") {
  //             dispatch(addTextChart(chartData));
  //           } else {
  //             dispatch(addChartData(chartData));
  //           }
  //         });
  
  //       } else {
  //         console.error("Response missing required data (chart_datas):", response);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching chart data:", err);
  //     });
  // };
  const handleChartButtonClick = (chartNumber, chartName) => {
    setActiveChart(chartName);

    dispatch(clearDashboardCharts());

    dispatch(fetchDashboardData(chartName))
      .unwrap()
      .then((response) => {
        if (response && response.chart_datas) {
          const updatedChartData = response.chart_datas.map(chart => {
            const chartId = chart.chart_id ? chart.chart_id.toString() : null;
            const position = chart.position || { x: 0, y: 0 };
            return { ...chart, chart_id: chartId, position: position };
          });

          updatedChartData.forEach(chartData => {
            if (chartData.chart_type === "singleValueChart") {
              dispatch(addTextChart(chartData));
            } else {
              dispatch(addChartData(chartData));
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
        // Set the error message and open the Snackbar
        setSnackbarMessage(err.message || 'An error occurred while fetching data.');
        setSnackbarOpen(true); // Open the Snackbar
      });
  };
  const handleContextMenu = (event, chartName, index) => {
    event.preventDefault();
    setAnchorEl({
      mouseX: event.clientX + 2,
      mouseY: event.clientY + 4,
    });
    setChartToDelete({ chartName, index });
  };

  const handleCloseContextMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteFromContextMenu = () => {
    if (chartToDelete) {
      setOpenModal(true);
    }
    setAnchorEl(null);
  };

  // const handleDeleteConfirm = () => {
  //   if (chartToDelete) {
  //     const { index, chartName } = chartToDelete;
  //     dispatch(deletedashboard(chartName))
  //       .then((response) => {
  //         console.log("Chart deleted successfully:", response);
  //         const updatedChartNames = chartNamesArray.filter((_, idx) => idx !== index);
  //         setChartNamesArray(updatedChartNames);
  //       })
  //       .catch((err) => {
  //         console.error("Error deleting chart:", err);
  //       });
  //     setOpenModal(false);
  //   }
  // };
  const handleDeleteConfirm = () => {
    if (chartToDelete) {
      const { index, chartName } = chartToDelete;
      dispatch(deletedashboard(chartName))
        .then((response) => {
          console.log("Chart deleted successfully:", response);
          const updatedChartNames = chartNamesArray.filter((_, idx) => idx !== index);
          setChartNamesArray(updatedChartNames);
        })
        .catch((err) => {
          console.error("Error deleting chart:", err);
          setSnackbarMessage(err.message || 'An error occurred while deleting the chart.');
          setSnackbarOpen(true); // Open the Snackbar on error
        });
      setOpenModal(false);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close the Snackbar
  };
  return (
    <div className="App" style={{ height: '100vh' }}>
      {/* Container with relative positioning so that absolute children are positioned accordingly */}
      <Box
        // sx={{
        //   position: 'relative',
        //   width: '100%',
        //   height: '100%',
        //   backgroundColor: '#f9f9f9'
        // }}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', // Adjust min size as needed
          gap: '10px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Render each chart button at its specified position */}
        {chartData &&
          chartData.map((chart, index) => {
            // Look up the position using the chart's id.
            // Ensure that chart.chart_id matches the keys from the mapping.
            const pos = chartPositions[chart.chart_id] || { x: 0, y: 0 };
            return (
              <Button
                key={chart.chart_id || index}
                sx={{
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  minWidth: '90px',
                  color: 'black',
                  background: 'white',
                  justifyContent: 'center',
                  maxHeight: '28px',
                  fontSize: '12px',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  padding: '6px',
                  display: 'inline-flex',
                  borderRadius: '4px',
                  textTransform: 'none',
                  border: '2px solid #D3D3D3',
                  '&:hover': { backgroundColor: 'bgcolour' }
                }}
                onClick={() => handleChartButtonClick(index + 1, chart.chart_heading)}
                onContextMenu={(event) => handleContextMenu(event, chart.chart_heading, index)}
              
                // Disable this button if it matches the currently active chart
                disabled={activeChart === chart.chart_heading}
              >
              
                {chart.chart_heading}
              </Button>
            );
          })}
      </Box>

      {/* Sidebar list of chart names fixed at the bottom */}
      <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'flex-start',
          overflowY: 'auto',
      }}>
        {chartNamesArray.map((name, index) => (
          <Button
            sx={{
              margin: '4px',
              minWidth: '90px',
              color: 'black',
              background: activeChart === name ? 'grey' : 'white',
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
              '&:hover': { backgroundColor: 'bgcolour' }
            }}
            key={index + 1}
            onClick={() => handleChartButtonClick(index + 1, name)}
            onContextMenu={(event) => handleContextMenu(event, name, index)}
            disabled={activeChart === name}
          >
            {name}
          </Button>
        ))}
      </Box>

      {/* Context Menu for deleting charts */}
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={
          anchorEl
            ? { top: anchorEl.mouseY, left: anchorEl.mouseX }
            : undefined
        }
        open={Boolean(anchorEl)}
        onClose={handleCloseContextMenu}
        sx={{
          boxShadow: 1,
          borderRadius: "6px",
          padding: "0px",
          minWidth: "160px",
        }}
      >
        <MenuItem
          onClick={handleDeleteFromContextMenu}
          sx={{
            fontSize: "12px",
            fontWeight: "300",
            color: "black",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} />
          Delete
        </MenuItem>

        <MenuItem
          onClick={handleCloseContextMenu}
          sx={{
            fontSize: "12px",
            fontWeight: "300",
            color: "black",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <CancelIcon sx={{ marginRight: 1, color: 'grey' }} />
          Cancel
        </MenuItem>
      </Menu>

      {/* Confirmation Modal for Deleting a Chart */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Delete Chart</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete the chart:
            <strong>{chartToDelete ? chartToDelete.chartName : ""}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ViewDashboardSidebar;
