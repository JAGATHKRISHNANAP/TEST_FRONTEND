import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';
import { fetchHelloData } from '../../utils/api';

const AiChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchHelloData();
        console.log("Fetched Data:", result['data frame']);

        if (Array.isArray(result['data frame'])) {
          setChartData(result['data frame']);
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
    <div>
      <h1>AI Chart</h1>
      <div className="chart-container">
        {chartData.length > 0 ? (
          chartData.map((columnData, index) => {
            return <ChartComponent key={index} columnData={columnData} />;
          })
        ) : (
          <p>No data available to display charts</p>
        )}
      </div>
    </div>
  );
};

export default AiChart;
