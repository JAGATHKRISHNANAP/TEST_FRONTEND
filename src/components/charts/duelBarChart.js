


// // // import React from 'react';
// // // import Chart from "react-apexcharts";

// // // const GroupedBarChart = () => {
// // //     // Demo data values for the grouped bar chart
// // //     const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
// // //     const values1 = [30, 40, 45, 50, 49];  // Values for the first group
// // //     const values2 = [60, 80, 70, 60, 90];  // Values for the second group

// // //     const options = {
// // //         chart: {
// // //             type: 'bar',
// // //             height: 350,
// // //             toolbar: {
// // //                 show: false
// // //             }
// // //         },
// // //         plotOptions: {
// // //             bar: {
// // //                 horizontal: false,
// // //                 columnWidth: '45%',
// // //                 endingShape: 'rounded'
// // //             }
// // //         },
// // //         dataLabels: {
// // //             enabled: false
// // //         },
// // //         xaxis: {
// // //             categories: categories,
// // //             title: {
// // //                 text: 'Categories'
// // //             }
// // //         },
// // //         yaxis: {
// // //             title: {
// // //                 text: 'Values'
// // //             }
// // //         },
// // //         title: {
// // //             text: 'Grouped Bar Chart Example',
// // //             align: 'center'
// // //         },
// // //         tooltip: {
// // //             y: {
// // //                 formatter: function (val) {
// // //                     return `${val} units`;
// // //                 }
// // //             }
// // //         },
// // //         colors: ['#FF5733', '#33FF57'], // Different colors for each series
// // //     };

// // //     const series = [
// // //         {
// // //             name: 'Group 1',
// // //             data: values1
// // //         },
// // //         {
// // //             name: 'Group 2',
// // //             data: values2
// // //         }
// // //     ];

// // //     return (
// // //         <div className="app">
// // //             <div className="mixed-chart">
// // //                 <Chart options={options} series={series} type="bar" height={350} />
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default GroupedBarChart;


// // import React, { useState, useEffect, useRef } from 'react';
// // import Chart from "react-apexcharts";
// // import { useSelector, useDispatch } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css';
// // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // import axios from 'axios';
// // import DrillBarChart from '../drillDown/drillDownBarChart';
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip';

// // const DuelBarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
// //     const dispatch = useDispatch();
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const [plotData, setPlotData] = useState({});
// //     const [barClicked, setBarClicked] = useState(false);
// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false);
// //     const contextMenuRef = useRef(null);

// //     const handleClicked = async (event, chartContext, config) => {
// //         const clickedCategoryIndex = config.dataPointIndex;
// //         const clickedCategory = categories[clickedCategoryIndex];
// //         dispatch(setClickedCategory(clickedCategory));
// //         try {
// //             const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
// //                 category: clickedCategory,
// //                 xAxis: xAxis,
// //                 yAxis: yAxis,
// //                 tableName: selectedTable,
// //                 aggregation: aggregate
// //             });

// //             setPlotData(response.data);
// //             setBarClicked(true);
// //         } catch (error) {
// //             console.error('Error sending category to backend:', error);
// //         }
// //     };

// //     const handleContextMenu = (event) => {
// //         event.preventDefault();
// //         setContextMenuPosition({ x: event.pageX, y: event.pageY });
// //         setContextMenuVisible(true);
// //     };

// //     const handleClickOutside = (event) => {
// //         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// //             setContextMenuVisible(false);
// //         }
// //     };

// //     const handleShowPopup = () => {
// //         setPopupVisible(true);
// //         setContextMenuVisible(false);
// //     };

// //     const handleClosePopup = () => {
// //         setPopupVisible(false);
// //     };

// //     useEffect(() => {
// //         document.addEventListener('click', handleClickOutside);
// //         return () => {
// //             document.removeEventListener('click', handleClickOutside);
// //         };
// //     }, []);

