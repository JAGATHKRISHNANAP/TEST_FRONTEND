

// // import axios from "axios";
// // import React, { useEffect, useRef, useState } from "react";
// // import Chart from "react-apexcharts";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css'; // Import the CSS for the resizable box
// // import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// // import DrillLineChart from "../drillDown/drillDownLineChart";
// // import "./tooltip.css"; // Import the CSS for the tooltip
// // import ContectMenu from "./contextMenu";
// // import CustomToolTip from "./customToolTip";
// // import { sendCategoryToBackend} from '../../utils/api';
// // import Draggable from "react-draggable";

// // const LineChart = ({ categories, values, aggregation }) => {

// //     const dispatch = useDispatch();
// //     const lineColor = useSelector((state) => state.chartColor.chartColor);
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const customHeadings = useSelector((state) => state.toolTip.customHeading);
// //     const [plotData, setPlotData] = useState({});
// //     const [barClicked, setBarClicked] = useState(false);
// //     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
// //     //  const xFontSize = useSelector((state) => state.toolTip.fontSizeX);
// //     //              const yFontSize= useSelector((state) => state.toolTip.fontSizeY);
// //     const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
// //         const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
// //     const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
// //     const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// //     const valueColor= useSelector((state) => state.toolTip.valueColor);
// //     const contextMenuRef = useRef(null);
// //     const [sortedCategories, setSortedCategories] = useState(categories);
// //     const [sortedValues, setSortedValues] = useState(values);
// //   const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied

// //         const handleClicked = async (event, chartContext, config) => {
// //             const clickedCategoryIndex = config.dataPointIndex;
// //             const clickedCategory = categories[clickedCategoryIndex];
// //             dispatch(setClickedCategory(clickedCategory));
// //             try {
// //               const data = await sendCategoryToBackend(
// //                 clickedCategory,
// //                 xAxis,
// //                 yAxis,
// //                 selectedTable,
// //                 aggregate
// //               );
// //               setPlotData(data);
// //               setBarClicked(true);
// //             } catch (error) {
// //               console.error('Error handling click event:', error);
// //             }
// //           };
// //  useEffect(() => {
// //              setSortedCategories(categories);
// //              setSortedValues(values);
// //          }, [categories, values]);
     
// // const handleTop10 = () => {
// //     const sortedData = [...sortedValues].map((value, index) => ({
// //         category: sortedCategories[index],
// //         value
// //     }));
// //     sortedData.sort((a, b) => b.value - a.value); // Sort descending
// //     const top10 = sortedData.slice(0, 10); // Get top 10
// //     setSortedCategories(top10.map(item => item.category));
// //     setSortedValues(top10.map(item => item.value));

// // setIsFiltered(true); // Mark as filtered
// // };

// // const handleBottom10 = () => {
// //     const sortedData = [...sortedValues].map((value, index) => ({
// //         category: sortedCategories[index],
// //         value
// //     }));
// //     sortedData.sort((a, b) => a.value - b.value); // Sort ascending
// //     const bottom10 = sortedData.slice(0, 10); // Get bottom 10
// //     setSortedCategories(bottom10.map(item => item.category));
// //     setSortedValues(bottom10.map(item => item.value));
// //     setIsFiltered(true); // Mark as filtered
// // }
// //     const handleSortAscending = () => {
// //         const sortedData = [...sortedValues].map((value, index) => ({
// //             category: sortedCategories[index],
// //             value
// //         }));
// //         sortedData.sort((a, b) => a.value - b.value);
// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const handleSortDescending = () => {
// //         const sortedData = [...sortedValues].map((value, index) => ({
// //             category: sortedCategories[index],
// //             value
// //         }));
// //         sortedData.sort((a, b) => b.value - a.value);
// //         setSortedCategories(sortedData.map(item => item.category));
// //         setSortedValues(sortedData.map(item => item.value));
// //     };

// //     const options = {
// //         // chart: {
// //         //     id: "basic-line",
// //         //     events: {
// //         //         dataPointSelection: handleClicked
// //         //     },
// //         // },
// //         chart: {
            
// //             events: {
// //                 dataPointSelection: handleClicked
// //             },
             
