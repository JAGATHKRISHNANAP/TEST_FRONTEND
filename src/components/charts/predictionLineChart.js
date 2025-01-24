import { Grid } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useDispatch, useSelector } from "react-redux";

const PredictedLineChart = ({ forecastData, xAxis, yAxis }) => {
  const xFontSize = useSelector((state) => state.toolTip.fontSizeXc|| "12");
  const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor= useSelector((state) => state.toolTip.valueColor);
  const forecastOptions = {
    chart: {
      toolbar: {
        tools: {
          download: true,
        },
      },
    },
    xaxis: {
      categories: forecastData.categories || [],
      title: { text: `${xAxis}` },
      labels: { style: { fontSize: `${xFontSize}px`, colors: [categoryColor] } },
    },
    yaxis: {
      title: { text: `${yAxis}` },
      labels: {
        style: {
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          colors: [valueColor],
        },
        formatter: (value) => {
          if (value >= 10000000) {
            return (value / 10000000).toFixed(1) + "M";
          } else if (value >= 100000) {
            return (value / 100000).toFixed(1) + "L";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + "K";
          } else {
            return value;
          }
        },
      },
    },
    colors: ["#FF5733"], // Forecast chart color
  };

  const forecastSeries = [
    {
      name: "Forecast Data",
      data: forecastData.values || [],
    },
  ];

  return (
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
    <Grid item xs={12} md={6}>
      <ResizableBox
        width={600}
        height={550}
        minConstraints={[300, 300]}
        maxConstraints={[800, 550]}
      >
        <Chart
          options={forecastOptions}
          series={forecastSeries}
          type="line"
          width="100%"
          height="100%"
        />
      </ResizableBox>
    </Grid>
  </Grid>
  );
};

export default PredictedLineChart;