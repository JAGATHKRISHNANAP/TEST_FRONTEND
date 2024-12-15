import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardTotalRows, fetchDashboardData,deletedashboard } from '../../utils/api';
import { addTextChart, addChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { Box, Button, ButtonGroup ,IconButton,Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from "@mui/material";
import "../Style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

function ViewDashboardSidebar() {
  const dispatch = useDispatch();
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);
  const testchartData = useSelector((state) => state.viewdashboard.textChart);
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [chartToDelete, setChartToDelete] = useState(null); // State to store the chart to delete
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the context menu anchor
  const user_id = localStorage.getItem("user_id"); // Fetch user ID from localStorage
  
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

        // Validate and process `chart_names`
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


  const handleChartButtonClick = (chartNumber, chartName) => {
    dispatch(fetchDashboardData(chartName))
      .unwrap()
      .then((response) => {
        response.chart_datas.forEach((chartData) => {
          if (chartData.chart_type === "singleValueChart") {
            dispatch(addTextChart(chartData));
          }
        });

        const filteredChartData = response.chart_datas.filter(
          (chartData) => chartData.chart_type !== "singleValueChart"
        );
        filteredChartData.forEach((chartData, index) => {
          dispatch(addChartData({ ...chartData, index }));
        });
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
      });
  };
  
  const handleContextMenu = (event, chartName, index) => {
    event.preventDefault(); // Prevent default context menu
    setAnchorEl({
      mouseX: event.clientX + 2, // Adjust for better alignment
      mouseY: event.clientY + 4,
    }); 
    setChartToDelete({ chartName, index }); // Store chart info for potential deletion
  };
  
  const handleCloseContextMenu = () => {
    setAnchorEl(null); // Reset anchor position
  };
  

  // Handle delete option from context menu
  const handleDeleteFromContextMenu = () => {
    if (chartToDelete) {
      const { index, chartName } = chartToDelete;

      // Open the confirmation dialog
      setOpenModal(true);
    }
    setAnchorEl(null); // Close context menu after action
  };

  // Function to handle the deletion confirmation
  const handleDeleteConfirm = () => {
    if (chartToDelete) {
      const { index, chartName } = chartToDelete;

      // Dispatch delete action
      dispatch(deletedashboard(chartName)) // Call API to delete chart data from the database
        .then((response) => {
          console.log("Chart deleted successfully:", response);

          // Update the chart names array in the state after successful deletion
          const updatedChartNames = chartNamesArray.filter((_, idx) => idx !== index);
          setChartNamesArray(updatedChartNames);

          // Optionally, update the Redux state (if required) or trigger any other actions
        })
        .catch((err) => {
          console.error("Error deleting chart:", err);
        });
      setOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="App">
      <Box
        className="editdashsidebar11"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          {chartNamesArray.map((name, index) => (
            <Button
              sx={{
                marginLeft: '2px',
                marginRight: '2px',
                minWidth: '100px',
                color: "white",
                justifyContent: "center",
                maxHeight: '30px',
                fontSize: '12px',
                textOverflow: 'ellipsis',
              }}
              className="x-axis-column"
              key={index + 1}
              onClick={() => handleChartButtonClick(index + 1, name)}
              onContextMenu={(event) => handleContextMenu(event, name, index)} // Right-click to open context menu
              >
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
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
  {/* Delete Option */}
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
        backgroundColor: "#f5f5f5", // Subtle gray hover effect for a cleaner look
      },
    }}
  >
    <DeleteIcon sx={{ marginRight: 1, color: 'grey' }} /> 
    Delete 
  </MenuItem>

  {/* Cancel Option */}
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

      {/* Confirmation Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Delete Chart</DialogTitle>
        <DialogContent>
          {/* Display chart name in the modal */}
          <p>Are you sure you want to delete the chart: <strong>{chartToDelete ? chartToDelete.chartName : ""}</strong>?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ViewDashboardSidebar;
