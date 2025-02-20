// // // import React, { useState, useEffect, useRef } from 'react';
// // // import Chart from "react-apexcharts";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { ResizableBox } from 'react-resizable';
// // // import 'react-resizable/css/styles.css';
// // // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // // import axios from 'axios';
// // // import DrillBarChart from '../drillDown/drillDownBarChart';
// // // import ContectMenu from './contextMenu';
// // // import CustomToolTip from './customToolTip';
// // // import "./tooltip.css";

// // // import { CIcon } from '@coreui/icons-react'; // Import CoreUI icon
// // // import { cilSortAscending, cilSortDescending } from '@coreui/icons'; // use 'cil' instead of 'cis'





// // // const BarChart = ({ categories = [], values = [], aggregation }) => {
// // //     const dispatch = useDispatch();
// // //     const barColor = useSelector((state) => state.chartColor.chartColor);
// // //     const xAxis = useSelector((state) => state.chart.xAxis);
// // //     const yAxis = useSelector((state) => state.chart.yAxis);
// // //     const aggregate = useSelector((state) => state.chart.aggregate);
// // //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// // //     const toolTipOptions = useSelector((state) => state.toolTip);
// // //     const customHeadings = useSelector((state) => state.toolTip.customHeading);
// // //     const [plotData, setPlotData] = useState({});
// // //     const [barClicked, setBarClicked] = useState(false);
// // //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// // //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// // //     const [popupVisible, setPopupVisible] = useState(false);
// // //     const [sortedCategories, setSortedCategories] = useState(categories);
// // //     const [sortedValues, setSortedValues] = useState(values);
// // //     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux

// // //     const contextMenuRef = useRef(null);

// // //     useEffect(() => {
// // //         setSortedCategories(categories);
// // //         setSortedValues(values);
// // //     }, [categories, values]);

// // //     const handleSortAscending = () => {
// // //         const sortedData = [...sortedValues].map((value, index) => ({
// // //             category: sortedCategories[index],
// // //             value
// // //         }));
// // //         sortedData.sort((a, b) => a.value - b.value);
// // //         setSortedCategories(sortedData.map(item => item.category));
// // //         setSortedValues(sortedData.map(item => item.value));
// // //     };

// // //     const handleSortDescending = () => {
// // //         const sortedData = [...sortedValues].map((value, index) => ({
// // //             category: sortedCategories[index],
// // //             value
// // //         }));
// // //         sortedData.sort((a, b) => b.value - a.value);
// // //         setSortedCategories(sortedData.map(item => item.category));
// // //         setSortedValues(sortedData.map(item => item.value));
// // //     };

// // //     const handleClicked = async (event, chartContext, config) => {
// // //         const clickedCategoryIndex = config.dataPointIndex;
// // //         const clickedCategory = categories[clickedCategoryIndex];
// // //         dispatch(setClickedCategory(clickedCategory));
// // //         try {
// // //             const response = await axios.post('http://localhost:5000/your-backend-endpoint', {
// // //                 category: clickedCategory,
// // //                 xAxis: xAxis,
// // //                 yAxis: yAxis,
// // //                 tableName: selectedTable,
// // //                 aggregation: aggregate
// // //             });
// // //             setPlotData(response.data);
// // //             setBarClicked(true);
// // //         } catch (error) {
// // //             console.error('Error sending category to backend:', error);
// // //         }
// // //     };

// // //     const handleContextMenu = (event) => {
// // //         event.preventDefault();
// // //         setContextMenuPosition({ x: event.pageX, y: event.pageY });
// // //         setContextMenuVisible(true);
// // //     };

// // //     const handleClickOutside = (event) => {
// // //         if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
// // //             setContextMenuVisible(false);
// // //         }
// // //     };

// // //     const handleShowPopup = () => {
// // //         setPopupVisible(true);
// // //         setContextMenuVisible(false);
// // //     };

// // //     const handleClosePopup = () => {
// // //         setPopupVisible(false);
// // //     };

// // //     useEffect(() => {
// // //         document.addEventListener('click', handleClickOutside);
// // //         return () => {
// // //             document.removeEventListener('click', handleClickOutside);
// // //         };
// // //     }, []);

// // //     const generateColors = (numColors) => {
// // //         const colors = [];
// // //         for (let i = 0; i < numColors; i++) {
// // //             const hue = Math.floor((360 / numColors) * i);
// // //             colors.push(`hsl(${hue}, 70%, 50%)`);
// // //         }
// // //         return colors;
// // //     };

// // //     const options = {
// // //         chart: {
// // //             events: {
// // //                 dataPointSelection: handleClicked
// // //             },
             
// // //             toolbar: {
// // //                 tools: {
// // //                     customIcons: [
// // //                         {
// // //                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
// // //                             index: 1, // Start with the first position in the toolbar
// // //                             title: 'Sort Ascending',
// // //                             class: 'custom-sort-ascending',
// // //                             click: handleSortAscending
// // //                         },
// // //                         {
// // //                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
// // //                             index: 2, // Position right after the previous custom icon
// // //                             title: 'Sort Descending',
// // //                             class: 'custom-sort-descending',
// // //                             click: handleSortDescending
// // //                         }
// // //                     ],
// // //                     download: true,
// // //                     selection: true,
// // //                     zoom: false,
// // //                     zoomin: false,
// // //                     zoomout: false,
// // //                     pan: true,
// // //                     reset: true,
// // //                 },
// // //                 offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
// // //                 offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
// // //             }
// // //         },
        