// //             toolbar: {
// //                 tools: {
// //                     customIcons: [
// //                         {
// //                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
// //                             index: 1, // Start with the first position in the toolbar
// //                             title: 'Sort Ascending',
// //                             class: 'custom-sort-ascending',
// //                             click: handleSortAscending
// //                         },
// //                         {
// //                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
// //                             index: 2, // Position right after the previous custom icon
// //                             title: 'Sort Descending',
// //                             class: 'custom-sort-descending',
// //                             click: handleSortDescending
// //                         },
// //                         {
// //                             // Top 10: Using an upward double arrow symbol
// //                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
// //                             index: 3,
// //                             title: 'Show Top 10',
// //                             class: 'custom-top-10',
// //                             click: handleTop10,
// //                         },
// //                         {
// //                             // Bottom 10: Using a downward double arrow symbol
// //                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
// //                             index: 4,
// //                             title: 'Show Bottom 10',
// //                             class: 'custom-bottom-10',
// //                             click: handleBottom10,
// //                         },
// //                     {
// //                         icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
// //                         index: 5, // Reset
// //                         title: 'Reset Chart',
// //                         class: 'custom-reset',
// //                         click: () => {
// //                             setSortedCategories(categories); // Reset categories
// //                             setSortedValues(values);         // Reset values
// //                             setIsFiltered(false);            // Clear filter state
// //                         },
// //                     },
// //                     ],
// //                     download: true,
// //                     selection: true,
// //                     zoom: false,
// //                     zoomin: false,
// //                     zoomout: false,
// //                     pan: true,
// //                     reset: true,
// //                 },
// //                 offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
// //                 offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
// //             }
// //         },
// //         xaxis: {
// //             title: {
// //                 text: `${xAxis}`,
// //               },
// //             categories:setSortedCategories || [], // Make sure this array has the correct category names
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     fontSize: `${xFontSize}px`, // Use Redux state for font size
// //                 fontWeight: 400,
// //                 colors: categoryColor,
// //                 fontFamily: fontStyle,
// //                 }
// //             }
// //         },
// //         yaxis: {
// //             title: {
// //                 text: `${yAxis}`,
// //               },
// //             labels: {
// //                 style: {
// //                     fontSize: `${yFontSize}px`, // Use Redux state for font size
// //                 fontWeight: 400,
// //                 colors: [valueColor], // Use Redux state for label color
// //                 fontFamily: fontStyle,
// //                 },
// //                 formatter: (value) => {
// //                     if (value >= 10000000) { // For values in crores (millions)
// //                         return (value / 10000000).toFixed(1) + 'M';
// //                     } else if (value >= 100000) { // For values in lakhs (hundred thousand)
// //                         return (value / 100000).toFixed(1) + 'L';
// //                     } else if (value >= 1000) { // For values in thousands
// //                         return (value / 1000).toFixed(1) + 'K';
// //                     } else {
// //                         return value; // For smaller values
// //                     }
// //                 }
// //             },
// //         },
// //         tooltip: {
// //             enabled: true,
// //             custom: function({ series, seriesIndex, dataPointIndex, w }) {
// //                 const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
// //                 const value = series[seriesIndex][dataPointIndex];
// //                 const currentAggregation = aggregation || 'Aggregation';
// //                 const currentXAxis = xAxis[0] || 'X-Axis';
// //                 const currentYAxis = yAxis || 'Y-Axis';
    
// //                 return `
// //                     <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
// //                         ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
// //                         <div>
// //                             ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
// //                             ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
// //                         </div>
// //                     </div>
// //                 `;
// //             }
// //         },
// //         colors: [lineColor],
// //     };
    

// //     let seriesName = '';
// //     switch (aggregation) {
// //         case 'sum':
// //             seriesName = 'Sum';
// //             break;
// //         case 'minimum':
// //             seriesName = 'Minimum';
// //             break;
// //         case 'maximum':
// //             seriesName = 'Maximum';
// //             break;
// //         case 'average':
// //             seriesName = 'Average';
// //             break;
// //         case 'count':
// //             seriesName = 'Count';
// //             break;
// //         default:
// //             seriesName = '';
// //     }

// //     const series = [{
// //         name: seriesName,
// //         data: sortedValues || []
// //     }];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="line-chart">
                
// //                      <ResizableBox
// //                        width={isFiltered ? Math.max(10 * 30, 600) : Math.max(values.length * 30, 600)} // Adjust the multiplier (e.g., 50) and the minimum width (e.g., 300) as needed
// //                        height='100px'
// //                        minConstraints={[600, 300]} // Minimum width and height
// //                        maxConstraints={[800, 500]} // Maximum width and height
// //                        resizeHandles={['e', 'w']} // Allow horizontal resizing
// //                        className="resizable-chart"
// //                      > <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
// //                      <Chart options={options}series={series} type="scatter" height={500} />
                     
// //                        {/* <Chart options={options} series={[{ data: sortedValues }]} type="bar" height={500} /> */}
// //                      </ResizableBox>
// //                 </div>
// //             </div>
            
// //         </div>
// //     );
// // };

// // export default LineChart;

// // import axios from "axios";
// // import React, { useEffect, useRef, useState } from "react";
// // import Chart from "react-apexcharts";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ResizableBox } from "react-resizable";
// // import "react-resizable/css/styles.css"; // Import the CSS for the resizable box
// // import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// // import DrillLineChart from "../drillDown/drillDownLineChart";
// // import "./tooltip.css"; // Import the CSS for the tooltip
// // import ContectMenu from "./contextMenu";
// // import CustomToolTip from "./customToolTip";
// // import { sendCategoryToBackend } from "../../utils/api";
// // import Draggable from "react-draggable";

