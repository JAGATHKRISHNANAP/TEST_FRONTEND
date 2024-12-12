import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';

const Chart = () => {
  const plotData = useSelector((state) => state.chart.plotData);
  const barColor = useSelector((state) => state.chart.barColor);
  const chartType = useSelector((state) => state.chart.chartType);

  return (
    <div className="chart-container">
      <h3>Chart</h3>
      <Plot
        data={[
          {
            x: plotData.x_values,
            y: plotData.y_values,
            type: chartType,
            marker: { color: barColor },
          },
        ]}
        layout={{ width: 720, height: 440, title: 'A Fancy Plot' }}
      />
    </div>
  );
};

export default Chart;
