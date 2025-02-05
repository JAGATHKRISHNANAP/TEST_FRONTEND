import React from 'react';
import { useSelector } from 'react-redux';
import ChartWrapper from './ChartWrapper';
import ChartRenderer from './ChartRenderer';

const TextChartContainer = () => {
  const textCharts = useSelector((state) => state.viewdashboard.textChart);

  return (
    <>
      {textCharts?.map((text, index) => (
        <ChartWrapper key={`text-${index}`} style={{ minWidth: '400px' }}>
          <ChartRenderer chart={text} />
        </ChartWrapper>
      ))}
    </>
  );
};

export default TextChartContainer;