// // const ScatterChart = ({ categories = [], values = [], aggregation }) => {


// //   const dispatch = useDispatch();
// //   const lineColor = useSelector((state) => state.chartColor.chartColor);
// //   const xAxis = useSelector((state) => state.chart.xAxis);
// //   const yAxis = useSelector((state) => state.chart.yAxis);
// //   const aggregate = useSelector((state) => state.chart.aggregate);
// //   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //   const toolTipOptions = useSelector((state) => state.toolTip);
// //   const customHeadings = useSelector((state) => state.toolTip.customHeading);
// //   const [plotData, setPlotData] = useState({});
// //   const [barClicked, setBarClicked] = useState(false);
// //   const headingColor = useSelector((state) => state.toolTip.headingColor);
// //   const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //   const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //   const [popupVisible, setPopupVisible] = useState(false);
// //   const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
// //   const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
// //   const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
// //   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
// //   const valueColor = useSelector((state) => state.toolTip.valueColor);
// //   const contextMenuRef = useRef(null);
// //   const [sortedCategories, setSortedCategories] = useState(categories);
// //   const [sortedValues, setSortedValues] = useState(values);
// //   const [isFiltered, setIsFiltered] = useState(false);

// //   // When a data point is clicked, send the clicked category to the backend
// //   const handleClicked = async (event, chartContext, config) => {
// //     const clickedCategoryIndex = config.dataPointIndex;
// //     const clickedCategory = categories[clickedCategoryIndex];
// //     dispatch(setClickedCategory(clickedCategory));
// //     try {
// //       const data = await sendCategoryToBackend(
// //         clickedCategory,
// //         xAxis,
// //         yAxis,
// //         selectedTable,
// //         aggregate
// //       );
// //       setPlotData(data);
// //       setBarClicked(true);
// //     } catch (error) {
// //       console.error("Error handling click event:", error);
// //     }
// //   };

// //   // Update categories and values when they change
// //   useEffect(() => {
// //     setSortedCategories(categories);
// //     setSortedValues(values);
// //   }, [categories, values]);

// //   // Filter for Top 10 categories by value
// //   const handleTop10 = () => {
// //     const sortedData = [...sortedValues].map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => b.value - a.value); // Sort descending
// //     const top10 = sortedData.slice(0, 10); // Get top 10
// //     setSortedCategories(top10.map((item) => item.category));
// //     setSortedValues(top10.map((item) => item.value));

// //     setIsFiltered(true);
// //   };

// //   // Filter for Bottom 10 categories by value
// //   const handleBottom10 = () => {
// //     const sortedData = [...sortedValues].map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => a.value - b.value); // Sort ascending
// //     const bottom10 = sortedData.slice(0, 10); // Get bottom 10
// //     setSortedCategories(bottom10.map((item) => item.category));
// //     setSortedValues(bottom10.map((item) => item.value));
// //     setIsFiltered(true);
// //   };

// //   // Sort values in ascending order
// //   const handleSortAscending = () => {
// //     const sortedData = [...sortedValues].map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => a.value - b.value);
// //     setSortedCategories(sortedData.map((item) => item.category));
// //     setSortedValues(sortedData.map((item) => item.value));
// //   };

// //   // Sort values in descending order
// //   const handleSortDescending = () => {
// //     const sortedData = [...sortedValues].map((value, index) => ({
// //       category: sortedCategories[index],
// //       value,
// //     }));
// //     sortedData.sort((a, b) => b.value - a.value);
// //     setSortedCategories(sortedData.map((item) => item.category));
// //     setSortedValues(sortedData.map((item) => item.value));
// //   };

// //   // Build scatter data from the sorted categories and values.
// //   // Each point is an object with an x (category) and y (value) property.
// //   const scatterData = sortedCategories.map((cat, index) => ({
// //     x: cat,
// //     y: sortedValues[index],
// //   }));

// //   // Options for the ApexCharts component
// //   const options = {
// //     chart: {
// //       events: {
// //         dataPointSelection: handleClicked,
// //       },
// //       toolbar: {
// //         tools: {
// //           customIcons: [
// //             {
// //               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
// //               index: 1,
// //               title: "Sort Ascending",
// //               class: "custom-sort-ascending",
// //               click: handleSortAscending,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
// //               index: 2,
// //               title: "Sort Descending",
// //               class: "custom-sort-descending",
// //               click: handleSortDescending,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
// //               index: 3,
// //               title: "Show Top 10",
// //               class: "custom-top-10",
// //               click: handleTop10,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
// //               index: 4,
// //               title: "Show Bottom 10",
// //               class: "custom-bottom-10",
// //               click: handleBottom10,
// //             },
// //             {
// //               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
// //               index: 5,
// //               title: "Reset Chart",
// //               class: "custom-reset",
// //               click: () => {
// //                 setSortedCategories(categories);
// //                 setSortedValues(values);
// //                 setIsFiltered(false);
// //               },
// //             },
// //           ],
// //           download: true,
// //           selection: true,
// //           zoom: false,
// //           zoomin: false,
// //           zoomout: false,
// //           pan: true,
// //           reset: true,
// //         },
// //         offsetX: -10,
// //         offsetY: 0,
// //       },
// //     },
// //     xaxis: {
// //       title: {
// //         text: `${xAxis}`,
// //       },
// //       // For a scatter chart, you can still use categories
// //       categories: sortedCategories || [],
// //       labels: {
// //         show: true,
// //         style: {
// //           fontSize: `${xFontSize}px`,
// //           fontWeight: 400,
// //           colors: categoryColor,
// //           fontFamily: fontStyle,
// //         },
// //       },
// //     },
// //     yaxis: {
// //       title: {
// //         text: `${yAxis}`,
// //       },
// //       labels: {
// //         style: {
// //           fontSize: `${yFontSize}px`,
// //           fontWeight: 400,
// //           colors: [valueColor],
// //           fontFamily: fontStyle,
// //         },
// //         formatter: (value) => {
// //           if (value >= 10000000) {
// //             return (value / 10000000).toFixed(1) + "M";
// //           } else if (value >= 100000) {
// //             return (value / 100000).toFixed(1) + "L";
// //           } else if (value >= 1000) {
// //             return (value / 1000).toFixed(1) + "K";
// //           } else {
// //             return value;
// //           }
// //         },
// //       },
// //     },
// //     tooltip: {
// //       enabled: true,
// //       custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
// //                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
// //                     const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
// //                     const value = series[seriesIndex][dataPointIndex];
// //                     const currentAggregation = aggregation || 'Aggregation';
// //                     const currentXAxis = xAxis[0] || 'X-Axis';
// //                     const currentYAxis = yAxis || 'Y-Axis';

// //                     return `
// //                         <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
// //                             ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
// //                             <div>
// //                                 ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
// //                                 ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
// //                             </div>
// //                         </div>
// //                     `;
// //                 }
// //                 : undefined
// //         },
// //       // custom: function ({ series, seriesIndex, dataPointIndex, w }) {
// //       //   // Get the scatter data point from the chart configuration
// //       //   const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
// //       //   const currentAggregation = aggregation || "Aggregation";
// //       //   return `
// //       //     <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
// //       //       ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${xAxis} vs ${yAxis}</h4></div>` : ""}
// //       //       <div>
// //       //         ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${dataPoint.x}</div>` : ""}
// //       //         ${toolTipOptions.value ? `<div><strong>Value:</strong> ${dataPoint.y}</div>` : ""}
// //       //       </div>
// //       //     </div>
// //       //   `;
// //       // },
// //     // },
// //     colors: [lineColor],
// //   };

// //   // Determine the series name based on the aggregation
// //   let seriesName = "";
// //   switch (aggregation) {
// //     case "sum":
// //       seriesName = "Sum";
// //       break;
// //     case "minimum":
// //       seriesName = "Minimum";
// //       break;
// //     case "maximum":
// //       seriesName = "Maximum";
// //       break;
// //     case "average":
// //       seriesName = "Average";
// //       break;
// //     case "count":
// //       seriesName = "Count";
// //       break;
// //     default:
// //       seriesName = "";
// //   }

// //   // For a scatter chart the series data is an array of objects { x: <category>, y: <value> }
// //   const series = [
// //     {
// //       name: seriesName,
// //       data: scatterData,
// //     },
// //   ];

// //   return (
// //     <div className="app">
// //       <div className="row">
// //         <div className="scatter-chart">
// //           <ResizableBox
// //             width={isFiltered ? Math.max(10 * 30, 600) : Math.max((values?.length || 0) * 30, 600)}
// //             height={500}
// //             minConstraints={[600, 300]}
// //             maxConstraints={[800, 500]}
// //           >
// //             <div className="chart-title">
// //               <h3 style={{ color: headingColor }}>{customHeadings}</h3>
// //             </div>
// //             <Chart options={options} series={series} type="scatter" height={500} />
// //           </ResizableBox>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ScatterChart;

// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import { ResizableBox } from "react-resizable";
// import { useDispatch, useSelector } from "react-redux";
// import "react-resizable/css/styles.css";
// import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
// import { sendCategoryToBackend } from "../../utils/api";
// import "./tooltip.css";