// // //         xaxis: {
// // //             categories: sortedCategories,
// // //             labels: {
// // //                 show: true,
// // //                 style: {
// // //                     fontSize: '12px',
// // //                     fontWeight: 400,
// // //                     colors: ['#000']
// // //                 },
// // //                 rotate: -45,
// // //                 formatter: function (val) {
// // //                     if (!val) return '';
// // //                     return val.length > 10 ? val.substring(0, 10) + "..." : val;
// // //                 }
// // //             },
// // //             tickPlacement: 'on',
// // //         },
// // //         yaxis: {
// // //             labels: {
// // //                 style: {
// // //                     fontSize: '12px',
// // //                     fontWeight: 400,
// // //                     colors: ['#000'],
// // //                 },
// // //                 formatter: (value) => {
// // //                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
// // //                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
// // //                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
// // //                     return value;
// // //                 }
// // //             },
// // //         },
// // //         colors: generateColors(categories.length),
// // //         plotOptions: {
// // //             bar: {
// // //                 distributed: true,
// // //                 dataLabels: {
// // //                     hideOverflowingLabels: true
// // //                 },
// // //                 barHeight: '80%',
// // //             }
// // //         },
// // //         title: {
// // //             text: `${aggregation} of ${xAxis} vs ${yAxis}`,
// // //             align: 'left',
// // //             margin: 10,
// // //             offsetX: 0,
// // //             offsetY: 0,
// // //             floating: false,
// // //             style: {
// // //                 fontSize: '14px',
// // //                 fontWeight: 'bold',
// // //                 fontFamily: undefined,
// // //                 color: '#263238'
// // //             },
// // //         },
// // //         dataLabels: {
// // //             enabled: false,
// // //             offsetY: -2,
// // //             style: {
// // //                 fontSize: '12px',
// // //                 colors: ["#304758"]
// // //             }
// // //         },
// // //         grid: {
// // //             borderColor: '#f1f3fa'
// // //         },
// // //         tooltip: {
// // //             enabled: true,
// // //             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
// // //                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
// // //                     const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
// // //                     const value = series[seriesIndex][dataPointIndex];
// // //                     const currentAggregation = aggregation || 'Aggregation';
// // //                     const currentXAxis = xAxis[0] || 'X-Axis';
// // //                     const currentYAxis = yAxis || 'Y-Axis';

// // //                     return `
// // //                         <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
// // //                             ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
// // //                             <div>
// // //                                 ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
// // //                                 ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
// // //                             </div>
// // //                         </div>
// // //                     `;
// // //                 }
// // //                 : undefined
// // //         },
// // //         legend: {
// // //             show: false
// // //         }
// // //     };

// // //     const series = [{
// // //         name: aggregation,
// // //         data: sortedValues
// // //     }];

// // //     return (
// // //         <div className="app">
// // //                             {/* <div className="color-picker-container">
// // //                     <button onClick={handleSortAscending}>Sort Ascending</button>
// // //                     <button onClick={handleSortDescending}>Sort Descending</button>
// // //                 </div> */}
// // //             <div className="row">
// // //                 <div className="mixed-chart">
                
// // //                     {/* <ResizableBox width={500} height={400} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}> */}
// // //                     <ResizableBox width={300} height={300} minConstraints={[300, 300]} maxConstraints={[800, 600]} onContextMenu={handleContextMenu}>
// // //                         <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3>
// // //                         </div>
// // //                         <Chart
// // //                             options={options}
// // //                             series={series}
// // //                             type="bar"
// // //                             width="100%"
// // //                             height="100%"
// // //                         />
// // //                     </ResizableBox>
// // //                 </div>

// // //             </div>
// // //             {contextMenuVisible && (
// // //                 <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
// // //             )}
// // //             {popupVisible && <CustomToolTip onClose={handleClosePopup} />}
// // //             {barClicked && <DrillBarChart
// // //                 categories={plotData.categories}
// // //                 values={plotData.values}
// // //                 aggregation={plotData.aggregation}
// // //                 xAxis={xAxis}
// // //                 yAxis={yAxis}
// // //                 selectedTable={selectedTable}
// // //             />}
// // //         </div>
// // //     );
// // // };

// // // export default BarChart;











// // import React, { useState, useEffect, useRef } from 'react';
// // import Chart from "react-apexcharts";
// // import { useSelector, useDispatch } from "react-redux";
// // import { ResizableBox } from 'react-resizable';
// // import 'react-resizable/css/styles.css';
// // import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// // import ContectMenu from './contextMenu';
// // import CustomToolTip from './customToolTip';
// // import "./tooltip.css";
// // import { sendCategoryToBackend } from '../../utils/api';
// // import Draggable from 'react-draggable';