// //     const options = {
// //         chart: {
// //             type: 'bar',  // Set type to 'bar' for dual-bar chart
// //             height: 350,
// //             events: {
// //                 dataPointSelection: handleClicked
// //             }
// //         },
// //         xaxis: {
// //             categories: categories,
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000']
// //                 }
// //             }
// //         },
// //         yaxis: [
// //             {
// //                 title: {
// //                     text: yAxis[0] || 'Series 1'
// //                 },
// //                 labels: {
// //                     style: {
// //                         fontSize: '12px',
// //                         fontWeight: 400,
// //                         colors: ['#000'],
// //                     },
// //                     formatter: (value) => {
// //                         if (value >= 10000000) { // For values in crores (millions)
// //                             return (value / 10000000).toFixed(1) + 'M';
// //                         } else if (value >= 100000) { // For values in lakhs (hundred thousand)
// //                             return (value / 100000).toFixed(1) + 'L';
// //                         } else if (value >= 1000) { // For values in thousands
// //                             return (value / 1000).toFixed(1) + 'K';
// //                         } else {
// //                             return value; // For smaller values
// //                         }
// //                     }
// //                 },
// //             },
// //             {
// //                 opposite: true,
// //                 title: {
// //                     text: yAxis[1] || 'Series 2'
// //                 },
// //                 labels: {
// //                     style: {
// //                         fontSize: '12px',
// //                         fontWeight: 400,
// //                         colors: ['#000'],
// //                     },
// //                     formatter: (value) => {
// //                         if (value >= 10000000) { // For values in crores (millions)
// //                             return (value / 10000000).toFixed(1) + 'M';
// //                         } else if (value >= 100000) { // For values in lakhs (hundred thousand)
// //                             return (value / 100000).toFixed(1) + 'L';
// //                         } else if (value >= 1000) { // For values in thousands
// //                             return (value / 1000).toFixed(1) + 'K';
// //                         } else {
// //                             return value; // For smaller values
// //                         }
// //                     }
// //                 },
// //             }
// //         ],
// //         plotOptions: {
// //             bar: {
// //                 distributed: false,
// //                 dataLabels: {
// //                     hideOverflowingLabels: false
// //                 }
// //             }
// //         },
// //         title: {
// //             text: `${aggregate} of ${xAxis} vs ${yAxis.join(' and ')}`,
// //             align: 'left',
// //             margin: 10,
// //             offsetX: 0,
// //             offsetY: 0,
// //             floating: false,
// //             style: {
// //                 fontSize: '14px',
// //                 fontWeight: 'bold',
// //                 color: '#263238'
// //             },
// //         },
// //         dataLabels: {
// //             enabled: false
// //         },
// //         grid: {
// //             borderColor: '#f1f3fa'
// //         },
// //         tooltip: {
// //             enabled: true,
// //             custom: function({ series, seriesIndex, dataPointIndex, w }) {
// //                 const category = categories[dataPointIndex]; // Accessing category name from the array
// //                 const value = series[seriesIndex][dataPointIndex];
// //                 let tooltipContent = '<div class="tooltip">';

// //                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
// //                     tooltipContent += `<div class="tooltip-body">
// //                         <span><strong></strong> ${value}</span>
// //                     </div>`;
// //                 } else {
// //                     if (toolTipOptions.heading) {
// //                         tooltipContent += `<div class="tooltip-header"><h4>${aggregate} of ${xAxis[0]} vs ${yAxis}</h4></div>`;
// //                     }

// //                     tooltipContent += '<div class="tooltip-body">';

// //                     if (toolTipOptions.categoryName) {
// //                         tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
// //                     }

// //                     if (toolTipOptions.value) {
// //                         tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
// //                     }

// //                     tooltipContent += '</div>';
// //                 }

// //                 tooltipContent += '</div>';

// //                 return tooltipContent;
// //             }
// //         },
// //     };

// //     const series = [
// //         {
// //             name: yAxis[0] || 'Series 1',
// //             type: 'bar',  // Change to 'bar' for a bar chart
// //             data: series1,
// //             color: '#008FFB'  // You can customize the bar color
// //         },
// //         {
// //             name: yAxis[1] || 'Series 2',
// //             type: 'bar',  // Change to 'bar' for a bar chart
// //             data: series2,
// //             color: '#00E356'  // You can customize the bar color
// //         }
// //     ];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="mixed-chart">
// //                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="bar"  // Set chart type to bar
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
// //                 </div>
// //                 <div className="color-picker-container"></div>
// //             </div>
// //             {contextMenuVisible && (
// //                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// //             )}
// //             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
// //             {barClicked && <DrillBarChart
// //                 categories={plotData.categories}
// //                 values={plotData.values}
// //                 aggregation={plotData.aggregation}
// //                 xAxis={xAxis}
// //                 yAxis={yAxis}
// //                 selectedTable={selectedTable}
// //             />}
// //         </div>
// //     );
// // };

// // export default DuelBarChart;

// // import React, { useState, useEffect, useRef } from 'react';
// // import Chart from "react-apexcharts";
// // import { useSelector, useDispatch } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css';
// // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // import axios from 'axios';
// // import DrillBarChart from '../drillDown/drillDownBarChart';
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip';

// // const DuelBarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
// //     const dispatch = useDispatch();
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const [plotData, setPlotData] = useState({});
// //     const [barClicked, setBarClicked] = useState(false);
// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false);
// //     const contextMenuRef = useRef(null);

// //     const handleClicked = async (event, chartContext, config) => {
// //         const clickedCategoryIndex = config.dataPointIndex;
// //         const clickedCategory = categories[clickedCategoryIndex];
// //         dispatch(setClickedCategory(clickedCategory));
// //         try {
// //             const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
// //                 category: clickedCategory,
// //                 xAxis: xAxis,
// //                 yAxis: yAxis,
// //                 tableName: selectedTable,
// //                 aggregation: aggregate
// //             });

