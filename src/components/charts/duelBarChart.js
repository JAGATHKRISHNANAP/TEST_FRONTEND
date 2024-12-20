


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

const BarChart = ({ categories = [], series1 = [], series2 = [], aggregation }) => {
    const xAxis = useSelector((state) => state.chart.xAxis);
    const yAxis = useSelector((state) => state.chart.yAxis);
    const aggregate = useSelector((state) => state.chart.aggregate);
    const toolTipOptions = useSelector((state) => state.toolTip);
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const contextMenuRef = useRef(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setContextMenuVisible(true);
    };

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            setContextMenuVisible(false);
        }
    };

    const handleShowPopup = () => {
        setPopupVisible(true);
        setContextMenuVisible(false);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Chart Options
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
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
            categories: categories, // X-axis categories
            labels: {
                show: true,
                style: {
                    fontSize: '12px',
                    fontWeight: 600,
                    colors: ['#333'],
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
                    fontSize: '10px',
                    fontWeight: 400,
                    colors: ['#333'],
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
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const category = categories[dataPointIndex];
                const value = series[seriesIndex][dataPointIndex];
                let tooltipContent = '<div style="background: #333; color: #fff; padding: 10px; border-radius: 5px;">';
                if (!toolTipOptions.heading && !toolTipOptions.categoryName && !toolTipOptions.value) {
                    tooltipContent += `<div><strong>Value:</strong> ${value}</div>`;
                    tooltipContent += `<div><strong>category:</strong> ${category}</div>`;
                } else {
                    if (toolTipOptions.heading) {
                        tooltipContent += `<div><h4>${aggregate} of ${xAxis[0]} vs ${yAxis[0]}</h4></div>`;
                    }
                    tooltipContent += '<div>';
                    if (toolTipOptions.categoryName) {
                        tooltipContent += `<span><strong>Category:</strong> ${category}</span><br/>`;
                    }
                    if (toolTipOptions.value) {
                        tooltipContent += `<span><strong>Value:</strong> ${value}</span>`;
                    }
                    tooltipContent += '</div>';
                }
                tooltipContent += '</div>';
                return tooltipContent;
            },
        },
    };

    // Series for Grouped Bars
    const series = [
        {
            name: xAxis[0] || 'Series 1',
            data: series1, // First dataset
            color: '#008FFB', // Blue color
        },
        {
            name: xAxis[1] || 'Series 2',
            data: series2, // Second dataset
            color: '#00E396', // Green color
        },
    ];

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ResizableBox
                        width={800}
                        height={600}
                        minConstraints={[300, 300]}
                        maxConstraints={[1100, 600]}
                        onContextMenu={handleContextMenu}
                    >
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="100%"
                            height="100%"
                        />
                    </ResizableBox>
                </div>
            </div>
            {contextMenuVisible && (
                <ContectMenu
                    ref={contextMenuRef}
                    position={contextMenuPosition}
                    onShowPopup={handleShowPopup}
                />
            )}
            {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
        </div>
    );
};

export default BarChart;