// // const BarChart = ({ categories = [], values = [], aggregation }) => {
// //     const dispatch = useDispatch();
// //     const barColor = useSelector((state) => state.chartColor.chartColor);
// //     const xAxis = useSelector((state) => state.chart.xAxis);
// //     const yAxis = useSelector((state) => state.chart.yAxis);
// //     const aggregate = useSelector((state) => state.chart.aggregate);
// //     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
// //     const toolTipOptions = useSelector((state) => state.toolTip);
// //     const customHeadings = useSelector((state) => state.toolTip.customHeading);
// //     const [plotData, setPlotData] = useState({});
// //     const [barClicked, setBarClicked] = useState(false);
// //     const [contextMenuVisible, setContextMenuVisible] = useState(false);
// //     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
// //     const [popupVisible, setPopupVisible] = useState(false);
// //     const [sortedCategories, setSortedCategories] = useState(categories);
// //     const [sortedValues, setSortedValues] = useState(values);
// //     const headingColor = useSelector((state) => state.toolTip.headingColor); // Get color from Redux
// //     const xFontSize = useSelector((state) => state.toolTip.fontSizeXc|| "12");
// //     const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
// //     const categoryColor = useSelector((state) => state.toolTip.categoryColor || "#000000");
// //     const valueColor= useSelector((state) => state.toolTip.valueColor || "#000000");
// //     const contextMenuRef = useRef(null);

// //     useEffect(() => {
// //         setSortedCategories(categories);
// //         setSortedValues(values);
// //     }, [categories, values]);

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

// //     const handleClicked = async (event, chartContext, config) => {
// //         const clickedCategoryIndex = config.dataPointIndex;
// //         const clickedCategory = categories[clickedCategoryIndex];
// //         dispatch(setClickedCategory(clickedCategory));
// //         try {
// //           const data = await sendCategoryToBackend(
// //             clickedCategory,
// //             xAxis,
// //             yAxis,
// //             selectedTable,
// //             aggregate
// //           );
// //           setPlotData(data);
// //           setBarClicked(true);
// //         } catch (error) {
// //           console.error('Error handling click event:', error);
// //         }
// //       };

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

// //     const generateColors = (numColors) => {
// //         const colors = [];
// //         for (let i = 0; i < numColors; i++) {
// //             const hue = Math.floor((360 / numColors) * i);
// //             colors.push(`hsl(${hue}, 70%, 50%)`);
// //         }
// //         return colors;
// //     };

// //     const options = {
// //         chart: {
// //             events: {
// //                 dataPointSelection: handleClicked
// //             },
             
// //             toolbar: {
// //                 tools: {
// //                     customIcons: [
// //                         {
// //                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▲</button>',
// //                             index: 1, // Start with the first position in the toolbar
// //                             title: 'Sort Ascending',
// //                             class: 'custom-sort-ascending',
// //                             click: handleSortAscending
// //                         },
// //                         {
// //                             icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">▼</button>',
// //                             index: 2, // Position right after the previous custom icon
// //                             title: 'Sort Descending',
// //                             class: 'custom-sort-descending',
// //                             click: handleSortDescending
// //                         }
// //                     ],
// //                     download: true,
// //                     selection: true,
// //                     zoom: true,
// //                     zoomin: true,
// //                     zoomout: true,
// //                     pan: true,
// //                     reset: true,
// //                 },
// //                 offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
// //                 offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
// //             }
// //         },
        
// //         xaxis: {
// //             categories: sortedCategories,
// //             title: {
// //                 text: `${xAxis}`,
// //               },
// //             // labels: {

// //             //     show: true,
// //             //     style: {
// //             //         fontSize: '12px',
// //             //         fontWeight: 400,
// //             //         colors: ['#000']
// //             //     },
// //             //     rotate: -45,
// //             //     formatter: function (val) {
// //             //         if (!val) return '';
// //             //         return val.length > 10 ? val.substring(0, 10) + "..." : val;
// //             //     }
// //             // },
// //             labels: {
// //                 show: true,
// //                 style: {
// //                     // fontSize: '12px',
// //                     // fontWeight: 400,
// //                     // colors: ['#000']
// //                     fontSize: `${xFontSize}px`,
// //                     fontWeight: 400,
// //                     colors: categoryColor
// //                 },
// //                 rotate: -45,
// //                 formatter: function (val) {
// //                     if (!val) return '';
// //                     if (/\d{4}-\d{2}-\d{2}/.test(val)) {
// //                         const [year, month, day] = val.split('-');
// //                         val = `${day}-${month}-${year}`;
// //                     }
// //                     return val.length > 10 ? val.substring(0, 10) + "..." : val;
// //                 }
// //             },
            
// //             tickPlacement: 'on',
// //         },
// //         yaxis: {
// //             title: {
// //                 text: `${yAxis}`,
// //               },
// //             labels: {
// //                 style: {
// //                     fontSize: `${yFontSize}px`,
// //                     fontWeight: 400,
// //                     colors: valueColor,
// //                     // fontSize: '12px',
// //                     // fontWeight: 400,
// //                     // colors: ['#000'],
                    
