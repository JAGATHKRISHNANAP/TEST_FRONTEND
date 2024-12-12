
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const App = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series1: [],
    series2: []
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/data')
      .then(response => {
        console.log('Fetched data:', response.data); // Log the fetched data
        setChartData({
          categories: response.data.categories,
          series1: response.data.series1,
          series2: response.data.series2
        });
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const options = {
    chart: {
      type: 'line',
      height: 350
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: 'Online Hotel Revenue Vs. Number of Travel Agents'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: chartData.categories,
    xaxis: {
      type: 'category'
    },
    yaxis: [
      {
        title: {
          text: 'Online Hotel Revenue'
        }
      },
      {
        opposite: true,
        title: {
          text: '{}'
        }
      }
    ]
  };

  const series = [
    {
      name: 'Online Hotel Revenue',
      type: 'column',
      data: chartData.series1
    },
    {
      name: 'Number of Travel Agents',
      type: 'line',
      data: chartData.series2
    }
  ];

  console.log('Series:', series); // Log the series data

  return (
    <div className="App">
      <h1>Online Hotel Revenue Vs. Number of Travel Agents</h1>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default App;