// //             setPlotData(response.data);
// //             setBarClicked(true);
// //         } catch (error) {
// //             console.error('Error sending category to backend:', error);
// //         }
// //     };

// //     const handleContextMenu = (event) => {
// //         event.preventDefault();
// //         setContextMenuPosition({ x: event.pageX, y: event.pageY });
// //         setContextMenuVisible(true);
// //     };

// //     const handleClickOutside = (event) => {
// //         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// //             setContextMenuVisible(false);
// //         }
// //     };

// //     const handleShowPopup = () => {
// //         setPopupVisible(true);
// //         setContextMenuVisible(false);
// //     };

// //     const handleClosePopup = () => {
// //         setPopupVisible(false);
// //     };

// //     useEffect(() => {
// //         document.addEventListener('click', handleClickOutside);
// //         return () => {
// //             document.removeEventListener('click', handleClickOutside);
// //         };
// //     }, []);

// //     const options = {
// //         chart: {
// //             type: 'bar',
// //             height: 350,
// //             events: {
// //                 dataPointSelection: handleClicked
// //             }
// //         },
// //         xaxis: {
// //             categories: categories,
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000']
// //                 }
// //             },
// //             tickAmount: 10  // You can adjust this to fit both categories
// //         },
// //         yaxis: {
// //             title: {
// //                 text: yAxis[0] || 'Series 1'
// //             },
// //             labels: {
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000'],
// //                 },
// //                 formatter: (value) => {
// //                     if (value >= 10000000) {
// //                         return (value / 10000000).toFixed(1) + 'M';
// //                     } else if (value >= 100000) {
// //                         return (value / 100000).toFixed(1) + 'L';
// //                     } else if (value >= 1000) {
// //                         return (value / 1000).toFixed(1) + 'K';
// //                     } else {
// //                         return value;
// //                     }
// //                 }
// //             },
// //         },
// //         plotOptions: {
// //             bar: {
// //                 distributed: true,
// //                 dataLabels: {
// //                     enabled: true,  // Enable data labels for bars
// //                     position: 'top',  // Position the labels on top of the bars
// //                     style: {
// //                         fontSize: '12px',  // Adjust font size of the label
// //                         fontWeight: 500,
// //                         colors: ['#000']  // Color of the label text
// //                     }
// //                 }
// //             }
// //         },
// //         title: {
// //             text: `${aggregate} of ${xAxis} vs ${yAxis[0]}`,
// //             align: 'left',
// //             margin: 10,
// //             offsetX: 0,
// //             offsetY: 0,
// //             floating: false,
// //             style: {
// //                 fontSize: '14px',
// //                 fontWeight: 'bold',
// //                 color: '#263238'
// //             },
// //         },
// //         dataLabels: {
// //             enabled: true  // Disable default data labels if you want to manage them manually
// //         },
// //         grid: {
// //             borderColor: '#f1f3fa'
// //         },
// //         tooltip: {
// //             enabled: true,
// //             custom: function({ series, seriesIndex, dataPointIndex, w }) {
// //                 const category = categories[dataPointIndex];
// //                 const value = series[seriesIndex][dataPointIndex];
// //                 let tooltipContent = '<div class="tooltip">';
    
// //                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
// //                     tooltipContent += `<div class="tooltip-body">
// //                         <span><strong></strong> ${value}</span>
// //                     </div>`;
// //                 } else {
// //                     if (toolTipOptions.heading) {
// //                         tooltipContent += `<div class="tooltip-header"><h4>${aggregate} of ${xAxis[0]} vs ${yAxis}</h4></div>`;
// //                     }
    
// //                     tooltipContent += '<div class="tooltip-body">';
    
// //                     if (toolTipOptions.categoryName) {
// //                         tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
// //                     }
    
// //                     if (toolTipOptions.value) {
// //                         tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
// //                     }
    
// //                     tooltipContent += '</div>';
// //                 }
    
// //                 tooltipContent += '</div>';
    
// //                 return tooltipContent;
// //             }
// //         },
// //     };
    

// //     const series = [
// //         {
// //             name: xAxis[0] || 'Series 1',
// //             type: 'bar',
// //             data: series1,
// //             color: '#008FFB'
// //         },
// //         {
// //             name: xAxis[1] || 'Series 2',
// //             type: 'bar',
// //             data: series2,
// //             color: '#00E356'
// //         }
// //     ];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="mixed-chart">
// //                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="bar"
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
// //                 </div>
// //                 <div className="color-picker-container"></div>
// //             </div>
// //             {contextMenuVisible && (
// //                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// //             )}
// //             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
// //             {barClicked && <DrillBarChart
// //                 categories={plotData.categories}
// //                 values={plotData.values}
// //                 aggregation={plotData.aggregation}
// //                 xAxis={xAxis}
// //                 yAxis={yAxis}
// //                 selectedTable={selectedTable}
// //             />}
// //         </div>
// //     );
// // };