// //                 },
// //                 formatter: (value) => {
// //                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
// //                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
// //                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
// //                     return value;
// //                 }
// //             },
// //         },
// //         colors: generateColors(categories.length),
// //         plotOptions: {
// //             // bar: {
// //             //     distributed: true,
// //             //     dataLabels: {
// //             //         hideOverflowingLabels: true
// //             //     },
// //             //     barHeight: '80%',
// //             // }
// //             bar: {
// //                 distributed: true,
// //                 dataLabels: {
// //                     hideOverflowingLabels: true
// //                 },
// //                 barHeight: '80%',
// //                 // columnWidth: '60px', // Set a fixed width for each bar
// //             }
// //         },
// //         title: {
// //             // text: `${aggregation} of ${xAxis} vs ${yAxis}`,
// //             text: `${xAxis} vs ${yAxis}`,
// //             align: 'left',
// //             margin: 10,
// //             offsetX: 0,
// //             offsetY: 0,
// //             floating: false,
// //             style: {
// //                 fontSize: '14px',
// //                 fontWeight: 'bold',
// //                 fontFamily: undefined,
// //                 color: '#263238'
// //             },
// //         },
// //         dataLabels: {
// //             enabled: false,
// //             offsetY: -2,
// //             style: {
// //                 fontSize: '12px',
// //                 colors: ["#304758"]
// //             }
// //         },
// //         grid: {
// //             borderColor: '#f1f3fa'
// //         },
// //         tooltip: {
// //             enabled: true,
// //             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
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
// //         legend: {
// //             show: false
// //         }
// //     };

// //     const series = [{
// //         name: aggregation,
// //         data: sortedValues
// //     }];

// //     return (
// //         <div className="app">
// //             <div className="row">
// //                 <div className="mixed-chart">
// //                     <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} onContextMenu={handleContextMenu}>
// //                     <div className="chart-title"><h3 style={{ color: headingColor }}>{customHeadings}</h3>
// //                     </div>
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

// //                           {popupVisible && (
// //         <Draggable>
// //           <div>
// //             <CustomToolTip onClose={handleClosePopup} />
// //           </div>
// //         </Draggable>
// //       )}
// //         </div>
// //     );
// // };

// // export default BarChart;


// import React, { useState, useEffect, useRef } from 'react';
// import Chart from "react-apexcharts";
// import { useSelector, useDispatch } from "react-redux";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
// import ContectMenu from './contextMenu';
// import CustomToolTip from './customToolTip';
// import "./tooltip.css";
// import { sendCategoryToBackend } from '../../utils/api';
// import Draggable from 'react-draggable';
// import { faL } from '@fortawesome/free-solid-svg-icons';

// const BarChart = ({ categories = [], values = [], aggregation }) => {
//     const dispatch = useDispatch();
//     const barColor = useSelector((state) => state.chartColor.chartColor);
//     const xAxis = useSelector((state) => state.chart.xAxis);
//     const yAxis = useSelector((state) => state.chart.yAxis);
//     const aggregate = useSelector((state) => state.chart.aggregate);
//     const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
//     const toolTipOptions = useSelector((state) => state.toolTip);
//     const customHeadings = useSelector((state) => state.toolTip.customHeading);
//     const [plotData, setPlotData] = useState({});
//     const [barClicked, setBarClicked] = useState(false);
   
//     const [sortedCategories, setSortedCategories] = useState(categories);
//     const [sortedValues, setSortedValues] = useState(values);
//     const xFontSize = useSelector((state) => state.toolTip.fontSizeX|| "12");
//     const fontStyle = useSelector((state) => state.toolTip.fontStyle|| "Arial");
//     const yFontSize= useSelector((state) => state.toolTip.fontSizeY||"12");
//     const categoryColor = useSelector((state) => state.toolTip.categoryColor);
//     const valueColor= useSelector((state) => state.toolTip.valueColor);
//     const [isFiltered, setIsFiltered] = useState(false); // Track if Top 10 or Bottom 10 is applied

//     const contextMenuRef = useRef(null);

//     // useEffect(() => {
//     //     // Call the handleTop10 on initial render
//     //     handleTop10();
//     // }, []);

//     useEffect(() => {
//         setSortedCategories(categories);
//         setSortedValues(values);
//     }, [categories, values]);

//     const handleSortAscending = () => {
//         const sortedData = [...sortedValues].map((value, index) => ({
//             category: sortedCategories[index],
//             value
//         }));
//         sortedData.sort((a, b) => a.value - b.value);
//         setSortedCategories(sortedData.map(item => item.category));
//         setSortedValues(sortedData.map(item => item.value));
//     };

//     const handleSortDescending = () => {
//         const sortedData = [...sortedValues].map((value, index) => ({
//             category: sortedCategories[index],
//             value
//         }));
//         sortedData.sort((a, b) => b.value - a.value);
//         setSortedCategories(sortedData.map(item => item.category));
//         setSortedValues(sortedData.map(item => item.value));
//     };