// const ScatterChart = ({ categories = [], values = [], aggregation }) => {
//   const dispatch = useDispatch();
//   // Redux selectors
//   const lineColor = useSelector((state) => state.chartColor.chartColor);
//   const xAxis = useSelector((state) => state.chart.xAxis);
//   const yAxis = useSelector((state) => state.chart.yAxis);
//   const aggregate = useSelector((state) => state.chart.aggregate);
//   const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//   const toolTipOptions = useSelector((state) => state.toolTip);
//   const customHeadings = useSelector((state) => state.toolTip.customHeading);
//   const headingColor = useSelector((state) => state.toolTip.headingColor);
//   const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
//   const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
//   const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
//   const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//   const valueColor = useSelector((state) => state.toolTip.valueColor);

//   // Local state for sorting/filtering
//   const [sortedCategories, setSortedCategories] = useState(categories);
//   const [sortedValues, setSortedValues] = useState(values);
//   const [isFiltered, setIsFiltered] = useState(false);

//   // Legend position & re-render key
//   const [legendPosition, setLegendPosition] = useState("right");
//   const [chartKey, setChartKey] = useState(0);

//   // Local color array: one color per category
//   const defaultColors = [
//     "#008FFB",
//     "#00E396",
//     "#FEB019",
//     "#FF4560",
//     "#775DD0",
//     "#546E7A",
//     "#26a69a",
//     "#D10CE8",
//   ];
//   const [seriesColors, setSeriesColors] = useState(
//     categories.map((_, i) => defaultColors[i % defaultColors.length])
//   );

//   // For inline color picker
//   const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

//   // Re-initialize when categories/values change
//   useEffect(() => {
//     setSortedCategories(categories);
//     setSortedValues(values);
//     setSeriesColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
//   }, [categories, values]);

//   // Force re-render on legend position change
//   useEffect(() => {
//     setChartKey((prev) => prev + 1);
//   }, [legendPosition]);

//   // Build multiple series: each category is its own series with one data point.
//   // const scatterSeries = sortedCategories.map((cat, i) => ({
//   //   name: cat,            // Category name => Legend label
//   //   data: [{ x: cat, y: sortedValues }],  // One data point
//   // }));

//   // Sorting & filtering
//   const handleTop10 = () => {
//     const sortedData = sortedValues.map((value, i) => ({
//       category: sortedCategories[i],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     const top10 = sortedData.slice(0, 10);
//     setSortedCategories(top10.map((d) => d.category));
//     setSortedValues(top10.map((d) => d.value));
//     setIsFiltered(true);
//   };

//   const handleBottom10 = () => {
//     const sortedData = sortedValues.map((value, i) => ({
//       category: sortedCategories[i],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     const bottom10 = sortedData.slice(0, 10);
//     setSortedCategories(bottom10.map((d) => d.category));
//     setSortedValues(bottom10.map((d) => d.value));
//     setIsFiltered(true);
//   };

//   const handleSortAscending = () => {
//     const sortedData = sortedValues.map((value, i) => ({
//       category: sortedCategories[i],
//       value,
//     }));
//     sortedData.sort((a, b) => a.value - b.value);
//     setSortedCategories(sortedData.map((d) => d.category));
//     setSortedValues(sortedData.map((d) => d.value));
//   };

//   const handleSortDescending = () => {
//     const sortedData = sortedValues.map((value, i) => ({
//       category: sortedCategories[i],
//       value,
//     }));
//     sortedData.sort((a, b) => b.value - a.value);
//     setSortedCategories(sortedData.map((d) => d.category));
//     setSortedValues(sortedData.map((d) => d.value));
//   };

//   // Reset
//   const handleReset = () => {
//     setSortedCategories(categories);
//     setSortedValues(values);
//     setIsFiltered(false);
//   };

//   // Handle chart clicks
//   const handleClicked = async (event, chartContext, config) => {
//     const seriesIndex = config.seriesIndex;
//     const dataPointIndex = config.dataPointIndex;
//     // Each series is one category => seriesIndex is the category index
//     // We can also get the category from sortedCategories[seriesIndex]
//     const clickedCategory = sortedCategories[seriesIndex];
//     dispatch(setClickedCategory(clickedCategory));
//     try {
//       const data = await sendCategoryToBackend(
//         clickedCategory,
//         xAxis,
//         yAxis,
//         selectedTable,
//         aggregate
//       );
//       console.log("Drilldown data:", data);
//     } catch (error) {
//       console.error("Error handling click event:", error);
//     }
//   };

//   // Toggle legend position
//   const toggleLegendPosition = () => {
//     const positions = ["top", "bottom", "left", "right", "hide"];
//     const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
//     setLegendPosition(positions[newIndex]);
//   };

//   // Legend click event: open inline color picker
//   const chartEvents = {
//     legendClick: (chartContext, seriesIndex, config) => {
//       setSelectedLegendIndex(seriesIndex);
//       return false; // Prevent default toggling
//     },
//   };

//   // Update color for selected category
//   const handleColorChange = (index, newColor) => {
//     setSeriesColors((prevColors) => {
//       const updated = [...prevColors];
//       updated[index] = newColor;
//       return updated;
//     });
//   };