// // export default DuelBarChart;
// // import React, { useState, useEffect, useRef } from 'react';
// // import Chart from "react-apexcharts";
// // import { useSelector } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css';
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip';

// // const DuelBarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false);
// //     const contextMenuRef = useRef(null);

// //     const handleContextMenu = (event) => {
// //         event.preventDefault();
// //         setContextMenuPosition({ x: event.pageX, y: event.pageY });
// //         setContextMenuVisible(true);
// //     };

// //     const handleClickOutside = (event) => {
// //         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// //             setContextMenuVisible(false);
// //         }
// //     };

// //     const handleShowPopup = () => {
// //         setPopupVisible(true);
// //         setContextMenuVisible(false);
// //     };

// //     const handleClosePopup = () => {
// //         setPopupVisible(false);
// //     };

// //     useEffect(() => {
// //         document.addEventListener('click', handleClickOutside);
// //         return () => {
// //             document.removeEventListener('click', handleClickOutside);
// //         };
// //     }, []);

// //     const options = {
// //         chart: {
// //             type: 'bar',
// //             height: 350,
// //             events: {
// //                 // Removed the drill-down event
// //             }
// //         },
// //         xaxis: {
// //             categories: categories,
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000']
// //                 }
// //             },
// //             tickAmount: 10  // You can adjust this to fit both categories
// //         },
// //         yaxis: {
// //             title: {
// //                 text: yAxis[0] || 'Series 1'
// //             },
// //             labels: {
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#000'],
// //                 },
// //                 formatter: (value) => {
// //                     if (value >= 10000000) {
// //                         return (value / 10000000).toFixed(1) + 'M';
// //                     } else if (value >= 100000) {
// //                         return (value / 100000).toFixed(1) + 'L';
// //                     } else if (value >= 1000) {
// //                         return (value / 1000).toFixed(1) + 'K';
// //                     } else {
// //                         return value;
// //                     }
// //                 }
// //             },
// //         },
// //         plotOptions: {
// //             bar: {
// //                 distributed: true,
// //                 dataLabels: {
// //                     enabled: true,  // Enable data labels for bars
// //                     position: 'top',  // Position the labels on top of the bars
// //                     style: {
// //                         fontSize: '12px',  // Adjust font size of the label
// //                         fontWeight: 500,
// //                         colors: ['#000']  // Color of the label text
// //                     }
// //                 }
// //             }
// //         },
// //         title: {
// //             text: `${aggregate} of ${xAxis} vs ${yAxis[0]}`,
// //             align: 'left',
// //             margin: 10,
// //             offsetX: 0,
// //             offsetY: 0,
// //             floating: false,
// //             style: {
// //                 fontSize: '14px',
// //                 fontWeight: 'bold',
// //                 color: '#263238'
// //             },
// //         },
// //         dataLabels: {
// //             enabled: false  // Disable default data labels if you want to manage them manually
// //         },
// //         grid: {
// //             borderColor: '#f1f3fa'
// //         },
// //         tooltip: {
// //             enabled: false,
// //             custom: function({ series, seriesIndex, dataPointIndex, w }) {
// //                 const category = categories[dataPointIndex];
// //                 const value = series[seriesIndex][dataPointIndex];
// //                 let tooltipContent = '<div class="tooltip">';

// //                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
// //                     tooltipContent += `<div class="tooltip-body">
// //                         <span><strong></strong> ${value}</span>
// //                     </div>`;
// //                 } else {
// //                     if (toolTipOptions.heading) {
// //                         tooltipContent += `<div class="tooltip-header"><h4>${aggregate} of ${xAxis[0]} vs ${yAxis}</h4></div>`;
// //                     }

// //                     tooltipContent += '<div class="tooltip-body">';

// //                     if (toolTipOptions.categoryName) {
// //                         tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
// //                     }

// //                     if (toolTipOptions.value) {
// //                         tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
// //                     }

// //                     tooltipContent += '</div>';
// //                 }

// //                 tooltipContent += '</div>';

// //                 return tooltipContent;
// //             }
// //         },
// //     };

// //     // Customizing the colors for bars in the chart
// //     const series = [
// //         {
// //             name: xAxis[0] || 'Series 1',
// //             type: 'bar',
// //             data: series1,
// //             color: '#008FFB'  // Color for the first series
// //         },
// //         {
// //             name: xAxis[1] || 'Series 2',
// //             type: 'bar',
// //             data: series2,
// //             color: '#00E356'  // Color for the second series
// //         }
// //     ];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="mixed-chart">
// //                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="bar"
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
// //                 </div>
// //                 <div className="color-picker-container"></div>
// //             </div>
// //             {contextMenuVisible && (
// //                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// //             )}
// //             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
// //         </div>
// //     );
// // };

// // export default DuelBarChart;

// // import React, { useState, useEffect, useRef } from 'react';
// // import Chart from "react-apexcharts";
// // import { useSelector } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css';
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip';

// // const DuelBarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false);
// //     const contextMenuRef = useRef(null);