//     const handleClicked = async (event, chartContext, config) => {
//         const clickedCategoryIndex = config.dataPointIndex;
//         const clickedCategory = categories[clickedCategoryIndex];
//         dispatch(setClickedCategory(clickedCategory));
//         try {
//           const data = await sendCategoryToBackend(
//             clickedCategory,
//             xAxis,
//             yAxis,
//             selectedTable,
//             aggregate
//           );
//           setPlotData(data);
//           setBarClicked(true);
//         } catch (error) {
//           console.error('Error handling click event:', error);
//         }
//       };

//     const handleTop10 = () => {
//         const sortedData = [...sortedValues].map((value, index) => ({
//             category: sortedCategories[index],
//             value
//         }));
//         sortedData.sort((a, b) => b.value - a.value); // Sort descending
//         const top10 = sortedData.slice(0, 10); // Get top 10
//         setSortedCategories(top10.map(item => item.category));
//         setSortedValues(top10.map(item => item.value));

//     setIsFiltered(true); // Mark as filtered
//     };
    
//     const handleBottom10 = () => {
//         const sortedData = [...sortedValues].map((value, index) => ({
//             category: sortedCategories[index],
//             value
//         }));
//         sortedData.sort((a, b) => a.value - b.value); // Sort ascending
//         const bottom10 = sortedData.slice(0, 10); // Get bottom 10
//         setSortedCategories(bottom10.map(item => item.category));
//         setSortedValues(bottom10.map(item => item.value));
//         setIsFiltered(true); // Mark as filtered
//     };
//     const generateColors = (numColors) => {
//         const colors = [];
//         for (let i = 0; i < numColors; i++) {
//             const hue = Math.floor((360 / numColors) * i);
//             colors.push(`hsl(${hue}, 70%, 50%)`);
//         }
//         return colors;
//     };

//     const options = {
//         chart: {
//             events: {
//                 dataPointSelection: handleClicked
//             },
             
//             toolbar: {
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
//                             // Top 10: Using an upward double arrow symbol
//                             icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
//                             index: 3,
//                             title: 'Show Top 10',
//                             class: 'custom-top-10',
//                             click: handleTop10,
//                         },
//                         {
//                             // Bottom 10: Using a downward double arrow symbol
//                             icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
//                             index: 4,
//                             title: 'Show Bottom 10',
//                             class: 'custom-bottom-10',
//                             click: handleBottom10,
//                         },
//                     {
//                         icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
//                         index: 5, // Reset
//                         title: 'Reset Chart',
//                         class: 'custom-reset',
//                         click: () => {
//                             setSortedCategories(categories); // Reset categories
//                             setSortedValues(values);         // Reset values
//                             setIsFiltered(false);            // Clear filter state
//                         },
//                     },
//                     ],
//                     download: true,
//                     selection: true,
//                     zoom: false,
//                     zoomin: false,
//                     zoomout: false,
//                     pan: true,
//                     reset: true,
//                 },
//                 offsetX: -10, // Adjusts horizontal position of the toolbar inside the chart
//                 offsetY: 0 // Adjusts vertical position of the toolbar inside the chart
//             }
//         },
//         legend: {
//             show: true,
//             position: 'bottom', // Positions: 'top', 'right', 'bottom', 'left'
//             horizontalAlign: 'center', // Alignments: 'left', 'center', 'right'
//             fontSize: '12px',
//             fontFamily: fontStyle, // Use Redux state for font style
//             fontWeight: 400,
//             labels: {
//                 colors: categoryColor, // Use Redux state for legend colors
//                 useSeriesColors: false // Set true if you want the legend to match series colors
//             },
//             markers: {
//                 width: 12,
//                 height: 12,
//                 radius: 2,
//             },
//             itemMargin: {
//                 horizontal: 5,
//                 vertical: 2
//             },
//         },
        
