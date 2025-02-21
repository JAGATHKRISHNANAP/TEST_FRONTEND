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

// const ChartDisplay = ({ chartType, plotData, saveDataToDatabase }) => {
//   console.log("Chart Type:", chartType);
//   const chartComponents = {
//     pie: Pie,
//     line: LineChart,
//     scatter: ScatterPlot,
//     bar: BarChart,
//     area: AreaChart,
//     polarArea: PolarAreaChart,
//     textChart: TextChart,
//     duealChart: DuelAxisChart, // Corrected typo: duelChart
//     singleValueChart: SingleValueChart,
//     mapchart: MapChart,
//     treeHierarchy: TreeHierarchy,
//     animatedTreeChart: TreeMap,
//     hierarchialBarChart: HierarchicalBarChart, // Corrected typo: hierarchicalBarChart
//     duealBarChart: DuelBarChart, // Corrected typo: duelBarChart
//     sampleAitestChart: SampleAiTestChart,
//     aiChart: AiChart, // Corrected typo: aiChart
//     wordCloud: WordCloudChart,
//   };

//   const ChartComponent = chartComponents[chartType];

// //   if (ChartComponent) {

// //     const chartProps = chartType === 'duealChart' || chartType === 'duelBarChart' ? {
// //       categories: plotData?.categories,
// //       series1: plotData?.series1,
// //       series2: plotData?.series2,
// //       aggregation: plotData?.aggregation,
// //     } : {
// //       categories: plotData?.categories,
// //       values: plotData?.values,
// //       aggregation: plotData?.aggregation,
// //     };

// //     return (
// //       <div style={{ marginTop: '20px' }}>
// //         <Item>
// //           <div className="chart-container">
// //             <ChartComponent {...chartProps} />
// //           </div>
// //         </Item>
// //         <div className='btn-container'>
// //           <button className="save-button" onClick={saveDataToDatabase}>Save Data to Database</button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return null; // Or a default message/component
// // };

// // export default ChartDisplay;
// if (ChartComponent) {
//   console.log("Plot Data:", plotData);
//     const chartProps = chartType === 'duealChart' || chartType === 'duelBarChart' ? {
//         categories: plotData?.categories,
//         series1: plotData?.series1,
//         series2: plotData?.series2,
//         aggregation: plotData?.aggregation,
//       } : {
//         categories: plotData?.categories,
//         values: plotData?.values,
//         aggregation: plotData?.aggregation,
//       };
//     return (
//       <div style={{ marginTop: '20px' }}>
//         <Item>
//           <div className="chart-container">
//             <ChartComponent {...chartProps} />
//           </div>
//         </Item>
//       </div> // Removed the save button from here
//     );
//   }

//   return null;
// };

// export default ChartDisplay;
// import React from 'react';
// import { Item } from 'your-ui-library'; // Replace with your actual UI library import
// import Pie from './charts/Pie';
// import LineChart from './charts/LineChart';
// import ScatterPlot from './charts/ScatterPlot';
// import BarChart from './charts/BarChart';
// import AreaChart from './charts/AreaChart';
// import PolarAreaChart from './charts/PolarAreaChart';
// import TextChart from './charts/TextChart';
// import DuelAxisChart from './charts/DuelAxisChart';
// import SingleValueChart from './charts/SingleValueChart';
// import MapChart from './charts/MapChart';
// import TreeHierarchy from './charts/TreeHierarchy';
// import TreeMap from './charts/TreeMap';
// import DuelBarChart from './charts/DuelBarChart';
// import HierarchicalBarChart from './charts/HierarchicalBarChart';
// import SampleAiTestChart from './charts/SampleAiTestChart';
// import AiChart from './charts/AiChart';
// import WordCloudChart from './charts/WordCloudChart';
import Snackbar from '@mui/material/Snackbar'; // If using Material UI
import MuiAlert from '@mui/material/Alert'; // If using Material UI


const Items = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '645px',
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ChartDisplay = ({ chartType, plotData, xAxis, saveDataToDatabase, showSnackbar, handleSnackbarClose, snackbarSeverity, snackbarMessage }) => {


    const renderChart = () => {
      if (xAxis && xAxis.length === 0) return <div>No data to display</div>; // Check if xAxis exists
 
    
      switch (chartType) {
        case "pie":
          return (
            <Item>
              <div className="chart-container">
                <Pie
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
              
            </Item>
          );
        case "line":
          return (
            <Item>
              <div className="chart-container">
                <LineChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
            
            </Item>
          );
        case "scatter":
          return (
            <Item>
              <div className="chart-container">
                <ScatterPlot
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
              
            </Item>
          );
        case "bar":
          return (
            <Item>
              <div className="chart-container">
                <BarChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
              
            </Item>
          );
        case "area":
            return (
              <Item>
                <div className="chart-container">
                  <AreaChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                  />
                </div>
                
              </Item>
            );
        case "polarArea":
            return (
              <Item>
                <div className="chart-container">
                  <PolarAreaChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                  />
                </div>
               
              </Item>
            );
        case "textChart":
            return (
              <Item>
                <div className="chart-container">
                  <TextChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                  />
                </div>
               
              </Item>
            );
        case "duealChart":
          return (
            <Item>
              <div className="chart-container">
                <DuelAxisChart
                  categories={plotData?.categories}
                  series1={plotData?.series1}
                  series2={plotData?.series2}
                  aggregation={plotData?.aggregation}
                />
              </div>
             
            </Item>
          );
          case "singleValueChart":
            return (
              <Item>
                <div className="chart-container">
                  <SingleValueChart
                    categories={plotData?.categories}
                    values={plotData?.values}
                    aggregation={plotData?.aggregation}
                  />
                </div>
               
              </Item>
            );
        case "mapchart":
          return (
            <Item>
              <div className="chart-container">
                <MapChart categories={plotData?.categories} values={plotData?.values} />
              </div>
             
            </Item>
          );
          
        case "treeHierarchy":
          
          return (
            <Item>
              <div className="chart-container">
              <TreeHierarchy categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>
                             
              </div>
              
            </Item>
          );
        case "animatedTreeChart":
          return (
            <Item>
              <div className="chart-container">
                <TreeMap
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
             
            </Item>
          );
        case "duealbarChart":
          return (
            <Items> {/* Use Items here if you intend to use it */}
              <div className="chart-container">
                <DuelBarChart
                  categories={plotData?.categories}
                  series1={plotData?.series1}
                  series2={plotData?.series2}
                  aggregation={plotData?.aggregation}
                />
              </div>
             
            </Items>
          );
        case "hierarchialBarChart":
          return (
            <Item>
              <div className="chart-container">
                <HierarchicalBarChart
                  categories={plotData?.categories}
                  values={plotData?.values}
                  aggregation={plotData?.aggregation}
                />
              </div>
              
            </Item>
          );
        case "sampleAitestChart":
          return (
            <Item>
              <div className="chart-container">
                <SampleAiTestChart />
              </div>
              
            </Item>
          );
        case "AiCharts":
          return (
            <Item>
              <div className="chart-container">
                <AiChart />
              </div>
             
            </Item>
          );
        case "wordCloud":
          return (
            <Items>
              <div className="chart-container">
                <WordCloudChart categories={plotData?.categories} values={plotData?.values} />
              </div>
             
            </Items>
          );
        default:
          return <div>Unknown chart type: {chartType}</div>;
      }
    };
  
  return (
    <div>
      {renderChart() && ( // Conditionally render the chart container and button
        <div style={{ marginTop: '20px' }}>
          <Item>
            <div className="chart-container">
              {renderChart()}
            </div>
          </Item>
        </div>
      )}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChartDisplay;