// import React from 'react';
// import Pie from './charts/Pie';
// import LineChart from './charts/lineChart';
// import ScatterPlot from './charts/scatterChart';
// import BarChart from './charts/barChart';
// import AreaChart from './charts/area';
// import PolarAreaChart from './charts/polarArea';
// import DuealChartInputsss from './charts/duealChartInput';
// import DuelAxisChart from './charts/duelAxesChart';
// import TextChart from './charts/textChart';
// import MapChart from './charts/mapchart';
// import SingleValueChart from './charts/singleValueChart';
// import ChartColor from './charts/color';
// import DuelBarChart from './charts/duelBarChart';
// import BoxPlot from './charts/boxPlot';
// import SampleAiTestChart from './charts/sampleAiTestChart';
// import BoxPlotChart from './charts/BoxPlotChart';
// import TreeHierarchy from './charts/treeHierarchy'; 
// import Treemap from './charts/animatedTreeChart';
// import AiChart from './charts/aiChart';
// import WordCloudChart from './charts/wordCloudChart';

// import HierarchicalBarChart from './charts/hierarchialBarChart';
// const ChartDisplay = ({ xAxis, yAxis, chartType, plotData, handleSaveButtonClick }) => {
//   const renderChart = () => {
//     if (xAxis.length === 0 || yAxis.length === 0) return null;
    
//     const commonProps = {
//       categories: plotData?.categories,
//       values: plotData?.values,
//       aggregation: plotData?.aggregation,
//     };

//     switch (chartType) {
//       case "pie":
//         return <Pie {...commonProps} />;
//       case "line":
//         return <LineChart {...commonProps} />;
//       case "scatter":
//         return <ScatterPlot {...commonProps} />;
//       case "bar":
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <BarChart {...commonProps} />
//         );
//       case "area":
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <AreaChart {...commonProps} />
//         );
//       case "polarArea":
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <PolarAreaChart {...commonProps} />
//         );
//       case "textChart":
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <TextChart {...commonProps} />
//         );
//       case "singleValueChart":
//         return <SingleValueChart {...commonProps} />;
//       case "mapchart":
//         return <MapChart {...commonProps} />;
//       case "duealChart":
//         return yAxis.length > 1 ? (
//           <DuelAxisChart
//             categories={plotData?.categories}
//             series1={plotData?.series1}
//             series2={plotData?.series2}
//             aggregation={plotData?.aggregation}
//           />
//         ) : null;
//       case "duealbarChart":
//         return (
//           <DuelBarChart
//             categories={plotData?.categories}
//             series1={plotData?.series1}
//             series2={plotData?.series2}
//             aggregation={plotData?.aggregation}
//           />
//         );
//       case "treeHierarchy":
//         return <TreeHierarchy />;
//       case "sampleAitestChart":
//         return <SampleAiTestChart />;
//       case "AiCharts":
//         return <AiChart />;
//       case "animatedTreeChart":
//         return <Treemap {...commonProps} />;
//       case "hierarchialBarChart":
//         return <HierarchicalBarChart {...commonProps} />;
//       case "wordCloud":
//         return <WordCloudChart categories={plotData?.categories} values={plotData?.values} />;
//       case "boxPlot":
//         return <BoxPlot {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ marginTop: '20px' }}>
//       {renderChart() && (
//         <>
//           <div className="chart-container">
//             {renderChart()}
//           </div>
//           <div className="btn-container">
//             <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChartDisplay;

import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Pie from './charts/Pie';
import LineChart from './charts/lineChart';
import ScatterPlot from './charts/scatterChart';
import BarChart from './charts/barChart';
import AreaChart from './charts/area';
import PolarAreaChart from './charts/polarArea';
import DuealChartInputsss from './charts/duealChartInput';
import DuelAxisChart from './charts/duelAxesChart';
import TextChart from './charts/textChart';
import MapChart from './charts/mapchart';
import SingleValueChart from './charts/singleValueChart';
import ChartColor from './charts/color';
import DuelBarChart from './charts/duelBarChart';
import BoxPlot from './charts/boxPlot';
import SampleAiTestChart from './charts/sampleAiTestChart';
import BoxPlotChart from './charts/BoxPlotChart';
import TreeHierarchy from './charts/treeHierarchy';
import Treemap from './charts/animatedTreeChart';
import AiChart from './charts/aiChart';
import WordCloudChart from './charts/wordCloudChart';
import HierarchicalBarChart from './charts/hierarchialBarChart';

// // Styled components
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const Items = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   height: '635px',
// }));

// const ChartDisplay = ({ xAxis, yAxis, chartType, plotData, handleSaveButtonClick }) => {
//   const chartContent = renderChart();
//     if (xAxis.length === 0 || yAxis.length === 0) return null;

//     const commonProps = {
//       categories: plotData?.categories,
//       values: plotData?.values,
//       aggregation: plotData?.aggregation,
//     };

//     switch (chartType) {
//       case 'pie':
//         return <Pie {...commonProps} />;
//       case 'line':
//         return <LineChart {...commonProps} />;
//       case 'scatter':
//         return <ScatterPlot {...commonProps} />;
//       case 'bar':
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <BarChart {...commonProps} />
//         );
//       case 'area':
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <AreaChart {...commonProps} />
//         );
//       case 'polarArea':
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <PolarAreaChart {...commonProps} />
//         );
//       case 'textChart':
//         return xAxis.length >= 2 ? (
//           <div className="error-message">
//             You have selected more than 2 X-axis values. Please remove 1.
//           </div>
//         ) : (
//           <TextChart {...commonProps} />
//         );
//       case 'singleValueChart':
//         return <SingleValueChart {...commonProps} />;
//       case 'mapchart':
//         return <MapChart {...commonProps} />;
//       case 'duealChart':
//         return yAxis.length > 1 ? (
//           <DuelAxisChart
//             categories={plotData?.categories}
//             series1={plotData?.series1}
//             series2={plotData?.series2}
//             aggregation={plotData?.aggregation}
//           />
//         ) : null;
//       case 'duealbarChart':
//         return (
//           <DuelBarChart
//             categories={plotData?.categories}
//             series1={plotData?.series1}
//             series2={plotData?.series2}
//             aggregation={plotData?.aggregation}
//           />
//         );
//       case 'treeHierarchy':
//         return <TreeHierarchy />;
//       case 'sampleAitestChart':
//         return <SampleAiTestChart />;
//       case 'AiCharts':
//         return <AiChart />;
//       case 'animatedTreeChart':
//         return <Treemap {...commonProps} />;
//       case 'hierarchialBarChart':
//         return <HierarchicalBarChart {...commonProps} />;
//       case 'wordCloud':
//         return <WordCloudChart categories={plotData?.categories} values={plotData?.values} />;
//       case 'boxPlot':
//         return <BoxPlot {...commonProps} />;
//       default:
//         return null;
//     }
//   };

// //   return (
// //     // <Items>
// //       {renderChart() && (
// //         <>
// //           <Item>
// //             <div className="chart-container">{renderChart()}</div>
// //           </Item>
// //           <Item>
// //             <div className="btn-container">
// //               <button className="save-button" onClick={handleSaveButtonClick}>
// //                 Save Chart
// //               </button>
// //             </div>
// //           </Item>
// //         </>
// //       )}
// //     // </Items>
// //   );
// // };

//   return (
//     // <Items>
//     {chartContent && (
//       <>
//         <Item>
//           <div className="chart-container">{chartContent}</div>
//         </Item>
//         <Item>
//           <div className="btn-container">
//             <button className="save-button" onClick={handleSaveButtonClick}>
//               Save Chart
//             </button>
//           </div>
//         </Item>
//       </>
//     )}
//     // </Items>
//   );
// };


// export default ChartDisplay;


