import React, { useState, useEffect } from 'react';
import { BoxPlotchartData } from '../../utils/api';
import Chart from 'react-apexcharts';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

const AiChart = () => {
  const [chartData, setChartData] = useState([]);
  const Color = useSelector((state) => state.chartColor.chartColor);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await BoxPlotchartData();
        console.log("Fetched Data:", result['histogram_details']);
        // console.log("FedfjdhfuklSHFAWBFSEUFG:");

        // Transform data for individual box plots
        const seriesData = result['histogram_details'].map((item, index) => ({
          name: `Data ${index + 1}`,
          data: [
            {
              x: `Data ${index + 1}`, // Label each box plot
              y: [
                item['Y-axis limits'][0],  // Minimum
                item['X-axis limits'][0],  // Q1
                (item['X-axis limits'][0] + item['X-axis limits'][1]) / 2, // Median (assumed as mid-point here)
                item['X-axis limits'][1],  // Q3
                item['Y-axis limits'][1]   // Maximum
              ]
            }
          ]
        }));

        setChartData(seriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const options = {
    chart: {
      type: 'boxPlot',
      toolbar: {
        show: true
      }
    },
    title: {
      text: 'Individual Box Plot Chart',
      align: 'center'
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: Color || '#FF4560', // Use Redux color or default
          lower: '#008FFB'
        }
      }
    },
    xaxis: {
      title: {
        text: 'Categories'
      }
    },
    yaxis: {
      title: {
        text: 'Values'
      }
    }
  };

  return (
    <Grid container spacing={2} style={{ justifyContent: 'center', padding: '16px' }}>
      <Chart
        options={options}
        series={chartData}
        type="boxPlot"
        height={350}
      />
    </Grid>
  );
};

export default AiChart;
