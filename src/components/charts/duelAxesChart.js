// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector, useDispatch } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import axios from 'axios';
// import DrillBarChart from '../drillDown/drillDownBarChart';
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';

// const DuelAxisChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const [plotData, setPlotData] = useState({});
//     const [barClicked, setBarClicked] = useState(false);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const contextMenuRef = useRef(null);
//     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
    
//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
//                 category: clickedCategory,
//                 xAxis: xAxis,
//                 yAxis: yAxis,
//                 tableName: selectedTable,
//                 aggregation: aggregate
//             });

//             setPlotData(response.data);
//             setBarClicked(true);
//         } catch (error) {
//             console.error('Error sending category to backend:', error);
//         }
//     };

//     const handleContextMenu = (event) => {
//         event.preventDefault();
//         setContextMenuPosition({ x: event.pageX, y: event.pageY });
//         setContextMenuVisible(true);
//     };

//     const handleClickOutside = (event) => {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//             setContextMenuVisible(false);
//         }
//     };

//     const handleShowPopup = () => {
//         setPopupVisible(true);
//         setContextMenuVisible(false);
//     };

//     const handleClosePopup = () => {
//         setPopupVisible(false);
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     const options = {
//         chart: {
//             type: 'line',  // Setting type to 'line' for dual-axis chart
//             height: 350,
//             events: {
//                 dataPointSelection: handleClicked
//             }
//         },
//         xaxis: {
//             categories: categories,
//             labels: {
//                 show: true,
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#000']
//                 }
//             }
//         },
//         yaxis: [
//             {
//                 title: {
//                     text: yAxis[0] || 'Series 1'
//                 },
//                 labels: {
//                     style: {
//                         fontSize: '12px',
//                         fontWeight: 400,
//                         colors: ['#000'],
//                     },
//                     formatter: (value) => {
//                         if (value >= 10000000) { // For values in crores (millions)
//                             return (value / 10000000).toFixed(1) + 'M';
//                         } else if (value >= 100000) { // For values in lakhs (hundred thousand)
//                             return (value / 100000).toFixed(1) + 'L';
//                         } else if (value >= 1000) { // For values in thousands
//                             return (value / 1000).toFixed(1) + 'K';
//                         } else {
//                             return value; // For smaller values
//                         }
//                     }
//                 },
//             },
//             {
//                 opposite: true,
//                 title: {
//                     text: yAxis[1] || 'Series 2'
//                 },
//                 labels: {
//                     style: {
//                         fontSize: '12px',
//                         fontWeight: 400,
//                         colors: ['#000'],
//                     },
//                     formatter: (value) => {
//                         if (value >= 10000000) { // For values in crores (millions)
//                             return (value / 10000000).toFixed(1) + 'M';
//                         } else if (value >= 100000) { // For values in lakhs (hundred thousand)
//                             return (value / 100000).toFixed(1) + 'L';
//                         } else if (value >= 1000) { // For values in thousands
//                             return (value / 1000).toFixed(1) + 'K';
//                         } else {
//                             return value; // For smaller values
//                         }
//                     }
//                 },
//             }
//         ],
//         plotOptions: {
//             bar: {
//                 distributed: false,
//                 dataLabels: {
//                     hideOverflowingLabels: false
//                 }
//             }
//         },
//         title: {
//             text: `${aggregate} of ${xAxis} vs ${yAxis.join(' and ')}`,
//             align: 'left',
//             margin: 10,
//             offsetX: 0,
//             offsetY: 0,
//             floating: false,
//             style: {
//                 fontSize: '14px',
//                 fontWeight: 'bold',
//                 color: '#263238'
//             },
//         },
//         dataLabels: {
//             enabled: false
//         },
//         grid: {
//             borderColor: '#f1f3fa'
//         },
//         tooltip: {
//             enabled: true,
//             custom: function({ series, seriesIndex, dataPointIndex, w }) {
//                 const category = categories[dataPointIndex]; // Accessing category name from the array
//                 const value = series[seriesIndex][dataPointIndex];
//                 let tooltipContent = '<div class="tooltip">';

//                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
//                     tooltipContent += `<div class="tooltip-body">
//                         <span><strong></strong> ${value}</span>
//                     </div>`;
//                 } else {
//                     if (toolTipOptions.heading) {
//                         tooltipContent += `<div class="tooltip-header"><h4>${aggregate} of ${xAxis[0]} vs ${yAxis}</h4></div>`;
//                     }

//                     tooltipContent += '<div class="tooltip-body">';

//                     if (toolTipOptions.categoryName) {
//                         tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
//                     }

//                     if (toolTipOptions.value) {
//                         tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
//                     }

//                     tooltipContent += '</div>';
//                 }

//                 tooltipContent += '</div>';

//                 return tooltipContent;
//             }
//         },
//     };

//     const series = [
//         {
//             name: yAxis[0] || 'Series 1',
//             type: 'bar',
//             data: series1,
//             // color: '#008FFB'
//         },
//         {
//             name: yAxis[1] || 'Series 2',
//             type: 'line',
//             data: series2,
//             color: '#00E356'
//         }
//     ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
               
               
//                 {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}> */}
//                 <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
//                 <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="line"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>
//                 <div className="color-picker-container">
//                 </div>
//             </div>
//             {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
//             {barClicked && <DrillBarChart
//                 categories={plotData.categories}
//                 values={plotData.values}
//                 aggregation={plotData.aggregation}
//                 xAxis={xAxis}
//                 yAxis={yAxis}
//                 selectedTable={selectedTable}
//             />}
//         </div>
//     );
// };

// export default DuelAxisChart;

// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector, useDispatch } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import axios from 'axios';
// import DrillBarChart from '../drillDown/drillDownBarChart';
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';
// import { sendCategoryToBackend} from '../../utils/api';
// import Draggable from 'react-draggable';

// const DuelAxisChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const [plotData, setPlotData] = useState({});
//     const [barClicked, setBarClicked] = useState(false);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const contextMenuRef = useRef(null);
//     const barcolour = useSelector((state) => state.chartColor.chartColor);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
//      const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
//         const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
//     const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
//     const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//     const valueColor= useSelector((state) => state.toolTip.valueColor);

//         const handleClicked = async (event, chartContext, config) => {
//             const clickedCategoryIndex = config.dataPointIndex;
//             const clickedCategory = categories[clickedCategoryIndex];
//             dispatch(setClickedCategory(clickedCategory));
//             try {
//               const data = await sendCategoryToBackend(
//                 clickedCategory,
//                 xAxis,
//                 yAxis,
//                 selectedTable,
//                 aggregate
//               );
//               setPlotData(data);
//               setBarClicked(true);
//             } catch (error) {
//               console.error('Error handling click event:', error);
//             }
//           };
    

//     // const handleContextMenu = (event) => {
//     //     event.preventDefault();
//     //     setContextMenuPosition({ x: event.pageX, y: event.pageY });
//     //     setContextMenuVisible(true);
//     // };

//     // const handleClickOutside = (event) => {
//     //     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//     //         setContextMenuVisible(false);
//     //     }
//     // };

//     // const handleShowPopup = () => {
//     //     setPopupVisible(true);
//     //     setContextMenuVisible(false);
//     // };

//     // const handleClosePopup = () => {
//     //     setPopupVisible(false);
//     // };

//     // useEffect(() => {
//     //     document.addEventListener('click', handleClickOutside);
//     //     return () => {
//     //         document.removeEventListener('click', handleClickOutside);
//     //     };
//     // }, []);

//     const options = {
//         chart: {
//             type: 'line',  // Setting type to 'line' for dual-axis chart
//             height: 350,
//             events: {
//                 dataPointSelection: handleClicked
//             }
//         },
//         xaxis: {
//             categories: categories,
//             labels: {
//                 show: true,
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize:`${xFontSize}px` ,
//                     fontWeight: 400,
//                     colors: categoryColor
//                 }
//             }
//         },
        
//         yaxis: [
//     {
//         min: 0, // Start the left y-axis from 0
//         title: {
//             text: yAxis[0] || 'Series 1'
//         },
//         labels: {
//             style: {
//                 fontFamily: fontStyle,
//                 fontSize:`${yFontSize}px`,
//                 fontWeight: 400,
//                 colors: valueColor,
//             },
//             formatter: (value) => {
//                 if (value >= 10000000) {
//                     return (value / 10000000).toFixed(1) + 'M';
//                 } else if (value >= 100000) {
//                     return (value / 100000).toFixed(1) + 'L';
//                 } else if (value >= 1000) {
//                     return (value / 1000).toFixed(1) + 'K';
//                 } else {
//                     return value;
//                 }
//             }
//         },
//     },
//     { 
//         min: 0, // Start the right y-axis from 0
//         opposite: true,
//         title: {
//             text: yAxis[1] || 'Series 2'
//         },
//         labels: {
//             style: {
//                 fontFamily: fontStyle,
//                 fontSize: `${yFontSize}px`,
//                 fontWeight: 400,
//                 colors: valueColor,
//             },
//             formatter: (value) => {
//                 if (value >= 10000000) {
//                     return (value / 10000000).toFixed(1) + 'M';
//                 } else if (value >= 100000) {
//                     return (value / 100000).toFixed(1) + 'L';
//                 } else if (value >= 1000) {
//                     return (value / 1000).toFixed(1) + 'K';
//                 } else {
//                     return value;
//                 }
//             }
//         },
//     }
// ],

//         plotOptions: {
//             bar: {
//                 distributed: false,
//                 dataLabels: {
//                     hideOverflowingLabels: false
//                 }
//             }
//         },
//         title: {
//             text: `${aggregate} of ${xAxis} vs ${yAxis.join(' and ')}`,
//             align: 'left',
//             margin: 10,
//             offsetX: 0,
//             offsetY: 0,
//             floating: false,
//             style: {
//                 fontSize: '14px',
//                 fontWeight: 'bold',
//                 color: '#263238'
//             },
//         },
//         dataLabels: {
//             enabled: true
//         },
//         grid: {
//             borderColor: '#f1f3fa'
//         },

//         tooltip: {
//             shared: true, // Enable shared tooltip for multiple series
//             intersect: false, // Ensure tooltips display for all series on the same x-axis
//             custom: ({ series, seriesIndex, dataPointIndex, w }) => {
//                 // `w` contains the entire chart object and the categories array
//                 const category = w.globals.categoryLabels[dataPointIndex];
//                 const series1Value = series[0][dataPointIndex];
//                 const series2Value = series[1][dataPointIndex];
        
//                 return `
//                     <div style="padding: 10px; font-size: 12px; font-weight: bold; color: #000;background:rgb(255, 255, 255); border-radius: 5px;text-align: left;">
//                         <div>X-Axis: <span style="color: #008FFB;">${category}</span></div>
//                         <div>${yAxis[0] || 'Series 1'}: <span style="color:rgb(33, 123, 197);">${series1Value.toLocaleString()}</span></div>
//                         <div>${yAxis[1] || 'Series 2'}: <span style="color:rgb(228, 21, 21);">${series2Value.toLocaleString()}</span></div>
//                     </div>
//                 `;
//             }
//         }
        
        
//     };

//     const series = [
//         {
//             name: yAxis[0] || 'Series 1',
//             type: 'bar',
//             data: series1,
//              color: barcolour
//         },
//         {
//             name: yAxis[1] || 'Series 2',
//             type: 'line',
//             data: series2,
//             color: '#00E356'
//         }
//     ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
               
               
//                 {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}> */}
//                 <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]} >
//                 <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>

//                         <Chart
//                             options={options}
//                             series={series}
//                             type="line"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>
                
//             </div>
//             {/* {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//                           {popupVisible && (
//         <Draggable>
//           <div>
//             <CustomToolTip onClose={handleClosePopup} />
//           </div>
//         </Draggable> */}
//       {/* )} */}
//         </div>
//     );
// };

// // export default DuelAxisChart;
// import React, { useState, useRef,useEffect } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector, useDispatch } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import { sendCategoryToBackend } from '../../utils/api';

// const DuelAxisChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const barcolour = useSelector((state) => state.chartColor.chartColor);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const headingColor = useSelector((state) => state.toolTip.headingColor);

//     const [filteredCategories, setFilteredCategories] = useState(categories);
//     const [filteredSeries1, setFilteredSeries1] = useState(series1);
//     const [filteredSeries2, setFilteredSeries2] = useState(series2);
//      useEffect(() => {
//         setFilteredCategories(categories);
//         setFilteredSeries1(series1);
//         setFilteredSeries2(series2)
           
//     }, [series1, series2, categories]);
//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const data = await sendCategoryToBackend(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
//             console.log("Received Data:", data);
//         } catch (error) {
//             console.error('Error handling click event:', error);
//         }
//     };
//     const handleSortAscending = () => {
//         const sortedData = [...filteredSeries1]
//           .map((value, index) => ({ category: filteredCategories[index], value }))
//           .sort((a, b) => a.value - b.value);
    
//         setFilteredCategories(sortedData.map((item) => item.category));
//         setFilteredSeries1(sortedData.map((item) => item.value));
//         setFilteredSeries2(sortedData.map((item) => item.value)); // Apply to both series for consistency
//       };
    
//       const handleSortDescending = () => {
//         const sortedData = [...filteredSeries1]
//           .map((value, index) => ({ category: filteredCategories[index], value }))
//           .sort((a, b) => b.value - a.value);
    
//         setFilteredCategories(sortedData.map((item) => item.category));
//         setFilteredSeries1(sortedData.map((item) => item.value));
//         setFilteredSeries2(sortedData.map((item) => item.value)); // Apply to both series for consistency
//       };
//     const handleTop10 = () => {
//         const sortedIndices = series1.map((value, index) => ({ value, index }))
//             .sort((a, b) => b.value - a.value)
//             .slice(0, 10)
//             .map(item => item.index);

//         setFilteredCategories(sortedIndices.map(index => categories[index]));
//         setFilteredSeries1(sortedIndices.map(index => series1[index]));
//         setFilteredSeries2(sortedIndices.map(index => series2[index]));
//     };

//     const handleBottom10 = () => {
//         const sortedIndices = series1.map((value, index) => ({ value, index }))
//             .sort((a, b) => a.value - b.value)
//             .slice(0, 10)
//             .map(item => item.index);

//         setFilteredCategories(sortedIndices.map(index => categories[index]));
//         setFilteredSeries1(sortedIndices.map(index => series1[index]));
//         setFilteredSeries2(sortedIndices.map(index => series2[index]));
//     };

//     const handleReset = () => {
//         setFilteredCategories(categories);
//         setFilteredSeries1(series1);
//         setFilteredSeries2(series2);
//     };

//     const options = {
//         chart: {
//             type: 'line',
//             height: 350,
//             events: {
//                 dataPointSelection: handleClicked
//             },
//             toolbar: {
//                 show: true,
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//                             index: 1, // Start with the first position in the toolbar
//                             title: 'Sort Ascending',
//                             class: 'custom-sort-ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//                             index: 2, // Position right after the previous custom icon
//                             title: 'Sort Descending',
//                             class: 'custom-sort-descending',
//                             click: handleSortDescending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//                             index: 1,
//                             title: 'Show Top 10',
//                             class: 'custom-top-10',
//                             click: handleTop10,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//                             index: 2,
//                             title: 'Show Bottom 10',
//                             class: 'custom-bottom-10',
//                             click: handleBottom10,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">🔄</button>',
//                             index: 3,
//                             title: 'Reset',
//                             class: 'custom-reset',
//                             click: handleReset,
//                         }
//                     ]
//                 }
//             }
//         },
//         xaxis: {
//             categories: filteredCategories,
//         },
//         yaxis: [
//             {
//                 title: { text: yAxis[0] || 'Series 1' },
//             },
//             {
//                 opposite: true,
//                 title: { text: yAxis[1] || 'Series 2' },
//             }
//         ],
//     };

//     const series = [
//         {
//             name: yAxis[0] || 'Series 1',
//             type: 'bar',
//             data: filteredSeries1,
//             color: barcolour
//         },
//         {
//             name: yAxis[1] || 'Series 2',
//             type: 'line',
//             data: filteredSeries2,
//             color: '#00E356'
//         }
//     ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
//                     <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
//                         <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
//                         <Chart options={options} series={series} type="line" width="100%" height="100%" />
//                     </ResizableBox>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DuelAxisChart;
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ResizableBox } from "react-resizable";
import { useDispatch, useSelector } from "react-redux";
import "react-resizable/css/styles.css";
import { setClickedCategory } from "../../features/drillDownChartSlice/drillDownChartSlice";
import { sendCategoryToBackend } from "../../utils/api";