const ChartRenderer = ({
  xAxis = [],
  yAxis = [],
  chartType = "",
  plotData = {},
  handleSaveButtonClick,
}) => {
  const renderError = (message) => (
    <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
      {message}
    </div>
  );
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const Items = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '635px',
  }));
  return (
    <div className="chart-renderer">
      {xAxis.length >1 &&
        (chartType === "wordCloud" ) && (
          renderError("Please select only 1 Columns values for this chart type.")
        )}
       {xAxis.length >1 &&
        (chartType === "Hierarachy") && (
          renderError("Please select only Columns values for this chart type.")
        )}
      {xAxis.length > 2 &&
        (chartType === "bar" ||
          chartType === "area" ||
          chartType === "polarArea" ||
          chartType === "textChart") && (
          renderError("Please select only two Columns values for this chart type.")
        )}

      {/* Bar Chart */}
      {xAxis.length > 0 && yAxis.length>0 && chartType === "pie" && (
              <div style={{ marginTop: '20px' }}>
                {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 2 Columns values. Please remove 1.
        </div>
      )
    }
                <Items>
                  <div className="chart-container">
                    <Pie categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && yAxis.length>0 && chartType === "line" && (
              <div style={{ marginTop: '20px' }}>
                {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 2 Columns values. Please remove 1.
        </div>
      )
    }
                <Items>
                  <div className="chart-container">
                  {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 2 Columns values. Please remove 1.
        </div>
      )
    }
                    <LineChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && yAxis.length>0 && chartType === "scatter" && (
              <div style={{ marginTop: '20px' }}>
                {
                  // If more than 2 X-axis values are selected, show the message to remove 1
                  (xAxis.length >= 2) && (
                    <div className="error-message">
                      You have selected more than 2 Columns values. Please remove 1.
                    </div>
                  )
                }
                <Items>
                  <div className="chart-container">
                    <ScatterPlot categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {/* {xAxis.length > 0 && yAxis.length>0 && chartType === "bar" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <BarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )} */}

{(xAxis.length == 1 && yAxis.length  ==1  && chartType === "bar") ? (
  <div style={{ marginTop: '20px' }}>
    {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 2 Columns values. Please remove 1.
        </div>
      )
    }
    
    <Items>
      <div className="chart-container">
        <BarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
      </div>
    </Items>
    <div className='btn-container'>
      <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
    </div>
  </div>
) : null}




            {xAxis.length > 0 && yAxis.length>0 && chartType === "area" && (

              <div style={{ marginTop: '20px' }}>
                {
                  // If more than 2 X-axis values are selected, show the message to remove 1
                  (xAxis.length >= 2) && (
                    <div className="error-message">
                      You have selected more than 2 X-axis values. Please remove 1.
                    </div>
                  )
                }
                <Items>
                  <div className="chart-container">
                    <AreaChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && yAxis.length>0 && chartType === "polarArea" && (
              <div style={{ marginTop: '20px' }}>
                            {
                  // If more than 2 X-axis values are selected, show the message to remove 1
                  (xAxis.length >= 2) && (
                    <div className="error-message">
                      You have selected more than 2 X-axis values. Please remove 1.
                    </div>
                  )
                }
                <Items>
                  <div className="chart-container">
                    <PolarAreaChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && yAxis.length>0 && chartType === "textChart" && (
              <div style={{ marginTop: '20px' }}>
                {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 2 X-axis values. Please remove 1.
        </div>
      )
    }
                <Items>
                  <div className="chart-container">
                    <TextChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
             {xAxis.length > 0 && chartType === "singleValueChart" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <SingleValueChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}


            {xAxis.length > 0 && chartType === "mapchart" && (
                          <div style={{ marginTop: '20px' }}>
                            <Items>
                              <div className="chart-container">
                                <MapChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                              </div>
                            </Items>
                            <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}


            {/* {xAxis.length > 0 && yAxis.length>1 && chartType === "duealChart" && (
              <div style={{ marginTop: '20px' }}>
                {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 1 X-axis values. Please remove .
        </div>
      )
    }
   
                <Items>
                  <div className="chart-container">
                    <DuelAxisChart
                      categories={plotData?.categories}
                      series1={plotData?.series1}
                      series2={plotData?.series2}
                      aggregation={plotData?.aggregation}
                    />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "duealbarChart" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <DuelBarChart
                      categories={plotData?.categories}
                      series1={plotData?.series1}
                      series2={plotData?.series2}
                      aggregation={plotData?.aggregation}
                    />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )} */}
            {/* { xAxis.length > 0  && chartType === "duealChart" && (
  <div style={{ marginTop: '20px' }}>
    { yAxis.length <= 1 ? (
      <div className="error-message">
        You have selected less than 2 row values. Please add one.
      </div>
    ) : (
      <>
        <Items>
          <div className="chart-container">
            <DuelAxisChart
              categories={plotData?.categories}
              series1={plotData?.series1}
              series2={plotData?.series2}
              aggregation={plotData?.aggregation}
            />
          </div>
        </Items>
        <div className="btn-container">
          <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
        </div>
      </>
    )}
  </div>
)} */}
{ xAxis.length >= 1 && yAxis.length >= 1 && chartType === "duealChart" && (
  <div style={{ marginTop: '20px' }}>
    { xAxis.length > 1 ? (
      <div className="error-message">
        You have selected more than 1 column value for the X-axis. Please remove one.
      </div>
    ) : yAxis.length <2  ? (
      <div className="error-message">
        You have selected less than 2 row values. Please add one.
      </div>
    ) : (
      <>
        <Items>
          <div className="chart-container">
            <DuelAxisChart
              categories={plotData?.categories}
              series1={plotData?.series1}
              series2={plotData?.series2}
              aggregation={plotData?.aggregation}
            />
          </div>
        </Items>
        <div className="btn-container">
          <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
        </div>
      </>
    )}
  </div>
)}

            {chartType === "treeHierarchy"  && (
                          <div style={{ marginTop: '20px' }}>
                            {
      // If more than 2 X-axis values are selected, show the message to remove 1
      (xAxis.length >= 2) && (
        <div className="error-message">
          You have selected more than 2 Columns values. Please remove 1.
        </div>
      )
    }
                              <div >
                                <TreeHierarchy/>
                              </div>
                              <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}


{chartType === "sampleAitestChart"  && (
                          <div style={{ marginTop: '20px' }}>
                              <div >
                                <SampleAiTestChart/>
                              </div>
                              <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}

{chartType === "AiCharts"  && (
                          <div style={{ marginTop: '20px' }}>
                            {/* <Items> */}
                              <div className="chart-container">
                                <AiChart/>
                              </div>
                              {/* </Items> */}
                              <div className='btn-container'>
                              <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                            </div>
                          </div>
                        )}


             {xAxis.length > 0 && yAxis.length>0 && chartType === "animatedTreeChart" && (
             <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <Treemap categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>

                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                </div>
              </div>
            )}

          {xAxis.length > 0 && yAxis.length>0 && chartType === "hierarchialBarChart" && (
                      <div style={{ marginTop: '20px' }}>
                        
                          <Items>
                            <div className="chart-container">
                              <HierarchicalBarChart categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation}/>

                            </div>
                          </Items>
                          <div className='btn-container'>
                            <button className="save-button" onClick={handleSaveButtonClick}>Save Chart</button>
                          </div>
                        </div>
                      )}
                      {xAxis.length > 0 && chartType === "wordCloud" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <WordCloudChart categories={plotData?.categories} values={plotData?.values}  />
                    </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Data to Database</button>
                </div>
              </div>
            )}
            {xAxis.length > 0 && chartType === "boxPlot" && (
              <div style={{ marginTop: '20px' }}>
                <Items>
                  <div className="chart-container">
                    <BoxPlot categories={plotData?.categories} values={plotData?.values} aggregation={plotData?.aggregation} />
                  </div>
                </Items>
                <div className='btn-container'>
                  <button className="save-button" onClick={handleSaveButtonClick}>Save Data to Database</button>
                </div>
              </div>
            )}

      {/* General Error Message */}
      {(xAxis.length === 0 || yAxis.length === 0) && (
        renderError("Please select at least one X-axis and one Y-axis value to render the chart.")
      )}
    </div>
  );
};

export default ChartRenderer;
