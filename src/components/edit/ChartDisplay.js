// components/ChartDisplay.js
import React from 'react';
import { Paper, styled } from "@mui/material";
import Pie from '../charts/Pie';
import LineChart from '../charts/lineChart';
import ScatterPlot from '../charts/scatterChart';
import BarChart from '../charts/barChart';
import AreaChart from "../charts/area";
import DuelAxisChart from "../charts/duelAxesChart";
import TextChart from "../charts/textChart";
import PolarAreaChart from "../charts/polarArea";
import TreeHierarchy from '../charts/treeHierarchy'; 
import MapChart from '../charts/mapchart';
import SingleValueChart from '../charts/singleValueChart';
import TreeMap from '../charts/animatedTreeChart';
import HierarchicalBarChart from'../charts/hierarchialBarChart';
import DuelBarChart from '../charts/duelBarChart';
import SampleAiTestChart from '../charts/sampleAiTestChart';
import AiChart from '../charts/aiChart';
import WordCloudChart from '../charts/wordCloudChart';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ChartDisplay = ({ chartType, plotData, saveDataToDatabase }) => {
  console.log("Chart Type:", chartType);
  const chartComponents = {
    pie: Pie,
    line: LineChart,
    scatter: ScatterPlot,
    bar: BarChart,
    area: AreaChart,
    polarArea: PolarAreaChart,
    textChart: TextChart,
    duealChart: DuelAxisChart, // Corrected typo: duelChart
    singleValueChart: SingleValueChart,
    mapchart: MapChart,
    treeHierarchy: TreeHierarchy,
    animatedTreeChart: TreeMap,
    hierarchialBarChart: HierarchicalBarChart, // Corrected typo: hierarchicalBarChart
    duealBarChart: DuelBarChart, // Corrected typo: duelBarChart
    sampleAitestChart: SampleAiTestChart,
    aiChart: AiChart, // Corrected typo: aiChart
    wordCloud: WordCloudChart,
  };

  const ChartComponent = chartComponents[chartType];

//   if (ChartComponent) {

//     const chartProps = chartType === 'duealChart' || chartType === 'duelBarChart' ? {
//       categories: plotData?.categories,
//       series1: plotData?.series1,
//       series2: plotData?.series2,
//       aggregation: plotData?.aggregation,
//     } : {
//       categories: plotData?.categories,
//       values: plotData?.values,
//       aggregation: plotData?.aggregation,
//     };

//     return (
//       <div style={{ marginTop: '20px' }}>
//         <Item>
//           <div className="chart-container">
//             <ChartComponent {...chartProps} />
//           </div>
//         </Item>
//         <div className='btn-container'>
//           <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
//         </div>
//       </div>
//     );
//   }

//   return null; // Or a default message/component
// };

// export default ChartDisplay;
if (ChartComponent) {
  console.log("Plot Data:", plotData);
    const chartProps = chartType === 'duealChart' || chartType === 'duelBarChart' ? {
        categories: plotData?.categories,
        series1: plotData?.series1,
        series2: plotData?.series2,
        aggregation: plotData?.aggregation,
      } : {
        categories: plotData?.categories,
        values: plotData?.values,
        aggregation: plotData?.aggregation,
      };
    return (
      <div style={{ marginTop: '20px' }}>
        <Item>
          <div className="chart-container">
            <ChartComponent {...chartProps} />
          </div>
        </Item>
      </div> // Removed the save button from here
    );
  }

  return null;
};

export default ChartDisplay;