import React, { useState, useEffect } from 'react';
import { AichartData } from '../../utils/api';
import Chart from 'react-apexcharts';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

const AiChart = () => {
  const [chartData, setChartData] = useState([]);
  const Color = useSelector((state) => state.chartColor.chartColor);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await AichartData();
        console.log("Fetched Data:", result['histogram_details']);
        
        if (Array.isArray(result['histogram_details'])) {
          setChartData(result['histogram_details']);
        } else {
          console.error("Data format error: Expected an array");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <Grid container spacing={2} style={{ justifyContent: 'center', padding: '16px' }}>
      {chartData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <div style={{ 
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%'
          }}>
            <Chart
              options={{
                chart: {
                  type: 'bar',
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: data.bins.map((_, i) => `${i + 1}`),
                  labels: {
                    show: false,  // This will hide the x-axis labels
                  },
                  title: {
                    text: data.title  || 'X Axis',
                  },
                },
                yaxis: {
                  title: {
                    text: data.y_axis_label || 'Frequency',
                  },
                },
                title: {
                  // text: data.title,
                  align: 'center',
                },
                colors: [Color],
              }}

              series={[{
                name: data.title,
                data: data.bins.map(bin => bin.height),
              }]}
              type="bar"
              height={300}
              width="100%"
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default AiChart;