//   // Build ApexCharts options
//   const options = {
//     chart: {
//       type: "scatter",
//       events: {
//         dataPointSelection: handleClicked,
//         ...chartEvents,
//       },
//       toolbar: {
//         tools: {
//           customIcons: [
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//               index: 1,
//               title: "Sort Ascending",
//               class: "custom-sort-ascending",
//               click: handleSortAscending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//               index: 2,
//               title: "Sort Descending",
//               class: "custom-sort-descending",
//               click: handleSortDescending,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//               index: 3,
//               title: "Show Top 10",
//               class: "custom-top-10",
//               click: handleTop10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//               index: 4,
//               title: "Show Bottom 10",
//               class: "custom-bottom-10",
//               click: handleBottom10,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//               index: 5,
//               title: "Reset Chart",
//               class: "custom-reset",
//               click: handleReset,
//             },
//             {
//               icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
//               index: 6,
//               title: "Toggle Legend Position",
//               class: "custom-legend-toggle",
//               click: toggleLegendPosition,
//             },
//           ],
//           download: true,
//           selection: true,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: true,
//           reset: true,
//         },
//       },
//     },
//     // Use the local seriesColors array
//     colors: seriesColors,
//     // Built-in legend with one item per series
//     legend: {
//       show: true,
//       position: legendPosition === "hide" ? "bottom" : legendPosition,
//       horizontalAlign: "center",
//       fontSize: "12px",
//       fontFamily: fontStyle,
//       fontWeight: 400,
//       labels: {
//         colors: categoryColor,
//       },
//       markers: {
//         width: 12,
//         height: 12,
//         radius: 2,
//       },
//       itemMargin: {
//         horizontal: 5,
//         vertical: 2,
//       },
//     },
//     xaxis: {
//       title: {
//         text: xAxis,
//       },
//       labels: {
//         show: true,
//         style: {
//           fontSize: `${xFontSize}px`,
//           fontWeight: 400,
//           colors: categoryColor,
//           fontFamily: fontStyle,
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: yAxis,
//       },
//       labels: {
//         style: {
//           fontSize: `${yFontSize}px`,
//           fontWeight: 400,
//           colors: [valueColor],
//           fontFamily: fontStyle,
//         },
//         formatter: (value) => {
//           if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
//           if (value >= 100000) return (value / 100000).toFixed(1) + "L";
//           if (value >= 1000) return (value / 1000).toFixed(1) + "K";
//           return value;
//         },
//       },
//     },
//     tooltip: {
//       enabled: true,
//       // Example custom tooltip if needed
//       custom:
//         toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
//           ? function ({ series, seriesIndex, dataPointIndex, w }) {
//               // Each series is a single data point
//               const cat = sortedCategories[seriesIndex];
//               const val = sortedValues[seriesIndex];
//               const currentAggregation = aggregation || "Aggregation";
//               const currentXAxis = xAxis[0] || "X-Axis";
//               const currentYAxis = yAxis || "Y-Axis";
//               return `
//                 <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//                   ${
//                     toolTipOptions.heading
//                       ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
//                       : ""
//                   }
//                   <div>
//                     ${
//                       toolTipOptions.categoryName
//                         ? `<div><strong>Category:</strong> ${cat}</div>`
//                         : ""
//                     }
//                     ${
//                       toolTipOptions.value
//                         ? `<div><strong>Value:</strong> ${val}</div>`
//                         : ""
//                     }
//                   </div>
//                 </div>
//               `;
//             }
//           : undefined,
//     },
//   };

//   // Build the multi-series: one category = one series
//   const series = sortedCategories.map((cat, i) => ({
//     name: cat,
//     data: [{ x: cat, y: sortedValues[i] }],
//   }));

//   return (
//     <div className="app">
//       <div className="row">
//         <div className="scatter-chart">
//           <ResizableBox
//             width={
//               isFiltered
//                 ? Math.max(10 * 30, 600)
//                 : Math.max((values?.length || 0) * 30, 600)
//             }
//             height={500}
//             minConstraints={[600, 300]}
//             maxConstraints={[800, 500]}
//           >
//             <div className="chart-title">
//               <h3 style={{ color: headingColor }}>{customHeadings}</h3>
//             </div>
//             <Chart
//               key={chartKey}
//               options={options}
//               series={series}
//               type="scatter"
//               height={500}
//             />
//           </ResizableBox>
//           {/* Inline color picker for the selected legend item */}
//           {selectedLegendIndex !== null && (
//             <div style={{ textAlign: "center", marginTop: "10px" }}>
//               <span>
//                 Change color for "{sortedCategories[selectedLegendIndex]}":{" "}
//               </span>
//               <input
//                 type="color"
//                 value={seriesColors[selectedLegendIndex]}
//                 onChange={(e) => handleColorChange(selectedLegendIndex, e.target.value)}
//                 onBlur={() => setSelectedLegendIndex(null)}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScatterChart;
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import { useDispatch, useSelector } from "react-redux";
import "react-resizable/css/styles.css";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import { sendCategoryToBackend } from "../../utils/api";
import "./tooltip.css";

