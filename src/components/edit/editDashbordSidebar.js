import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { fetchTotalRows, fetchChartData } from "../../features/EditChart/EditChartSlice";
import { fetchTotalRows, fetchChartData } from '../../utils/api';
import { Box, Button } from "@mui/material";
import "../Style.css";

function EditDashbordSidebar() {
  const dispatch = useDispatch();
  const [chartNamesArray, setChartNamesArray] = useState([]);

  useEffect(() => {
    console.log("Fetching total rows");
    dispatch(fetchTotalRows())
      .unwrap()
      .then((response) => {
        if (response && response.chart_names) {
          setChartNamesArray(response.chart_names);
        }
      })
      .catch((err) => {
        console.error("Error fetching total rows:", err);
      });
  }, [dispatch]);

  const handleChartButtonClick = (chartNumber, chartName) => {
    console.log("Clicked chart name:", chartName);
    dispatch(fetchChartData(chartName));
  };

  console.log("chartNamesArray:", chartNamesArray);
  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          overflowX: "auto", // Enables horizontal scroll
          whiteSpace: "nowrap", // Prevents buttons from wrapping to the next line
          maxWidth: "100vw", // Prevents buttons from wrapping to the next line

          // backgroundColor: "#3f51b5",
        }}
      >

        {chartNamesArray.map((name, index) => (
          <Button
  sx={{
    fontSize: "12px",
    // marginTop: "2px",
    marginLeft: "2px",
    marginRight: "2px",
    width: "90px",
    height: "30px",
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
  className="x-axis-column"
  key={index + 1}
  onClick={() => handleChartButtonClick(index + 1, name)}
>
  <span>{name}</span> {/* Wrap the name in a span to apply animation */}
</Button>

        ))}
        <div> </div>
      </Box>
    </div>
  );
}

export default EditDashbordSidebar;