//         xaxis: {
//             categories: sortedCategories,
//             title: {
//                 text: `${xAxis}`,
//               },
//             labels: {
//                 show: true,
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${xFontSize}px`, // Use Redux state for font size
//                 fontWeight: 400,
//                 colors: categoryColor,
//                 },
//                 rotate: -45,
//                 formatter: function (val) {
//                     if (!val) return '';
//                     if (/\d{4}-\d{2}-\d{2}/.test(val)) {
//                         const [year, month, day] = val.split('-');
//                         val = `${day}-${month}-${year}`;
//                     }
//                     return val.length > 10 ? val.substring(0, 10) + "..." : val;
//                 }
//             },
//             scrollbar: {
//                 enabled: sortedCategories.length > 15, // Enable scrolling if categories exceed 15
//             },
//             tickPlacement: 'on',
           
//         },
//         yaxis: {
//             title: {
//                 text: `${yAxis}`,
//               },
//             labels: {
//                 style: {
//                     fontFamily: fontStyle,
//                     fontSize: `${yFontSize}px`, // Use Redux state for font size
//                 fontWeight: 400,
//                 colors: [valueColor],
//                 },
//                 formatter: (value) => {
//                     if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
//                     if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
//                     if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
//                     return value;
//                 }
//             },
//         },
//         colors: generateColors(categories.length),
//         plotOptions: {
//             bar: {
//                 distributed: true,
//                 barHeight: '80%',
//                 dataLabels: {
//                     position: 'center', // Place labels inside the bar
//                 },
                
//             }
//         },
//         title: {
//             text: `${xAxis} vs ${yAxis}`,
//             align: 'left',
//             margin: 10,
//             offsetX: 0,
//             offsetY: 0,
//             floating: false,
//             style: {
//                 fontSize: '14px',
//                 fontWeight: 'bold',
//                 fontFamily: undefined,
//                 color: '#263238'
//             },
//         },
//         dataLabels: {
//             enabled: false,
//             offsetY: -2,
//             style: {
//                 fontSize: '12px',
//                 colors: ["#304758"]
//             }
//         },
//         grid: {
//             borderColor: '#f1f3fa'
//         },
//         // tooltip: {
//         //     enabled: true,
//         //     custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
//         //         ? function ({ series, seriesIndex, dataPointIndex, w }) {
//         //             const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
//         //             const value = series[seriesIndex][dataPointIndex];
//         //             const currentAggregation = aggregation || 'Aggregation';
//         //             const currentXAxis = xAxis[0] || 'X-Axis';
//         //             const currentYAxis = yAxis || 'Y-Axis';

//         //             return `
//         //                 <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//         //                     ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
//         //                     <div>
//         //                         ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
//         //                         ${toolTipOptions.value ? `<div><strong>Value:</strong> ${value}</div>` : ''}
//         //                     </div>
//         //                 </div>
//         //             `;
//         //         }
//         //         : undefined
//         // },
//         tooltip: {
//             enabled: true,
//             // Default tooltip formatter for values
//             y: {
//                 formatter: function (value) {
//                     // Determine the currency symbol dynamically
//                     const currencySymbol = value >= 100000 ? '₹' : '$'; // Example logic
//                     return `${currencySymbol} ${value.toLocaleString()}`;
//                 },
//                 title: {
//                     formatter: function (seriesName) {
//                         return `${seriesName}`; // Customize series title if needed
//                     }
//                 }
//             },
//             // Custom tooltip logic
//             custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
//                 ? function ({ series, seriesIndex, dataPointIndex, w }) {
//                     const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
//                     const value = series[seriesIndex][dataPointIndex];
//                     const currentAggregation = aggregation || 'Aggregation';
//                     const currentXAxis = xAxis[0] || 'X-Axis';
//                     const currentYAxis = yAxis || 'Y-Axis';
        
//                     // Determine the currency symbol dynamically
//                     const currencySymbol = value >= 100000 ? '₹' : '$'; // Example logic
//                     const formattedValue = `${currencySymbol} ${value.toLocaleString()}`;
        
//                     return `
//                         <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
//                             ${toolTipOptions.heading ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>` : ''}
//                             <div>
//                                 ${toolTipOptions.categoryName ? `<div><strong>Category:</strong> ${category}</div>` : ''}
//                                 ${toolTipOptions.value ? `<div><strong>Value:</strong> ${formattedValue}</div>` : ''}
//                             </div>
//                         </div>
//                     `;
//                 }
//                 : undefined
//         },
        
//         legend: {
//             show: false
//         }
//     };

//     const series = [{
//         name: aggregation,
//         data: sortedValues
//     }];

//     return (
//         <div className="app">
//             <div className="row">
//                 <div className="mixed-chart">
//                     {/* <ResizableBox width={800} height={550} minConstraints={[300, 300]} maxConstraints={[800, 550]} >
//                         <div className="chart-title">{customHeadings}</div>
//                         <Chart
//                             options={options}
//                             series={series}
//                             type="bar"
//                             width="100%"
//                             height="100%"
//                         />
//                     </ResizableBox> */}
//                       <ResizableBox
//                       width={isFiltered ? Math.max(10 * 30, 600) : Math.max(values.length * 30, 600)}
// //   width={Math.max(values.length * 30, 600)} // Adjust the multiplier (e.g., 50) and the minimum width (e.g., 300) as needed
//   height='100px'
//   minConstraints={[600, 300]} // Minimum width and height
//   maxConstraints={[800, 500]} // Maximum width and height
//   resizeHandles={['e', 'w']} // Allow horizontal resizing
//   className="resizable-chart"
// ><div className="chart-title">{customHeadings}</div>
//   <Chart options={options} series={[{ data: sortedValues }]} type="bar" height={500} />
// </ResizableBox>
//                 </div>

//             </div>
//                       {/* {contextMenuVisible && (
//                     <ContectMenu ref={contextMenuRef} position={contextMenuPosition} onShowPopup={handleShowPopup} />
//                 )}
    
//                 {popupVisible && (
//                     <div>
//                         <CustomToolTip onClose={handleClosePopup} />
//                     </div>
//                 )} */}
//         </div>
//     );
// };

// export default BarChart;
import React, { useState, useEffect, useRef } from 'react';
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { setClickedCategory } from '../../features/drillDownChartSlice/drillDownChartSlice';
import { sendCategoryToBackend } from '../../utils/api';
import "./tooltip.css";
import Draggable from 'react-draggable';
import { setBarColor } from '../../features/Dashboard-Slice/chartSlice';