const ScatterChart = ({ categories = [], values = [], aggregation }) => {
  const dispatch = useDispatch();

  // Redux selectors
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const toolTipOptions = useSelector((state) => state.toolTip);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);
  const headingColor = useSelector((state) => state.toolTip.headingColor);
  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);

  // Local states
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");
  const [chartKey, setChartKey] = useState(0);
 const [isPanning, setIsPanning] = useState(false);
  // Default colors for each category
  const defaultColors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8",
  ];
  const [seriesColors, setSeriesColors] = useState(
    categories.map((_, i) => defaultColors[i % defaultColors.length])
  );

  // For inline color picker
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
    setSeriesColors(categories.map((_, i) => defaultColors[i % defaultColors.length]));
  }, [categories, values]);

  useEffect(() => {
    // Force re-render on legend position change
    setChartKey((prev) => prev + 1);
  }, [legendPosition]);

  // Build multiple series: each category => one series => one data point
  // But x is now a numeric index i, not a string category.
  // We pass the actual category names to xaxis.categories for labeling.
  const series = sortedCategories.map((cat, i) => ({
    name: cat,                // Legend label
    data: [{ x: i+1, y: sortedValues[i] }], // Single numeric x for spacing
  }));

  // Sorting & filtering
  const handleTop10 = () => {
    const sortedData = sortedValues.map((value, i) => ({
      category: sortedCategories[i],
      value,
    }));
    sortedData.sort((a, b) => b.value - a.value);
    const top10 = sortedData.slice(0, 10);
    setSortedCategories(top10.map((d) => d.category));
    setSortedValues(top10.map((d) => d.value));
    setIsFiltered(true);
  };

  const handleBottom10 = () => {
    const sortedData = sortedValues.map((value, i) => ({
      category: sortedCategories[i],
      value,
    }));
    sortedData.sort((a, b) => a.value - b.value);
    const bottom10 = sortedData.slice(0, 10);
    setSortedCategories(bottom10.map((d) => d.category));
    setSortedValues(bottom10.map((d) => d.value));
    setIsFiltered(true);
  };

  const handleSortAscending = () => {
    const sortedData = sortedValues.map((value, i) => ({
      category: sortedCategories[i],
      value,
    }));
    sortedData.sort((a, b) => a.value - b.value);
    setSortedCategories(sortedData.map((d) => d.category));
    setSortedValues(sortedData.map((d) => d.value));
  };

  const handleSortDescending = () => {
    const sortedData = sortedValues.map((value, i) => ({
      category: sortedCategories[i],
      value,
    }));
    sortedData.sort((a, b) => b.value - a.value);
    setSortedCategories(sortedData.map((d) => d.category));
    setSortedValues(sortedData.map((d) => d.value));
  };

  const handleReset = () => {
    setSortedCategories(categories);
    setSortedValues(values);
    setIsFiltered(false);
  };

  // Data point click => drilldown
  const handleClicked = async (event, chartContext, config) => {
    // In a multi-series approach: config.seriesIndex is the category index
    const clickedCategoryIndex = config.seriesIndex;
    const clickedCategory = sortedCategories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      const data = await sendCategoryToBackend(
        clickedCategory,
        xAxis,
        yAxis,
        selectedTable,
        aggregation
      );
      console.log("Drilldown data:", data);
    } catch (error) {
      console.error("Error handling click event:", error);
    }
  };

  // Toggle legend position
  const toggleLegendPosition = () => {
    const positions = ["top", "bottom", "left", "right", "hide"];
    const newIndex = (positions.indexOf(legendPosition) + 1) % positions.length;
    setLegendPosition(positions[newIndex]);
  };

  // Legend click => open color picker
  const chartEvents = {
    legendClick: (chartContext, seriesIndex, config) => {
      setSelectedLegendIndex(seriesIndex);
      return false; // Prevent default toggling
    },
  };

  // Update color for selected category
  const handleColorChange = (index, newColor) => {
    setSeriesColors((prev) => {
      const updated = [...prev];
      updated[index] = newColor;
      return updated;
    });
  };

  const options = {
    chart: {
      type: "scatter",
      events: {
        dataPointSelection: handleClicked,
        ...chartEvents,
        mounted: function (chartContext) {
          const toolbar = document.querySelector(".apexcharts-toolbar");
          if (toolbar) {
            toolbar.addEventListener("click", (event) => {
              if (event.target.closest(".apexcharts-pan-icon")) {
                document.body.style.cursor = "grab";
              }
            });
          }
        },
        mouseLeave: function () {
          document.body.style.cursor = "default"; // Reset when mouse leaves chart
        }
      
      },
      toolbar: {
        tools: {
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1,
              title: "Sort Ascending",
              class: "custom-sort-ascending",
              click: handleSortAscending,
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2,
              title: "Sort Descending",
              class: "custom-sort-descending",
              click: handleSortDescending,
            },
            {
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: "Show Top 10",
              class: "custom-top-10",
              click: handleTop10,
            },
            {
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: "Show Bottom 10",
              class: "custom-bottom-10",
              click: handleBottom10,
            },
            {
              icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
              index: 5,
              title: "Reset Chart",
              class: "custom-reset",
              click: handleReset,
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            },
          ],
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true,
        },
      },
    },
    // Use our local color array
    colors: seriesColors,
    // Legend: one item per category (i.e. per series)
    legend: {
      show: true,
      position: legendPosition === "hide" ? "bottom" : legendPosition,
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: fontStyle,
      fontWeight: 400,
      labels: {
        colors: categoryColor,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 2,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 2,
      },
    },
    xaxis: {
      // ★ Set type to category
      type: "category",
      // Provide the category names for each numeric index
      categories: sortedCategories,
      title: { text: xAxis },
      labels: {
        offsetX: 0, // Moves labels slightly to the right
        rotate: -45, // Optional: Rotate labels for better visibility
        style: {
          fontSize: `${xFontSize}px`,
          fontFamily: fontStyle,
          colors: categoryColor,
        },
        style: {
          fontSize: `${xFontSize}px`,
          fontWeight: 400,
          colors: categoryColor,
          fontFamily: fontStyle,
        },
      },
    },
    yaxis: {
      title: { text: yAxis },
      labels: {
        style: {
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          colors: [valueColor],
          fontFamily: fontStyle,
        },
        formatter: (value) => {
          if (value >= 10000000) return (value / 10000000).toFixed(1) + "M";
          if (value >= 100000) return (value / 100000).toFixed(1) + "L";
          if (value >= 1000) return (value / 1000).toFixed(1) + "K";
          return value;
        },
      },
    },
  //   tooltip: {
  //     enabled: true,
  //     custom:
  //       toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
  //         ? function ({ series, seriesIndex, dataPointIndex, w }) {
  //             // Each series => one data point => index = seriesIndex
  //             const cat = sortedCategories[seriesIndex];
  //             const val = sortedValues[seriesIndex];
  //             return `
  //               <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
  //                 ${
  //                   toolTipOptions.heading
  //                     ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${aggregation} of ${xAxis} vs ${yAxis}</h4></div>`
  //                     : ""
  //                 }
  //                 <div>
  //                   ${
  //                     toolTipOptions.categoryName
  //                       ? `<div><strong>Category:</strong> ${cat}</div>`
  //                       : ""
  //                   }
  //                   ${
  //                     toolTipOptions.value
  //                       ? `<div><strong>Value:</strong> ${val}</div>`
  //                       : ""
  //                   }
  //                 </div>
  //               </div>
  //             `;
  //           }
  //         : undefined,
  //   },
  // };
  tooltip: {
    enabled: true,
    // Example custom tooltip if needed
    custom:
      toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
        ? function ({ series, seriesIndex, dataPointIndex, w }) {
            // Each series is a single data point
            const cat = sortedCategories[seriesIndex];
            const val = sortedValues[seriesIndex];
            const currentAggregation = aggregation || "Aggregation";
            const currentXAxis = xAxis[0] || "X-Axis";
            const currentYAxis = yAxis || "Y-Axis";
            return `
              <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                ${
                  toolTipOptions.heading
                    ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                    : ""
                }
                <div>
                  ${
                    toolTipOptions.categoryName
                      ? `<div><strong>Category:</strong> ${cat}</div>`
                      : ""
                  }
                  ${
                    toolTipOptions.value
                      ? `<div><strong>Value:</strong> ${val}</div>`
                      : ""
                  }
                </div>
              </div>
            `;
          }
        : undefined,
  },
};

  return (
    <div className="app">
      <div className="row">
        <div className="scatter-chart">
          <ResizableBox
            width={
              isFiltered
                ? Math.max(10 * 30, 600)
                : Math.max((values?.length || 0) * 30, 600)
            }
            height={500}
            minConstraints={[600, 300]}
            maxConstraints={[800, 500]}
          >
            <div className="chart-title">
              <h3 style={{ color: headingColor }}>{customHeadings}</h3>
            </div>
            <Chart
              key={chartKey}
              options={options}
              series={series}
              type="scatter"
              height={500}
            />
          </ResizableBox>
          {selectedLegendIndex !== null && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span>
                Change color for "{sortedCategories[selectedLegendIndex]}":{" "}
              </span>
              <input
                type="color"
                value={seriesColors[selectedLegendIndex]}
                onChange={(e) => handleColorChange(selectedLegendIndex, e.target.value)}
                onBlur={() => setSelectedLegendIndex(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScatterChart;