// //     const handleContextMenu = (event) => {
// //         event.preventDefault();
// //         setContextMenuPosition({ x: event.pageX, y: event.pageY });
// //         setContextMenuVisible(true);
// //     };

// //     const handleClickOutside = (event) => {
// //         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// //             setContextMenuVisible(false);
// //         }
// //     };

// //     const handleShowPopup = () => {
// //         setPopupVisible(true);
// //         setContextMenuVisible(false);
// //     };

// //     const handleClosePopup = () => {
// //         setPopupVisible(false);
// //     };

// //     useEffect(() => {
// //         document.addEventListener('click', handleClickOutside);
// //         return () => {
// //             document.removeEventListener('click', handleClickOutside);
// //         };
// //     }, []);

// //     const options = {
// //         chart: {
// //             type: 'bar',
// //             height: 350,
// //             events: {},
// //             toolbar: {
// //                 show: false,  // Hide the toolbar for a cleaner look
// //             },
// //         },
// //         xaxis: {
// //             categories: categories,
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     fontSize: '14px',  // Bigger font for readability
// //                     fontWeight: 600,   // Bold font
// //                     colors: ['#333'],  // Dark color for better visibility
// //                 },
// //             },
// //             tickAmount: 10,
// //         },
// //         yaxis: {
// //             title: {
// //                 text: yAxis[0] || 'Series 1',
// //                 style: {
// //                     fontSize: '14px',
// //                     fontWeight: 600,
// //                     color: '#333',
// //                 },
// //             },
// //             labels: {
// //                 style: {
// //                     fontSize: '12px',
// //                     fontWeight: 400,
// //                     colors: ['#333'],
// //                 },
// //                 formatter: (value) => {
// //                     if (value >= 10000000) {
// //                         return (value / 10000000).toFixed(1) + 'M';
// //                     } else if (value >= 100000) {
// //                         return (value / 100000).toFixed(1) + 'L';
// //                     } else if (value >= 1000) {
// //                         return (value / 1000).toFixed(1) + 'K';
// //                     } else {
// //                         return value;
// //                     }
// //                 },
// //             },
// //         },
// //         plotOptions: {
// //             bar: {
// //                 distributed: true,
// //                 dataLabels: {
// //                     enabled: true,
// //                     position: 'top',
// //                     style: {
// //                         fontSize: '12px',
// //                         fontWeight: 500,
// //                         colors: ['#fff'],  // White color for data labels
// //                     },
// //                 },
// //             },
// //         },
// //         title: {
// //             text: `${aggregate} of ${xAxis} vs ${yAxis[0]}`,
// //             align: 'left',
// //             margin: 10,
// //             offsetX: 0,
// //             style: {
// //                 fontSize: '16px',
// //                 fontWeight: 'bold',
// //                 color: '#333',
// //             },
// //         },
// //         tooltip: {
// //             enabled: true,
// //             custom: function({ series, seriesIndex, dataPointIndex, w }) {
// //                 const category = categories[dataPointIndex];
// //                 const value = series[seriesIndex][dataPointIndex];
// //                 let tooltipContent = '<div class="tooltip" style="background: #333; color: #fff; padding: 10px; border-radius: 5px;">';

// //                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
// //                     tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
// //                 } else {
// //                     if (toolTipOptions.heading) {
// //                         tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} vs ${yAxis[0]}</h4></div>`;
// //                     }
// //                     tooltipContent += '<div>';
// //                     if (toolTipOptions.categoryName) {
// //                         tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
// //                     }
// //                     if (toolTipOptions.value) {
// //                         tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
// //                     }
// //                     tooltipContent += '</div>';
// //                 }
// //                 tooltipContent += '</div>';

// //                 return tooltipContent;
// //             },
// //         },
// //     };

// //     const series = [
// //         {
// //             name: xAxis[0] || 'Series 1',
// //             type: 'bar',
// //             data: series1,
// //             color: '#008FFB',  // Blue color for the first series
// //         },
// //         {
// //             name: xAxis[1] || 'Series 2',
// //             type: 'bar',
// //             data: series2,
// //             color: '#00E356',  // Green color for the second series
// //         },
// //     ];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="mixed-chart">
// //                     <ResizableBox width={400} height={400} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
// //                         <Chart
// //                             options={options}
// //                             series={series}
// //                             type="bar"
// //                             width="100%"
// //                             height="100%"
// //                         />
// //                     </ResizableBox>
// //                 </div>
// //             </div>
// //             {contextMenuVisible && (
// //                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// //             )}
// //             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
// //         </div>
// //     );
// // };

// // export default DuelBarChart;

// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';

