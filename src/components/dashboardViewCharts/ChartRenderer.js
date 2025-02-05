// import React from 'react';
// import BarChart from '../ChartViews/barchartView';
// import PieChart from '../ChartViews/piechartView';
// import LineChart from '../ChartViews/linechartview';
// import DualAxisChart from '../ChartViews/duelAxisChartView';
// import AreaChart from '../ChartViews/areaChartView';
// import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
// import MapViewChart from '../ChartViews/mapChartView';
// import PolarAreaChart from '../charts/polarArea';
// import Scatter from '../ChartViews/scatterChartView';
// import TreeHierarchyView from '../ChartViews/treeHierarchyView';
// import TextChartView from '../ChartViews/textChartView';
// import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
// import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
// import AiMlChartData from '../ChartViews/AiMLChartsView';
// import DashboardSingleValueChart from '../ChartViews/DashboardSingleValueChart';
// import WordCloud from '../ChartViews/wordCloudView';

// const ChartRenderer = ({ chart }) => {
//   switch (chart.chart_type) {
//     case 'bar':
//       return <BarChart {...chart} />;
//     case 'pie':
//       return <PieChart {...chart} />;
//     case 'line':
//       return <LineChart {...chart} />;
//     case 'area':
//       return <AreaChart {...chart} />;
//     case 'polarArea':
//       return <PolarAreaChart {...chart} />;
//     case 'scatter':
//       return <Scatter {...chart} />;
//     case 'hierarchialBarChart':
//       return <HierarchialBarChart {...chart} />;
//     case 'treeHierarchy':
//       return <TreeHierarchyView {...chart} />;
//     case 'sampleAitestChart':
//       return <SampleAiTestChart {...chart} />;
//     case 'AiCharts':
//       return <AiMlChartData {...chart} />;
//     case 'mapchart':
//       return <MapViewChart {...chart} />;
//     case 'animatedTreeChart':
//       return <AnimatedTreemap {...chart} />;
//     case 'duealChart':
//       return <DualAxisChart {...chart} />;
//     case 'wordCloud':
//       return <WordCloud {...chart} />;
//     case 'textChart':
//       return <TextChartView {...chart} />;
//     case 'singleValueChart':
//       return <DashboardSingleValueChart chartHeading={chart.chart_heading} totalXAxis={chart.value.total_x_axis} />;
//     default:
//       return <div>Chart type not recognized</div>;
//   }
// };

// export default ChartRenderer;
import React from 'react';
import BarChart from '../ChartViews/barchartView';
import PieChart from '../ChartViews/piechartView';
import LineChart from '../ChartViews/linechartview';
import DualAxisChart from '../ChartViews/duelAxisChartView';
import AreaChart from '../ChartViews/areaChartView';
import AnimatedTreemap from '../ChartViews/animatedTreeMapView';
import MapViewChart from '../ChartViews/mapChartView';
import PolarAreaChart from '../charts/polarArea';
import Scatter from '../ChartViews/scatterChartView';
import TreeHierarchyView from '../ChartViews/treeHierarchyView';
import TextChartView from '../ChartViews/textChartView';
import HierarchialBarChart from '../ChartViews/hierarchialBarChartView';
import SampleAiTestChart from '../ChartViews/sampleAiTestChartView';
import AiMlChartData from '../ChartViews/AiMLChartsView';
import DashboardSingleValueChart from '../ChartViews/DashboardSingleValueChart';
import WordCloud from '../ChartViews/wordCloudView';

const ChartRenderer = ({ chart }) => {
  switch (chart.chart_type) {
    case 'bar':
      return <BarChart {...chart} chartColor={chart.chart_color} />;
    case 'pie':
      return <PieChart {...chart} chartColor={chart.chart_color} />;
    case 'line':
      return <LineChart {...chart} chartColor={chart.chart_color} />;
    case 'area':
      return <AreaChart {...chart} chartColor={chart.chart_color} />;
    case 'polarArea':
      return <PolarAreaChart {...chart} chartColor={chart.chart_color} />;
    case 'scatter':
      return <Scatter {...chart} chartColor={chart.chart_color} />;
    case 'hierarchialBarChart':
      return <HierarchialBarChart {...chart} chartColor={chart.chart_color} />;
    case 'treeHierarchy':
      return <TreeHierarchyView {...chart} chartColor={chart.chart_color} />;
    case 'sampleAitestChart':
      return <SampleAiTestChart {...chart} chartColor={chart.chart_color} />;
    case 'AiCharts':
      return <AiMlChartData {...chart} chartColor={chart.chart_color} />;
    case 'mapchart':
      return <MapViewChart {...chart} chartColor={chart.chart_color} />;
    case 'animatedTreeChart':
      return <AnimatedTreemap {...chart} chartColor={chart.chart_color} />;
    case 'duealChart':
      return <DualAxisChart {...chart} chartColor={chart.chart_color} />;
    case 'wordCloud':
      return <WordCloud {...chart} chartColor={chart.chart_color} />;
    case 'textChart':
      return <TextChartView {...chart} chartColor={chart.chart_color} />;
    case 'singleValueChart':
      return <DashboardSingleValueChart 
                chartHeading={chart.chart_heading} 
                totalXAxis={chart.value.total_x_axis} 
                chartColor={chart.chart_color} 
             />;
    default:
      return <div>Chart type not recognized</div>;
  }
};

export default ChartRenderer;