const DuelAxisChart = ({
  categories = [],
  series1 = [],
  series2 = [],
  aggregation,
}) => {
  const dispatch = useDispatch();
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);
  const headingColor = useSelector((state) => state.toolTip.headingColor);

  // Local states for data
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [filteredSeries1, setFilteredSeries1] = useState(series1);
  const [filteredSeries2, setFilteredSeries2] = useState(series2);

  // For legend color picking
  // Two series => two colors in an array
  const [seriesColors, setSeriesColors] = useState(["#008FFB", "#00E356"]);
  // Keep track of which legend item was clicked
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

  useEffect(() => {
    setFilteredCategories(categories);
    setFilteredSeries1(series1);
    setFilteredSeries2(series2);
    // Optionally re-initialize the colors if needed
    setSeriesColors(["#008FFB", "#00E356"]);
  }, [categories, series1, series2]);

  // Sorting & filtering
  const handleSortAscending = () => {
    // Sort by the first series's values
    const sortedData = [...filteredSeries1].map((value, index) => ({
      category: filteredCategories[index],
      value,
      value2: filteredSeries2[index],
    }));
    sortedData.sort((a, b) => a.value - b.value);

    setFilteredCategories(sortedData.map((item) => item.category));
    setFilteredSeries1(sortedData.map((item) => item.value));
    setFilteredSeries2(sortedData.map((item) => item.value2));
  };

  const handleSortDescending = () => {
    const sortedData = [...filteredSeries1].map((value, index) => ({
      category: filteredCategories[index],
      value,
      value2: filteredSeries2[index],
    }));
    sortedData.sort((a, b) => b.value - a.value);

    setFilteredCategories(sortedData.map((item) => item.category));
    setFilteredSeries1(sortedData.map((item) => item.value));
    setFilteredSeries2(sortedData.map((item) => item.value2));
  };

  const handleTop10 = () => {
    const sortedIndices = series1
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
      .map((item) => item.index);

    setFilteredCategories(sortedIndices.map((index) => categories[index]));
    setFilteredSeries1(sortedIndices.map((index) => series1[index]));
    setFilteredSeries2(sortedIndices.map((index) => series2[index]));
  };

  const handleBottom10 = () => {
    const sortedIndices = series1
      .map((value, index) => ({ value, index }))
      .sort((a, b) => a.value - b.value)
      .slice(0, 10)
      .map((item) => item.index);

    setFilteredCategories(sortedIndices.map((index) => categories[index]));
    setFilteredSeries1(sortedIndices.map((index) => series1[index]));
    setFilteredSeries2(sortedIndices.map((index) => series2[index]));
  };

  const handleReset = () => {
    setFilteredCategories(categories);
    setFilteredSeries1(series1);
    setFilteredSeries2(series2);
  };

  // Legend color picking: if user clicked a legend item, show a color picker
  const handleLegendClick = (chartContext, seriesIndex, config) => {
    setSelectedLegendIndex(seriesIndex);
    return false; // Prevent the default toggle/hide behavior
  };

  // If user picks a color from the color picker, update the corresponding series color
  const handleColorChange = (index, newColor) => {
    setSeriesColors((prev) => {
      const updated = [...prev];
      updated[index] = newColor;
      return updated;
    });
  };

  // When a data point is clicked
  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = filteredCategories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      const data = await sendCategoryToBackend(
        clickedCategory,
        xAxis,
        yAxis,
        selectedTable,
        aggregate
      );
      console.log("Received Data:", data);
    } catch (error) {
      console.error("Error handling click event:", error);
    }
  };

  const options = {
    chart: {
      type: "line",
      events: {
        dataPointSelection: handleClicked,
        legendClick: handleLegendClick,
      },
      toolbar: {
        show: true,
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
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">🔄</button>',
              index: 5,
              title: "Reset",
              class: "custom-reset",
              click: handleReset,
            },
          ],
        },
      },
    },
    xaxis: {
      categories: filteredCategories,
    },
    yaxis: [
      {
        title: { text: yAxis[0] || "Series 1" },
      },
      {
        opposite: true,
        title: { text: yAxis[1] || "Series 2" },
      },
    ],
    // Provide the legend so each series is displayed (2 series => 2 items)
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      markers: {
        width: 12,
        height: 12,
        radius: 2,
      },
    },
    // The apex "colors" array is used for the overall series color order
    colors: seriesColors,
  };

  // Two series: one is bar, one is line
  const series = [
    {
      name: yAxis[0] || "Series 1",
      type: "bar",
      data: filteredSeries1,
      // color: seriesColors[0], // If you prefer per-series color
    },
    {
      name: yAxis[1] || "Series 2",
      type: "line",
      data: filteredSeries2,
      // color: seriesColors[1],
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <ResizableBox
            width={800}
            height={550}
            minConstraints={[500, 200]}
            maxConstraints={[800, 550]}
          >
            <div className="chart-title">
              <h3 style={{ color: headingColor }}>{customHeadings}</h3>
            </div>
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
              height="100%"
            />
          </ResizableBox>
        </div>
      </div>
      {/* Inline color picker if a legend item was clicked */}
      {selectedLegendIndex !== null && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <span>
            Change color for "
            {selectedLegendIndex === 0
              ? yAxis[0] || "Series 1"
              : yAxis[1] || "Series 2"}
            ":{" "}
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
  );
};

export default DuelAxisChart;


// import React, { useState, useEffect } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector, useDispatch } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import { sendCategoryToBackend } from '../../utils/api';

// const DuelAxisChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
//     console.log("Duel Axis Chart Props:", { categories, series1, series2, aggregation });
  
//     const dispatch = useDispatch();
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const barcolour = useSelector((state) => state.chartColor.chartColor);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const headingColor = useSelector((state) => state.toolTip.headingColor);

//     // Log initial props to see when they arrive
//     useEffect(() => {
//         console.log("Initial Series 1:", series1);
//         console.log("Initial Series 2:", series2);
//     }, [series1, series2, categories]);

//     // Initialize states with fallback values
//     const [filteredCategories, setFilteredCategories] = useState(categories.length ? categories : ['Default Category']);
//     const [filteredSeries1, setFilteredSeries1] = useState(series1.length ? series1 : [0]);
//     const [filteredSeries2, setFilteredSeries2] = useState(series2.length ? series2 : [0]);

//     // Update state when props change
//     useEffect(() => {
//         setFilteredCategories(categories.length ? categories : ['Default Category']);
//         setFilteredSeries1(series1.length ? series1 : [0]);
//         setFilteredSeries2(series2.length ? series2 : [0]);
//     }, [categories, series1, series2]);

//     console.log("Filtered Categories:", filteredCategories);
//     console.log("Filtered Series 1:", filteredSeries1);
//     console.log("Filtered Series 2:", filteredSeries2);

//     // ... rest of your component code
//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//             const data = await sendCategoryToBackend(clickedCategory, xAxis, yAxis, selectedTable, aggregate);
//             console.log("Received Data:", data);
//         } catch (error) {
//             console.error('Error handling click event:', error);
//         }
//     };

//     // Sorting and filtering functions...
//     const handleSortAscending = () => {
//         const sortedData = [...filteredSeries1]
//           .map((value, index) => ({ category: filteredCategories[index], value }))
//           .sort((a, b) => a.value - b.value);
    
//         setFilteredCategories(sortedData.map((item) => item.category));
//         setFilteredSeries1(sortedData.map((item) => item.value));
//         setFilteredSeries2(sortedData.map((item) => item.value)); // Apply to both series for consistency
//     };
    
//     const handleSortDescending = () => {
//         const sortedData = [...filteredSeries1]
//           .map((value, index) => ({ category: filteredCategories[index], value }))
//           .sort((a, b) => b.value - a.value);
    
//         setFilteredCategories(sortedData.map((item) => item.category));
//         setFilteredSeries1(sortedData.map((item) => item.value));
//         setFilteredSeries2(sortedData.map((item) => item.value)); // Apply to both series for consistency
//     };

//     const handleTop10 = () => {
//         const sortedIndices = series1.map((value, index) => ({ value, index }))
//             .sort((a, b) => b.value - a.value)
//             .slice(0, 10)
//             .map(item => item.index);

//         setFilteredCategories(sortedIndices.map(index => categories[index]));
//         setFilteredSeries1(sortedIndices.map(index => series1[index]));
//         setFilteredSeries2(sortedIndices.map(index => series2[index]));
//     };

//     const handleBottom10 = () => {
//         const sortedIndices = series1.map((value, index) => ({ value, index }))
//             .sort((a, b) => a.value - b.value)
//             .slice(0, 10)
//             .map(item => item.index);

//         setFilteredCategories(sortedIndices.map(index => categories[index]));
//         setFilteredSeries1(sortedIndices.map(index => series1[index]));
//         setFilteredSeries2(sortedIndices.map(index => series2[index]));
//     };

//     const handleReset = () => {
//         setFilteredCategories(categories);
//         setFilteredSeries1(series1);
//         setFilteredSeries2(series2);
//     };

//     const options = {
//         chart: {
//             type: 'line',
//             height: 350,
//             events: {
//                 dataPointSelection: handleClicked
//             },
//             toolbar: {
//                 show: true,
//                 tools: {
//                     customIcons: [
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
//                             index: 1,
//                             title: 'Sort Ascending',
//                             class: 'custom-sort-ascending',
//                             click: handleSortAscending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
//                             index: 2,
//                             title: 'Sort Descending',
//                             class: 'custom-sort-descending',
//                             click: handleSortDescending
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//                             index: 1,
//                             title: 'Show Top 10',
//                             class: 'custom-top-10',
//                             click: handleTop10,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//                             index: 2,
//                             title: 'Show Bottom 10',
//                             class: 'custom-bottom-10',
//                             click: handleBottom10,
//                         },
//                         {
//                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">🔄</button>',
//                             index: 3,
//                             title: 'Reset',
//                             class: 'custom-reset',
//                             click: handleReset,
//                         }
//                     ]
//                 }
//             }
//         },
//         xaxis: {
//             categories: filteredCategories,
//         },
//         yaxis: [
//             {
//                 title: { text: yAxis[0] || 'Series 1' },
//             },
//             {
//                 opposite: true,
//                 title: { text: yAxis[1] || 'Series 2' },
//             }
//         ],
//     };

//     const series = [
//         {
//             name: yAxis[0] || 'Series 1',
//             type: 'bar',
//             data: filteredSeries1,
//             color: barcolour
//         },
//         {
//             name: yAxis[1] || 'Series 2',
//             type: 'line',
//             data: filteredSeries2,
//             color: '#00E356'
//         }
//     ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
//                     <ResizableBox width={800} height={550} minConstraints={[500, 200]} maxConstraints={[800, 550]}>
//                         <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
//                         <Chart options={options} series={series} type="line" width="100%" height="100%" />
//                     </ResizableBox>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DuelAxisChart;
