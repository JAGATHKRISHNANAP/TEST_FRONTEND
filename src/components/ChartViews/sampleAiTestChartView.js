import React from 'react';
import Chart from 'react-apexcharts';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

const AiChart = ({ data }) => {
  const Color = useSelector((state) => state.chartColor.chartColor);

  console.log("data", data);    // This will log the data prop passed to the component

  // Ensure data is an array to safely map over it
  if (!Array.isArray(data)) {
    console.error("The 'data' prop should be an array.");
    return null;
  }

  return (

    <Grid 
  container 
  spacing={2} 
  style={{ 
    justifyContent: 'left', 
    padding: '16px', 
    width: 'auto' // Dynamically adjust the container width
  }}
>
  {data.map((chartData, index) => (
    <Grid
    item
    key={index}
    style={{
      maxWidth: '400px', // Set the maximum width
      flexBasis: '300px', // Set a fixed width for the grid items
      flexGrow: 0, // Prevent grid items from stretching
    }}
  >

      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #ddd',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Chart
          options={{
            chart: {
              type: 'bar',
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: chartData.bins.map((_, i) => `${i + 1}`),
              labels: {
                show: true, // Show x-axis labels
              },
              title: {
                text: chartData.title || 'X Axis',
              },
            },
            yaxis: {
              title: {
                text: chartData.y_axis_label || 'Y Axis',
              },
            },
            title: {
              text: chartData.title || 'Chart Title',
              align: 'center',
            },
            colors: [Color],
          }}
          series={[
            {
              name: chartData.title,
              data: chartData.bins.map((bin) => bin.height),
            },
          ]}
          type="bar"
          height={200} // Define the chart height
          width={300} // Define the chart width
        />
      </div>
    </Grid>
  ))}
</Grid>

  );
};

export default AiChart;
