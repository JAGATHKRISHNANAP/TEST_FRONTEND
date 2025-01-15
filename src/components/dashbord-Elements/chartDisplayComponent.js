

import TreeHierarchy from '../charts/treeHierarchy'; 
import HierarchicalBarChart from '../charts/hierarchialBarChart';


import Pie from '../charts/Pie';
import LineChart from '../charts/lineChart';
import ScatterPlot from '../charts/scatterChart';
import BarChart from '../charts/barChart';
import AreaChart from '../charts/area';
import PolarAreaChart from '../charts/polarArea';

import DuelAxisChart from '../charts/duelAxesChart';
import TextChart from '../charts/textChart';
import MapChart from '../charts/mapchart';
import SingleValueChart from '../charts/singleValueChart';


import SampleAiTestChart from '../charts/sampleAiTestChart';
import WordCloud from '../charts/wordCloudChart';


import Treemap from '../charts/animatedTreeChart';
import AiChart from '../charts/aiChart';


const ChartRenderer = ({ chartType, xAxis, plotData, handleSaveButtonClick }) => {
  if (!xAxis.length) return null;

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie {...plotData} />;
      case 'line':
        return <LineChart {...plotData} />;
      case 'scatter':
        return <ScatterPlot {...plotData} />;
      case 'bar':
        return <BarChart {...plotData} />;
      case 'area':
        return <AreaChart {...plotData} />;
      case 'polarArea':
        return <PolarAreaChart {...plotData} />;
      case 'textChart':
        return <TextChart {...plotData} />;
      case 'singleValueChart':
        return <SingleValueChart {...plotData} />;
      case 'mapchart':
        return <MapChart {...plotData} />;
      case 'duealChart':
        return <DuelAxisChart
          categories={plotData?.categories}
          series1={plotData?.series1}
          series2={plotData?.series2}
          aggregation={plotData?.aggregation}
        />;
      case 'treeHierarchy':
        return <TreeHierarchy />;
      case 'sampleAitestChart':
        return <SampleAiTestChart />;
      case 'AiCharts':
        return <AiChart />;
      case 'animatedTreeChart':
        return <Treemap {...plotData} />;
      case 'hierarchialBarChart':
        return <HierarchicalBarChart {...plotData} />;
      case 'wordCloud':
        return <WordCloud {...plotData} />; 
      default:
        return null;
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div className="chart-container">
        {renderChart()}
      </div>
      <div className="btn-container">
        <button className="save-button" onClick={handleSaveButtonClick}>
          Save Chart
        </button>
      </div>
    </div>
  );
};

export default ChartRenderer;