// const DuelBarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const contextMenuRef = useRef(null);

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
//             type: 'bar',
//             height: 350,
//             events: {},
//             toolbar: {
//                 show: false,  // Hide the toolbar for a cleaner look
//             },
//         },
//         xaxis: {
//             categories: categories,
//             labels: {
//                 show: true,
//                 style: {
//                     fontSize: '14px',  // Bigger font for readability
//                     fontWeight: 600,   // Bold font
//                     colors: ['#333'],  // Dark color for better visibility
//                 },
//             },
//             tickAmount: 10,
//         },
//         yaxis: {
//             title: {
//                 text: yAxis[0] || 'Series 1',
//                 style: {
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#333',
//                 },
//             },
//             labels: {
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 400,
//                     colors: ['#333'],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) {
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) {
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) {
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value;
//                     }
//                 },
//             },
//         },
//         plotOptions: {
//             bar: {
//                 distributed: true,
//                 dataLabels: {
//                     enabled: true,
//                     position: 'top',
//                     style: {
//                         fontSize: '12px',
//                         fontWeight: 500,
//                         colors: ['#fff'],  // White color for data labels
//                     },
//                 },
//             },
//         },
//         title: {
//             text: `${aggregate} of ${xAxis} vs ${yAxis[0]}`,
//             align: 'left',
//             margin: 10,
//             offsetX: 0,
//             style: {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#333',
//             },
//         },
//         tooltip: {
//             enabled: true,
//             custom: function({ series, seriesIndex, dataPointIndex, w }) {
//                 const category = categories[dataPointIndex];
//                 const value = series[seriesIndex][dataPointIndex];
//                 let tooltipContent = '<div class="tooltip" style="background: #333; color: #fff; padding: 10px; border-radius: 5px;">';

//                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
//                     tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
//                 } else {
//                     if (toolTipOptions.heading) {
//                         tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} vs ${yAxis[0]}</h4></div>`;
//                     }
//                     tooltipContent += '<div>';
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
//             },
//         },
//     };

//     const series = [
//         {
//             name: xAxis[0] || 'Series 1',
//             type: 'bar',
//             data: series1,
//             color: '#008FFB',  // Blue color for the first series
//         },
//         {
//             name: xAxis[1] || 'Series 2',
//             type: 'bar',
//             data: series2,
//             color: '#00E356',  // Green color for the second series
//         },
//     ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
//                     <ResizableBox width={400} height={400} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="bar"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>
//             </div>
//             {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
//         </div>
//     );
// };

// export default DuelBarChart;

// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';

// const BarChart = ({ categories = [], series1 = [], aggregation }) => {
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const [contextMenuVisible, setContextMenuVisible] = useState(false);
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
//     const [popupVisible, setPopupVisible] = useState(false);
//     const contextMenuRef = useRef(null);

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
//             type: 'bar',
//             height: 350,
//             events: {},
//             toolbar: {
//                 show: false,  // Hide the toolbar for a cleaner look
//             },
//         },
//         xaxis: {
//             categories: categories,
//             labels: {
//                 show: true,
//                 style: {
//                     fontSize: '12px',  // Bigger font for readability
//                     fontWeight: 600,   // Bold font
//                     colors: ['#333'],  // Dark color for better visibility
//                 },
//             },
//             tickAmount: 18,
//         },
//         yaxis: {
//             title: {
//                 text: yAxis[0] || 'Series 1',
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 600,
//                     color: '#333',
//                 },
//             },
//             labels: {
//                 style: {
//                     fontSize: '10px',
//                     fontWeight: 400,
//                     colors: ['#333'],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) {
//                         return (value / 10000000).toFixed(1) + 'M';
//                     } else if (value >= 100000) {
//                         return (value / 100000).toFixed(1) + 'L';
//                     } else if (value >= 1000) {
//                         return (value / 1000).toFixed(1) + 'K';
//                     } else {
//                         return value;
//                     }
//                 },
//             },
//         },
//         plotOptions: {
//             bar: {
//                 distributed: true,
//                 dataLabels: {
//                     enabled: true,
//                     position: 'top',
//                     style: {
//                         fontSize: '10px',
//                         fontWeight: 500,
//                         colors: ['#fff'],  // White color for data labels
//                     },
//                 },
//             },
//         },
//         title: {
//             text: `${aggregate} of ${xAxis} vs ${yAxis[0]}`,
//             align: 'left',
//             margin: 10,
//             offsetX: 0,
//             style: {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#333',
//             },
//         },
//         tooltip: {
//             enabled: true,
//             custom: function({ series, seriesIndex, dataPointIndex, w }) {
//                 const category = categories[dataPointIndex];
//                 const value = series[seriesIndex][dataPointIndex];
//                 let tooltipContent = '<div class="tooltip" style="background: #333; color: #fff; padding: 10px; border-radius: 5px;">';

//                 if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
//                     tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
//                 } else {
//                     if (toolTipOptions.heading) {
//                         tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} vs ${yAxis[0]}</h4></div>`;
//                     }
//                     tooltipContent += '<div>';
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
//             },
//         },
//     };

//     const series = [
//         {
//             name: xAxis[0] || 'Series 1',
//             type: 'bar',
//             data: series1,
//             color: '#008FFB',  // Blue color for the series
//         },
//     ];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
//                     <ResizableBox width={800} height={600} minConstraints={[300, 300]} maxConstraints={[1100, 600]} onContextMenu={handleContextMenu}>
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="bar"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox>
//                 </div>
//             </div>
//             {contextMenuVisible && (
//                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//             )}
//             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
//         </div>
//     );
// };

// export default BarChart;

import React, { useState, useEffect, useRef } from 'react';
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ContectMenu from './contextMenu';
import CustomToolTip from './customToolTip';
import { faSlash } from '@fortawesome/free-solid-svg-icons';

const BarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const customHeadings = useSelector((state) => state.toolTip.customHeading);
    const [popupVisible, setPopupVisible] = useState(false);
    const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
    const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
    const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
    const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
    const categoryColor = useSelector((state) => state.toolTip.categoryColor);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredSeries1, setFilteredSeries1] = useState(series1);
    const [filteredSeries2, setFilteredSeries2] = useState(series2);        
    const valueColor= useSelector((state) => state.toolTip.valueColor);
    const [legendPosition, setLegendPosition] = useState("bottom");
    const [chartKey, setChartKey] = useState(0); // Force re-render when legend changes
    const uniqueCategories = [...new Set(filteredCategories)]; // Use uniqueCategories
    const uniqueSeries1 = [...new Set(filteredSeries1)];       // Use uniqueSeries1
    const [seriesColors, setSeriesColors] = useState({});
    const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);
    const toggleLegendPosition = () => {
        setLegendPosition((prev) => {
            const positions = [ "bottom", "left", "top","right", "hide"];
            const newIndex = (positions.indexOf(prev) + 1) % positions.length;
            const newPosition = positions[newIndex];
            console.log("Legend position changed to:", newPosition);
            return newPosition;
        });
    };
    

    useEffect(() => {
        setChartKey(prev => prev + 1);
    }, [legendPosition]);
    
     
    useEffect(() => {
        setFilteredCategories(categories);
        setFilteredSeries1(series1);
        setFilteredSeries2(series2);
    }, [categories, series1, series2]);
    
    const series = uniqueSeries1.map(series1Value => ({
           name: series1Value,  // Use the actual series1 value as the name
           data: uniqueCategories.map(categoryValue => {
               const index = categories.findIndex((cat, i) => cat === categoryValue && series1[i] === series1Value);
               return index !== -1 ? series2[index] : 0;
               
           }),
           color: seriesColors[series1Value] || undefined,
       }));
    const handleSortAscending = () => {
        const sortedData = [...filteredCategories]
            .map((category, index) => ({
                category,
                value: filteredSeries2[index],
                series1: filteredSeries1[index]
            }))
            .sort((a, b) => a.value - b.value);
    
        setFilteredCategories(sortedData.map(item => item.category));
        setFilteredSeries1(sortedData.map(item => item.series1));
        setFilteredSeries2(sortedData.map(item => item.value));
    };              
           
    
          
        
        const handleSortDescending = () => {
            const sortedData = [...filteredCategories]
                .map((category, index) => ({
                    category,
                    value: filteredSeries2[index],
                    series1: filteredSeries1[index]
                }))
                .sort((a, b) => b.value - a.value);
        
            setFilteredCategories(sortedData.map(item => item.category));
            setFilteredSeries1(sortedData.map(item => item.series1));
            setFilteredSeries2(sortedData.map(item => item.value));
        };
        
        const handleTop10 = () => {
            const sortedIndices = series2
                .map((value, index) => ({ value, index }))
                .sort((a, b) => b.value - a.value) // Sorting in descending order
                .slice(0, 10)
                .map(item => item.index);
        
            setFilteredCategories(sortedIndices.map(index => categories[index]));
            setFilteredSeries1(sortedIndices.map(index => series1[index]));
            setFilteredSeries2(sortedIndices.map(index => series2[index]));
        };
        
    
        const handleBottom10 = () => {
            const sortedIndices = series2
                .map((value, index) => ({ value, index }))
                .sort((a, b) => a.value - b.value) // Sorting in ascending order
                .slice(0, 10)
                .map(item => item.index);
        
            setFilteredCategories(sortedIndices.map(index => categories[index]));
            setFilteredSeries1(sortedIndices.map(index => series1[index]));
            setFilteredSeries2(sortedIndices.map(index => series2[index]));
        };
        
    
        const handleReset = () => {
            setFilteredCategories(categories);
            setFilteredSeries1(series1);
            setFilteredSeries2(series2);
        };
        const handleLegendClick = (seriesName, index) => {
            setSelectedLegendIndex(index);
        };
    
    // Chart Options
    const options = {
        chart: {
            events: {
                legendClick: (chartContext, seriesIndex) => {
                    if (!chartContext || !chartContext.w || !chartContext.w.config || !chartContext.w.config.series) {
                        console.error("Chart context or series data is undefined");
                        return;
                    }
                    
                    const clickedSeriesName = chartContext.w.config.series[seriesIndex]?.name;
                    if (clickedSeriesName) {
                        handleLegendClick(clickedSeriesName, seriesIndex);
                    }
                }
            },            
            type: 'bar',
            height: 350,
            
            toolbar: {
                tools: {
                    customIcons: [
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
                            index: 1, // Start with the first position in the toolbar
                            title: 'Sort Ascending',
                            class: 'custom-sort-ascending',
                            click: handleSortAscending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
                            index: 2, // Position right after the previous custom icon
                            title: 'Sort Descending',
                            class: 'custom-sort-descending',
                            click: handleSortDescending
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
                            index: 1,
                            title: 'Show Top 10',
                            class: 'custom-top-10',
                            click: handleTop10,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
                            index: 2,
                            title: 'Show Bottom 10',
                            class: 'custom-bottom-10',
                            click: handleBottom10,
                        },
                        {
                            icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">🔄</button>',
                            index: 3,
                            title: 'Reset',
                            class: 'custom-reset',
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
                
                offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
                offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
            },
        },
    //     legend: {
    //         show: legendPosition !== "hide",
    //   position: legendPosition === "hide" ? "top" : legendPosition,
    legend: {
        show: legendPosition !== "hide",
        position: legendPosition === "hide" ? "top" : legendPosition,
        onItemClick: {
            toggleDataSeries: false,
        
            // position: legendPosition || "top", // Default to "top" if null
            // show: legendPosition !== null, // Hide legend if legendPosition is null
        },
    },
        title: {
            text: `${aggregate} of ${xAxis[0]} and ${xAxis[1]} vs ${yAxis[0]}`,
            align: 'left',
            margin: 10,
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
        xaxis: {
            categories: uniqueCategories, // X-axis categories
            labels: {
                show: true,
                style: {
                    fontFamily: fontStyle,
                    fontSize: `${xFontSize}px`,
                    fontWeight: 400,
                    colors: categoryColor
                },
            },
        },
        yaxis: {
            title: {
                text: yAxis[0] || 'Values',
                style: {
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#333',
                },
            },
            labels: {
                style: {
                    fontFamily: fontStyle,
                    fontSize: `${yFontSize}px`, // Use Redux state for font size
                fontWeight: 400,
                colors: [valueColor],
                },
                formatter: (value) => {
                    if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
                    if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
                    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value;
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                dataLabels: {
                    position: 'top',
                },
                
                
            },
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '10px',
                fontWeight: 500,
                colors: ['#fff'],
            },
        },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                if (dataPointIndex === -1) return ''; // Prevent errors on invalid indices
        
                const category = w.globals.labels[dataPointIndex]; // Fetch category dynamically
                const value = series[seriesIndex][dataPointIndex];
        
                let tooltipContent = `<div style="background:  color: #fff; padding: 10px; border-radius: 5px;">`;
        
                if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
                    tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
                    tooltipContent += `<div><strong>Category:</strong> ${category}</div>`;
                } else {
                    if (toolTipOptions.heading) {
                        tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} and ${xAxis[1]} vs ${yAxis[0]}</h4></div>`;
                    }
                    tooltipContent += '<div>';
                    if (toolTipOptions.categoryName) {
                        tooltipContent += `<span style="color:${categoryColor};"><strong>Category:</strong> ${category}</span><br/>`;
                    }
                    if (toolTipOptions.value) {
                        tooltipContent += `<span style="color:${valueColor};"><strong>Value:</strong> ${value}</span>`;
                    }
                    tooltipContent += '</div>';
                }
                tooltipContent += '</div>';
                return tooltipContent;
            },
        },
    };    
    // Series for Grouped Bars
    // const series = [
    //     {
    //         name: xAxis[0] || 'Series 1',
    //         data: series1, // First dataset
    //         color: '#008FFB', // Blue color
    //     },
    //     {
    //         name: xAxis[1] || 'Series 2',
    //         data: series2, // Second dataset
    //         color: '#00E396', // Green color
    //     },
    // ];

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ResizableBox
                        width={800}
                        height={600}
                        minConstraints={[300, 300]}
                        maxConstraints={[1100, 600]}
                    >
                         <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3></div>
                                       
                        <Chart
                        key={chartKey} 
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                    {selectedLegendIndex !== null && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <span>
                        Change color for "{series[selectedLegendIndex].name}":
                    </span>
                    <input
                        type="color"
                        value={seriesColors[series[selectedLegendIndex].name] || "#000000"}
                        onChange={(e) =>
                            setSeriesColors(prev => ({
                                ...prev,
                                [series[selectedLegendIndex].name]: e.target.value
                            }))
                        }
                        onBlur={() => setSelectedLegendIndex(null)}
                    />
                </div>
            )}
                </div>
            </div>
        </div>
    );
};

export default BarChart;
