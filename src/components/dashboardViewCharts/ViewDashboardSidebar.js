import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardTotalRows, fetchDashboardData } from '../../utils/api';
import { addTextChart, addChartData } from '../../features/viewDashboardSlice/viewDashboardSlice';
import { Box, Button, ButtonGroup } from "@mui/material";
import "../Style.css";

function ViewDashboardSidebar() {
  const dispatch = useDispatch();
  const [chartNamesArray, setChartNamesArray] = useState([]);
  const chartData = useSelector((state) => state.viewdashboard.dashboard_charts);
  const testchartData = useSelector((state) => state.viewdashboard.textChart);
  console.log("chartData:", chartData); 
  console.log("testchartData:", testchartData);
  
  useEffect(() => {
    console.log("Fetching total rows");
    dispatch(fetchDashboardTotalRows())
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
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default ViewDashboardSidebar;