const BarChart = ({ categories = [], values = [], aggregation }) => {
  const dispatch = useDispatch();
  const xAxis = useSelector((state) => state.chart.xAxis);
  const yAxis = useSelector((state) => state.chart.yAxis);
  const aggregate = useSelector((state) => state.chart.aggregate);
  const selectedTable = useSelector((state) => state.dashboard.checkedPaths);
  const toolTipOptions = useSelector((state) => state.toolTip);
  const customHeadings = useSelector((state) => state.toolTip.customHeading);

  const xFontSize = useSelector((state) => state.toolTip.fontSizeX || "12");
  const fontStyle = useSelector((state) => state.toolTip.fontStyle || "Arial");
  const yFontSize = useSelector((state) => state.toolTip.fontSizeY || "12");
  const categoryColor = useSelector((state) => state.toolTip.categoryColor);
  const valueColor = useSelector((state) => state.toolTip.valueColor);

  const [plotData, setPlotData] = useState({});
  const [barClicked, setBarClicked] = useState(false);
  const [sortedCategories, setSortedCategories] = useState(categories);
  const [sortedValues, setSortedValues] = useState(values);
  const [isFiltered, setIsFiltered] = useState(false);
  const [legendPosition, setLegendPosition] = useState("right");
  const [chartKey, setChartKey] = useState(0);

  // Default colors
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
  // Local bar colors for each category
  const [barColor, setBarColorState] = useState(
    categories.map((_, i) => defaultColors[i % defaultColors.length])
  );

  // For inline color picker when a legend item is clicked
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

  // Reinitialize when categories/values change
  useEffect(() => {
    setSortedCategories(categories);
    setSortedValues(values);
    setBarColorState(categories.map((_, i) => defaultColors[i % defaultColors.length]));
  }, [categories, values]);

  useEffect(() => {
    setChartKey((prev) => prev + 1); // Force re-render on legend position change
  }, [legendPosition]);

  // Sorting functions
  const handleSortAscending = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => a.value - b.value);
    setSortedCategories(sortedData.map((item) => item.category));
    setSortedValues(sortedData.map((item) => item.value));
  };

  const handleSortDescending = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => b.value - a.value);
    setSortedCategories(sortedData.map((item) => item.category));
    setSortedValues(sortedData.map((item) => item.value));
  };

  const handleTop10 = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => b.value - a.value);
    const top10 = sortedData.slice(0, 10);
    setSortedCategories(top10.map((item) => item.category));
    setSortedValues(top10.map((item) => item.value));
    setIsFiltered(true);
  };

  const handleBottom10 = () => {
    const sortedData = [...sortedValues].map((value, index) => ({
      category: sortedCategories[index],
      value,
    }));
    sortedData.sort((a, b) => a.value - b.value);
    const bottom10 = sortedData.slice(0, 10);
    setSortedCategories(bottom10.map((item) => item.category));
    setSortedValues(bottom10.map((item) => item.value));
    setIsFiltered(true);
  };

  const handleClicked = async (event, chartContext, config) => {
    const clickedCategoryIndex = config.dataPointIndex;
    const clickedCategory = categories[clickedCategoryIndex];
    dispatch(setClickedCategory(clickedCategory));
    try {
      const data = await sendCategoryToBackend(
        clickedCategory,
        xAxis,
        yAxis,
        selectedTable,
        aggregate
      );
      setPlotData(data);
      setBarClicked(true);
    } catch (error) {
      console.error('Error handling click event:', error);
    }
  };

  const toggleLegendPosition = () => {
    setLegendPosition((prev) => {
      const positions = ["right", "top", "bottom","left",  "hide",];
      const newIndex = (positions.indexOf(prev) + 1) % positions.length;
      return positions[newIndex];
    });
  };

  // Legend click event: open inline color picker
  const chartEvents = {
    legendClick: function (chartContext, seriesIndex, config) {
      setSelectedLegendIndex(seriesIndex);
      return false; // Prevent default toggling
    }
  };

  // Update bar colors when the user picks a new color
  const handleColorChange = (index, newColor) => {
    setBarColorState((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;
      return updatedColors;
    });
  };

  const options = {
    chart: {
      events: {
        dataPointSelection: handleClicked,
        ...chartEvents
      },
      toolbar: {
        tools: {
          customIcons: [
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇧</button>',
              index: 1,
              title: 'Sort Ascending',
              class: 'custom-sort-ascending',
              click: handleSortAscending
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:14px;">⇩</button>',
              index: 2,
              title: 'Sort Descending',
              class: 'custom-sort-descending',
              click: handleSortDescending
            },
            {
              icon: '<button style="background:none;border:none;color:#28a745;font-size:14px;">⏶</button>',
              index: 3,
              title: 'Show Top 10',
              class: 'custom-top-10',
              click: handleTop10,
            },
            {
              icon: '<button style="background:none;border:none;color:#dc3545;font-size:14px;">⏷</button>',
              index: 4,
              title: 'Show Bottom 10',
              class: 'custom-bottom-10',
              click: handleBottom10,
            },
            {
              icon: '<button style="background:none;border:none;color:#6c757d;font-size:20px;">↺</button>',
              index: 5,
              title: 'Reset Chart',
              class: 'custom-reset',
              click: () => {
                setSortedCategories(categories);
                setSortedValues(values);
                setIsFiltered(false);
              },
            },
            {
              icon: '<button style="background:none;border:none;color:#007bff;font-size:16px;">📍</button>',
              index: 6,
              title: "Toggle Legend Position",
              class: "custom-legend-toggle",
              click: toggleLegendPosition,
            }
          ],
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true,
        },
        offsetX: -10,
        offsetY: 0,
      }
    },
    colors: barColor,        // Use our local barColor state
    labels: sortedCategories,// Ensure these are the category labels
    legend: {
      show: true,
      position: legendPosition === "hide" ? "right" : legendPosition,
      horizontalAlign: 'center',
      fontSize: '12px',
      fontFamily: fontStyle,
      fontWeight: 400,
      labels: {
        colors: categoryColor,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 2,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 2
      },
      // ★ Use a formatter to display category names instead of numeric labels
      formatter: (val, opts) => {
        // val is the default numeric label (like "1", "2", etc.)
        // opts.seriesIndex is the data point index
        // Return the matching category name:
        return sortedCategories[opts.seriesIndex];
      },
    },
    xaxis: {
      categories: sortedCategories,
      title: { text: xAxis },
      labels: {
        show: true,
        style: {
          fontFamily: fontStyle,
          fontSize: `${xFontSize}px`,
          fontWeight: 400,
          colors: categoryColor,
        },
        rotate: -45,
        formatter: function (val) {
          if (!val) return '';
          if (/\d{4}-\d{2}-\d{2}/.test(val)) {
            const [year, month, day] = val.split('-');
            val = `${day}-${month}-${year}`;
          }
          return val.length > 10 ? val.substring(0, 10) + "..." : val;
        }
      },
      scrollbar: {
        enabled: sortedCategories.length > 15,
      },
      tickPlacement: 'on',
    },
    yaxis: {
      title: { text: yAxis },
      labels: {
        style: {
          fontFamily: fontStyle,
          fontSize: `${yFontSize}px`,
          fontWeight: 400,
          colors: [valueColor],
        },
        formatter: (value) => {
          if (value >= 10000000) return (value / 10000000).toFixed(1) + 'M';
          if (value >= 100000) return (value / 100000).toFixed(1) + 'L';
          if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
          return value;
        }
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        barHeight: '80%',
        dataLabels: {
          position: 'center',
        },
      }
    },
    title: {
      text: `${xAxis} vs ${yAxis}`,
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#263238'
      },
    },
    dataLabels: {
      enabled: false,
      offsetY: -2,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    grid: {
      borderColor: '#f1f3fa'
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          const currencySymbol = value >= 100000 ? '₹' : '$';
          return `${currencySymbol} ${value.toLocaleString()}`;
        },
        title: {
          formatter: function (seriesName) {
            return `${seriesName}`;
          }
        }
      },
      custom: toolTipOptions.heading || toolTipOptions.categoryName || toolTipOptions.value
        ? function ({ series, seriesIndex, dataPointIndex, w }) {
            const category = plotData.categories ? plotData.categories[dataPointIndex] : categories[dataPointIndex];
            const value = series[seriesIndex][dataPointIndex];
            const currentAggregation = aggregation || 'Aggregation';
            const currentXAxis = xAxis[0] || 'X-Axis';
            const currentYAxis = yAxis || 'Y-Axis';
            const currencySymbol = value >= 100000 ? '₹' : '$';
            const formattedValue = `${currencySymbol} ${value.toLocaleString()}`;
            return `
              <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
                ${
                  toolTipOptions.heading
                    ? `<div style="font-weight: bold; margin-bottom: 5px;"><h4>${currentAggregation} of ${currentXAxis} vs ${currentYAxis}</h4></div>`
                    : ''
                }
                <div>
                  ${
                    toolTipOptions.categoryName
                      ? `<div><strong>Category:</strong> ${category}</div>`
                      : ''
                  }
                  ${
                    toolTipOptions.value
                      ? `<div><strong>Value:</strong> ${formattedValue}</div>`
                      : ''
                  }
                </div>
              </div>
            `;
          }
        : undefined
    },
  };

  const series = [{
    name: aggregation,
    data: sortedValues
  }];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <ResizableBox
            width={isFiltered ? Math.max(10 * 30, 600) : Math.max(values.length * 30, 600)}
            height='100px'
            minConstraints={[600, 300]}
            maxConstraints={[800, 500]}
            resizeHandles={['e', 'w']}
            className="resizable-chart"
          >
            <div className="chart-title">{customHeadings}</div>
            <Chart key={chartKey} options={options} series={series} type="bar" height={500} />
          </ResizableBox>
          {/* Inline color picker for the selected legend item */}
          {selectedLegendIndex !== null && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span>
                Change color for "{sortedCategories[selectedLegendIndex]}":{" "}
              </span>
              <input
                type="color"
                value={barColor[selectedLegendIndex]}
                onChange={(e) =>
                  handleColorChange(selectedLegendIndex, e.target.value)
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
